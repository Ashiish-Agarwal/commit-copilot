"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { signInWithGitHub } from "~/lib/auth-client";


function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    await signInWithGitHub();
    setTimeout(() => setIsLoading(false), 2000);
   
  };

 
  return (
    <div className="login-root">
      {/* Grid background */}
      <div className="bg-grid" aria-hidden="true" />
      {/* Glow orbs */}
      <div className="blob blob-1" aria-hidden="true" />
      <div className="blob blob-2" aria-hidden="true" />

      <div className="login-wrapper">
        {/* Logo */}
        <div className="logo-area">
          <div className="logo-ring">
            <svg viewBox="0 0 24 24" fill="none" className="logo-icon">
              <circle cx="12" cy="12" r="3" fill="#00ff87" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#00ff87" strokeWidth="2" strokeLinecap="round" />
              <path d="M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" stroke="#00ff87" strokeWidth="1.5" strokeLinecap="round" opacity=".5" />
            </svg>
          </div>
          <div className="logo-wordmark">
            commit<span>pilot</span>
          </div>
          <Badge variant="outline" className="version-badge">
            v2.0 · Secure Auth
          </Badge>
        </div>

        <Card className="login-card">
          <CardHeader className="card-header">
            <CardTitle className="card-title">Welcome back</CardTitle>
            <CardDescription className="card-desc">
              Sign in to keep your GitHub graph green
            </CardDescription>
          </CardHeader>

          <CardContent className="card-content">
            <Button
              className="github-btn"
              onClick={() => handleGitHubLogin()}
              disabled={isLoading}
              size="lg"
            >
              {isLoading ? (
                <span className="spinner" />
              ) : (
                <GitHubIcon className="btn-icon" />
              )}
              {isLoading ? "Redirecting…" : "Continue with GitHub"}
            </Button>

            <Separator className="sep" />

            <p className="hint-text">
              Only GitHub authentication is supported.
              <br />
              No passwords. No forms. Just you.
            </p>
          </CardContent>

          <CardFooter className="card-footer">
            <p className="footer-text">
              By signing in, you agree to our{" "}
              <a href="#" className="footer-link">Terms</a>{" "}
              &amp;{" "}
              <a href="#" className="footer-link">Privacy Policy</a>.
            </p>
          </CardFooter>
        </Card>

        <p className="bottom-note"><span className="text-[#00ff87]">{`//`}</span> secured with oauth 2.0 · end-to-end encrypted</p>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

        .login-root {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100dvh;
          overflow: hidden;
          padding: 1.5rem;
          background: #080c10;
          font-family: 'Syne', sans-serif;
        }

        /* ── Grid background ── */
        .bg-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,255,135,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,135,.04) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        /* ── Glow orbs ── */
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          animation: drift 12s ease-in-out infinite alternate;
        }
        .blob-1 {
          width: 500px; height: 500px;
          background: rgba(0, 255, 135, 0.07);
          top: -180px; left: -120px;
        }
        .blob-2 {
          width: 350px; height: 350px;
          background: rgba(0, 200, 100, 0.05);
          bottom: -100px; right: -80px;
          animation-delay: -6s;
        }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(24px, 16px) scale(1.06); }
        }

        /* ── Wrapper ── */
        .login-wrapper {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
          max-width: 400px;
          animation: fadeUp .55s ease both;
        }

        /* ── Logo area ── */
        .logo-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .6rem;
        }
        .logo-ring {
          width: 64px; height: 64px;
          border-radius: 14px;
          background: rgba(0,255,135,.06);
          border: 1px solid rgba(0,255,135,.2);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 24px rgba(0,255,135,.1);
        }
        .logo-icon {
          width: 28px; height: 28px;
        }
        .logo-wordmark {
          font-family: 'Space Mono', monospace;
          font-size: 1.05rem;
          color: #00ff87;
          letter-spacing: .02em;
        }
        .logo-wordmark span {
          color: #e6edf3;
        }
        .version-badge {
          font-family: 'Space Mono', monospace;
          font-size: .62rem;
          letter-spacing: .08em;
          border-color: rgba(0,255,135,.25) !important;
          color: rgba(0,255,135,.6) !important;
          background: rgba(0,255,135,.05) !important;
        }

        /* ── Card ── */
        .login-card {
          width: 100%;
          background: rgba(13, 17, 23, 0.85) !important;
          backdrop-filter: blur(24px);
          border: 1px solid rgba(0,255,135,.12) !important;
          border-radius: 18px !important;
          box-shadow:
            0 0 0 1px rgba(0,255,135,.04),
            0 24px 60px rgba(0,0,0,.6),
            inset 0 1px 0 rgba(0,255,135,.06);
          overflow: hidden;
        }

        .card-header {
          padding: 2rem 2rem 1.25rem;
          border-bottom: 1px solid rgba(0,255,135,.07);
        }
        .card-title {
          font-size: 1.35rem;
          font-weight: 700;
          letter-spacing: -.02em;
          color: #e6edf3 !important;
        }
        .card-desc {
          font-size: .875rem;
          color: rgba(255,255,255,.35) !important;
          margin-top: .25rem;
        }

        .card-content {
          padding: 1.75rem 2rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        /* ── GitHub Button ── */
        .github-btn {
          width: 100% !important;
          height: 48px !important;
          background: #00ff87 !important;
          color: #080c10 !important;
          font-family: 'Space Mono', monospace !important;
          font-weight: 700 !important;
          font-size: .85rem !important;
          letter-spacing: .04em !important;
          border-radius: 10px !important;
          border: none !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          gap: .625rem !important;
          transition: all .2s ease !important;
          box-shadow: 0 0 24px rgba(0,255,135,.25) !important;
        }
        .github-btn:hover:not(:disabled) {
          background: #00e87a !important;
          transform: translateY(-1px);
          box-shadow: 0 0 40px rgba(0,255,135,.45) !important;
        }
        .github-btn:active:not(:disabled) {
          transform: translateY(0) !important;
        }
        .github-btn:disabled {
          opacity: .65 !important;
          cursor: not-allowed !important;
        }

        .btn-icon { width: 18px; height: 18px; }

        .spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(8,12,16,.2);
          border-top-color: #080c10;
          border-radius: 50%;
          animation: spin .7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── Separator ── */
        .sep {
          background: rgba(0,255,135,.08) !important;
        }

        .hint-text {
          text-align: center;
          font-size: .8rem;
          line-height: 1.7;
          color: rgba(255,255,255,.28);
        }

        /* ── Footer ── */
        .card-footer {
          padding: 1.25rem 2rem 1.75rem;
          border-top: 1px solid rgba(0,255,135,.07);
          justify-content: center;
        }
        .footer-text {
          font-size: .75rem;
          color: rgba(255,255,255,.22);
          text-align: center;
          line-height: 1.6;
        }
        .footer-link {
          color: rgba(0,255,135,.5);
          text-decoration: underline;
          text-decoration-color: rgba(0,255,135,.2);
          transition: color .15s;
        }
        .footer-link:hover { color: #00ff87; }

        /* ── Bottom note ── */
        .bottom-note {
          font-family: 'Space Mono', monospace;
          font-size: .68rem;
          letter-spacing: .08em;
          color: rgba(0,255,135,.25);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}