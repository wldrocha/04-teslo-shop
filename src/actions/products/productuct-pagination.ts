'use server'

import prisma from '@/lib/prisma'

interface PaginationOptions {
  page?: number
  take?: number
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12 }: PaginationOptions) => {
  if (isNaN(page) || page < 1) page = 1
  if (isNaN(take) || take < 1) take = 12
  try {
    //total products
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: {
            url: true
          }
        }
      }
    })
    // get total pages
    const totalCount = await prisma.product.count({})
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        title: product.name,
        images: product.ProductImage.map((image) => image.url)
      }))
    }
  } catch (error) {
    throw new Error('Error loading products with images')
  }
}
