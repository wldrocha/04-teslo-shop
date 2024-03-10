'use client'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const OrderSummary = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { subTotal, taxes, total, itemsInCart } = useCartStore((state) => state.getSummaryInformation())
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  }
  return (
    <div className='bg-white rounded-xl shadow-xl p-7'>
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
        <Link className='flex btn-primary justify-center' href='/checkout'>
          Checkout
        </Link>
      </div>
    </div>
  )
}
