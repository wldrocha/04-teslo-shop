'use client'
import { titleFont } from '@/config/font'
import { useUIStore } from '@/store'
import Link from 'next/link'
import { MdOutlineSearch, MdOutlineShoppingCart } from 'react-icons/md'

export const TopMenu = () => {
  const { openSideMenu } = useUIStore((state) => state)
  return (
    <nav className='flex px-5 justify-between items-center w-full'>
      {/* home button */}
      <div>
        <Link href='/'>
          <span className={`${titleFont.className} antialiased font-bold`}>Teslo</span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* center menu */}
      <div className='hidden sm:block'>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/men'>
          Hombres
        </Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/women'>
          Mujeres
        </Link>
        <Link className='m-2 p-2 rounded-md transition-all hover:bg-gray-100' href='/category/kids'>
          Niños
        </Link>
      </div>
      {/*  search cart menu*/}
      <div className='flex items-center'>
        <Link href='/search'>
          <MdOutlineSearch className='w-5 h-5' />
        </Link>
        <Link href='/cart'>
          <div className='relative'>
            <span className='absolute text-xs rounded-full px-1 font-bold -top-2 -right-2 bg-blue-700 text-white'>
              3
            </span>
            <MdOutlineShoppingCart className='w-5 h-5' />
          </div>
        </Link>

        <button onClick={openSideMenu} className='m-2 p-2 rounded-md transition-all hover:bg-gray-100'>menu</button>
      </div>
    </nav>
  )
}
