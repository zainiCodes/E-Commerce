"use client"

import React from "react"
import { Toaster } from "@/components/ui/sonner"


type ProvidersProps = {
    children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <main>

            {children}
            <Toaster />
        </main>


    )
}