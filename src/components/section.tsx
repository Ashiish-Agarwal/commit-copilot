"use client";

import { useState } from "react";
import Link from "next/link";

/* ── TERMINAL ── */
export function Terminal() {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-24 flex flex-col md:flex-row gap-12 items-center">
      <div className="flex-1">
        <p className="font-mono text-xs tracking-widest uppercase text-green mb-3"><span className="text-[#00ff87]">{`//`}</span> under the hood</p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">
          Real commits.<br />Real history.
        </h2>
        <p className="mt-4 text-muted text-base leading-relaxed max-w-sm">
          We use the GitHub Contents API to push actual file changes — each commit has a
          unique timestamp so your history looks completely natural.
        </p>
      </div>

      <div className="flex-1 w-full bg-card border border-border rounded-xl p-6 font-mono text-sm leading-7">
        <div className="flex gap-2 mb-5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <p><span className="text-green">$</span> commitpilot status</p>
        <p className="text-muted">→ Schedule: everyday</p>
        <p className="text-muted">→ Commits/day: 5</p>
        <p className="text-muted">→ Today: 3/5 done</p>
        <p className="text-muted">→ Next run: in ~4 min</p>
        <br />
        <p><span className="text-green">$</span> git log --oneline</p>
        <p className="text-[#26a641]">a3f91bc Auto commit - 2026-03-20T14:32:00Z</p>
        <p className="text-[#26a641]">8cd20e1 Auto commit - 2026-03-20T11:17:00Z</p>
        <p className="text-[#26a641]">2b7f4a0 Auto commit - 2026-03-20T08:05:00Z</p>
        <p>
          <span className="text-green">$</span>{" "}
          <span className="inline-block w-2 h-4 bg-green align-middle animate-[blink_1s_steps(1)_infinite]" />
        </p>
      </div>
    </section>
  );
}

/* ── PRICING ── */


/* ── FAQ ── */
const faqs = [
  {
    q: "Will GitHub flag these as fake commits?",
    a: "No. We use the official GitHub Contents API to create real file changes with real commit messages and timestamps. They are indistinguishable from manual commits.",
  },
  {
    q: "Do you need access to my private code?",
    a: "No. CommitPilot only writes to the specific file path you set up (e.g. initial-commit/auto-commit.md). We never read your source code.",
  },
  {
    q: "What if I already missed days?",
    a: "GitHub contribution graphs only reflect real commit timestamps. We can't backfill past dates — but from the day you sign up, your streak stays alive.",
  },
  {
    q: "Can I pause or change my schedule?",
    a: "Absolutely. Update your schedule or commits-per-day any time from your dashboard. Changes apply on the next cron cycle (within 10 minutes).",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="relative z-10 max-w-2xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-widest uppercase text-green mb-3"><span className="text-[#00ff87]">{`//`}</span> faq</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-10">Common questions.</h2>

      <div className="flex flex-col gap-3 text-left">
        {faqs.map((f, i) => (
          <div key={i} className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex justify-between items-center px-6 py-4 text-sm font-semibold hover:text-green transition-colors text-left"
            >
              {f.q}
              <span className={`text-green text-xl ml-4 transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div
              className={`text-sm text-muted px-6 leading-relaxed overflow-hidden transition-all duration-300 ${
                open === i ? "max-h-40 pb-4" : "max-h-0"
              }`}
            >
              {f.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA BAND ── */
export function CTABand() {
  return (
    <div className="relative z-10 mx-6 mb-24 rounded-2xl border border-green/25 bg-gradient-to-br from-green/10 to-green/5 p-16 text-center overflow-hidden">
      {/* grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,.08) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <h2 className="relative text-4xl md:text-6xl font-extrabold tracking-tighter mb-4">
        Never miss a day again.
      </h2>
      <p className="relative text-muted mb-8">Join 12,000+ developers keeping their GitHub profiles active.</p>
      <Link
        href="/login"
        className="relative inline-block font-mono font-bold text-sm tracking-widest bg-green text-dark px-10 py-3.5 rounded-md hover:opacity-88 transition-opacity"
        style={{ boxShadow: "0 0 30px rgba(0,255,135,.35)" }}
      >
        Get Started Free →
      </Link>
    </div>
  );
}

/* ── FOOTER ── */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-border px-10 py-6 flex flex-wrap items-center justify-between gap-4">
      <span className="font-mono text-sm text-green">
        commit<span className="text-muted">pilot</span>
      </span>
      <div className="flex gap-6">
        {["Docs", "Privacy", "Terms", "GitHub"].map((l) => (
          <Link key={l} href="#" className="text-xs text-muted tracking-widest uppercase hover:text-green transition-colors">
            {l}
          </Link>
        ))}
      </div>
      <span className="text-xs text-[#3a4a5a]">© 2026 CommitPilot. All rights reserved.</span>
    </footer>
  );
}