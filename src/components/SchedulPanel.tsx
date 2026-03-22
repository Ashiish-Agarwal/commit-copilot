
import type { DashboardData } from "~/lib/action/index";
import Link from "next/link";
 function SchedulePanel({
  data,
  nextCronMinutes,
  productId
}: {
  data: DashboardData;
  nextCronMinutes: number;
  productId: string;
}) {
  const rows = [
    { label: "mode", value: data.schedule },
    { label: "commits / day", value: String(data.commitsPerDay) },
    { label: "today done", value: `${data.commitsToday} / ${data.commitsPerDay}` },
  ];
  return (
    <div>
      {rows.map((r) => (
        <div
          key={r.label}
          className="flex justify-between items-center py-3 border-b border-[#1e2d3d]"
        >
          <span className="text-sm text-[#e6edf3]">{r.label}</span>
          <span className="font-mono text-xs text-[#7a8a99]">{r.value}</span>
          
        </div>
      ))}

      {/* Active toggle — visual only, wire up setschedule API */}
      <div className="flex justify-between items-center py-3 border-b border-[#1e2d3d]">
        <span className="text-sm text-[#e6edf3]"><span className="text-zinc-400">repo name</span> - {data.repoName}</span>
        {/* <div className="relative w-8 h-5 rounded-full bg-[#00ff87] cursor-pointer"> */}
          
        {/* </div> */}

     
      </div>

      <div className="pt-4 mt-1 grid grid-cols-2   ">
        <span>

        <p className="font-mono text-[11px] text-[#7a8a99] mb-1.5 tracking-widest uppercase">
          next cron run
        </p>
        <p className="font-mono text-sm text-[#00ff87]">
          in ~{nextCronMinutes} minute{nextCronMinutes !== 1 ? "s" : ""}

        </p>
        </span>
      
            <Link  className="rounded-md   ml-10 border border-[#00ff87]  text-sm flex items-center justify-center px-3 " href={`/dashboard/cron/${productId}`}>
                re-Schedule <span className="text-[#00ff87]">→</span>
            </Link>
      </div>
    </div>
  );
}
export default SchedulePanel;