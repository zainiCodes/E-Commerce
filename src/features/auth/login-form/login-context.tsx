'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Separator } from "@/shared/components/ui/separator"
import { login } from "./actions"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signInSchema } from "@/schema/signInschema"
import z from "zod"
import { Field, FieldError, FieldLabel } from "@/shared/components/ui/field"
import { toast } from "sonner"
import { useRouter } from "next/navigation"


function LoginForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function loginSubmit(values: z.infer<typeof signInSchema>) {
    const result = await login(values)

    if (!result.success) {
      toast.error(result.error)
      return
    }else{
      toast.success("Login success!")
      router.push("/")
    }

  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>
            Enter your email and password to sign in
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-4">

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

            {/* Forgot password */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Forgot your password?
              </span>
              <button
                type="button"
                className="font-medium text-primary hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Submit */}

            <Button
              type="submit"
              className="w-full"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <Separator />

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <span className="cursor-pointer font-medium text-primary hover:underline">
              Sign up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginForm