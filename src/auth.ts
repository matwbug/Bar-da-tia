import NextAuth, { Session, User } from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/prisma"
 
declare module 'next-auth' {
    interface Session {
      user: User & {
        "id": string,
        "email"?: string,
        "name"?: string,
        "username"?: string,
        "image"?: string,
        "role"?: 'ADMIN' | 'USER',
      }
    }
  }
  

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [],
    pages: {
        signIn: `/auth/sign-in`,
        error: `/auth/sign-in`, // Error code passed in query string as ?error=
      },
    callbacks: {
        async jwt({ token, account }){
          if(account){
            if(account.role) token.role = account.role
          }
    
          return token
        },
        session({ session }){
          const newSession: Session = {
            ...session, 
            user: {
              id: session.userId,
              email: session.user.email,
              name: session.user.name,
              username: session.user.username,
              image: session.user.image,
              role: session.user.role,
            }
          }
    
          return newSession
        }
    }
})