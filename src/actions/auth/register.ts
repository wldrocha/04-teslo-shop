'use server'
import bcryptjs from 'bcryptjs'
import prisma from '@/lib/prisma'

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password, 10)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      ok: true,
      message: 'User registered successfully.',
      user
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error registering user. Please try again.',
      error
    }
  }
}
