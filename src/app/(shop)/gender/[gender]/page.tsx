export const revalidate = 60 // revalidate every 60 seconds

import { ProductGrid, Title, Pagination } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'
import { redirect } from 'next/navigation'

interface Props {
  params: {
    gender: string
  }
  searchParams: {
    page?: number
  }
}
type CategoryInfo = {
  title: string
  subtitle: string
}

const labelsTitle: Record<string, CategoryInfo> = {
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

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params

  const page = searchParams.page ? parseInt(searchParams.page as unknown as string) : 1

  const { products, totalPages } = await getPaginatedProductsWithImages({ page, gender })

  if (products.length === 0) {
    redirect('/')
  }

  return (
    <>
      <Title title={labelsTitle[gender].title} subtitle={labelsTitle[gender].subtitle} className='mb-2' />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  )
}
