import { titleFont } from '@/config/font'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const PageNotFound = () => {
  return (
    <div className='flex flex-col flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle'>
      <div className='text-center px-5 mx-5'>
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className='font-semi-bold text-xl'>Whoops! we are sorry!</p>
        <p className='text-lg'>
          The page you are looking for does not exist.{' '}
          <Link className=' font-normal hover:underline transition-all' href='/'>
            Home
          </Link>
        </p>
      </div>
      <div className='pd-5 mx-5'>
        <Image src='/imgs/starman_750x750.png' alt='Starman' className='p-5 sm:p-0' width={550} height={550} />
      </div>
    </div>
  )
}
