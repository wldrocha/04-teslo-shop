'use server'
import prisma from '@/lib/prisma'

export const getAllCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    return categories
  } catch (error) {
    return []
  }
}
