'use client'
import { useEffect, useState } from 'react'
import { titleFont } from '@/config/font'
import { getStockBySlug } from '@/actions/products/get-stock-by-slug'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    getStock()
  }, [])

  const getStock = async () => {
    const inStock = await getStockBySlug(slug)
    setStock(inStock)
    setIsLoading(false)
  }

  return (
    <>
      {!isLoading ? (
        <h2 className={`${titleFont.className} antialiased font-bold text-xl`}>Stock: {stock}</h2>
      ) : (
        <h2 className={`${titleFont.className} antialiased font-bold text-lg bg-gray-300 animate-pulse w-6/12 h-12`} />
      )}
    </>
  )
}
