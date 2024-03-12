'use client'

import { useForm } from 'react-hook-form'
import clsx from 'clsx'
import { Country } from '@/interfaces'
import { useAddressStore } from '@/store'
import { useEffect } from 'react'

interface FormInputs {
  name: string
  lastName: string
  address: string
  address2: string
  zip: string
  city: string
  country: string
  phone: string
  rememberAddress: boolean
}
interface Props {
  countries: Country[]
}
export const AddressForm = ({ countries }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset
  } = useForm<FormInputs>({
    defaultValues: {
      // todo: set default values
    }
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const setAddress = useAddressStore((state) => state.setAddress)
  const address = useAddressStore((state) => state.address)

  useEffect(() => {
    if (address.name) {
      reset(address)
    }
  }, [address])

  const onSubmit = (data: FormInputs) => {
    setAddress(data)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 gap-2 sm:gap-5 sm:grid-cols-2'>
      <div className='flex flex-col mb-2'>
        <label>Name</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('name', { required: true })} />
      </div>

      <div className='flex flex-col mb-2'>
        <label>Last name</label>
        <input
          type='text'
          className='p-2 border rounded-md bg-gray-200'
          {...register('lastName', { required: true })}
        />
      </div>

      <div className='flex flex-col mb-2'>
        <label>Address</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('address', { required: true })} />
      </div>

      <div className='flex flex-col mb-2'>
        <label>Address 2 (optional)</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('address2')} />
      </div>

      <div className='flex flex-col mb-2'>
        <label>ZIP</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('zip', { required: true })} />
      </div>

      <div className='flex flex-col mb-2'>
        <label>City</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('city', { required: true })} />
      </div>

      <div className='flex flex-col mb-2'>
        <label>Country</label>
        <select className='p-2 border rounded-md bg-gray-200' {...register('country', { required: true })}>
          <option value=''>[ Seleccione ]</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className='flex flex-col mb-2'>
        <label>Phone</label>
        <input type='text' className='p-2 border rounded-md bg-gray-200' {...register('phone', { required: true })} />
      </div>
      <div className='inline-flex items-center'>
        <label className='relative flex cursor-pointer items-center rounded-full p-3' htmlFor='checkbox'>
          <input
            type='checkbox'
            className="before:content[''] peer relative 
            h-5 w-5 cursor-pointer appearance-none rounded-md 
            border border-blue-gray-200 transition-all 
            before:absolute before:top-2/4 before:left-2/4 
            before:block before:h-12 before:w-12 
            before:-translate-y-2/4 before:-translate-x-2/4 
            before:rounded-full before:bg-blue-gray-500 
            before:opacity-0 before:transition-opacity '
            checked:border-blue-500 checked:bg-blue-500 
            checked:before:bg-blue-500 hover:before:opacity-10"
            id='checkbox'
            {...register('rememberAddress')}
          />
          <div className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-3.5 w-3.5'
              viewBox='0 0 20 20'
              fill='currentColor'
              stroke='currentColor'
              strokeWidth='1'
            >
              <path
                fillRule='evenodd'
                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
        </label>
        <span>Remember address?</span>
      </div>

      <div className='flex flex-col mb-2 sm:mt-10'>
        <button
          disabled={!isValid}
          type='submit'
          //  className='btn-primary flex w-full sm:w-1/2 justify-center '
          className={clsx({ 'btn-primary': isValid, 'btn-disabled': !isValid })}
        >
          Next
        </button>
      </div>
    </form>
  )
}
