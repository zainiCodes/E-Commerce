import Image from "next/image";
import loginBanner from "@/public/loign-banner.jpg"
export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-linear-to-br from-gray-50 to-gray-100">

            {/* Left Side - Form */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Welcome Back
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    {/* FORM PLACEHOLDER */}
                    <div className="h-64 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        Login Form Goes Here
                    </div>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative hidden md:block">
                <Image
                    src={loginBanner}
                    alt="Login visual"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>
        </div>
    );
}