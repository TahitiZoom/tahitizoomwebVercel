'use client'
import React from 'react'

export const BeforeLogin: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '2rem',
      marginTop: '-2rem',
    }}>
      {/* Logo favicon TZ */}
      <img
        src="/logo-tz.png"
        alt="Tahiti Zoom"
        style={{ width: '64px', height: '64px', marginBottom: '1.2rem' }}
      />
      {/* Logo signature */}
      <img
        src="/logo-signature.png"
        alt="Stéphane Sayeb"
        style={{ width: '220px', marginBottom: '1rem' }}
      />
      <p style={{
        fontFamily: 'sans-serif',
        fontSize: '0.85rem',
        color: '#555',
        textAlign: 'center',
      }}>
        <strong>Ia Ora Na !</strong> Bienvenue sur la gestion du site Tahiti Zoom.
      </p>
    </div>
  )
}

export default BeforeLogin
