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
    const fn = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(44,41,38,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--tz-line)' : '1px solid transparent',
      transition: 'background 0.4s, border-color 0.4s',
    }}>
      <div style={{
        maxWidth: '1500px', margin: '0 auto',
        padding: '1.4rem 2rem',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
      }}>
        {/* Wordmark, pictogramme géométrique + capitales espacées façon Linka */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center',
          gap: '0.7rem', textDecoration: 'none' }}>
          <svg width="30" height="22" viewBox="0 0 30 22" fill="none" stroke="var(--tz-paper)" strokeWidth="1.3" aria-hidden="true">
            <rect x="1" y="1" width="28" height="20" />
            <path d="M1 21 L15 7 L29 21" />
            <circle cx="22" cy="7" r="2.5" />
          </svg>
          <span style={{ fontFamily: 'var(--font-linka)', fontWeight: 300,
            fontSize: '1.25rem', letterSpacing: '0.42em', textTransform: 'uppercase',
            color: 'var(--tz-paper)' }}>
            Tahiti&nbsp;Zoom
          </span>
        </Link>
        {/* Nav desktop, empilée verticalement à droite */}
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
            display: 'block', width: '22px', height: '1.5px', background: 'var(--tz-paper)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px', background: 'var(--tz-accent)',
            transition: 'all 0.3s', opacity: menuOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block', width: '22px', height: '1.5px', background: 'var(--tz-paper)',
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </div>
      {/* Menu mobile déroulant */}
      <div className="md:hidden"
        style={{
          background: 'rgba(44,41,38,0.97)',
          borderTop: '1px solid var(--tz-line)',
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
