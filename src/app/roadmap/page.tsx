import Link from "next/link";
import { PageHeader } from "@/components/SiteChrome";
import { roadmap, waves } from "@/data/content";

export default function RoadmapPage() {
  return (
    <>
      <PageHeader
        title="Roadmap"
        description="BRD phases ≈ 19 weeks. Go live in waves: CRM+leads first, then HIS/CTI, then Desk/MA/Analytics."
      />

      <section className="section">
        <div className="wrap space-y-8">
          <div className="grid gap-4 md:grid-cols-3">
            {waves.map((w, i) => (
              <div key={w.id} className="card">
                <div className="chip">
                  Wave {String.fromCharCode(65 + i)} · {w.tag}
                </div>
                <h3 className="mt-3 text-xl">
                  {w.name.replace(/^Wave [A-C] — /, "")}
                </h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{w.summary}</p>
              </div>
            ))}
          </div>

          <div className="card overflow-x-auto !p-0">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-[var(--teal-soft)] text-xs tracking-wide uppercase">
                <tr>
                  <th className="px-4 py-3">Phase</th>
                  <th className="px-4 py-3">Workstream</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Focus</th>
                </tr>
              </thead>
              <tbody>
                {roadmap.map((r) => (
                  <tr key={r.phase} className="border-t border-[var(--border)]">
                    <td className="px-4 py-3 font-semibold text-[var(--teal)]">
                      {r.phase}
                    </td>
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3">{r.weeks}</td>
                    <td className="px-4 py-3 text-[var(--muted)]">{r.focus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/implement" className="btn btn-teal">
              Open runbook
            </Link>
            <Link href="/flows" className="btn border border-[var(--border)] bg-white">
              Review flows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
