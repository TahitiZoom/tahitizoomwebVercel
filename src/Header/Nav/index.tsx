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

const navStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '1.05rem',
  fontWeight: 400,
  letterSpacing: '0.02em',
  color: '#111',
  textDecoration: 'none',
}

/* Panneau rectangulaire dépoli derrière chaque rubrique, qui se remplit au survol */
const itemStyle = (hovered: boolean): React.CSSProperties => ({
  ...navStyle,
  lineHeight: 1.2,
  display: 'inline-block',
  padding: '0.16rem 0.55rem',
  background: hovered ? 'rgba(17,17,17,0.13)' : 'rgba(17,17,17,0.05)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  transition: 'background 0.35s ease',
})

export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean }> = ({ data, mobile }) => {
  const navItems = data?.navItems || []
  const { locale } = useLocale()
  const [hovered, setHovered] = useState<number | null>(null)

  const homeLabel = locale === 'en' ? 'Home' : 'Accueil'

  if (mobile) return (
    <nav className="mobile-nav" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <span style={{ ...navStyle, fontSize: '1.1rem' }}>
        <Link href="/">{homeLabel}</Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i} style={{ ...navStyle, fontSize: '1.1rem' }}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <LocaleSwitcher />
    </nav>
  )

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.35rem' }}>
      <span
        style={itemStyle(hovered === 0)}
        onMouseEnter={() => setHovered(0)}
        onMouseLeave={() => setHovered(null)}>
        <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>{homeLabel}</Link>
      </span>
      {navItems.map(({ link }, i) => {
        const label = link.label || ''
        const translated = translations[label]?.[locale] || label
        return (
          <span key={i}
            style={itemStyle(hovered === i + 1)}
            onMouseEnter={() => setHovered(i + 1)}
            onMouseLeave={() => setHovered(null)}>
            <CMSLink {...link} label={translated} appearance="inline" />
          </span>
        )
      })}
      <div style={{ marginTop: '0.3rem' }}>
        <LocaleSwitcher />
      </div>
    </nav>
  )
}
