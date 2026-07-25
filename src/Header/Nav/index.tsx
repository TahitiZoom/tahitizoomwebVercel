'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useLocale } from '@/components/LocaleProvider'

const translations: Record<string, Record<string, string>> = {
  'Éditorial': { fr: 'Éditorial', en: 'Editorial' },
  'Editorial': { fr: 'Éditorial', en: 'Editorial' },
  'Services':  { fr: 'Services',  en: 'Services'  },
  'À propos':  { fr: 'À propos',  en: 'About'     },
  'Contact':   { fr: 'Contact',   en: 'Contact'   },
}

/* Couleurs pastel de survol, une par rubrique (cycle si plus d'items) */
const pastels = ['#BFE6E2', '#F9C6D0', '#F9E0A9', '#D9CFEC', '#F6B29E']

const navStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#111',
  textDecoration: 'none',
}

const pillStyle = (hovered: boolean, color: string): React.CSSProperties => ({
  display: 'inline-block',
  padding: '0.45rem 0.95rem',
  borderRadius: '999px',
  background: hovered ? color : 'transparent',
  transition: 'background 0.25s ease',
})

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean }> = ({ data, mobile }) => {
  const navItems = data?.navItems || []
  const { locale } = useLocale()
  const [hovered, setHovered] = useState<number | null>(null)

  const homeLabel = locale === 'en' ? 'Home' : 'Accueil'

  if (mobile) return (
    <nav className="mobile-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <span style={{ ...navStyle, fontSize: '1rem' }}>
        <Link href="/">{homeLabel}</Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i} style={{ ...navStyle, fontSize: '1rem' }}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <LocaleSwitcher />
    </nav>
  )

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
      <span
        style={{ ...navStyle, ...pillStyle(hovered === 0, pastels[0]) }}
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>{homeLabel}</Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i}
            style={{ ...navStyle, ...pillStyle(hovered === i + 1, pastels[(i + 1) % pastels.length]) }}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <LocaleSwitcher />
    </nav>
  )
}
