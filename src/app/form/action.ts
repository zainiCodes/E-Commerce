'use server'
import z, { success } from 'zod'
const formValues = z.object({
    name: z.string().min(2, { error: 'Name must be at least 2 characters long.' })
})
export type FormState =    // this is simply the things you can return, 
    | {
        errors?: {
            name?: string[]
            email?: string[]
            password?: string[]
        }
        message?: string
        success?: boolean
    }
    | null

export async function test(FormState: FormState, formData: FormData) {
    await new Promise((res) => setTimeout(res, 1000))
    const name = formData.get("name")
    console.log(name)
    const validateFields = formValues.safeParse({
        name: formData.get("name")
    })
    console.log(validateFields.data?.name)
    if (!validateFields.success) {
        return {
            success: true,
            message: "user is not ok"

        }
    }
    return {
        success: false,
        message: "user is ok"
    }

}


