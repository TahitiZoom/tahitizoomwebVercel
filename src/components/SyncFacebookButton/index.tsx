'use client'

import React, { useState } from 'react'

interface SyncResult {
  success: boolean
  imported: number
  skipped: number
  errors: string[]
}

export const SyncFacebookButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SyncResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSync = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/sync-facebook', {
        method: 'POST',
        credentials: 'include',
      })

      const data: SyncResult = await response.json()

      if (!response.ok) {
        setError(data.errors?.[0] || `Erreur ${response.status}`)
        return
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  const buttonStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    backgroundColor: '#1877F2',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: loading ? 'not-allowed' : 'pointer',
    opacity: loading ? 0.7 : 1,
    transition: 'background-color 0.2s',
  }

  const containerStyle: React.CSSProperties = {
    marginBottom: '20px',
    padding: '16px',
    backgroundColor: 'var(--theme-elevation-50)',
    borderRadius: '8px',
    border: '1px solid var(--theme-elevation-100)',
  }

  const messageStyle: React.CSSProperties = {
    marginTop: '12px',
    padding: '10px 14px',
    borderRadius: '4px',
    fontSize: '14px',
  }

  const successStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    color: '#16a34a',
    border: '1px solid rgba(34, 197, 94, 0.2)',
  }

  const errorStyle: React.CSSProperties = {
    ...messageStyle,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    color: '#dc2626',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  }

  return (
    <div style={containerStyle}>
      <button
        onClick={handleSync}
        disabled={loading}
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!loading) {
            e.currentTarget.style.backgroundColor = '#1565D8'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#1877F2'
        }}
      >
        {loading ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '16px',
                height: '16px',
                border: '2px solid white',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
              }}
            />
            Synchronisation en cours...
          </>
        ) : (
          <>Synchroniser Facebook</>
        )}
      </button>

      {result && result.success && (
        <div style={successStyle}>
          {result.imported} post{result.imported > 1 ? 's' : ''} importé{result.imported > 1 ? 's' : ''}, {result.skipped} ignoré{result.skipped > 1 ? 's' : ''} (déjà présent{result.skipped > 1 ? 's' : ''})
          {result.errors.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
              Avertissements: {result.errors.join(', ')}
            </div>
          )}
        </div>
      )}

      {error && <div style={errorStyle}>Erreur : {error}</div>}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default SyncFacebookButton
