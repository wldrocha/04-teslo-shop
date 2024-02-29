import { titleFont } from '@/config/font'
import Link from 'next/link'

export const Footer = () => {
  return (
    <div className='w-full flex justify-center text-xs mb-10'>
      <Link className={`${titleFont.className} antialiased font-bold`} href='/'>
        <span>Teslo</span>
        <span>| Shop</span>
        <span>© 2023</span>
      </Link>
      <Link href='/' className='mx-3'>
        Privacy
      </Link>
      <Link href='/' className='mx-3'>
        locations
      </Link>
    </div>
  )
}
