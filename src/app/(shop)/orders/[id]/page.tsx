import { getOrderById } from '@/actions'
import { Title } from '@/components'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import Image from 'next/image'
import { MdCreditCard } from 'react-icons/md'

interface Props {
  params: {
    id: string
  }
}

export default async function OrderParticularPage({ params }: Props) {
  const { id } = params

  // todo call to server action
  const { ok, data: orderInfo } = await getOrderById(id)

  if (!ok) {
    return <div>Order not found</div>
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col w-[1000px]'>
        <Title title={`Order # ${id.split('-').at(1)}`} />
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {/* cart */}
          <div className='flex flex-col mt-5'>
            <div
              className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
                'bg-red-500': !orderInfo?.isPaid,
                'bg-green-700': orderInfo?.isPaid
              })}
            >
              <MdCreditCard size={30} />
              <span className='mx-2'>{orderInfo?.isPaid ? 'Paid' : 'Pending'}</span>
            </div>

            {/* Items */}
            {orderInfo?.OrderItem?.map((product) => (
              <div key={product.product.slug} className='flex mb-5'>
                <Image
                  src={`/products/${product.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  alt={product.product.slug}
                  className='mr-5 rounded'
                />
                <div>
                  <p>{product.product.name}</p>
                  <p>
                    {currencyFormat(product.price)} x {product.quantity}
                  </p>
                  <p>Subtotal: {currencyFormat(product.price * product.quantity)}</p>
                  {/* <button className='underline'>Remove</button> */}
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className='bg-white rounded-xl shadow-xl p-7'>
            <h2 className='text-2xl mb-2'>Address shipping</h2>
            <div className='mb-5'>
              <p>
                {orderInfo?.orderAddress?.firstName} {orderInfo?.orderAddress?.lastName}
              </p>
              <p>{orderInfo?.orderAddress?.address}</p>
              <p>{orderInfo?.orderAddress?.address2}</p>
              <p>{orderInfo?.orderAddress?.zip}</p>
              <p>
                {orderInfo?.orderAddress?.city} {orderInfo?.orderAddress?.country?.name}
              </p>
              <p>{orderInfo?.orderAddress?.phone}</p>
            </div>
            <hr className='w-full h-0.5 rounded bg-gray-200 mb-5' />
            <h2 className='text-2xl mb-2'>Resume</h2>
            <div className='grid grid-cols-2'>
              <span>Products quantity</span>
              <span className='text-right'>
                {orderInfo?.itemsInOrder === 1 ? '1 article' : `${orderInfo?.itemsInOrder} articles`}
              </span>
              <span>Subtotal</span>
              <span className='text-right'>{currencyFormat(orderInfo!.subTotal)}</span>
              <span>Impuestos (15%)</span>
              <span className='text-right'>{currencyFormat(orderInfo!.tax)}</span>
              <span className='mt-5 text-2xl '>Total</span>
              <span className='mt-5 text-2xl text-right'>{currencyFormat(orderInfo!.total)}</span>
            </div>

            <div className='mt-5 mb-2 w-full'>
              <div
                className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
                  'bg-red-500': !orderInfo?.isPaid,
                  'bg-green-700': orderInfo?.isPaid
                })}
              >
                <MdCreditCard size={30} />
                <span className='mx-2'>{orderInfo?.isPaid ? 'Paid' : 'Pending'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
