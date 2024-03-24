'use server'
import cloudinary from '@/lib/cloudinary'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteProductImage = async (imageId: number, imageUrl: string) => {
  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'cannot delete image that is not hosted on a server.'
    }
  }
  const imageName = imageUrl.split('/').pop()?.split('.')[0] ?? ''

  try {
    await cloudinary.uploader.destroy(imageName)
    const deleteImages = await prisma.productImage.delete({
      where: {
        id: imageId
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    })

    revalidatePath(`/admin/products`)
    revalidatePath(`/admin/product/${deleteImages.product.slug}`)
    revalidatePath(`/product/${deleteImages.product.slug}`)
  } catch (error) {
    return {
      ok: false,
      message: 'Cannot delete image'
    }
  }
}
