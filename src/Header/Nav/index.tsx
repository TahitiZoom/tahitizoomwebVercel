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
  fontSize: '0.76rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#111',
  textDecoration: 'none',
}

/* Soulignement qui se déploie de la droite vers la gauche au survol */
const itemStyle = (hovered: boolean): React.CSSProperties => ({
  ...navStyle,
  lineHeight: 1.15,
  position: 'relative',
  display: 'inline-block',
  paddingBottom: '3px',
  backgroundImage: 'linear-gradient(#111, #111)',
  backgroundPosition: hovered ? 'left bottom' : 'right bottom',
  backgroundSize: hovered ? '100% 1px' : '0 1px',
  backgroundRepeat: 'no-repeat',
  transition: 'background-size 0.3s ease',
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
    <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.32rem' }}>
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
      <div style={{ marginTop: '0.15rem' }}>
        <LocaleSwitcher />
      </div>
    </nav>
  )
}
