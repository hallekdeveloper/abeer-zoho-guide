"use client";

import { useId, useMemo } from "react";

export type FlowNode = {
  id: string;
  label: string;
  detail?: string;
  x: number;
  y: number;
  w?: number;
  h?: number;
  kind?: "start" | "process" | "decision" | "queue" | "success" | "system";
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  /** fail path = amber packet */
  tone?: "ok" | "fail" | "sync";
  /** seconds before packet starts */
  delay?: number;
  /** loop duration seconds */
  duration?: number;
  /** curved path: left | right | straight */
  bend?: "left" | "right" | "straight";
};

type Props = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  width?: number;
  height?: number;
  caption?: string;
};

function nodeBox(n: FlowNode) {
  const w = n.w ?? (n.kind === "decision" ? 150 : 200);
  const h = n.h ?? (n.kind === "decision" ? 70 : 56);
  return { w, h, cx: n.x + w / 2, cy: n.y + h / 2, ...{ x: n.x, y: n.y } };
}

function edgePath(
  from: FlowNode,
  to: FlowNode,
  bend: FlowEdge["bend"] = "straight",
) {
  const a = nodeBox(from);
  const b = nodeBox(to);
  const x1 = a.cx;
  const y1 = a.y + a.h;
  const x2 = b.cx;
  const y2 = b.y;

  if (bend === "left") {
    const sx = a.x;
    const sy = a.cy;
    const ex = b.x + b.w;
    const ey = b.cy;
    const midX = Math.min(sx, ex) - 36;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  }
  if (bend === "right") {
    const sx = a.x + a.w;
    const sy = a.cy;
    const ex = b.x;
    const ey = b.cy;
    const midX = Math.max(sx, ex) + 36;
    return `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ey}, ${ex} ${ey}`;
  }

  // horizontal-ish connection (side to side)
  if (Math.abs(a.cy - b.cy) < 30 && Math.abs(a.cx - b.cx) > 80) {
    const left = a.cx < b.cx;
    const sx = left ? a.x + a.w : a.x;
    const ex = left ? b.x : b.x + b.w;
    const sy = a.cy;
    const ey = b.cy;
    return `M ${sx} ${sy} L ${ex} ${ey}`;
  }

  const midY = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${midY}, ${x2} ${midY}, ${x2} ${y2}`;
}

export function AnimatedDataFlow({
  nodes,
  edges,
  width = 720,
  height = 640,
  caption,
}: Props) {
  const uid = useId().replace(/:/g, "");
  const map = useMemo(() => {
    const m = new Map<string, FlowNode>();
    nodes.forEach((n) => m.set(n.id, n));
    return m;
  }, [nodes]);

  return (
    <div className="animated-flow">
      <div className="animated-flow-legend">
        <span>
          <i className="dot ok" /> Data moving (success path)
        </span>
        <span>
          <i className="dot fail" /> Fallback / alert path
        </span>
        <span>
          <i className="dot sync" /> Sync / API response
        </span>
      </div>

      <div className="animated-flow-canvas">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="animated-flow-svg"
          role="img"
          aria-label={caption ?? "Animated data flow"}
        >
          <defs>
            <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker
              id={`arrow-${uid}`}
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7a8fa8" />
            </marker>
          </defs>

          {edges.map((e, i) => {
            const from = map.get(e.from);
            const to = map.get(e.to);
            if (!from || !to) return null;
            const d = edgePath(from, to, e.bend);
            const tone = e.tone ?? "ok";
            const dur = e.duration ?? 2.8;
            const delay = e.delay ?? i * 0.45;
            const color =
              tone === "fail" ? "#c47a2c" : tone === "sync" ? "#2a8f7b" : "#1e4a7a";

            return (
              <g key={`${e.from}-${e.to}-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="#c5d0de"
                  strokeWidth="2"
                  markerEnd={`url(#arrow-${uid})`}
                />
                {/* dashed trail */}
                <path
                  d={d}
                  fill="none"
                  stroke={color}
                  strokeWidth="2"
                  strokeDasharray="6 10"
                  opacity="0.35"
                  className="flow-dash"
                />
                {e.label ? (
                  <text
                    x={(nodeBox(from).cx + nodeBox(to).cx) / 2 + (e.bend === "left" ? -50 : e.bend === "right" ? 50 : 8)}
                    y={(nodeBox(from).y + nodeBox(from).h + to.y) / 2}
                    className="edge-label"
                  >
                    {e.label}
                  </text>
                ) : null}
                {/* flying data packet */}
                <circle r="5.5" fill={color} filter={`url(#glow-${uid})`}>
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
                <circle r="2.2" fill="#fff">
                  <animateMotion
                    dur={`${dur}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              </g>
            );
          })}

          {nodes.map((n) => {
            const { w, h } = nodeBox(n);
            const kind = n.kind ?? "process";
            if (kind === "decision") {
              const cx = n.x + w / 2;
              const cy = n.y + h / 2;
              const points = `${cx},${n.y} ${n.x + w},${cy} ${cx},${n.y + h} ${n.x},${cy}`;
              return (
                <g key={n.id}>
                  <polygon
                    points={points}
                    className="node-decision"
                  />
                  <text x={cx} y={cy - 2} textAnchor="middle" className="node-title">
                    {n.label}
                  </text>
                  {n.detail ? (
                    <text x={cx} y={cy + 14} textAnchor="middle" className="node-detail">
                      {n.detail}
                    </text>
                  ) : null}
                </g>
              );
            }

            return (
              <g key={n.id}>
                <rect
                  x={n.x}
                  y={n.y}
                  width={w}
                  height={h}
                  rx="10"
                  className={`node-rect node-${kind}`}
                />
                <text
                  x={n.x + w / 2}
                  y={n.y + (n.detail ? h / 2 - 6 : h / 2 + 4)}
                  textAnchor="middle"
                  className="node-title"
                >
                  {n.label}
                </text>
                {n.detail ? (
                  <text
                    x={n.x + w / 2}
                    y={n.y + h / 2 + 12}
                    textAnchor="middle"
                    className="node-detail"
                  >
                    {n.detail}
                  </text>
                ) : null}
              </g>
            );
          })}
        </svg>
      </div>

      {caption ? <p className="animated-flow-caption">{caption}</p> : null}
    </div>
  );
}
