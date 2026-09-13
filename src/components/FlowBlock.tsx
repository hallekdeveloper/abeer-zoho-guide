"use client";

import { useState, type ReactNode } from "react";
import { Mermaid } from "@/components/Mermaid";

export function FlowBlock({
  id,
  title,
  purpose,
  zohoWhere,
  chart,
  steps,
  animated,
}: {
  id: string;
  title: string;
  purpose: string;
  zohoWhere: string;
  chart: string;
  steps: string[];
  animated?: ReactNode;
}) {
  const [view, setView] = useState<"animated" | "static">(
    animated ? "animated" : "static",
  );

  return (
    <article id={id} className="flow-card scroll-mt-24">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3>{title}</h3>
          <p className="flow-meta">{purpose}</p>
        </div>
        <span className="chip">{zohoWhere}</span>
      </div>

      {animated ? (
        <div className="mb-3 flex flex-wrap gap-2">
          <button
            type="button"
            className={`view-toggle ${view === "animated" ? "active" : ""}`}
            onClick={() => setView("animated")}
          >
            Animated data flow
          </button>
          <button
            type="button"
            className={`view-toggle ${view === "static" ? "active" : ""}`}
            onClick={() => setView("static")}
          >
            Static diagram
          </button>
        </div>
      ) : null}

      <div className="mermaid-box">
        {animated && view === "animated" ? animated : <Mermaid chart={chart} />}
      </div>

      <h4 className="mt-4 mb-0 text-sm font-semibold tracking-wide text-[var(--brand-dark)] uppercase">
        Implement this in Zoho
      </h4>
      <ol className="impl-list">
        {steps.map((step, i) => (
          <li key={step}>
            <span className="num">{String(i + 1).padStart(2, "0")}</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </article>
  );
}
