'use server'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

interface Args {
  orderId: string
  transactionId: string
}

export const setTransactionId = async ({ orderId, transactionId }: Args) => {
  const session = await auth()

  const userId = session?.user.id
  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in the app'
    }
  }

  try {
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId }
    })
    console.log(`🚀 ~ setTransactionId ~ order:`, order)

    if (!order) {
      return {
        ok: false,
        message: `Order with id ${orderId} not found`
      }
    }

    return {
      ok: true,
      message: 'Transaction ID set',
      order
    }
  } catch (error) {
    return {
      ok: false,
      message: 'You must be logged in the app',
      error
    }
  }

  //verify user session

  //   if()
}
