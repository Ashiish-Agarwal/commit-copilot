import Link from "next/link";

type Plan = {
  name: string;
  price: string;
  desc: string;
  features: { label: string; included: boolean }[];
  featured?: boolean;
  cta: string;
  ctaHref: string;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    desc: "Great for trying it out and keeping one repo green.",
    cta: "Get Started",
    ctaHref: "/login",
    features: [
      { label: "1 repository", included: true },
      { label: "Up to 3 commits/day", included: true },
      { label: "Everyday schedule", included: true },
      { label: "Weekends-only mode", included: false },
      { label: "Multi-repo", included: false },
      { label: "Priority support", included: false },
    ],
  },
  {
    name: "Gold Plan",
    price: "$20",
    desc: "Early supporter offer: Pay once, unlock all future Gold features forever",
    cta: "Start Gold →",
    ctaHref: "/dashboard/gold",
    featured: true,
    features: [
      { label: "unlimited repositories", included: true },
      { label: "unlimited commits/day", included: true },
      { label: "Everyday schedule", included: true },
      { label: "all mode access", included: true },
      { label: "Real-time monitoring", included: true },
      { label: "Early access to new features", included: true },
    ],
  },
  // {
  //   name: "Team",
  //   price: "$18",
  //   desc: "Share CommitPilot across your whole dev team.",
  //   cta: "Contact Us",
  //   ctaHref: "/contact",
  //   features: [
  //     { label: "Unlimited repositories", included: true },
  //     { label: "Up to 50 commits/day", included: true },
  //     { label: "All schedules", included: true },
  //     { label: "5 team member seats", included: true },
  //     { label: "Analytics export", included: true },
  //     { label: "Dedicated support", included: true },
  //   ],
  // },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
      <p className="font-mono text-xs tracking-widest uppercase text-green mb-3">// pricing</p>
      <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Simple, honest pricing.</h2>
      <p className="mt-3 text-muted mx-auto max-w-sm">No hidden fees. Upgrade or cancel anytime.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12 text-left">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative bg-card border rounded-xl p-8 transition-all duration-300 ${
              p.featured
                ? "border-green shadow-[0_0_40px_rgba(0,255,135,.12)]"
                : "border-border hover:-translate-y-1 hover:border-green/30"
            }`}
          >
            {p.featured && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-widest uppercase bg-green text-dark px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <p className="font-mono text-xs tracking-widest uppercase text-muted mb-2">{p.name}</p>
            <p className="text-4xl font-extrabold tracking-tight">
              {p.price} <span className="text-base font-normal text-muted">/ {p.name==='Free'?'month':'lifetime'}</span>
            </p>
            <p className="text-sm text-muted mt-3 mb-5 leading-relaxed">{p.desc}</p>
            <ul className="space-y-2 mb-7">
              {p.features.map((f) => (
                <li key={f.label} className={`text-sm flex items-center gap-2 ${!f.included ? "text-muted" : ""}`}>
                  <span className={`font-mono text-xs ${f.included ? "text-green" : "text-[#3a4a5a]"}`}>
                    {f.included ? "✓" : "✕"}
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>
            <Link
              href={p.ctaHref}
              className={`block text-center font-mono font-bold text-sm tracking-widest py-3 rounded-md transition-all ${
                p.featured
                  ? "bg-green text-dark hover:opacity-88"
                  : "border border-border text-white hover:border-green hover:text-green"
              }`}
            >
              {p.cta}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}