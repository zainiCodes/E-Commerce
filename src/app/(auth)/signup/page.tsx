import Image from "next/image";
import signUpBanner from "@/public/signUp-banner.jpg"

export default function SignupPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-linear-to-br from-gray-50 to-gray-100">

            <div className="relative hidden md:block">
                <Image
                    src={signUpBanner}
                    alt="SignUp Banner"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-6">
                    <div>
                        <h1 className="text-3xl font-semibold text-gray-900">
                            Create Account
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Start your journey with us today.
                        </p>
                    </div>

                    {/* FORM PLACEHOLDER */}
                    <div className="h-64 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        Signup Form Goes Here
                    </div>
                </div>
            </div>
        </div>
    );
}