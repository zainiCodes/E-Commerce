import Image from "next/image";
import loginBanner from "@/public/loign-banner.jpg"
import { LoignForm } from "@/features/auth";
export default function LoginPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-linear-to-br from-gray-50 to-gray-100">

            {/* Left Side - Form */}
            <div className="flex items-center justify-center bg-white">
                <div className=" w-full space-y-6">
                    <LoignForm />
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative hidden md:block">
                <Image
                    src={loginBanner}
                    alt="Login visual"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    fill
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>
        </div>
    );
}