"use client"

import React from "react"
import { Toaster } from "@/shared/components/ui/sonner"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


type ProvidersProps = {
    children: React.ReactNode
}
export default function Providers({ children }: ProvidersProps) {
    const queryClient = new QueryClient()
    return (
        <main>
            <QueryClientProvider client={queryClient}>
                {children}
                <Toaster />

            </QueryClientProvider>
        </main>


    )
}