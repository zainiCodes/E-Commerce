import React from 'react'
import Navbar from './navbar/navbar'
import bannerImage from "./img/banner.jpg"

export default function HeaderSection() {
    return (
        <section
            className="relative w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bannerImage.src})` }}
        >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="relative z-10">
                <Navbar />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                    Buying your Dream clothings
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80">
                    Buy what ever you want
                </p>
            </div>
        </section>
    )
}