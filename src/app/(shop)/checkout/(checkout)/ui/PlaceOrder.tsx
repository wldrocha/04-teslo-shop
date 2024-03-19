'use client'
import { placeOrder } from '@/actions'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)

  const address = useAddressStore((state) => state.address)
  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  const { subTotal, taxes, total, itemsInCart } = useCartStore((state) => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)

    const productToORder = cart.map((product) => {
      return {
        productId: product.id,
        quantity: product.quantity,
        size: product.size
      }
    })

    const response = await placeOrder(productToORder, address)
    if (!response.ok) {
      setIsPlacingOrder(false)
      setErrorMsg(response.message)
      return
    }
    clearCart()
    router.replace(`/orders/${response.order?.id}`)
  }

  if (!loaded) {
    return <p>Loading...</p>
  }

  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
      <h2 className='text-2xl mb-2'>Address shipping</h2>
      <div className='mb-5'>
        <p>{`${address.firstName} ${address.lastName}`}</p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.zip}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>
      <hr className='w-full h-0.5 rounded bg-gray-200 mb-5' />
      <h2 className='text-2xl mb-2'>Resume</h2>
      <div className='grid grid-cols-2'>
        <span>Products quantity</span>
        <span className='text-right'>{itemsInCart === 1 ? '1 article' : `${itemsInCart} articles`}</span>
        <span>Subtotal</span>
        <span className='text-right'>{currencyFormat(subTotal)}</span>
        <span>Impuestos (15%)</span>
        <span className='text-right'>{currencyFormat(taxes)}</span>
        <span className='mt-5 text-2xl '>Total</span>
        <span className='mt-5 text-2xl text-right'>{currencyFormat(total)}</span>
      </div>
      <p className=' text-red-500'>{errorMsg}</p>
      <div className='mt-5 mb-2 w-full'>
        <button
          // href='/checkout/123'
          onClick={onPlaceOrder}
          className={clsx({ 'btn-primary': !isPlacingOrder, 'btn-disabled': isPlacingOrder })}
        >
          Order
        </button>
      </div>
    </div>
  )
}
