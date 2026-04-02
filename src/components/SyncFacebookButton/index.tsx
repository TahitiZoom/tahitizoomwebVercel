'use client'

import React, { useState } from 'react'

interface SyncResult {
  success: boolean
  imported: number
  skipped: number
  errors: string[]
}

interface RepairResult {
  success: boolean
  message: string
  repaired: number
  errors: string[]
}

export const SyncFacebookButton: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<SyncResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Repair state
  const [repairing, setRepairing] = useState(false)
  const [repairResult, setRepairResult] = useState<RepairResult | null>(null)

  // Filter states
  const [limit, setLimit] = useState(10)
  const [sinceDate, setSinceDate] = useState('')
  const [untilDate, setUntilDate] = useState('')

  const handleRepair = async () => {
    setRepairing(true)
    setRepairResult(null)
    setError(null)

    try {
      const response = await fetch('/api/repair-posts', {
        method: 'POST',
        credentials: 'include',
      })

      const data: RepairResult = await response.json()

      if (!response.ok) {
        setError(data.errors?.[0] || `Erreur ${response.status}`)
        return
      }

      setRepairResult(data)
      // Reload page to refresh the list
      if (data.repaired > 0) {
        setTimeout(() => window.location.reload(), 1500)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setRepairing(false)
    }
  }

  const handleSync = async () => {
    setLoading(true)
    setResult(null)
    setError(null)

    try {
      // Build query string with filters
      const params = new URLSearchParams()
      params.set('limit', limit.toString())
      if (sinceDate) params.set('since', sinceDate)
      if (untilDate) params.set('until', untilDate)

      const response = await fetch(`/api/sync-facebook?${params.toString()}`, {
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

  return (
    <div
      style={{
        marginBottom: '20px',
        padding: '16px 20px',
        backgroundColor: 'var(--theme-elevation-50)',
        borderRadius: '8px',
        border: '1px solid var(--theme-elevation-100)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-end',
          gap: '16px',
        }}
      >
        {/* Limit field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Nombre de posts
          </label>
          <input
            type="number"
            min={1}
            max={50}
            value={limit}
            onChange={(e) => setLimit(Math.min(50, Math.max(1, parseInt(e.target.value) || 10)))}
            style={{
              width: '80px',
              padding: '8px 10px',
              fontSize: '14px',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              backgroundColor: 'var(--theme-input-bg)',
              color: 'var(--theme-elevation-1000)',
            }}
          />
        </div>

        {/* Since date field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--theme-elevation-800)',
            }}
          >
            Depuis le
          </label>
          <input
            type="date"
            value={sinceDate}
            onChange={(e) => setSinceDate(e.target.value)}
            style={{
              padding: '8px 10px',
              fontSize: '14px',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              backgroundColor: 'var(--theme-input-bg)',
              color: 'var(--theme-elevation-1000)',
            }}
          />
        </div>

        {/* Until date field */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <label
            style={{
              fontSize: '12px',
              fontWeight: 500,
              color: 'var(--theme-elevation-800)',
            }}
          >
            {"Jusqu'au"}
          </label>
          <input
            type="date"
            value={untilDate}
            onChange={(e) => setUntilDate(e.target.value)}
            style={{
              padding: '8px 10px',
              fontSize: '14px',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '4px',
              backgroundColor: 'var(--theme-input-bg)',
              color: 'var(--theme-elevation-1000)',
            }}
          />
        </div>

        {/* Sync button */}
        <button
          onClick={handleSync}
          disabled={loading}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: loading ? '#6b7280' : '#1877F2',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#1565D8'
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              e.currentTarget.style.backgroundColor = '#1877F2'
            }
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
              Synchronisation...
            </>
          ) : (
            <>Synchroniser Facebook</>
          )}
        </button>

        {/* Clear filters button */}
        {(sinceDate || untilDate) && (
          <button
            onClick={() => {
              setSinceDate('')
              setUntilDate('')
            }}
            style={{
              padding: '10px 14px',
              backgroundColor: 'transparent',
              color: 'var(--theme-elevation-600)',
              border: '1px solid var(--theme-elevation-150)',
              borderRadius: '6px',
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Effacer filtres
          </button>
        )}

        {/* Repair button - to fix posts not showing in admin */}
        <button
          onClick={handleRepair}
          disabled={repairing || loading}
          title="Réparer les posts qui ne s'affichent pas dans la liste"
          style={{
            padding: '10px 14px',
            backgroundColor: repairing ? '#6b7280' : '#f59e0b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '13px',
            fontWeight: 500,
            cursor: repairing || loading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseEnter={(e) => {
            if (!repairing && !loading) {
              e.currentTarget.style.backgroundColor = '#d97706'
            }
          }}
          onMouseLeave={(e) => {
            if (!repairing && !loading) {
              e.currentTarget.style.backgroundColor = '#f59e0b'
            }
          }}
        >
          {repairing ? 'Réparation...' : 'Réparer posts'}
        </button>
      </div>

      {/* Repair success message */}
      {repairResult && repairResult.success && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            color: '#d97706',
            border: '1px solid rgba(245, 158, 11, 0.2)',
          }}
        >
          {repairResult.message}
          {repairResult.repaired > 0 && ' - Rechargement de la page...'}
        </div>
      )}

      {/* Success message */}
      {result && result.success && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            color: '#16a34a',
            border: '1px solid rgba(34, 197, 94, 0.2)',
          }}
        >
          {result.imported} post{result.imported > 1 ? 's' : ''} importé
          {result.imported > 1 ? 's' : ''}, {result.skipped} ignoré
          {result.skipped > 1 ? 's' : ''} (déjà présent{result.skipped > 1 ? 's' : ''})
          {result.errors.length > 0 && (
            <div style={{ marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
              Avertissements: {result.errors.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          style={{
            marginTop: '12px',
            padding: '12px 16px',
            borderRadius: '6px',
            fontSize: '14px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: '#dc2626',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}
        >
          Erreur : {error}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

export default SyncFacebookButton
