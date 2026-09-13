"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/SiteChrome";
import { buildSpecs, type AppBuildSpec, type FieldSpec } from "@/data/buildSpecs";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="mt-8 mb-3 text-sm font-semibold tracking-wide text-[var(--brand)] uppercase">
      {children}
    </h4>
  );
}

function NameList({ items }: { items: { name: string; detail: string }[] }) {
  if (!items.length) {
    return <p className="text-sm text-[var(--muted)]">None for this app in v1 scope.</p>;
  }
  return (
    <ol className="impl-list !mt-0">
      {items.map((item, i) => (
        <li key={item.name + i}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <span>
            <strong className="text-[var(--ink)]">{item.name}</strong>
            <span className="text-[var(--muted)]"> — {item.detail}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function FieldsTable({ fields }: { fields: FieldSpec[] }) {
  const modules = useMemo(() => {
    const set = Array.from(new Set(fields.map((f) => f.module)));
    return set;
  }, [fields]);

  const [moduleFilter, setModuleFilter] = useState<string>("All");

  const rows =
    moduleFilter === "All"
      ? fields
      : fields.filter((f) => f.module === moduleFilter);

  return (
    <div>
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          type="button"
          className={`view-toggle ${moduleFilter === "All" ? "active" : ""}`}
          onClick={() => setModuleFilter("All")}
        >
          All modules
        </button>
        {modules.map((m) => (
          <button
            key={m}
            type="button"
            className={`view-toggle ${moduleFilter === m ? "active" : ""}`}
            onClick={() => setModuleFilter(m)}
          >
            {m}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded-xl border border-[var(--border)]">
        <table className="w-full min-w-[860px] text-left text-sm">
          <thead className="bg-[var(--brand-soft)] text-[10px] tracking-wide uppercase">
            <tr>
              <th className="px-3 py-2.5">Module</th>
              <th className="px-3 py-2.5">Field label</th>
              <th className="px-3 py-2.5">API name</th>
              <th className="px-3 py-2.5">Type</th>
              <th className="px-3 py-2.5">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((f) => (
              <tr key={`${f.module}-${f.apiName}-${f.label}`} className="border-t border-[var(--border)]">
                <td className="px-3 py-2.5 whitespace-nowrap text-[var(--muted)]">{f.module}</td>
                <td className="px-3 py-2.5 font-medium">{f.label}</td>
                <td className="px-3 py-2.5 font-mono text-xs text-[var(--brand-dark)]">
                  {f.apiName}
                </td>
                <td className="px-3 py-2.5 whitespace-nowrap">{f.type}</td>
                <td className="px-3 py-2.5 text-[var(--muted)]">{f.notes || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-[var(--muted)]">{rows.length} fields shown</p>
    </div>
  );
}

function AppPanel({ spec }: { spec: AppBuildSpec }) {
  return (
    <article id={spec.id} className="card scroll-mt-28 !p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="text-xs font-semibold tracking-wide text-[var(--brand)] uppercase">
            {spec.owner}
          </div>
          <h2 className="mt-1 text-3xl">{spec.app}</h2>
          <p className="mt-2 max-w-3xl text-[var(--muted)]">{spec.role}</p>
        </div>
        <a href="#top" className="text-sm text-[var(--brand)] hover:underline">
          ↑ Back to apps
        </a>
      </div>

      <SectionTitle>Modules to create / use</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {spec.modules.map((m) => (
          <span key={m} className="chip">
            {m}
          </span>
        ))}
      </div>

      <SectionTitle>Build order (do in sequence)</SectionTitle>
      <NameList
        items={spec.buildOrder.map((b, i) => ({
          name: `Step ${i + 1}`,
          detail: b,
        }))}
      />

      <SectionTitle>Fields (label · API name · type)</SectionTitle>
      <FieldsTable fields={spec.fields} />

      <SectionTitle>Layouts</SectionTitle>
      <NameList items={spec.layouts} />

      <SectionTitle>Pipelines / statuses / journeys</SectionTitle>
      <NameList items={spec.pipelinesOrStatuses} />

      <SectionTitle>Workflows (exact names to create)</SectionTitle>
      <NameList items={spec.workflows} />

      <SectionTitle>Blueprints</SectionTitle>
      <NameList items={spec.blueprints} />

      <SectionTitle>Assignment rules</SectionTitle>
      <NameList items={spec.assignmentRules} />

      <SectionTitle>Deluge / functions / webhooks (exact names)</SectionTitle>
      <NameList items={spec.functions} />

      <SectionTitle>Integrations with other apps / systems</SectionTitle>
      <NameList items={spec.integrations} />

      <SectionTitle>Reports & dashboards</SectionTitle>
      <NameList items={spec.reportsDashboards} />

      <SectionTitle>Roles & permissions</SectionTitle>
      <NameList items={spec.rolesPermissions} />
    </article>
  );
}

export default function BuildPage() {
  return (
    <>
      <div id="top" />
      <PageHeader
        title="Zoho Build Spec — implement field by field"
        description="Complete configuration guide for Zoho CRM, Marketing Automation, Desk, SalesIQ, Social, Projects, and Analytics. Use the exact names below inside Zoho."
      />

      <section className="section">
        <div className="wrap space-y-6">
          <div className="card sticky top-[72px] z-20 bg-white/95 backdrop-blur">
            <div className="mb-2 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
              Jump to app
            </div>
            <div className="flex flex-wrap gap-2">
              {buildSpecs.map((s, i) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--brand)] hover:text-[var(--brand-dark)]"
                >
                  {i + 1}. {s.app}
                </a>
              ))}
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">
              Start with <strong>Zoho CRM</strong> — every other app depends on its
              fields, modules, and functions.
            </p>
          </div>

          <div className="space-y-8">
            {buildSpecs.map((spec) => (
              <AppPanel key={spec.id} spec={spec} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
