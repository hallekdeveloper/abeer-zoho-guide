import Link from "next/link";
import { HomeFlowPreview } from "@/components/HomeFlowPreview";
import { hardRules, stats } from "@/data/content";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap relative z-10 grid gap-8 py-14 md:grid-cols-[1.3fr_0.7fr] md:py-16">
          <div className="rise">
            <p className="mb-3 text-sm font-medium tracking-wide text-white/70 uppercase">
              Hallek · Zoho Premium Partner
            </p>
            <h1 className="text-4xl text-white md:text-5xl">
              Al Abeer Zoho CRM Plus
            </h1>
            <p className="mt-4 max-w-xl text-lg text-white/80">
              Implementation solution — watch how data flows, then configure
              Zoho step by step.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/flows" className="btn btn-primary">
                Open animated flows
              </Link>
              <Link href="/implement" className="btn btn-ghost">
                Micro-step runbook
              </Link>
            </div>
          </div>

          <div className="rise-2 grid grid-cols-2 gap-3 self-end">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-white/20 bg-white/10 p-4"
              >
                <div className="font-[family-name:var(--font-display)] text-3xl text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-xs tracking-wide text-white/65 uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2>Start here</h2>
          <p className="lead">
            Use Flows to see data movement. Use Implement to configure Zoho. Use
            Checklist to track progress.
          </p>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                href: "/flows",
                t: "1. Process flows",
                d: "Animated data packets + Zoho build steps under each flow.",
                anim: "rise",
              },
              {
                href: "/architecture",
                t: "2. Architecture",
                d: "Which system owns what. What data is allowed in CRM vs HIS only.",
                anim: "rise-2",
              },
              {
                href: "/implement",
                t: "3. Implement",
                d: "Week 0 → Go-live micro-steps you can tick off in Zoho.",
                anim: "rise-3",
              },
            ].map((x) => (
              <Link
                key={x.href}
                href={x.href}
                className={`card ${x.anim} block transition hover:border-[var(--brand)]`}
              >
                <h3 className="text-xl">{x.t}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{x.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <HomeFlowPreview />
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <h2>Hard rules</h2>
          <p className="lead">Do not violate these while building.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hardRules.map((r) => (
              <div key={r.title} className="card">
                <h3 className="text-lg text-[var(--brand-dark)]">{r.title}</h3>
                <p className="mt-2 text-sm text-[var(--muted)]">{r.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
