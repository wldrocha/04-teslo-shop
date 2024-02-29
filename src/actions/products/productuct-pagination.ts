'use server'

import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: string
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {
  if (isNaN(page) || page < 1) page = 1
  if (isNaN(take) || take < 1) take = 12
  try {
    //total products
    const products = await prisma.product.findMany({
      where: { gender: gender as Gender },
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
    const totalCount = await prisma.product.count({ where: { gender: gender as Gender } })
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
