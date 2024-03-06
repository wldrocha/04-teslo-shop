'use server'
import prisma from '@/lib/prisma'

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            url: true
          }
        }
      },
      where: {
        slug
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      ...product,
      images: product.ProductImage.map((image) => image.url)
    }
  } catch (error) {
    console.log('🚀 ~ getProductBySlug ~ error:', error)
    throw new Error('Error getting product by slug')
  }
}
