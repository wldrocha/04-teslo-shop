'use client'
import { useState } from 'react'

import { Product } from '@/interfaces'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className='rounded-md overflow-hidden fade-in'>
      <Link href={`/product/${product.slug}`}>
        <Image
          className='w-full object-cover rounded'
          onMouseEnter={() => setDisplayImage(product.images[0])}
          onMouseLeave={() => setDisplayImage(product.images[1])}
          src={`/products/${displayImage}`}
          alt={product.title}
          width={500}
          height={500}
        />
      </Link>
      <div className='p-4 flex flex-col'>
        <Link className=' hover:text-blue-600' href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className=' font-bold'>{product.price}</span>
      </div>
    </div>
  )
}
