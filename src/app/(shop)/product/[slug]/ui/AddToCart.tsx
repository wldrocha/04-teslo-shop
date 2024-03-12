'use client'
import { Product, Size, CartProduct } from '@/interfaces'
import { QuantitySelector, SizeSelector } from '@/components'
import { use, useState } from 'react'
import { useCartStore } from '@/store'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState<number>(1)
  const [posted, setPosted] = useState(false)

  const AddToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.name,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0]
    }
    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      {/* size selector */}
      {posted && !size && <span className='mt-2 text-red-500 fade-in'>Please select size *</span>}
      <SizeSelector selectedSize={size} availableSizes={product.sizes} onSizeChanged={setSize} />

      {/* quantity selector */}
      <QuantitySelector quantity={quantity} quantityChanged={setQuantity} />
      {/* button */}
      <p className='text-lg mb-5'>$ {product.price}</p>
      <button className='btn-primary my-5' onClick={AddToCart}>
        Add to Cart
      </button>
    </>
  )
}
