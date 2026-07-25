'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import type { Header } from '@/payload-types'
import { HeaderNav } from './Nav'
interface HeaderClientProps { data: Header }
export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  /* Sur l'accueil, le header se pose directement sur le hero : pas de barre,
     logo et menu en blanc par-dessus l'image. */
  const overHero = pathname === '/'

  /* Le header s'efface vers le haut dès que l'on quitte le sommet de la page */
  useEffect(() => {
    const fn = () => setHidden(window.scrollY > 80)
    fn()
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const barBackground = overHero ? 'transparent' : 'white'
  const mobilePanelBackground = overHero ? 'rgba(0,0,0,0.85)' : 'white'
  const burgerColor = overHero ? 'white' : '#111'

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: barBackground,
      borderBottom: overHero ? 'none' : '1px solid rgba(0,0,0,0.06)',
      transform: hidden && !menuOpen ? 'translateY(-100%)' : 'translateY(0)',
      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }}>
      <div style={{
        maxWidth: '1400px', margin: '0 auto',
        padding: '1.2rem 1.5rem 1rem',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        minHeight: overHero ? '0' : '128px',
      }}>
        {/* Logo, passé en blanc lorsqu'il se pose sur l'image */}
        <Link href="/" style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          {/* Mobile : favicon */}
          <img src="/Logo-Tahiti-Zoom-144x144.webp" alt="Tahiti Zoom"
            style={{
              height: '80px', width: '80px', objectFit: 'contain',
              opacity: overHero ? 1 : 0.75,
              filter: overHero ? 'brightness(0) invert(1)' : 'contrast(85%)',
            }}
            className="block md:hidden" />
          {/* Desktop : logo signature */}
          <img src="/logo.webp" alt="Tahiti Zoom"
            style={{
              height: '100px', width: 'auto', objectFit: 'contain',
              opacity: overHero ? 1 : 0.75,
              filter: overHero ? 'brightness(0) invert(1)' : 'contrast(85%)',
            }}
            className="hidden md:block" />
        </Link>
        {/* Nav desktop */}
        <div className="hidden md:flex">
          <HeaderNav data={data} light={overHero} />
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
            display: 'block', width: '22px', height: '2px', background: burgerColor,
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px', background: burgerColor,
            transition: 'all 0.3s', opacity: menuOpen ? 0 : 1
          }} />
          <span style={{
            display: 'block', width: '22px', height: '2px', background: burgerColor,
            transition: 'all 0.3s',
            transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }} />
        </button>
      </div>
      {/* Menu mobile déroulant */}
      <div className="md:hidden"
        style={{
          background: mobilePanelBackground,
          borderTop: overHero ? 'none' : '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
          maxHeight: menuOpen ? '400px' : '0',
          transition: 'max-height 0.3s ease',
        }}>
        <div style={{ padding: '1.5rem 1.5rem 2rem' }}
          onClick={() => setMenuOpen(false)}>
          <HeaderNav data={data} mobile light={overHero} />
        </div>
      </div>
    </header>
  )
}
