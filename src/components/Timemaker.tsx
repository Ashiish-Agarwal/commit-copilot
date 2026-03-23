'use client'

import React from 'react'
import { Loader2, GitCommit, Calendar, Zap, CheckCircle2 } from 'lucide-react'
import { backendUrl } from '~/lib/api'
import { useRouter } from 'next/navigation'


const Timemaker = ({productId}: {productId: string}) => {
  const [commitsPerDay, setCommitsPerDay] = React.useState<number | null>(null)
  const [schedule, setSchedule] = React.useState<'everyday' | 'weekends' | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [success, setSuccess] = React.useState(false)
  const router = useRouter()
  

  const commitOptions = [1, 3, 5, 10, 15, 20]

  const Timemakerapi = async () => {
    if (!commitsPerDay || !schedule) return
    setLoading(true)
    setSuccess(false)

    try {
      const res = await fetch(`${backendUrl}/setschedule`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitsPerDay, schedule, productId }),
      })
      if (res.ok) {
        setSuccess(true)
        router.push(`/dashboard/cron/${productId}/inbox`)
      }
    } finally {
      setLoading(false)
    }
  }

  const isReady = commitsPerDay !== null && schedule !== null  

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0f',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Mono', 'Fira Mono', monospace",
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .tm-card {
          background: #0f0f1a;
          border: 1px solid #1e1e32;
          border-radius: 20px;
          padding: 40px;
          width: 100%;
          max-width: 480px;
          position: relative;
          overflow: hidden;
        }

        .tm-card::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 200px; height: 200px;
          background: radial-gradient(circle, rgba(57,255,20,0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .tm-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          color: #3d3d5c;
          text-transform: uppercase;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .tm-grid { display: grid; gap: 8px; }
        .tm-grid-2 { grid-template-columns: repeat(2, 1fr); }
        .tm-grid-3 { grid-template-columns: repeat(3, 1fr); }

        .tm-btn {
          background: #13131f;
          border: 1px solid #1e1e32;
          border-radius: 10px;
          color: #4a4a6a;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          padding: 14px 8px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }

        .tm-btn:hover { border-color: #2e2e4a; color: #8888aa; }

        .tm-btn.active {
          background: #0d1a0d;
          border-color: #39ff14;
          color: #39ff14;
          box-shadow: 0 0 16px rgba(57,255,20,0.12), inset 0 0 16px rgba(57,255,20,0.04);
        }

        .tm-btn .sub {
          font-size: 9px;
          letter-spacing: 0.1em;
          opacity: 0.6;
          text-transform: uppercase;
        }

        .tm-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, #1e1e32, transparent);
          margin: 28px 0;
        }

        .tm-submit {
          width: 100%;
          background: #39ff14;
          border: none;
          border-radius: 10px;
          color: #030803;
          font-family: inherit;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 28px;
        }

        .tm-submit:hover:not(:disabled) {
          background: #55ff2a;
          box-shadow: 0 0 24px rgba(57,255,20,0.4);
          transform: translateY(-1px);
        }

        .tm-submit:disabled {
          background: #1a2e1a;
          color: #2a4a2a;
          cursor: not-allowed;
        }

        .tm-submit.success {
          background: #0d1a0d;
          border: 1px solid #39ff14;
          color: #39ff14;
        }

        .tm-preview {
          background: #0a0a12;
          border: 1px solid #1a1a2e;
          border-radius: 10px;
          padding: 14px 16px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          color: #3d3d5c;
          transition: all 0.3s ease;
        }

        .tm-preview.ready { border-color: #1e2e1e; color: #4a6a4a; }
        .tm-preview .hl { color: #39ff14; font-weight: 500; }

        .tm-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #1e1e32;
          display: inline-block;
          margin-right: 6px;
          transition: background 0.3s;
        }
        .tm-dot.on { background: #39ff14; box-shadow: 0 0 6px #39ff14; }

        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; }
      `}</style>

      <div className="tm-card">

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <div style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 22,
            fontWeight: 800,
            color: '#e8e8f0',
            letterSpacing: '-0.02em',
            marginBottom: 6,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}>
            <GitCommit size={20} color="#39ff14" />
            Commit Schedule
          </div>
          <p style={{ fontSize: 12, color: '#3d3d5c', letterSpacing: '0.05em' }}>
            automate your github contributions
          </p>
        </div>

        {/* Schedule */}
        <div className="tm-label">
          <Calendar size={10} color="#39ff14" />
          When to commit
        </div>
        <div className="tm-grid tm-grid-2">
          {(['everyday', 'weekends'] as const).map((s) => (
            <button
              key={s}
              className={`tm-btn ${schedule === s ? 'active' : ''}`}
              onClick={() => setSchedule(s)}
            >

              <span>{s === 'everyday' ? '7 days' : 'Sat + Sun'}</span>
              <span className="sub">{s}</span>
              
            </button>
          ))}
        </div>

        <div className="tm-divider" />

        {/* Commits per day */}
        <div className="tm-label">
          <Zap size={10} color="#39ff14" />
          Commits per day
        </div>
        <div className="tm-grid tm-grid-3">
          {commitOptions.map((n) => (
            <button
              key={n}
              className={`tm-btn ${commitsPerDay === n ? 'active' : ''}`}
              onClick={() => setCommitsPerDay(n)}
            >
              <span style={{ fontSize: 18, fontWeight: 500 }}>{n}</span>
              <span className="sub">/ day</span>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div className={`tm-preview ${isReady ? 'ready' : ''}`}>
          <span>
            <span className={`tm-dot ${isReady ? 'on' : ''}`} />
            {isReady ? (
              <><span className="hl">{commitsPerDay}</span> commits · <span className="hl">{schedule}</span></>
            ) : (
              'select your preferences above'
            )}
          </span>
          {isReady && (
            <span style={{ color: '#2a4a2a', fontSize: 10 }}>
              ~{`${(commitsPerDay * (schedule === 'everyday' ? 365 : 104)).toLocaleString()}`} / yr
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          className={`tm-submit ${success ? 'success' : ''}`}
          onClick={Timemakerapi}
          disabled={!isReady || loading}
        >
          {loading ? (
            <><Loader2 size={14} className="spin" /> saving...</>
          ) : success ? (
            <><CheckCircle2 size={14} /> schedule saved</>
          ) : (
            'activate schedule'
          )}
        </button>

      </div>
    </div>
  )
}

export default Timemaker