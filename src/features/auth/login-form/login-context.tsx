
import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

function LoginForm() {
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
          <form className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

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
            <Button type="submit" className="w-full">
              Sign In
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