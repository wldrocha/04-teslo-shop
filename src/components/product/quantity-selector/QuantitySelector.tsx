'use client'
import { useState } from 'react'
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'

interface Props {
  quantity: number
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [count, setCount] = useState(quantity)

  const onQuantityChange = (value: number) => {
    if (count + value < 1) return
    setCount(count + value)
  }

  return (
    <div className='flex align-middle'>
      <button onClick={() => onQuantityChange(-1)}>
        <MdRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-200 text-center'>{count}</span>
      <button onClick={() => onQuantityChange(+1)}>
        <MdAddCircleOutline size={30} />
      </button>
    </div>
  )
}
