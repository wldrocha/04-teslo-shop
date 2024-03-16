'use client'
import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import React, { useEffect, useState } from 'react'

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false)

  const address = useAddressStore((state) => state.address)

  const { subTotal, taxes, total, itemsInCart } = useCartStore((state) => state.getSummaryInformation())

  useEffect(() => {
    setLoaded(true)
  }, [])

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

      <div className='mt-5 mb-2 w-full'>
        <button
          // href='/checkout/123'
          className='flex btn-primary justify-center'
        >
          Order
        </button>
      </div>
    </div>
  )
}
