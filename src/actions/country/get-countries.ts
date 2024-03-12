'use server'
import prisma from '@/lib/prisma'

export const getCountries = async () => {
  try {
    const countries = await prisma.country.findMany({
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true
      }
    })
    return countries
  } catch (error) {
    console.log('🚀 ~ getCountries ~ error:', error)
  }
}
