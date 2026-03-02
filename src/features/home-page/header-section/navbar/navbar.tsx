'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/shared/components/ui/sheet'
import { useSession } from 'next-auth/react'


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session, status } = useSession()

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#teams', label: 'Teams' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <nav className="fixed top-0 w-full bg-background border-b border-border z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Logo
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-foreground hover:text-primary font-medium transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' ? (
              <>
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-24 rounded-md" />
              </>
            ) : status === 'authenticated' ? (
              <>
                <Button variant="ghost" size="icon" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <div className="font-medium text-sm px-3 py-2 bg-secondary text-secondary-foreground rounded-md">
                  {session?.user?.name || 'User'}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" size="icon" aria-label="Cart">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                <Button>
                  <Link href={"/login"}>
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Toggle menu"
                >
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 p-0 flex flex-col">
                <div className="border-b border-border p-4">
                  <SheetTitle className="text-xl font-bold text-primary">
                    Menu
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigation menu for mobile devices
                  </SheetDescription>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-0 p-4">
                    {navLinks.map((link, index) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`px-4 py-3 rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground font-medium transition-colors duration-200 ${index !== navLinks.length - 1 ? 'border-b border-border' : ''
                          }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA Buttons */}
                <div className="border-t border-border p-4 flex flex-col gap-3">
                  {status === 'loading' ? (
                    <>
                      <Skeleton className="h-10 w-full rounded-md" />
                      <Skeleton className="h-10 w-full rounded-md" />
                    </>
                  ) : status === 'authenticated' ? (
                    <>
                      <div className="flex items-center gap-3 px-3 py-2 bg-secondary text-secondary-foreground rounded-md">
                        <span className="font-medium">{session?.user?.name || 'User'}</span>
                      </div>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full justify-start gap-2">
                        <ShoppingCart className="h-5 w-5" />
                        Cart
                      </Button>
                      <Button className="w-full rounded-lg font-semibold">
                        Sign Up
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
