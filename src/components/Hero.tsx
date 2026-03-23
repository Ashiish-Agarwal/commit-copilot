"use client";

import Link from "next/link";


const LEVELS = [
  0,0,0,1,1,2,2,3,4,4,3,2,1,0,1,2,3,4,4,3,4,4,3,2,3,4,4,4,3,2,
  1,0,0,1,2,3,4,4,4,3,4,4,4,4,3,4,4,4,4,4,3,4,
];

function CommitGrid() {
  return (
    <div className="w-full max-w-2xl mt-14 animate-fade-up animation-delay-400">
      <p className="font-mono text-xs text-muted mb-2 tracking-widest">
        <span className="text-[#00ff87]">{`//`}</span> your github contribution graph — after commitpilot
      </p>
      <div className="flex gap-[3px]">
        {Array.from({ length: 52 }).map((_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: 7 }).map((_, d) => {
              const idx = w * 7 + d;
              const lvl = idx < LEVELS.length ? LEVELS[idx] : Math.floor(Math.random() * 5);
              const bg =
                lvl === 0 ? "bg-[#161b22]" :
                lvl === 1 ? "bg-[#0e4429]" :
                lvl === 2 ? "bg-[#006d32]" :
                lvl === 3 ? "bg-[#26a641]" :
                            "bg-green shadow-green";
              return (
                <div
                  key={d}
                  className={`w-[13px] h-[13px] rounded-sm ${bg}`}
                  style={lvl === 4 ? { boxShadow: "0 0 5px rgba(0,255,135,.5)" } : undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 pt-28 pb-16">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 font-mono text-xs tracking-widest uppercase text-green border border-green/30 bg-green/5 px-4 py-1.5 rounded-full mb-8 animate-fade-down">
        <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
        GitHub Automation · Now Live
      </div>

      {/* Headline */}
      <h1 className="text-6xl md:text-8xl font-extrabold leading-none tracking-tighter animate-fade-up animation-delay-100">
        Stay <span className="text-green">Green</span>
        <br />
        <span className="text-muted">Every Single Day.</span>
      </h1>

      <p className="mt-6 max-w-lg text-base leading-relaxed text-muted animate-fade-up animation-delay-200">
        CommitPilot automatically pushes commits to your GitHub repos on your
        schedule — so your contribution graph never goes dark.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap gap-4 justify-center mt-10 animate-fade-up animation-delay-300">
        <Link
          href="/signup"
          className="font-mono font-bold text-sm tracking-widest bg-green text-dark px-8 py-3 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(0,255,135,.5)]"
          style={{ boxShadow: "0 0 28px rgba(0,255,135,.3)" }}
        >
          Start for Free
        </Link>
        <Link
          href="#how"
          className="font-mono font-bold text-sm tracking-widest border border-border text-white px-8 py-3 rounded-md transition-all hover:border-green hover:text-green"
        >
          See How It Works
        </Link>
      </div>

      <CommitGrid />

      {/* Stats */}
      <div className="flex flex-wrap gap-10 justify-center mt-12 animate-fade-up animation-delay-500">
        {[
          { num: "12+", label: "Developers" },
          { num: "2.4M", label: "Auto Commits" },
          { num: "99.9%", label: "Uptime" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-mono text-3xl font-bold text-green">{s.num}</div>
            <div className="text-xs text-muted tracking-widest uppercase mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}