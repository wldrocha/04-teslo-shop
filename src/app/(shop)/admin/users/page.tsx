// https://tailwindcomponents.com/component/hoverable-table
import { getPaginatedUsers } from '@/actions'
import { Title } from '@/components'

import { redirect } from 'next/navigation'
import { UsersTables } from './ui/UsersTables'

export default async function AllUsersPage() {
  const { ok, users = [] } = await getPaginatedUsers()
  console.log(`🚀 ~ AllUsersPage ~ ok:`, ok)

  if (!ok) {
    // redirect('/auth/login')
  }

  return (
    <>
      <Title title='Users maintence' />

      <div className='mb-10'>
        <UsersTables users={users} />
      </div>
    </>
  )
}
