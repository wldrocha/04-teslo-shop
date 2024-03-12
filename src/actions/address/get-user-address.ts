'use server'
import prisma from '@/lib/prisma'

export const getUserAddress = async (userId: string) => {
  try {
    const address = await prisma.userAddress.findUnique({
      where: { userId }
    })

    if (!address) return null

    const { countryId, ...restAddress } = address

    return {
      country: countryId,
      ...restAddress
    }
  } catch (error) {
    console.log('🚀 ~ getUserAddress ~ error:', error)
  }
}
