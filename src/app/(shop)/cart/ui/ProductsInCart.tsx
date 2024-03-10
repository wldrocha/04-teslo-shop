'use client'
import Image from 'next/image'
import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)

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
            <Link href={`/product/${product.slug}`}>{product.title}</Link>
            <p>{product.price}</p>
            <QuantitySelector quantity={3} quantityChanged={(value) => console.log(value)} />
            <button className='underline'>Remove</button>
          </div>
        </div>
      ))}
    </>
  )
}
