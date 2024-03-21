'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'you should be an admin to access this page'
    }
  }

  try {
    const newRole = role === 'admin' ? 'admin' : 'user'

    const user = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        role: newRole
      }
    })

    revalidatePath('/admin/users')

    return {
      ok: true
    }
  } catch (error) {
    console.log(`🚀 ~ changeUserRole ~ error:`, error)
    return {
      ok: false,
      message: 'not able to change user role'
    }
  }
}
