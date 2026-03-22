'use client'

import React from 'react'
import { Loader2, GitFork, CheckCircle2, AlertCircle, Terminal } from 'lucide-react'
import { backendUrl } from '~/lib/api'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

type Status = 'idle' | 'loading' | 'success' | 'error'

const CreateRepo = () => {
  const [repoName, setRepoName] = React.useState("")
  const [repoDescription, setRepoDescription] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [status, setStatus] = React.useState<Status>('idle')
  const [message, setMessage] = React.useState("")
  const [logs, setLogs] = React.useState<string[]>([])

  const pushLog = (msg: string) =>
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} › ${msg}`])
        const router = useRouter()


  const createRepoapi = async () => {
    if (!repoName.trim()) return
    setLoading(true)
    setStatus('loading')
    setLogs([])
    setMessage("")

    pushLog("Authenticating with GitHub...")
    await new Promise(r => setTimeout(r, 600))
    pushLog(`Initializing repository "${repoName}"...`)
    await new Promise(r => setTimeout(r, 800))

    try {
      const res = await fetch(`${backendUrl}/createrepo`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: repoName, description: repoDescription  }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        pushLog("Repository created successfully ✓")
        pushLog("Creating initial commit...")
        await new Promise(r => setTimeout(r, 400))
        pushLog("Done ✓")
        setStatus('success')
        setMessage(data.message ?? "Repository ready!")
        console.log(data.productId)
        // redirect(`/dashboard/cron/${data.productId}`)
        router.push(`/dashboard/cron/${data.productId}`)
        


      

      } else {
        pushLog(`Error: ${data.error ?? "Something went wrong"}`)
        setStatus('error')
        setMessage(data.error)
      }
    } catch (err) {
      pushLog("Network error — could not reach server")
      setStatus('error')
      setMessage("Network error")

    } finally {
      setLoading(false)
      
    }
  }

  const isReady = repoName.trim().length > 0 && !loading

  return (
    <div style={{
      minHeight: '100vh',
      background: '#090910',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'DM Mono', monospace",
      padding: 24,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .cr-wrap {
          width: 100%; max-width: 460px;
          display: flex; flex-direction: column; gap: 12px;
        }

        /* top bar */
        .cr-topbar {
          background: #0f0f1c;
          border: 1px solid #1c1c2e;
          border-radius: 12px;
          padding: 14px 18px;
          display: flex; align-items: center; gap: 10px;
        }
        .cr-dots { display: flex; gap: 6px; }
        .cr-dot { width: 10px; height: 10px; border-radius: 50%; }

        /* card */
        .cr-card {
          background: #0f0f1c;
          border: 1px solid #1c1c2e;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
        }
        .cr-card::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 160px; height: 160px;
          background: radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .cr-header {
          padding: 24px 28px 20px;
          border-bottom: 1px solid #1c1c2e;
          display: flex; align-items: center; gap: 12px;
        }

        .cr-icon-wrap {
          width: 38px; height: 38px;
          background: #13132a;
          border: 1px solid #2a2a4a;
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
        }

        .cr-body { padding: 24px 28px; display: flex; flex-direction: column; gap: 20px; }

        .cr-field { display: flex; flex-direction: column; gap: 8px; }

        .cr-field-label {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3a3a5c;
          display: flex; align-items: center; gap: 6px;
        }
        .cr-field-label span {
          color: #6366f1;
          font-size: 14px;
          line-height: 1;
        }

        .cr-input {
          background: #0a0a14;
          border: 1px solid #1c1c2e;
          border-radius: 10px;
          color: #c8c8e8;
          font-family: inherit;
          font-size: 13px;
          padding: 12px 14px;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          width: 100%;
        }
        .cr-input::placeholder { color: #2e2e4e; }
        .cr-input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }
        .cr-input.has-value { border-color: #2a2a4a; }

        /* character count */
        .cr-count { font-size: 10px; color: #2e2e4e; text-align: right; margin-top: -4px; }
        .cr-count.warn { color: #f59e0b; }

        /* submit */
        .cr-submit {
          width: 100%;
          background: #6366f1;
          border: none; border-radius: 10px;
          color: #fff;
          font-family: inherit; font-size: 13px; font-weight: 500;
          letter-spacing: 0.08em; text-transform: uppercase;
          padding: 15px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          position: relative; overflow: hidden;
        }
        .cr-submit::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.08), transparent);
        }
        .cr-submit:hover:not(:disabled) {
          background: #7c7ff5;
          box-shadow: 0 0 20px rgba(99,102,241,0.35);
          transform: translateY(-1px);
        }
        .cr-submit:disabled { background: #1a1a30; color: #2e2e50; cursor: not-allowed; }
        .cr-submit.success { background: #064e3b; color: #34d399; border: 1px solid #065f46; }
        .cr-submit.error { background: #3b0a0a; color: #f87171; border: 1px solid #5f0606; }

        /* terminal log */
        .cr-terminal {
          background: #07070f;
          border: 1px solid #1c1c2e;
          border-radius: 10px;
          padding: 14px 16px;
          min-height: 72px;
          max-height: 120px;
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 4px;
        }
        .cr-log-line {
          font-size: 11px;
          color: #3a3a5c;
          animation: fadeIn 0.2s ease;
        }
        .cr-log-line:last-child { color: #6a6a9c; }
        .cr-log-line.ok { color: #34d399; }
        .cr-log-line.err { color: #f87171; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spin { animation: spin 1s linear infinite; display: inline-flex; }
      `}</style>

      <div className="cr-wrap">

        {/* top bar */}
        <div className="cr-topbar">
          <div className="cr-dots">
            <div className="cr-dot" style={{ background: '#ff5f57' }} />
            <div className="cr-dot" style={{ background: '#febc2e' }} />
            <div className="cr-dot" style={{ background: '#28c840' }} />
          </div>
          <span style={{ fontSize: 11, color: '#3a3a5c', letterSpacing: '0.1em' }}>
            github / new-repository
          </span>
        </div>

        {/* main card */}
        <div className="cr-card">

          <div className="cr-header">
            <div className="cr-icon-wrap">
              <GitFork size={16} color="#6366f1" />
            </div>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 16, fontWeight: 800,
                color: '#d0d0f0', letterSpacing: '-0.02em',
              }}>
                New Repository
              </div>
              <div style={{ fontSize: 11, color: '#3a3a5c', marginTop: 2 }}>
                auto-commit enabled after creation
              </div>
            </div>
          </div>

          <div className="cr-body">

            {/* repo name */}
            <div className="cr-field">
              <div className="cr-field-label">
                <span>#</span> repository name <span style={{ color: '#f87171', fontSize: 10 }}>*</span>
              </div>
              <input
                className={`cr-input ${repoName ? 'has-value' : ''}`}
                type="text"
                placeholder="my-awesome-project"
                value={repoName}
                onChange={e => setRepoName(e.target.value.replace(/\s/g, '-'))}
                maxLength={100}
              />
              <div className={`cr-count ${repoName.length > 80 ? 'warn' : ''}`}>
                {repoName.length}/100
              </div>
            </div>

            {/* description */}
            <div className="cr-field">
              <div className="cr-field-label">
                <span>//</span> description
                <span style={{ color: '#2e2e4e', fontSize: 9, marginLeft: 4 }}>optional</span>
              </div>
              <input
                className={`cr-input ${repoDescription ? 'has-value' : ''}`}
                type="text"
                placeholder="What's this repo for?"
                value={repoDescription}
                onChange={e => setRepoDescription(e.target.value)}
                maxLength={255}
              />
            </div>

            {/* terminal log */}
            <div className="cr-terminal">
              {logs.length === 0 ? (
                <div className="cr-log-line" style={{ color: '#1e1e36' }}>
                  $ waiting for input...
                </div>
              ) : (
                logs.map((log, i) => (
                  <div
                    key={i}
                    className={`cr-log-line ${log.includes('✓') || log.includes('Done') ? 'ok' : log.includes('Error') || log.includes('error') ? 'err' : ''}`}
                  >
                    $ {log}
                  </div>
                ))
              )}
            </div>

            {/* submit */}
            <button
              className={`cr-submit ${status === 'success' ? 'success' : status === 'error' ? 'error' : ''}`}
              onClick={createRepoapi}
              disabled={!isReady}
            >
              {loading ? (
                <><span className="spin"><Loader2 size={14} /></span> initializing...</>
              ) : status === 'success' ? (
                <><CheckCircle2 size={14} /> {message}</>
              ) : status === 'error' ? (
                <><AlertCircle size={14} /> {message}</>
              ) : (
                <><Terminal size={14} /> create repository</>
              )}
            </button>

          </div>
        </div>

        {/* hint */}
        <div style={{ textAlign: 'center', fontSize: 10, color: '#1e1e36', letterSpacing: '0.1em' }}>
          spaces auto-converted to hyphens
        </div>

      </div>
    </div>
  )
}

export default CreateRepo