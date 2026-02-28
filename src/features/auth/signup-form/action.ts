'use server'

import { signUpSchema } from "@/schema/signUpSchema"
import { signIn } from "@/utils/auth"
import { prisma } from "@/utils/prisma"
import bcrypt from "bcryptjs"
import z from "zod"


export async function signup(formData: FormData) {
    const rawData = Object.fromEntries(formData.entries())
    const { success, data } = signUpSchema.safeParse(rawData)
    if (!success) {
        return {
            success: false,
            message: "something went wrong!"
        }
    }
    const hashedPassword = await bcrypt.hash(data.password,12)
    try {
        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword
            }
        })
        if (!user) {
            return {
                success: false,
                message: "something went wrong"
            }
        }
        return { user: {
            id: user.id,
            name:user.name, 
            email: user.email
        }, success: true }
    } catch (error) {
        return {
            success: false,
            message: "something went wrong"
        }
    }

}