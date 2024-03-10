import { Title } from '@/components'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ProductsInCart } from './ui/ProductsInCart'
import { OrderSummary } from './ui/OrderSummary'

export default function CartPage() {
  
  // if (productsInCart.length === 0) {
  //   redirect('/empty')
  // }
  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title='Cart' />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <span className='text-xl'>Add more items</span>
            <Link href='/' className='underline mb-5'>
              Continue to buy
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* Checkout */}
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
