import Link from "next/link";
import { PageHeader } from "@/components/SiteChrome";
import { implementSections } from "@/data/content";

export default function ImplementPage() {
  return (
    <>
      <PageHeader
        title="Micro-step runbook"
        description="Configure Zoho in this order. After each section, test before moving on."
      />

      <section className="section">
        <div className="wrap">
          <div className="mb-8 flex flex-wrap gap-2">
            {implementSections.map((s, i) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm hover:border-[var(--teal)]"
              >
                {String(i + 1).padStart(2, "0")} · {s.title.split("—")[0].trim()}
              </a>
            ))}
          </div>

          <div className="space-y-10">
            {implementSections.map((section, idx) => (
              <article key={section.id} id={section.id} className="card scroll-mt-24">
                <div className="text-xs font-semibold tracking-wide text-[var(--teal)] uppercase">
                  Section {String(idx + 1).padStart(2, "0")}
                </div>
                <h2 className="mt-1 text-2xl">{section.title}</h2>
                <p className="mt-2 text-[var(--muted)]">{section.intro}</p>
                <ol className="impl-list">
                  {section.steps.map((step, i) => (
                    <li key={step}>
                      <span className="num">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/checklist" className="btn btn-teal">
              Track on checklist
            </Link>
            <Link href="/flows" className="btn border border-[var(--border)] bg-white">
              Match to flows
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
