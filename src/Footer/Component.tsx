import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer className="mt-auto border-t border-border bg-black text-white">
      {/* Ligne principale : logo + nav */}
      <div className="container py-8 flex flex-col md:flex-row md:justify-between gap-6">

        {/* Logo TZ */}
        <Link href="/">
          <img src="/Logo-Tahiti-Zoom-144x144.png" alt="Tahiti Zoom" style={{ height: '60px', width: 'auto' }} />
        </Link>

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row gap-4 md:items-center">
          {navItems.map(({ link }, i) => (
            <CMSLink className="text-white/70 hover:text-white text-sm transition-colors" key={i} {...link} />
          ))}
        </nav>

      </div>

      {/* Copyright centré en bas */}
      <div className="border-t border-white/10 py-4">
        <p className="text-xs text-white/40 tracking-widest uppercase text-center">
          © {new Date().getFullYear()} Tahiti Zoom — Made with love by Stéphane Sayeb
        </p>
      </div>

    </footer>
  )
}
