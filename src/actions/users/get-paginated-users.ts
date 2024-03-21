'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'

export const getPaginatedUsers = async () => {
  const session = await auth()
  console.log(`🚀 ~ getPaginatedUsers ~ session:`, session)

  if (session.user.role !== 'admin') {
    return {
      ok: false,
      message: 'you should be an admin to access this page'
    }
  }

  const users = await prisma.user.findMany({
    orderBy: {
      name: 'desc'
    }
  })

  if (!users) {
    return {
      ok: false,
      message: 'No users found'
    }
  }

  return {
    ok: true,
    users
  }
}
