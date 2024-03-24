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
  console.log(`🚀 ~ AdminProductPage ~ slug:`, slug)

  const [product, categories] = await Promise.all([getProductBySlug(slug), getAllCategories()])
  // console.log(`🚀 ~ AdminProductPage ~ product:`, product)

  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = slug === 'new' ? 'Nuevo producto' : 'Editar producto'
  return (
    <>
      <Title title={title} />

      <ProductForm product={product ?? {}} categories={categories} />
    </>
  )
}
