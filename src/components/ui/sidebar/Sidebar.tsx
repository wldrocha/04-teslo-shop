'use client'
import clsx from 'clsx'
import {
  MdClose,
  MdLogin,
  MdOutlinePersonOutline,
  MdOutlineSearch,
  MdLogout,
  MdPlaylistAddCheckCircle,
  MdOutlineCheckroom,
  MdPeopleOutline
} from 'react-icons/md'
import { SideBarItem } from './SideBarItem'
import { useUIStore } from '@/store'
import { logout } from '@/actions'
import { useSession } from 'next-auth/react'

const loginOption = {
  icon: <MdLogin size={30} />,
  title: 'Login',
  href: '/auth/login'
}

const logoutOption = {
  icon: <MdLogout size={30} />,
  title: 'Exit',
  onClick: () => logout()
}

const normalOptions = [
  {
    icon: <MdOutlinePersonOutline size={30} />,
    title: 'Perfil',
    href: '/profile'
  },
  {
    icon: <MdPlaylistAddCheckCircle size={30} />,
    title: 'Ordenes',
    href: '/orders'
  }
]

const adminOptions = [
  {
    icon: <MdOutlineCheckroom size={30} />,
    title: 'Products',
    href: '/'
  },
  {
    icon: <MdPlaylistAddCheckCircle size={30} />,
    title: 'Orders',
    href: '/'
  },
  {
    icon: <MdPeopleOutline size={30} />,
    title: 'Users',
    href: '/'
  }
]

export const Sidebar = () => {
  const { isSideMenuOpen, closeSideMenu } = useUIStore((state) => state)

  const { data: session } = useSession()

  const isAuthenticated = !!session?.user
  const isAdmin = session?.user?.role === 'admin'

  return (
    <div className=''>
      {isSideMenuOpen && (
        <>
          <div className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 ' />
          {/* blur */}
          {/* background black */}
          <div
            onClick={closeSideMenu}
            className='fade in  fixed top-0 left-0  w-screen h-screen z-10 backdrop-filter backdrop-blur-sm'
          />
        </>
      )}
      {/* nav */}
      <nav
        className={clsx(
          'fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300',
          { 'translate-x-full': !isSideMenuOpen }
        )}
      >
        <MdClose onClick={closeSideMenu} size={50} className='absolute top-5 right-5 cursor-pointer' />
        <div className='relative mt-14'>
          <MdOutlineSearch size={20} className='absolute top-2 left-2' />
          <input
            type='text'
            placeholder='Buscar...'
            className='w-full bg-gray-50 rounded pl-10 py-1 pr-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500 duration-100'
          />
        </div>
        {/* Option menu */}

        {isAuthenticated && (
          <>
            {normalOptions.map((normalOption, index) => (
              <SideBarItem key={index} closeSideMenu={closeSideMenu} {...normalOption} />
            ))}
            <SideBarItem closeSideMenu={closeSideMenu} {...logoutOption} />
          </>
        )}
        {!isAuthenticated && <SideBarItem closeSideMenu={closeSideMenu} {...loginOption} />}

        <div className='w-full h-px bg-gray-200 my-10' />

        {/* Option admin menu */}
        {isAuthenticated &&
          isAdmin &&
          adminOptions.map((adminOption, index) => (
            <SideBarItem key={index} closeSideMenu={closeSideMenu} {...adminOption} />
          ))}
      </nav>
    </div>
  )
}
