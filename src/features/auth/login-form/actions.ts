'use server'

import { signInSchema } from "@/schema/signInschema"
import { signIn } from "@/utils/auth"
import { redirect } from "next/dist/server/api-utils"
import z from "zod"

export async function login(values: z.infer<typeof signInSchema>) {
    try {
        const {id} = await signIn("credentials", {...values, redirect: false})
        console.log(id)
        return { success: true }
    } catch {
        return { error: "Invalid email or password" }
    }
}