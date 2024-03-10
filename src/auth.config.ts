import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account'
  },
  //   callbacks: {
  //     authorized({ auth, request: { nextUrl } }) {
  //       const isLoggedIn = !!auth?.user
  //       const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
  //       if (isOnDashboard) {
  //         if (isLoggedIn) return true
  //         return false // Redirect unauthenticated users to login page
  //       } else if (isLoggedIn) {
  //         return Response.redirect(new URL('/dashboard', nextUrl))
  //       }
  //       return true
  //     }
  //   },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)
        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data
        console.log('🚀 ~ authorize ~ email, password:', email, password)

        return null
      }
    })
  ]
}

export const { signIn, signOut, auth: authMiddleware } = NextAuth(authConfig)
