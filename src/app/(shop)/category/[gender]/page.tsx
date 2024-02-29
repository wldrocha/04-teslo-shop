import { ProductGrid, Title } from '@/components'
import { notFound } from 'next/navigation'
import { initialData } from '@/seed/seed'
import { Category } from '@/interfaces'

const allProducts = initialData.products

interface Props {
  params: {
    id: Category
  }
}
type CategoryInfo = {
  title: string
  subtitle: string
}

const labelsTitle: Record<Category, CategoryInfo> = {
  men: {
    title: 'Men articles',
    subtitle: 'For Men'
  },
  women: {
    title: 'Women articles',
    subtitle: 'For Women'
  },
  kid: {
    title: 'Kids articles',
    subtitle: 'For Kids'
  },
  unisex: {
    title: 'Unisex articles',
    subtitle: 'For Unisex'
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params

  const products = allProducts.filter((product) => product.gender === id)
  if (products.length < 1) {
    notFound()
  }

  return (
    <>
      <Title title={labelsTitle[id].title} subtitle={labelsTitle[id].subtitle} className='mb-2' />
      <ProductGrid products={products} />
    </>
  )
}
