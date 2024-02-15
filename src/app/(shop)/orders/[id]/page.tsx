import { Title } from '@/components'
import { initialData } from '@/seed/seed'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { MdCreditCard } from 'react-icons/md'

interface Props {
  params: {
    id: string
  }
}

const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]]

export default function OrderParticularPage({ params }: Props) {
  const { id } = params

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order # ${id}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <div
              className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
                'bg-red-500': false,
                'bg-green-700': true
              })}
            >
              <MdCreditCard size={30} />
              <span className='mx-2'>Pendiente</span>
              <span className='mx-2'>Pagada</span>
            </div>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  alt={product.title}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{product.title}</p>
                  <p>{product.price} x 3</p>
                  <p>Subtotal: {product.price * 3}</p>
                  <button className='underline'>Remove</button>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Address shipping</h2>
            <div className='mb-5'>
              <p>Fernando Herrera</p>
              <p>Av. siempre viva 123</p>
              <p>col centro</p>
              <p>123 123 123</p>
            </div>
            <hr className='w-full h-0.5 rounded bg-gray-200 mb-5' />
            <h2 className='text-2xl mb-2'>Resume</h2>
            <div className='grid grid-cols-2'>
              <span>Products quantity</span>
              <span className='text-right'>3 articles</span>
              <span>Subtotal</span>
              <span className='text-right'>$100</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>$100</span>
              <span className='mt-5 text-2xl '>Total</span>
              <span className='mt-5 text-2xl text-right'>$100</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
                  'bg-red-500': false,
                  'bg-green-700': true
                })}
              >
                <MdCreditCard size={30} />
                <span className='mx-2'>Pendiente</span>
                <span className='mx-2'>Pagada</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
