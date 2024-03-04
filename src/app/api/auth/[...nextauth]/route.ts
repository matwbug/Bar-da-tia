import { validUsers } from "@/config/users";
import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from  "next-auth/providers/credentials"
import { AuthOptions, NextAuthOptions } from "next-auth";

export const nextAuthOptions: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET ?? "",
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? "",
            clientSecret: process.env.GITHUB_SECRET ?? ""
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              username: { label: "Usuário", type: "text" },
              password: { label: "Senha", type: "password" }
            },
            async authorize(credentials, req) {
                const isValidCredentials = validUsers.find(validUser => validUser.username === credentials?.username && validUser.password === credentials.password)
                if(isValidCredentials){
                    return {
                        id: isValidCredentials.id.toString(),
                        name: isValidCredentials.username
                    }
                }
                return null
            }
        })
    ],
    pages: {
        signIn: '/login',
    },

}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
