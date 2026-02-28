'use client'
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { z } from "zod"
import { signUpSchema } from "@/schema/signUpSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Separator } from "@/shared/components/ui/separator"
import { Field, FieldLabel, FieldError } from "@/shared/components/ui/field"
import Link from "next/link"
import { signup } from "./action"
import { toast } from "sonner"
function SignUpForm() {
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            ConfirmPassword: ""
        }
    })

    async function SignUpSubmit(values: z.infer<typeof signUpSchema>) {
        values.ConfirmPassword
        const formData = new FormData;
        Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value)
        })
        const result = await signup(formData)
        if(!result.success){
            toast.error(result.message)
        }else{
            toast.success("Account created success!")
            form.reset()
        }
    }
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-semibold">Create Account</CardTitle>
                    <CardDescription>
                        Enter your details to make an account
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <form onSubmit={form.handleSubmit(SignUpSubmit)} className="space-y-4">

                        <Controller
                            name="name"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="text"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="email"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />
                        <Controller
                            name="ConfirmPassword"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        type="password"
                                        aria-invalid={fieldState.invalid}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                        >
                            {form.formState.isSubmitting ? "Signing up..." : "Sign Up"}
                        </Button>

                    </form>
                    <Separator />
                    <p className="text-center text-sm text-muted-foreground">
                        Aready have an account?{" "}
                        <Link href="/login" className="cursor-pointer font-medium text-primary hover:underline" >
                            Login
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpForm
