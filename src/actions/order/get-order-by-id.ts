'use server'
import prisma from '@/lib/prisma'

export const getOrderById = async (orderId: string) => {
  //   console.log(`🚀 ~ getOrderById ~ orderId:`, orderId)
  const products = await prisma.order.findUnique({
    where: {
      id: orderId
    },
    include: {
      OrderItem: {
        include: {
          product: {
            include: {
              ProductImage: true
            }
          }
        }
      },
      orderAddress: {
        include: {
          country: true
        }
      }
    }
  })
  if (!products) {
    return {
      ok: false,
      message: 'Order not found'
    }
  }
  //   console.log(`🚀 ~ getOrderById ~ products:`, products)
  return {
    ok: true,
    data: products
  }
}
