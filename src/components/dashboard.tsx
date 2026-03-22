"use client";



/* ── Stat Cards ── */
export default function StatCards({
  commitsToday,
  commitsPerDay,
  schedule,
  createdAt,
}: {
  commitsToday: number;
  commitsPerDay: number;
  schedule: string;
  createdAt: Date;
}) {
  const remaining = Math.max(0, commitsPerDay - commitsToday);
  const daysSince = Math.floor(
    (Date.now() - new Date(createdAt).getTime()) / 86_400_000
  );
  const estimatedTotal = daysSince * commitsPerDay;

  const cards = [
    {
      label: "Today",
      value: commitsToday,
      sub: `${remaining} remaining · ${commitsPerDay} limit`,
    },
    {
      label: "Schedule",
      value: schedule,
      sub: "current mode",
      mono: true,
    },
    {
      label: "Per day",
      value: commitsPerDay,
      sub: "commit target",
    },
    {
      label: "Est. all time",
      value: estimatedTotal.toLocaleString(),
      sub: `${daysSince} days running`,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {cards.map((c) => (
        <div
          key={c.label}
          className="bg-[#0d1117] border border-[#1e2d3d] rounded-xl p-4"
        >
          <p className="font-mono text-[11px] tracking-widest uppercase text-[#7a8a99] mb-1.5">
            {c.label}
          </p>
          <p className={`font-mono text-3xl font-bold text-[#00ff87] ${c.mono ? "text-xl" : ""}`}>
            {c.value}
          </p>
          <p className="text-xs text-[#7a8a99] mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
}




