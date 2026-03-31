'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

const navStyle = {
  fontFamily: 'var(--font-body)',
  fontSize: '0.82rem',
  fontWeight: 500,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  color: '#111',
  textDecoration: 'none',
}

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = (data?.navItems || []).filter(({ link }) => link.label !== 'Connexion')
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
      {navItems.map(({ link }, i) => (
        <span key={i} style={navStyle}>
          <CMSLink {...link} appearance="link" />
        </span>
      ))}
      <Link href="/connexion" style={navStyle}>
        Connexion
      </Link>
    </nav>
  )
}
