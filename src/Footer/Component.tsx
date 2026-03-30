import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      <div className="container py-8 flex flex-col md:flex-row md:justify-between gap-6">
        
        {/* Logo + copyright */}
        <div className="flex flex-col gap-2">
          <Link href="/">
            <Logo className="invert" />
          </Link>
          <p className="text-xs text-white/40 tracking-widest uppercase">
            © {new Date().getFullYear()} Tahiti Zoom — Stéphane Sayeb
          </p>
          <p className="text-xs text-white/30 tracking-wider">
            Polynésie française
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-4 md:items-center">
          {navItems.map(({ link }, i) => (
            <CMSLink className="text-white/70 hover:text-white text-sm transition-colors" key={i} {...link} />
          ))}
        </nav>

      </div>
    </footer>
  )
}
