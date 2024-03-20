'use client'
import Image from 'next/image'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import { currencyFormat } from '@/utils'

export const ProductsInCart = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { cart: productsInCart } = useCartStore((state) => state)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className='flex mb-5'>
          <Image
            src={`/products/${product.image}`}
            width={100}
            height={100}
            alt={product.title}
            className='mr-5 rounded'
          />
          <div>
            <span>
              {product.title} - {product.size} ({product.quantity})
            </span>
            <p className=' font-bold'>{currencyFormat(product.price * product.quantity)}</p>
          </div>
        </div>
      ))}
    </>
  )
}
