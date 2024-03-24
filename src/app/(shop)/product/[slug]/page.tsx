export const revalidate = 60 * 60
import { getProductBySlug } from '@/actions'
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from '@/components'
import { titleFont } from '@/config/font'
import { Metadata, ResolvingMetadata } from 'next'
// import { initialData } from '@/seed/seed'
import { notFound } from 'next/navigation'
import { AddToCart } from './ui/AddToCart'

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const product = await getProductBySlug(slug)

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  return {
    title: product?.name ?? 'Product not found',
    description: product?.description ?? '',
    openGraph: {
      title: product?.name ?? 'Product not found',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`]
    }
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
      <AddToCart product={{ ...product, title: product.name }} />
    </div>
  )
}
