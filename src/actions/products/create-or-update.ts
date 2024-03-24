'use server'

import { Gender, Product, Size } from '@prisma/client'
import { promise, z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import cloudinary from '@/lib/cloudinary'


const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  name: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(',')),
  tags: z.string(),
  gender: z.nativeEnum(Gender)
})

export const createOrUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)

  const productParsed = productSchema.safeParse(data)
  if (!productParsed.success) {
    return {
      ok: false
    }
  }

  const product = productParsed.data
  product.slug = product.slug.toLocaleLowerCase().replace(/ /g, '-').trim()

  const { id, ...restProduct } = product

  const tagsArray = restProduct.tags.split(',').map((tag) => tag.trim().toLowerCase())

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      if (id) {
        //update
        product = await prisma.product.update({
          where: { id },
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })
      } else {
        //create
        product = await prisma.product.create({
          data: {
            ...restProduct,
            sizes: {
              set: restProduct.sizes as Size[]
            },
            tags: {
              set: tagsArray
            }
          }
        })
      }

      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])
        if (!images) {
          throw new Error('cannot upload images, rollingback')
        }
        await prisma.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id
          }))
        })
      }

      return {
        product
      }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/product/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      product: prismaTx.product
    }
  } catch (error) {
    return {
      ok: false,
      message: 'review logs'
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')
        return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then((r) => r.secure_url)
      } catch (error) {
        console.log(`🚀 ~ uploadPromises ~ error:`, error)
        return null
      }
    })

    const uploadImages = await Promise.all(uploadPromises)

    return uploadImages
  } catch (error) {
    console.log(`🚀 ~ uploadImages ~ error:`, error)
    return null
  }
}
