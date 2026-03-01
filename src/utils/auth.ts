import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "../server/prisma"
import z from "zod"
import bcrypt from "bcryptjs"
import { signInSchema } from "@/schema/signInSchema"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                const parsed = signInSchema.safeParse(credentials)
                if (!parsed.success) {
                    return null
                }

                const { email, password } = parsed.data
                
                const user = await prisma.user.findUnique({
                    where: { email },
                })
                if (!user || !user.password) {
                    return null
                }
                const isPasswordValid = await bcrypt.compare(password, user.password)
                if (!isPasswordValid) {
                    return null
                }
                return user
            },
        }),
    ],
    session: {
        strategy: 'jwt'
    }
})