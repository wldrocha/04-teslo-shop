'use client'
import { generatePagination } from '@/utils'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { MdOutlineChevronLeft, MdOutlineChevronRight } from 'react-icons/md'

interface Props {
  totalPages: number
  // currentPage: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1

  const currentPage = isNaN(+pageString) ? 1 : +pageString

  const allPages = generatePagination(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') {
      return `${pathname}${params.toString()}`
    }
    if (+pageNumber <= 0) {
      return `${pathname}`
    }
    if (+pageNumber > totalPages) {
      return `${pathname}${params.toString()}`
    }
    params.set('page', pageNumber.toString())

    return `${pathname}?${params.toString()}`
  }
  return (
    <div className='flex justify-center text-center mt-10 mb-32'>
      <nav>
        <ul className='flex list-style-none'>
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage - 1)}
            >
              <MdOutlineChevronLeft size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li className='page-item active' key={`page-${page}-${index}`}>
              <Link
                className={clsx(
                  'page-link relative block py-1.5 px-3 rounded border-0  outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-blue-600 hover:text-white focus:shadow-none',
                  {
                    'bg-blue-600 shadow-sm text-white hover:text-white hover:bg-blue-400': page === currentPage
                  }
                )}
                href={createPageUrl(page)}
              >
                {page} <span className='visually-hidden'></span>
              </Link>
            </li>
          ))}
          <li className='page-item'>
            <Link
              className='page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none'
              href={createPageUrl(currentPage + 1)}
            >
              <MdOutlineChevronRight size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}
