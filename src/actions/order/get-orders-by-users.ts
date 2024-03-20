'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrdersBySessionUser = async () => {
  const session = await auth()
  if (!session?.user) {
    return {
      ok: false,
      message: 'User not authenticated'
    }
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id
    },
    include: {
      orderAddress: {
        select: {
          firstName: true,
          lastName: true
        }
      }
    }
  })

  return {
    ok: true,
    orders
  }
}
