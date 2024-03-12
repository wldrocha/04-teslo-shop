'use client'
import { MdAddCircleOutline, MdRemoveCircleOutline } from 'react-icons/md'

interface Props {
  quantity: number
  quantityChanged: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, quantityChanged }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return
    quantityChanged(quantity + value)
  }

  return (
    <div className='flex align-middle'>
      <button onClick={() => onValueChanged(-1)}>
        <MdRemoveCircleOutline size={30} />
      </button>
      <span className='w-20 mx-3 px-5 bg-gray-200 text-center'>{quantity}</span>
      <button onClick={() => onValueChanged(+1)}>
        <MdAddCircleOutline size={30} />
      </button>
    </div>
  )
}
