'use client'
import Image from 'next/image'
import { ProductImage, QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export const ProductsInCart = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { cart: productsInCart, updateProductQuantity, removeProductFromCart } = useCartStore((state) => state)

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
          <ProductImage src={product.image} width={100} height={100} alt={product.title} className='mr-5 rounded' />
          <div>
            <Link href={`/product/${product.slug}`}>{product.title}</Link>
            <p>{product.size}</p>
            <p>$ {product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              quantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />
            <button className='underline' onClick={() => removeProductFromCart(product)}>
              Remove
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
