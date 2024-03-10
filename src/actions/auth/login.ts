'use server'
import { signIn } from '@/auth.config'
import { AuthError } from 'next-auth'

// ...

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // console.log('🚀 ~ authenticate ~ formData:', { formData: Object.fromEntries(formData) })
    await signIn('credentials', { ...Object.fromEntries(formData), redirect: false })

    return 'Success'
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password, redirect: false })

    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      message: 'Error logging in. Please try again.',
      error
    }
  }
}
