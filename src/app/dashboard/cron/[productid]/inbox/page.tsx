import { redirect } from "next/navigation";
import Link from "next/link";
import getDashboardData from "~/lib/action/index";
import StatCards from "~/components/dashboard";
import Activity from "~/components/Activity";
import SchedulePanel from "~/components/SchedulPanel";

import Image from "next/image";
import getSessioncheck from "~/lib/action";

async function SectionCard({
  title,
  children,
  className = "",
 
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  
}) {


  const session =  await getSessioncheck();
  if (!session) {
    redirect("/login");
  }

  return (
    <div className={`bg-[#0d1117] border border-[#1e2d3d] rounded-xl p-5 ${className}`}>
      <p className="font-mono text-[11px] tracking-widest uppercase text-[#7a8a99] mb-4">
        <span className="text-[#00ff87]">{`//`}</span> {title}
      </p>
      {children}
    </div>
  );
}

async function DashboardPage({params}: {params: Promise<{ productid: string }>}) {
  const {productid} = await params

  console.log(`productid:${productid}`);

  const { data, username, nextCronMinutes , avatarUrl } = await getDashboardData(productid)

  const initials = (username ?? "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const pct = data
    ? Math.min(100, Math.round((data.commitsToday / data.commitsPerDay) * 100))
    : 0;

  return (
    <div
      className="min-h-screen text-[#e6edf3] font-space-mono"
      style={{ background: "#080c10" }}
    >
      {/* Grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,135,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,135,.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-[#1e2d3d] bg-[#080c10]/80 backdrop-blur-xl sticky top-0">
        <Link href="/" className="font-mono text-base text-[#00ff87]">
          commit<span className="text-white">pilot</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#7a8a99]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff87] animate-pulse" />
            cron active
          </div>
          <div className="flex items-center gap-2 bg-[#0d1117] border border-[#1e2d3d] rounded-lg px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-[#00ff87] flex items-center justify-center font-mono text-[10px] font-bold text-[#080c10]">
              <Image className="rounded-full" src={avatarUrl ?? initials} alt="GitHub" width={100} height={100} />
            </div>
            <span className="font-mono text-xs text-[#7a8a99]">@{username ?? "you"}</span>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-8 space-y-5">

        {/* Greeting */}
        <div className="   w-full ">
          <span className="">

          <h1 className="text-2xl font-extrabold tracking-tight">
            Hey, <span className="text-[#00ff87]">@{username ?? "you"}</span> 👋
          </h1>
          <p className="text-sm text-[#7a8a99] mt-1">
            {data
              ? `next commit in ~${nextCronMinutes} min`
              : "no repo connected yet"}
          </p>
          </span>
         
        </div>

        {/* Empty state */}
        {!data && (
          <div className="bg-[#0d1117] border border-dashed border-[#1e2d3d] rounded-xl p-16 text-center">
            <p className="font-mono text-[#7a8a99] text-sm mb-5">
              no repo connected yet
            </p>
            <Link
              href="/dashboard/new"
              className="font-mono text-sm font-bold bg-[#00ff87] text-[#080c10] px-6 py-2.5 rounded-md hover:opacity-85 transition-opacity inline-block"
            >
              + create repo
            </Link>
          </div>
        )}

        {data && (
          <>
            {/* Stat cards */}
           
            <StatCards
              commitsToday={data.commitsToday}
              commitsPerDay={data.commitsPerDay}
              schedule={data.schedule}
              createdAt={data.createdAt}
            />

           

            {/* Repo info + weekly bars */}

            <div className="grid grid-cols-1 gap-5">
              <SectionCard  title="repo status">
                

               
                {/* Repo name */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="font-mono text-sm text-[#e6edf3]">{data.repoName}</p>
                    <p className="text-xs text-[#7a8a99] mt-1">
                      {data.githubUsername}/{data.repoName}
                    </p>
                  </div>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-[#00ff87] border border-green-500/20">
                    active
                  </span>
                </div>

                {/* Today's progress */}
                <div className="mb-5">
                  <div className="flex justify-between mb-1.5">
                    <span className="text-xs text-[#7a8a99]">today&apos;s commits</span>
                    <span className="font-mono text-xs text-[#e6edf3]">
                      {data.commitsToday} / {data.commitsPerDay}
                    </span>
                  </div>
                  <div className="h-2 bg-[#161b22] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#00ff87] rounded-full transition-all duration-700"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Schedule info rows */}
                {[
                  { label: "schedule", value: data.schedule },
                  { label: "commits / day", value: String(data.commitsPerDay) },
                  { label: "file path", value: data.filePath },
                  {
                    label: "last commit",
                    value: data.updatedAt.toLocaleString("en-US", {
                      month: "short", day: "numeric",
                      hour: "2-digit", minute: "2-digit",
                    }),
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex justify-between py-2.5 border-t border-[#1e2d3d]"
                  >
                    <span className="text-xs text-[#7a8a99]">{row.label}</span>
                    <span className="font-mono text-xs text-[#e6edf3]">{row.value}</span>
                  </div>
                ))}

                {/* Next cron */}
                <div className="flex justify-between py-2.5 border-t border-[#1e2d3d]">
                  <span className="text-xs text-[#7a8a99]">next run</span>
                  <span className="font-mono text-xs text-[#00ff87]">
                    ~{nextCronMinutes} min
                  </span>
                </div>
              </SectionCard>

            </div>

            {/* Activity + schedule */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <SectionCard title="recent activity">
                <Activity data={data} />
              </SectionCard>

              <SectionCard title="schedule settings">
                <SchedulePanel data={data} nextCronMinutes={nextCronMinutes} productId={productid} />
              </SectionCard>
            </div>
          </>
        )}
      </main>

  
    </div>
  );
}
export default DashboardPage;
