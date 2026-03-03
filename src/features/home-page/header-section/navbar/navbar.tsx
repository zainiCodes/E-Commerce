// Navbar.tsx (Server Component)

import Link from 'next/link'
import { ShoppingCart } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'


import MobileMenu from './MobileMenu' // client component
import { auth } from '@/utils/auth'

export default async function Navbar() {
  const session = await auth()

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

          <Link href="/" className="text-2xl font-bold text-primary">
            Logo
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>

            {session ? (
              <div className="font-medium text-sm px-3 py-2 bg-secondary rounded-md">
                {session.user?.name}
              </div>
            ) : (
              <Link href="/login">
                <Button>Sign Up</Button>
              </Link>
            )}
          </div>

          {/* Client component */}
          <MobileMenu session={session} navLinks={navLinks} />

        </div>
      </div>
    </nav>
  )
}