"use client"

import { Button } from '@/shared/components/ui/button'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { TextEffect } from '@/shared/components/ui/text-effect'

export default function HeaderContent() {
    return (
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto w-full h-full pb-10">

            <span className="inline-block py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium tracking-wide mb-6 backdrop-blur-md">
                <TextEffect as="span" per="char" preset="fade" delay={0.1}>
                    New Collection 2026
                </TextEffect>
            </span>

            <h1 className="text-5xl sm:text-6xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg flex flex-col items-center justify-center">
                <TextEffect as="span" per="word" preset="blur" delay={0.3}>
                    Discover Your
                </TextEffect>
                <TextEffect as="span" per="char" preset="fade-in-blur" delay={0.6}>
                    Signature Style
                </TextEffect>
            </h1>

            <div className="max-w-2xl mx-auto text-lg sm:text-xl md:text-xl text-neutral-300 font-light mb-10 leading-relaxed drop-shadow">
                <TextEffect as="p" per="line" preset="blur" delay={1.4}>
                    Elevate your wardrobe with our premium collection of modern fashion. Unveil the trends that define your personal elegance.
                </TextEffect>
            </div>

            <div className="flex flex-row flex-wrap items-center justify-center gap-4 w-full">
                <Button
                    asChild
                    className="group h-14 px-8 bg-white text-black hover:bg-neutral-200 rounded-full font-semibold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)] w-auto overflow-hidden"
                >
                    <Link href="/shop" className="flex items-center justify-center gap-2">
                        <ShoppingBag className="w-5 h-5 flex-shrink-0" />
                        <TextEffect as="span" per="char" preset="fade" delay={2.0}>
                            Shop Collection
                        </TextEffect>
                    </Link>
                </Button>

                <Button
                    asChild
                    variant="outline"
                    className="group h-14 px-8 bg-black/40 text-white border-white/30 hover:bg-black/60 hover:border-white/50 hover:text-white rounded-full font-semibold text-lg backdrop-blur-md transition-all hover:scale-105 active:scale-95 w-auto overflow-hidden"
                >
                    <Link href="/categories" className="flex items-center justify-center gap-2">
                        <TextEffect as="span" per="char" preset="fade" delay={2.0}>
                            Explore Trends
                        </TextEffect>
                        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1 flex-shrink-0" />
                    </Link>
                </Button>
            </div>
        </div>
    )
}
