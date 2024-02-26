import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'

interface HomeProps {
  searchParams: {
    page?: number
  }
}

export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string) : 1
  const { products } = await getPaginatedProductsWithImages({ page })
  return (
    <>
      <Title title='Shop' subtitle='All products' className='mb-2' />
      <ProductGrid products={products} />
    </>
  )
}
