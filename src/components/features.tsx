const features = [
  { icon: "🔄", title: "Smart Scheduling", desc: "Everyday or weekends-only mode. Daily commit counter resets at midnight automatically." },
  { icon: "🎯", title: "Per-day Limits", desc: "Set 1–50 commits per day per repo. The cron respects your exact limit and never over-commits." },
  { icon: "🛡️", title: "Secure Token Storage", desc: "OAuth tokens are stored encrypted. We never read your source code — only touch the file we create." },
  { icon: "📊", title: "Live Dashboard", desc: "See commits made today, this week, and all time. Watch your graph go from empty to completely green." },
  { icon: "⏰", title: "Cron Precision", desc: "Runs every 10 minutes. Spreads your commits naturally across the day for an organic-looking graph." },
  { icon: "🔌", title: "Multi-repo Support", desc: "Connect multiple repos with independent schedules and commit counts for each one." },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs tracking-widest uppercase text-green mb-3">// features</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">
        Everything you need.<br />Nothing you don&apos;t.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-card border border-border rounded-xl p-6 hover:border-green/35 transition-colors duration-300"
          >
            <div className="w-10 h-10 rounded-lg bg-green/10 flex items-center justify-center text-xl mb-4">
              {f.icon}
            </div>
            <h3 className="font-bold text-sm mb-2">{f.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}