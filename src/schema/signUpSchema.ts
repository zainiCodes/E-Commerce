import z from 'zod'
export const signUpSchema = z.object({
    name: z.string(),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    ConfirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data)=>data.password == data.ConfirmPassword, {
    message: "Password do not match",
    path: ['ConfirmPassword']
})