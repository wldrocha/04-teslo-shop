import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

interface HomeProps {
  searchParams: {
    page?: number
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const { products } = await getPaginatedProductsWithImages({ page })

  if (products.length === 0) {
    redirect('/')
  }
  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  )
}
