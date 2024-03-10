import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcryptjs from 'bcryptjs'

import prisma from './lib/prisma'

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
        // find email
        const user = await prisma.user.findUnique({ where: { email: email.toLocaleLowerCase() } })

        if (!user) return null
        // compare password
        if (!bcryptjs.compareSync(password, user.password)) return null

        const { password: _, ...restUser } = user
        console.log("🚀 ~ authorize ~ restUser:", restUser)

        return restUser
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
