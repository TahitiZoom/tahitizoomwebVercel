import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import type { Footer } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()
  const navItems = footerData?.navItems || []

  return (
    <footer style={{ background: 'white', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2.5rem 2rem',
        display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/">
            <Logo className="" />
          </Link>
        <nav style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
	  {navItems.map(({ link }, i) => (
    	   <span key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '0.7rem',
      	    letterSpacing: '0.15em', textTransform: 'uppercase', color: '#666', fontWeight: 500 }}>
      	    <CMSLink {...link} />
    	  </span>
  	 ))}
	</nav>
	</div>
        <div style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.65rem', letterSpacing: '0.2em',
            textTransform: 'uppercase', color: '#999' }}>
            © {new Date().getFullYear()} Tahiti Zoom — Made with love by Stéphane Sayeb
          </p>
        </div>
      </div>
    </footer>
  )
}
