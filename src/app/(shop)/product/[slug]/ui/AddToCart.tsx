'use client'
import { Product, Size } from '@/interfaces'
import { QuantitySelector, SizeSelector } from '@/components'
import { useState } from 'react'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  return (
    <>
      {/* size selector */}
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />

      {/* quantity selector */}
      <QuantitySelector quantity={1} />
      {/* button */}
      <p className='text-lg mb-5'>$ {product.price}</p>
      <button className='btn-primary my-5'>Add to Cart</button>
    </>
  )
}
