"use client";
import type { DashboardData } from "~/lib/action/index";

/* ── Activity Log ── */
function timeAgo(date: Date): string {
  const diff = Date.now() - new Date(date).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

 function ActivityLog({ data }: { data: DashboardData }) {
  const now = new Date();
  const isWeekend = [0, 6].includes(now.getDay());
  const skipped = data.schedule === "weekends" && !isWeekend;

  // Build a few derived log lines from the single row we have
  const logs = [
    {
      msg: `auto commit · ${data.repoName}`,
      time: timeAgo(new Date(data.updatedAt)),
      skipped: false,
    },
    ...(skipped
      ? [{ msg: `skipped · ${data.repoName}`, time: "not a weekend", skipped: true }]
      : []),
    {
      msg: `repo created · ${data.repoName}`,
      time: new Date(data.createdAt).toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
      }),
      skipped: false,
    },
  ];

  return (
    <div>
      {logs.map((l, i) => (
        <div key={i} className="flex gap-3 py-2.5 border-b border-[#1e2d3d] last:border-0">
          <div
            className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
            style={{ background: l.skipped ? "#3a4a5a" : "#00ff87" }}
          />
          <div>
            <p className={`font-mono text-xs ${l.skipped ? "text-[#7a8a99]" : "text-[#e6edf3]"}`}>
              {l.msg}
            </p>
            <p className="text-[11px] text-[#7a8a99] mt-0.5">{l.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ActivityLog;
