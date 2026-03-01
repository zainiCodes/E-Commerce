'use server'

import { signInSchema } from "@/schema/signInSchema"
import { signIn } from "@/utils/auth"
import { redirect } from "next/dist/server/api-utils"
import z from "zod"

export async function login(values: z.infer<typeof signInSchema>) {
    try {
        await signIn("credentials", {...values, redirect: false})
        return { success: true }
    } catch {
        return { error: "Invalid email or password" }
    }
}