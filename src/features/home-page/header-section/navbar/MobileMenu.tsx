// MobileMenu.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/shared/components/ui/sheet"
import { Session } from "next-auth"

interface NavLink {
    href: string
    label: string
}

interface MobileMenuProps {
    session: Session | null
    navLinks: NavLink[]
}

export default function MobileMenu({ session, navLinks }: MobileMenuProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="md:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </SheetTrigger>

                <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col">
                    <div className="flex flex-col gap-0 p-4">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground font-medium transition-colors duration-200 ${index !== navLinks.length - 1 ? "border-b border-border" : ""}`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="border-t border-border p-4 flex flex-col gap-3">
                        <Button variant="outline" className="w-full justify-start gap-2">
                            <ShoppingCart className="h-5 w-5" />
                            Cart
                        </Button>

                        {session ? (
                            <div className="flex items-center gap-3 px-3 py-2 bg-secondary text-secondary-foreground rounded-md">
                                <span className="font-medium">{session.user?.name}</span>
                            </div>
                        ) : (
                            <Link href="/login">
                                <Button className="w-full rounded-lg font-semibold">Sign Up</Button>
                            </Link>
                        )}
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}