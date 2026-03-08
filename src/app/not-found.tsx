import React from 'react'
import Link from 'next/link'
import { Button } from '@/shared/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-[80vh] w-full flex flex-col items-center justify-center px-4 md:px-6 py-20 bg-background overflow-hidden relative">
            {/* Abstract Background Design / Glassmorphism Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -z-10" />

            <div className="text-center space-y-8 max-w-2xl mx-auto z-10 backdrop-blur-sm p-8 rounded-3xl">
                {/* Massive 404 Text */}
                <div className="relative inline-flex items-center justify-center">
                    <h1 className="text-[120px] sm:text-[150px] md:text-[200px] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/70 to-muted drop-shadow-sm select-none leading-none">
                        404
                    </h1>
                    <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-full">
                        <div className="h-4 w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent blur-md"></div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                        Oops! Page not found.
                    </h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
                        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Button asChild size="lg" className="w-full sm:w-auto h-12 px-8 gap-2 font-semibold text-base rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transition-all duration-300">
                        <Link href="/">
                            <Home className="h-5 w-5" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}