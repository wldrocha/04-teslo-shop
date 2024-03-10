'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()
  console.log('🚀 ~ RegisterForm ~ errors:', errors)

  const onSubmit: SubmitHandler<FormInputs> = async ({ name, email, password }) => {}

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='email'>full name</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.name
        })}
        type='text'
        autoFocus
        {...register('name', { required: 'This field is required' })}
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

      <label htmlFor='email'>Email</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.email
        })}
        type='email'
        {...register('email', { required: 'This field is required', pattern: /^\S+@\S+$/i })}
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

      <label htmlFor='email'>Pass</label>
      <input
        className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
          'border-red-500': errors.password
        })}
        type='password'
        {...register('password', { required: 'This field is required' })}
      />
      {errors.name && <p className='text-red-500'>{errors.name.message}</p>}

      <button className='btn-primary' type='submit'>
        Register
      </button>

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/login' className='btn-secondary text-center'>
        Login
      </Link>
    </form>
  )
}
