import Image from "next/image";
import signUpBanner from "@/public/signUp-banner.jpg"
import { SignUpForm } from "@/features/auth";
import { auth } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const session = await auth()
        if(session){
            redirect("/")
        }
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

            <SignUpForm />

        </div>
    );
}