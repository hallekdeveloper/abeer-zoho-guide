"use client";

import { useState } from "react";
import { Mermaid } from "@/components/Mermaid";
import { PageHeader } from "@/components/SiteChrome";
import { blueprintSpecs, type BlueprintSpec } from "@/data/blueprintSpecs";

function CopyButton({ text, label }: { text: string; label?: string }) {
  const [ok, setOk] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setOk(true);
      setTimeout(() => setOk(false), 1600);
    } catch {
      setOk(false);
    }
  }

  return (
    <button type="button" onClick={copy} className="view-toggle">
      {ok ? "Copied ✓" : label ?? "Copy"}
    </button>
  );
}

function BlueprintCard({ bp }: { bp: BlueprintSpec }) {
  const fieldsText = bp.requiredFieldsBeforeEnable
    .map((f) => `${f.label}\t${f.apiName}\t${f.why}`)
    .join("\n");

  const picklistText = bp.picklistValues
    .map((p) => `${p.field}:\n${p.values.map((v) => `- ${v}`).join("\n")}`)
    .join("\n\n");

  return (
    <article id={bp.id} className="card scroll-mt-28 !p-6 space-y-2">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-wide text-[var(--brand)] uppercase">
            {bp.app} · {bp.module}
          </div>
          <h2 className="mt-1 text-3xl">{bp.name}</h2>
          <p className="mt-2 max-w-3xl text-[var(--muted)]">{bp.purpose}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyButton text={bp.copyPasteSetup} label="Copy full setup" />
          <a href="#top" className="view-toggle">
            ↑ Top
          </a>
        </div>
      </div>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        1. Flow diagram
      </h4>
      <div className="mermaid-box">
        <Mermaid chart={bp.mermaid} />
      </div>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        2. Prerequisites (do these first)
      </h4>
      <ol className="impl-list !mt-0">
        {bp.prerequisites.map((p, i) => (
          <li key={p}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{p}</span>
          </li>
        ))}
      </ol>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        3. Necessary fields before enabling blueprint
      </h4>
      <div className="mb-2">
        <CopyButton text={fieldsText} label="Copy field list" />
      </div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-[var(--brand-soft)] text-[10px] tracking-wide uppercase">
            <tr>
              <th className="px-3 py-2.5">Field label</th>
              <th className="px-3 py-2.5">API name (copy)</th>
              <th className="px-3 py-2.5">Why needed</th>
            </tr>
          </thead>
          <tbody>
            {bp.requiredFieldsBeforeEnable.map((f) => (
              <tr key={f.apiName} className="border-t border-[var(--border)]">
                <td className="px-3 py-2.5 font-medium">{f.label}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-[var(--brand-dark)]">
                  {f.apiName}
                </td>
                <td className="px-3 py-2.5 text-[var(--muted)]">{f.why}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        4. Picklist values (copy-paste into Zoho)
      </h4>
      <div className="mb-2">
        <CopyButton text={picklistText} label="Copy all picklists" />
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {bp.picklistValues.map((p) => (
          <div key={p.field} className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4">
            <div className="flex items-center justify-between gap-2">
              <code className="text-sm font-semibold text-[var(--brand-dark)]">{p.field}</code>
              <CopyButton text={p.values.join("\n")} label="Copy values" />
            </div>
            <ul className="mt-3 space-y-1 text-sm">
              {p.values.map((v) => (
                <li key={v}>• {v}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        5. Transitions (create one by one in Blueprint)
      </h4>
      <div className="space-y-3">
        {bp.transitions.map((t, i) => {
          const block = `Transition: ${t.transitionName}
From: ${t.from}
To: ${t.to}
Who: ${t.who}
Required fields: ${t.requiredFields.length ? t.requiredFields.join(", ") : "None"}
Criteria: ${t.criteria}
After actions: ${t.afterActions.length ? t.afterActions.join(" | ") : "None"}`;
          return (
            <div key={t.transitionName + i} className="rounded-xl border border-[var(--border)] p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="font-semibold text-[var(--ink)]">
                    {t.transitionName}
                  </div>
                  <div className="text-sm text-[var(--muted)]">
                    {t.from} → {t.to} · {t.who}
                  </div>
                </div>
                <CopyButton text={block} label="Copy transition" />
              </div>
              <div className="mt-3 grid gap-2 text-sm md:grid-cols-2">
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[var(--brand)] uppercase">
                    Required fields
                  </div>
                  <p className="mt-1">
                    {t.requiredFields.length
                      ? t.requiredFields.map((f) => (
                          <code key={f} className="mr-2 inline-block rounded bg-[var(--brand-soft)] px-1.5 py-0.5 text-xs">
                            {f}
                          </code>
                        ))
                      : "None"}
                  </p>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-wide text-[var(--brand)] uppercase">
                    Criteria
                  </div>
                  <p className="mt-1 text-[var(--muted)]">{t.criteria}</p>
                </div>
                <div className="md:col-span-2">
                  <div className="text-xs font-semibold tracking-wide text-[var(--brand)] uppercase">
                    After actions
                  </div>
                  <p className="mt-1 text-[var(--muted)]">
                    {t.afterActions.length ? t.afterActions.join(" · ") : "None"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h4 className="mt-6 mb-2 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
        6. Copy-paste setup block
      </h4>
      <pre className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[#0f2744] p-4 text-xs leading-relaxed text-white whitespace-pre-wrap">
        {bp.copyPasteSetup}
      </pre>
      <div className="mt-2">
        <CopyButton text={bp.copyPasteSetup} label="Copy setup block" />
      </div>
    </article>
  );
}

export default function BlueprintsPage() {
  return (
    <>
      <div id="top" />
      <PageHeader
        title="Blueprints — flows, fields, prerequisites"
        description="Every blueprint with a flow diagram, what you must create first, mandatory fields, picklists, and copy-paste transitions. Open Zoho → follow top to bottom → done."
      />

      <section className="section">
        <div className="wrap space-y-6">
          <div className="card sticky top-[72px] z-20 bg-white/95 backdrop-blur">
            <div className="mb-2 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
              Jump to blueprint
            </div>
            <div className="flex flex-wrap gap-2">
              {blueprintSpecs.map((b, i) => (
                <a
                  key={b.id}
                  href={`#${b.id}`}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--brand)]"
                >
                  {i + 1}. {b.name}
                </a>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Order tip: finish <strong>fields + picklists</strong> from Zoho Build → CRM,
              then enable <strong>BP_Lead_Journey</strong> first.
            </p>
          </div>

          <div className="space-y-8">
            {blueprintSpecs.map((bp) => (
              <BlueprintCard key={bp.id} bp={bp} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
