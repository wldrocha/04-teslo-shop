import Link from 'next/link'

interface SideBarItemProps {
  icon: React.ReactNode
  title: string
  href: string
}

export const SideBarItem = ({ icon, title, href }: SideBarItemProps) => {
  return (
    <Link href={href} className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all'>
      {icon}
      <span className='ml-3 text-xl'>{title}</span>
    </Link>
  )
}
