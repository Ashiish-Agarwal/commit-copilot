const steps = [
  {
    num: "01",
    icon: "🔐",
    title: "Connect GitHub",
    desc: "Sign in with GitHub OAuth. We request only the permissions needed to commit to your repos — nothing else.",
  },
  {
    num: "02",
    icon: "📁",
    title: "Create a Repo",
    desc: "Pick an existing repo or let CommitPilot create a dedicated one in seconds with a single click.",
  },
  {
    num: "03",
    icon: "⚡",
    title: "Set Your Schedule",
    desc: "Choose everyday or weekends only. Pick how many commits per day (1–50). That's it — we handle the rest.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
      <p className="font-mono text-xs tracking-widest uppercase text-green mb-3"><span className="text-[#00ff87]">{`//`}</span> how it works</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter leading-tight">
        Three steps.<br />Zero manual effort.
      </h2>
      <p className="mt-3 text-muted text-base leading-relaxed max-w-md">
        Connect once, set your schedule, and watch your contribution graph fill up automatically.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
        {steps.map((s) => (
          <div
            key={s.num}
            className="group bg-card border border-border rounded-xl p-7 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-green/40"
          >
            {/* hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <p className="font-mono text-xs tracking-widest text-green mb-4">STEP {s.num}</p>
            <div className="text-3xl mb-3">{s.icon}</div>
            <h3 className="font-bold text-base mb-2">{s.title}</h3>
            <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}