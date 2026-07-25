'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
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
      background: 'rgba(250,246,239,0.88)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(47,109,117,0.12)',
      boxShadow: scrolled ? '0 8px 24px rgba(47,109,117,0.08)' : 'none',
      transition: 'box-shadow 0.3s',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '0 1rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '64px',
      }}>
        {/* Logo */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {/* Mobile : favicon */}
          <img src="/Logo-Tahiti-Zoom-144x144.webp" alt="Tahiti Zoom"
            style={{ height: '40px', width: '40px', objectFit: 'contain' }}
            className="block md:hidden" />
          {/* Desktop : logo signature */}
          <img src="/logo.webp" alt="Tahiti Zoom"
            style={{ height: '50px', width: 'auto', objectFit: 'contain' }}
            className="hidden md:block" />
        </Link>
        {/* Nav desktop */}
        <div className="hidden md:flex">
          <HeaderNav data={data} />
        </div>
        {/* Hamburger mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.5rem', display: 'flex', flexDirection: 'column',
            gap: '5px', alignItems: 'center', justifyContent: 'center',
          }}
          className="hamburger-mobile">
          <span style={{
            display: 'block', width: '22px', height: '2px', background: 'var(--tz-ink)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px', background: 'var(--tz-coral-deep)',
            transition: 'all 0.3s', opacity: menuOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px', background: 'var(--tz-ink)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </div>
      {/* Menu mobile déroulant */}
      <div className="md:hidden"
        style={{
          background: 'rgba(250,246,239,0.97)',
          borderTop: '1px solid rgba(47,109,117,0.12)',
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : '0',
          transition: 'max-height 0.3s ease',
        }}>
        <div style={{ padding: '1.5rem 1.5rem 2rem' }}
          onClick={() => setMenuOpen(false)}>
          <HeaderNav data={data} mobile />
        </div>
      </div>
    </header>
  )
}
