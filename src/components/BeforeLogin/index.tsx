import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <img
        src="/logo.png"
        alt="Tahiti Zoom"
        style={{ maxWidth: '280px', width: '100%' }}
      />
      <p style={{ textAlign: 'center', margin: 0 }}>
        <b>Ia Ora Na !</b>
        {' Bienvenue sur la gestion du site Tahiti Zoom.'}
      </p>
    </div>
  )
}

export default BeforeLogin
