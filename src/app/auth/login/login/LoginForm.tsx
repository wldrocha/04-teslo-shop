'use client'

import { useEffect } from 'react'
import { authenticate } from '@/actions'
import clsx from 'clsx'
import Link from 'next/link'
import { useFormState, useFormStatus } from 'react-dom'
import { MdInfoOutline } from 'react-icons/md'
import { useRouter } from 'next/navigation'

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)
  const router = useRouter()

  useEffect(() => {
    if (state === 'Success') {
      router.replace('/')
    }
  }, [state])

  return (
    <form action={dispatch} className='flex flex-col'>
      <label htmlFor='email'>Email</label>
      <input className='px-5 py-2 border bg-gray-200 rounded mb-5' name='email' type='email' />

      <label htmlFor='pass'>Pass</label>
      <input className='px-5 py-2 border bg-gray-200 rounded mb-5' name='password' type='password' />

      <div className='flex py-2 justify-center space-x-1' aria-live='polite' aria-atomic='true'>
        {state !== undefined && state !== 'Success' && (
          <>
            <MdInfoOutline className='h-5 w-5 text-red-500' />
            <p className='text-sm text-red-500'>{state}</p>
          </>
        )}
      </div>
      {/* <button type='submit' className='btn-primary'>
        Login
      </button> */}

      <LoginButton />

      {/* divisor l ine */}
      <div className='flex items-center my-5'>
        <div className='flex-1 border-t border-gray-500'></div>
        <div className='px-2 text-gray-800'>O</div>
        <div className='flex-1 border-t border-gray-500'></div>
      </div>

      <Link href='/auth/new-account' className='btn-secondary text-center'>
        Create new account
      </Link>
    </form>
  )
}

function LoginButton() {
  const { pending } = useFormStatus()

  return (
    <button
      className={clsx({ 'btn-primary': !pending, 'btn-disabled': pending })}
      type='submit'
      disabled={pending}
      aria-disabled={pending}
    >
      Log in
    </button>
  )
}
