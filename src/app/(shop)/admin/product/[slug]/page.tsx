import { getAllCategories, getProductBySlug } from '@/actions'
import { Title } from '@/components'
import { redirect } from 'next/navigation'
import { ProductForm } from './ui/ProductForm'

interface Props {
  params: {
    slug: string
  }
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params

  const [product, categories] = await Promise.all([getProductBySlug(slug), getAllCategories()])

  if (!product) {
    redirect('/admin/products')
  }
  return (
    <>
      <Title title={product.name ?? ''} />

      <ProductForm product={product} categories={categories} />
    </>
  )
}
