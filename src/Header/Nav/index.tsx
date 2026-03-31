'use client'
import React from 'react'
import type { Header as HeaderType } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
      {navItems.map(({ link }, i) => (
        <CMSLink key={i} {...link} appearance="link"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#111',
          }} />
      ))}
      <Link href="/connexion" style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.72rem',
        fontWeight: 500,
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#111',
      }}>
        Connexion
      </Link>
    </nav>
  )
}
