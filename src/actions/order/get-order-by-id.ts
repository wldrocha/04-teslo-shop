'use server'
import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getOrderById = async (id: string) => {
  const session = await auth()

  if (!session?.user) {
    return {
      ok: false,
      message: 'User not found'
    }
  }

  try {
    const order = await prisma.order.findUnique({
      where: {
        id
      },
      include: {
        orderAddress: {
          include: {
            country: true
          }
        },
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                name: true,
                slug: true,
                ProductImage: {
                  select: {
                    url: true
                  },
                  take: 1
                }
              }
            }
          }
        }
      }
    })
    if (!order) {
      throw `${id} not found`
    }

    if (session.user.role === 'user' && session.user.id !== order.userId) {
      throw `${id} is not your order`
    }

    return {
      ok: true,
      order
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error with order',
      error
    }
  }
}
