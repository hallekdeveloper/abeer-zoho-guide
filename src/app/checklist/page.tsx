"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/SiteChrome";
import { implementSections } from "@/data/content";

type CheckState = Record<string, boolean>;
const KEY = "abeer-zoho-checklist-v1";

export default function ChecklistPage() {
  const items = useMemo(
    () =>
      implementSections.flatMap((section) =>
        section.steps.map((step, i) => ({
          id: `${section.id}-${i}`,
          section: section.title,
          step,
        })),
      ),
    [],
  );

  const [checked, setChecked] = useState<CheckState>({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw) as CheckState);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(checked));
  }, [checked, ready]);

  const done = Object.values(checked).filter(Boolean).length;
  const total = items.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  let last = "";

  return (
    <>
      <PageHeader
        title="Implementation checklist"
        description="Tick steps as you finish them in Zoho. Progress saves in this browser."
      />

      <section className="section">
        <div className="wrap">
          <div className="card mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-sm text-[var(--muted)]">Progress</div>
              <div className="font-[family-name:var(--font-display)] text-4xl text-[var(--teal-dark)]">
                {pct}%
              </div>
              <div className="text-sm text-[var(--muted)]">
                {done} / {total} steps
              </div>
            </div>
            <div className="flex gap-2">
              <Link href="/implement" className="btn btn-teal !py-2">
                Runbook
              </Link>
              <button
                type="button"
                className="btn border border-[var(--border)] bg-white !py-2"
                onClick={() => setChecked({})}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mb-6 h-2 overflow-hidden rounded-full bg-[var(--teal-soft)]">
            <div
              className="h-full bg-[var(--teal)] transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>

          <div className="space-y-2">
            {items.map((item) => {
              const show = item.section !== last;
              last = item.section;
              return (
                <div key={item.id}>
                  {show ? (
                    <h3 className="mt-8 mb-3 text-xl first:mt-0">{item.section}</h3>
                  ) : null}
                  <label
                    className={`flex cursor-pointer gap-3 rounded-lg border px-4 py-3 text-sm ${
                      checked[item.id]
                        ? "border-[var(--teal)] bg-[var(--teal-soft)]"
                        : "border-[var(--border)] bg-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="mt-1 accent-[var(--teal)]"
                      checked={!!checked[item.id]}
                      onChange={() =>
                        setChecked((p) => ({ ...p, [item.id]: !p[item.id] }))
                      }
                    />
                    <span className={checked[item.id] ? "line-through opacity-70" : ""}>
                      {item.step}
                    </span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
