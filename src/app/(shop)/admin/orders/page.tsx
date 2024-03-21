// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedOrders } from '@/actions'
import { Title } from '@/components'
import clsx from 'clsx'

import Link from 'next/link'
import { redirect } from 'next/navigation'

import { MdOutlineCreditCard } from 'react-icons/md'

export default async function AllOrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders()

  if (!ok) {
    redirect('/auth/login')
  }

  return (
    <>
      <Title title='All orders' />

      <div className='mb-10'>
        <table className='min-w-full'>
          <thead className='bg-gray-200 border-b'>
            <tr>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                #ID
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Nombre completo
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Estado
              </th>
              <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={`order-${order.id}`}
                className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
              >
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>
                  {order.id.split('-').at(-1)}
                </td>
                <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  {order.orderAddress?.firstName} {order.orderAddress?.lastName}
                </td>
                <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
                  <MdOutlineCreditCard
                    className={clsx({
                      'text-red-700': !order.isPaid,
                      'text-green-700': order.isPaid
                    })}
                  />
                  <span
                    className={clsx('mx-2', {
                      'text-red-700': !order.isPaid,
                      'text-green-700': order.isPaid
                    })}
                  >
                    {order.isPaid ? 'Paid' : 'Pending'}
                  </span>
                </td>
                <td className='text-sm text-gray-900 font-light px-6 '>
                  <Link href={`/orders/${order.id}`} className='hover:underline'>
                    View order
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
