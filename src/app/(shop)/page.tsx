import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

interface HomeProps {
  searchParams: {
    page?: number
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }
  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
         totalPages={totalPages} />
    </>
  )
}
