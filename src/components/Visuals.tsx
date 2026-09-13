export function LeadJourneyVisual() {
  const steps = [
    { label: "Lead in", detail: "Ads · Web · App · WA · Call", tone: "gold" as const },
    { label: "Zoho CRM", detail: "Create Lead + UTM", tone: "accent" as const },
    { label: "Auto-assign", detail: "Branch + Service + Lang", tone: "default" as const },
    { label: "Call ≤ 5 min", detail: "Qualify / Lost reason", tone: "default" as const },
    { label: "Appt request", detail: "CRM → HIS C-Med", tone: "gold" as const },
    { label: "HIS confirm", detail: "MRN / status sync", tone: "accent" as const },
    { label: "Reminders", detail: "24h + 2h WA/SMS", tone: "default" as const },
    { label: "Visit / Retain", detail: "Patient + MA journeys", tone: "accent" as const },
  ];

  return (
    <div className="flow-board">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <div className="eyebrow">Master process</div>
          <h3 className="mt-1 text-2xl">Lead → Appointment → Patient</h3>
        </div>
        <div className="hidden text-right text-xs text-[var(--ink-soft)] sm:block">
          SLA first contact
          <div className="font-[family-name:var(--font-display)] text-2xl text-[var(--teal)]">
            5 min
          </div>
        </div>
      </div>
      <div className="gold-rule-left mb-6 max-w-xs" />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <div key={s.label} className="relative">
            <div
              className={`flow-node h-full ${
                s.tone === "accent" ? "accent" : s.tone === "gold" ? "gold" : ""
              }`}
            >
              <div className="mb-1 text-[10px] tracking-[0.2em] uppercase opacity-70">
                Step {String(i + 1).padStart(2, "0")}
              </div>
              <div className="font-medium">{s.label}</div>
              <div className="mt-1 opacity-80">{s.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureVisual() {
  const channels = [
    "Meta / Google / TikTok / Snap / LinkedIn",
    "Website & Landing pages",
    "Mobile App",
    "WhatsApp AI",
    "Call Center",
    "SMS Provider",
  ];
  const zoho = [
    "CRM",
    "Marketing Automation",
    "Desk",
    "SalesIQ",
    "Social",
    "Projects",
    "Analytics",
  ];

  return (
    <div className="flow-board overflow-hidden">
      <div className="eyebrow">System map</div>
      <h3 className="mt-1 mb-6 text-2xl">End-to-end architecture</h3>
      <div className="grid gap-4 lg:grid-cols-[1fr_auto_1.2fr_auto_0.9fr] lg:items-stretch">
        <div className="lux-card p-4">
          <div className="mb-3 text-xs tracking-[0.18em] text-[var(--gold)] uppercase">
            Channels
          </div>
          <div className="space-y-2">
            {channels.map((c) => (
              <div key={c} className="flow-node">
                {c}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden items-center justify-center text-[var(--gold)] lg:flex">
          →
        </div>

        <div className="bg-[var(--teal-deep)] p-4 text-[#fffcf7]">
          <div className="mb-3 text-xs tracking-[0.18em] text-[var(--gold-soft)] uppercase">
            Zoho CRM Plus
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {zoho.map((z) => (
              <div
                key={z}
                className="border border-white/15 bg-white/5 px-3 py-2 text-sm"
              >
                {z}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-white/65">
            Relationship, marketing, support & BI hub — non-clinical data only
          </p>
        </div>

        <div className="hidden items-center justify-center text-[var(--gold)] lg:flex">
          ↔
        </div>

        <div className="border border-[var(--gold)]/40 bg-gradient-to-b from-[#f3ead2] to-[#fffcf7] p-4">
          <div className="mb-3 text-xs tracking-[0.18em] text-[var(--teal)] uppercase">
            Source of truth
          </div>
          <div className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
            HIS C-Med
          </div>
          <ul className="mt-4 space-y-2 text-sm text-[var(--ink-soft)]">
            <li>MRN & clinical records</li>
            <li>Confirmed appointments</li>
            <li>Visit completion</li>
            <li>Never replaced by Zoho</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AssignmentVisual() {
  return (
    <div className="flow-board">
      <div className="eyebrow">Routing logic</div>
      <h3 className="mt-1 mb-6 text-2xl">Lead assignment</h3>
      <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center">
        <div className="flow-node accent min-w-[120px] text-center">New Lead</div>
        <div className="flow-arrow">→</div>
        <div className="flow-node gold flex-1 text-center">
          Preferred Branch?
        </div>
        <div className="flow-arrow">→</div>
        <div className="flow-node gold flex-1 text-center">Service Interest?</div>
        <div className="flow-arrow">→</div>
        <div className="flow-node gold flex-1 text-center">Language AR/EN?</div>
        <div className="flow-arrow">→</div>
        <div className="flow-node accent flex-1 text-center">
          Round-robin
          <div className="mt-1 text-[11px] opacity-80">Branch call center</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <div className="flow-node danger">
          No match → Unassigned queue + Cliq alert
        </div>
        <div className="flow-node">
          Task created: First call due = Created + 5 minutes
        </div>
      </div>
    </div>
  );
}

export function HisSequenceVisual() {
  const rows = [
    { who: "Patient / Agent", act: "Requests appointment in App / Web / CRM / WA" },
    { who: "Zoho CRM", act: "Creates Appointment Request (non-clinical payload)" },
    { who: "Middleware", act: "Auth, map fields, retry, log Integration Errors" },
    { who: "HIS C-Med", act: "Confirms / rejects slot · owns clinical truth" },
    { who: "Zoho CRM", act: "Status + MRN sync · convert Lead → Contact" },
    { who: "Channels", act: "Confirmation + reminders via WA / SMS / Push" },
  ];

  return (
    <div className="flow-board">
      <div className="eyebrow">Integration sequence</div>
      <h3 className="mt-1 mb-6 text-2xl">HIS C-Med ↔ Zoho CRM</h3>
      <div className="space-y-2">
        {rows.map((r, i) => (
          <div
            key={r.who + i}
            className="grid gap-3 border border-[var(--line)] bg-white p-3 md:grid-cols-[160px_40px_1fr] md:items-center"
          >
            <div className="text-xs tracking-wide text-[var(--teal)] uppercase">
              {r.who}
            </div>
            <div className="hidden text-center text-[var(--gold)] md:block">→</div>
            <div className="text-sm">{r.act}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataBoundaryVisual() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="border border-[var(--ok)]/30 bg-[#eef6f1] p-6">
        <div className="eyebrow !text-[var(--ok)]">Allowed in Zoho</div>
        <h3 className="mt-2 text-2xl text-[var(--ok)]">Store & process</h3>
        <ul className="mt-5 space-y-2.5 text-sm">
          {[
            "Name, mobile, email",
            "National ID (masked / encrypted)",
            "MRN — read-only from HIS",
            "Branch / service / doctor preferences",
            "Appointment & visit status history",
            "Segments, consents, campaign UTM",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-[var(--ok)]">✓</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="border border-[var(--danger)]/30 bg-[#faf0f0] p-6">
        <div className="eyebrow !text-[var(--danger)]">Forbidden in Zoho</div>
        <h3 className="mt-2 text-2xl text-[var(--danger)]">HIS only</h3>
        <ul className="mt-5 space-y-2.5 text-sm">
          {[
            "Diagnosis",
            "Prescriptions",
            "Lab results",
            "Treatment notes",
            "Full medical history",
          ].map((x) => (
            <li key={x} className="flex gap-2">
              <span className="text-[var(--danger)]">✕</span>
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ReactivationVisual() {
  const steps = [
    "Inactive 6+ months",
    "MA journey starts",
    "WhatsApp offer",
    "SMS follow-up",
    "Email",
    "Call task",
    "Rebook → HIS",
  ];
  return (
    <div className="flow-board">
      <div className="eyebrow">Retention engine</div>
      <h3 className="mt-1 mb-6 text-2xl">Patient reactivation journey</h3>
      <div className="flex flex-wrap items-center gap-2">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`flow-node ${i === 0 || i === steps.length - 1 ? "accent" : "gold"}`}>
              {s}
            </div>
            {i < steps.length - 1 ? (
              <span className="text-[var(--gold)]">→</span>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function RoadmapVisual() {
  const phases = [
    { p: "0", n: "Prerequisites", w: "1 wk" },
    { p: "1", n: "Zoho CRM", w: "4 wk" },
    { p: "2", n: "Integrations", w: "2 wk" },
    { p: "3", n: "Desk", w: "2 wk" },
    { p: "4", n: "SalesIQ", w: "2 wk" },
    { p: "5", n: "MA", w: "2 wk" },
    { p: "6", n: "Social", w: "1 wk" },
    { p: "7", n: "Projects", w: "1 wk" },
    { p: "8", n: "Analytics", w: "1 wk" },
    { p: "9", n: "Migration", w: "2 wk" },
    { p: "10", n: "UAT / Live", w: "2 wk" },
  ];
  return (
    <div className="flow-board">
      <div className="eyebrow">BRD timeline</div>
      <h3 className="mt-1 mb-2 text-2xl">Implementation phases</h3>
      <p className="mb-6 text-sm text-[var(--ink-soft)]">
        ≈ 19 weeks full plan · Go live in waves for early value
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {phases.map((ph) => (
          <div key={ph.p} className="border border-[var(--line-strong)] bg-white p-3">
            <div className="text-[10px] tracking-[0.2em] text-[var(--gold)] uppercase">
              Phase {ph.p}
            </div>
            <div className="mt-1 font-medium">{ph.n}</div>
            <div className="mt-2 text-xs text-[var(--ink-soft)]">{ph.w}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
