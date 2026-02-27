'use server'

import { signInSchema } from "@/schema/signInschema"
import { signIn } from "@/utils/auth"
import z from "zod"

export async function login(values: z.infer<typeof signInSchema>) {
    try {
        await signIn("credentials", values)
        return { success: true }
    } catch {
        return { error: "Invalid email or password" }
    }
}