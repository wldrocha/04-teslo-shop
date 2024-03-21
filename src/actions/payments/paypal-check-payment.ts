'use server'

import prisma from '@/lib/prisma'
import { PaypalOrderStatusResponse } from '@/interfaces'
import { revalidatePath } from 'next/cache'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPaypalBearerToken()

  if (!authToken) {
    return { ok: false, error: 'Failed to get PayPal bearer token' }
  }

  const resp = await verifyPaypalPayment(paypalTransactionId, authToken)

  if (!resp) {
    return {
      ok: false,
      error: 'Failed to verify PayPal payment'
    }
  }

  const { status, purchase_units } = resp

  const { invoice_id: orderId } = purchase_units[0]

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      error: 'Payment not completed on Paypal'
    }
  }

  try {
    await prisma.order.update({
      where: {
        id: orderId
      },
      data: {
        isPaid: true,
        paidAt: new Date()
      }
    })

    // revalidate path
    revalidatePath(`/orders/${orderId}`)

    return true
  } catch (error) {
    console.log(`🚀 ~ paypalCheckPayment ~ error:`, error)
    return {
      ok: false,
      error: '500 Payment not completed'
    }
  }

  // const { amount } = purchase_units[0] todo
}

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oAuth2URl = process.env.PAYPAL_OAUTH_URL ?? ''

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`, 'utf-8').toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded
  }

  try {
    const result = await fetch(oAuth2URl, { ...requestOptions, cache: 'no-store' }).then((r) => r.json())
    return result.access_token
  } catch (error) {
    console.log('error', error)
    return null
  }
}

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`
  const myHeaders = new Headers()
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders
  }

  try {
    const resp = await fetch(paypalOrderUrl, { ...requestOptions, cache: 'no-store' }).then((r) => r.json())

    return resp
  } catch (error) {
    console.log(`🚀 ~ verifyPaypalPayment ~ error:`, error)
    return null
  }
}
