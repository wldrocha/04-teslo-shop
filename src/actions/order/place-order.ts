'use server'

import { auth } from '@/auth.config'
import { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productsInOrder: ProductToOrder[], address: Address) => {
  const session = await auth()
  const userId = session?.user.id

  //verify user session
  if (!userId) {
    return {
      ok: false,
      message: 'You must be logged in the app'
    }
  }
  const products = await prisma.product.findMany({
    where: { id: { in: productsInOrder.map((p) => p.productId) } }
  })

  //calculate amount
  const itemsInOrder = productsInOrder.reduce((count, p) => count + p.quantity, 0)
  // tax, total and subtotal

  const { subTotal, tax, total } = productsInOrder.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((p) => p.id === item.productId)
      if (!product) throw new Error(`${item.productId} not found - 500`)

      const subTotal = product.price * productQuantity

      totals.subTotal += subTotal
      totals.tax += subTotal * 0.15
      totals.total += subTotal * 1.15

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 }
  )

  //create transaction

  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. update products stock

    // 2. create order - header - details
    const order = await tx.order.create({
      data: {
        userId,
        itemsInOrder,
        subTotal,
        tax,
        total,
        isPaid: false,
        OrderItem: {
          createMany: {
            data: productsInOrder.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price: products.find((pr) => pr.id === p.productId)?.price ?? 0
            }))
          }
        }
      }
    })

    // validation if price is 0
    if (order.total === 0) {
      throw new Error('Order total is 0')
    }

    // 3. create order address
    const { country, ...restAddress } = address

    const orderAddress = await tx.orderAddress.create({
      data: {
        orderId: order.id,
        countryId: country,
        ...restAddress
      }
    })

    // 4.

    return {
      order,
      orderAddress
    }
  })
}
