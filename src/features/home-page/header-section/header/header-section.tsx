import Navbar from "../navbar/navbar"
import Image from "next/image"
import bannerImage from "@/public/banner.jpg"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"
import HeaderContent from "./header-content"

export default function HeaderSection() {
    return (
        <section className="relative w-full min-h-[600px] h-[80vh] sm:h-[85vh] md:h-[90vh] flex flex-col">
            <Image
                src={bannerImage}
                alt="Premium Clothing Banner"
                fill
                className="object-cover object-center"
                priority
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80"></div>

            <div className="relative z-20">
                <Navbar />
            </div>
            <HeaderContent />
        </section>
    )
}