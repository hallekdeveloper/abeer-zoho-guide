"use client";

import { useEffect, useId, useState } from "react";

type MermaidProps = {
  chart: string;
};

export function Mermaid({ chart }: MermaidProps) {
  const reactId = useId().replace(/:/g, "");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    async function draw() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "default",
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 16,
            nodeSpacing: 40,
            rankSpacing: 45,
          },
          sequence: {
            actorMargin: 40,
            messageMargin: 40,
            mirrorActors: false,
          },
          themeVariables: {
            fontFamily: "Outfit, system-ui, sans-serif",
            fontSize: "14px",
            primaryColor: "#e8eef6",
            primaryTextColor: "#1a2332",
            primaryBorderColor: "#1e4a7a",
            lineColor: "#4a6280",
            secondaryColor: "#ffffff",
            tertiaryColor: "#f3f5f9",
          },
        });

        const id = `mmd-${reactId}-${Math.floor(Math.random() * 1e6)}`;
        const { svg: rendered } = await mermaid.render(id, chart.trim());
        if (!cancelled) {
          setSvg(rendered);
          setError("");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : String(e));
        }
      }
    }

    draw();
    return () => {
      cancelled = true;
    };
  }, [chart, reactId]);

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
        Diagram failed to render: {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="flex min-h-[160px] items-center justify-center text-sm text-[var(--muted)]">
        Loading diagram…
      </div>
    );
  }

  return (
    <div
      className="mermaid-svg"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
