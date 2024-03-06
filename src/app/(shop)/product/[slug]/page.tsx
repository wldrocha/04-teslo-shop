export const revalidate = 60 * 60
import { getProductBySlug } from '@/actions'
import { ProductMobileSlideShow, ProductSlideShow, QuantitySelector, SizeSelector, StockLabel } from '@/components'
import { titleFont } from '@/config/font'
// import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)
  if (!product) {
    notFound()
  }
  return (
    <div className='mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3'>
      {/* slideshow */}
      <div className='col-span-1 md:col-span-2'>
        {/* mobile slideshow */}
        <ProductMobileSlideShow images={product.images} title={product.name} className='block md:hidden' />
        {/* Desktop slideshow*/}
        <ProductSlideShow images={product.images} title={product.name} className='hidden md:block' />
      </div>
      {/* Product details */}
      <div className='col-span-1 px-5'>
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>{product.name}</h1>

        {/* size selector */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />

        {/* quantity selector */}
        <QuantitySelector quantity={1} />
        {/* button */}
        <p className='text-lg mb-5'>$ {product.price}</p>
        <button className='btn-primary my-5'>Add to Cart</button>
        <h3 className='font-bold text-sm'>Description</h3>
        <p className='font-light'>{product.description}</p>
      </div>
    </div>
  )
}
