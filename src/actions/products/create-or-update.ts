'use server'

import { Gender, Product, Size } from '@prisma/client'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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
  
      return {
        product
      }
    })

    revalidatePath('admin/products')
    revalidatePath(`admin/product/${product.slug}`)

    return {
      ok: true,
      product: prismaTx.product
    }
  } catch (error) {
    return {
      ok:false,
      message: 'review logs'
    }
  }


}
