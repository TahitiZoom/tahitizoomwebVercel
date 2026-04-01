'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps { data: Header }

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.06)',
      boxShadow: scrolled ? '0 1px 12px rgba(0,0,0,0.06)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '70px' }}>

        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0 }}>
          <Logo loading="eager" priority="high" className="max-w-[160px] h-[50px] object-contain" />
        </Link>

        {/* Nav desktop */}
        <div className="hidden md:flex">
          <HeaderNav data={data} />
        </div>

        {/* Hamburger mobile */}
        <button
          className="flex md:hidden flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', zIndex: 60 }}>
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#111',
            transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#111',
            transition: 'all 0.3s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '24px', height: '1.5px', background: '#111',
            transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </div>

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="flex md:hidden flex-col"
          style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.06)',
            padding: '1.5rem', gap: '1.5rem' }}
          onClick={() => setMenuOpen(false)}>
          <HeaderNav data={data} mobile />
        </div>
      )}
    </header>
  )
}
