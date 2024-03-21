'use client'

import clsx from 'clsx'
import { MdCreditCard } from 'react-icons/md'

interface Props {
  isPaid: boolean
}

export const OrderStatus = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx('flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5', {
        'bg-red-500': !isPaid,
        'bg-green-700': isPaid
      })}
    >
      <MdCreditCard size={30} />
      <span className='mx-2'>{isPaid ? 'Paid' : 'Pending'}</span>
    </div>
  )
}
