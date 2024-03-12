'use server'
import prisma from '@/lib/prisma'

export const deleteUserAddress = async (userId: string) => {
  try {
    const deletedAddress = await prisma.userAddress.delete({
      where: { userId }
    })
    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error deleting user address'
    }
  }
}
