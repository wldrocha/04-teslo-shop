'use client'

import { changeUserRole } from '@/actions'
import { User } from '@/interfaces'

interface Props {
  users: User[]
}

export const UsersTables = ({ users }: Props) => {
  return (
    <table className='min-w-full'>
      <thead className='bg-gray-200 border-b'>
        <tr>
          <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
            Email
          </th>
          <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
            Full name
          </th>
          <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
            Rol
          </th>
          <th scope='col' className='text-sm font-medium text-gray-900 px-6 py-4 text-left'>
            Update role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr
            key={`order-${user.id}`}
            className='bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100'
          >
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.email}</td>
            <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user.name}</td>
            <td className='text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap'>{user.role}</td>
            {/* <td className='flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap'>
              <MdOutlineCreditCard
                className={clsx({
                  'text-red-700': !user.isPaid,
                  'text-green-700': user.isPaid
                })}
              />
              <span
                className={clsx('mx-2', {
                  'text-red-700': !user.isPaid,
                  'text-green-700': user.isPaid
                })}
              >
                {user.isPaid ? 'Paid' : 'Pending'}
              </span>
            </td> */}
            <td className='text-sm text-gray-900 font-light px-6'>
              <select
                value={user.role}
                onChange={(e) => changeUserRole(user.id, e.target.value)}
                className='text-sm text-gray-900 w-full p-2'
              >
                <option value='admin'>Admin</option>
                <option value='user'>User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
