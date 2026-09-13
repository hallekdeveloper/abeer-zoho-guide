import Link from "next/link";
import { PageHeader } from "@/components/SiteChrome";
import { apps, integrations } from "@/data/content";

export default function AppsPage() {
  return (
    <>
      <PageHeader
        title="Apps & integrations"
        description="What each Zoho app does in this project, and how external systems connect."
      />

      <section className="section">
        <div className="wrap space-y-8">
          <div className="grid gap-4 md:grid-cols-2">
            {apps.map((app) => (
              <article key={app.name} className="card">
                <div className="text-xs font-semibold tracking-wide text-[var(--teal)] uppercase">
                  {app.owner}
                </div>
                <h3 className="mt-1 text-xl">{app.name}</h3>
                <p className="mt-1 text-sm text-[var(--muted)]">{app.role}</p>
                <ul className="mt-4 space-y-1.5 text-sm">
                  {app.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div>
            <h2 className="mb-4 text-2xl">Approved integrations</h2>
            <div className="card overflow-x-auto !p-0">
              <table className="w-full min-w-[700px] text-left text-sm">
                <thead className="bg-[var(--teal-soft)] text-xs tracking-wide uppercase">
                  <tr>
                    <th className="px-4 py-3">System</th>
                    <th className="px-4 py-3">Direction</th>
                    <th className="px-4 py-3">Data</th>
                    <th className="px-4 py-3">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {integrations.map((row) => (
                    <tr key={row.system} className="border-t border-[var(--border)]">
                      <td className="px-4 py-3 font-medium">{row.system}</td>
                      <td className="px-4 py-3">{row.direction}</td>
                      <td className="px-4 py-3 text-[var(--muted)]">{row.data}</td>
                      <td className="px-4 py-3">{row.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <Link href="/flows" className="btn btn-teal">
            See how they connect in flows
          </Link>
        </div>
      </section>
    </>
  );
}
