"use client";

import Link from "next/link";
import { FlowBlock } from "@/components/FlowBlock";
import { PageHeader } from "@/components/SiteChrome";
import {
  AssignmentAnimatedFlow,
  HisSyncAnimatedFlow,
  LeadJourneyAnimatedFlow,
  ReminderAnimatedFlow,
} from "@/components/AnimatedFlows";
import { diagrams } from "@/data/diagrams";

const toc = [
  { id: "lead-journey", label: "1. Lead journey" },
  { id: "assignment", label: "2. Assignment + SLA" },
  { id: "his-sync", label: "3. HIS C-Med sync" },
  { id: "reminders", label: "4. Appointment reminders" },
  { id: "reactivation", label: "5. Reactivation" },
  { id: "desk", label: "6. Support tickets" },
  { id: "architecture", label: "7. System architecture" },
];

export default function FlowsPage() {
  return (
    <>
      <PageHeader
        title="Process flows — follow & implement"
        description="Animated packets show how data moves between systems. Toggle Static diagram anytime. Then follow the Zoho steps under each flow."
      />

      <section className="section">
        <div className="wrap">
          <div className="card mb-8 sticky top-[72px] z-20 bg-white/95 backdrop-blur">
            <div className="mb-2 text-xs font-semibold tracking-wide text-[var(--muted)] uppercase">
              Jump to flow
            </div>
            <div className="flex flex-wrap gap-2">
              {toc.map((t) => (
                <a
                  key={t.id}
                  href={`#${t.id}`}
                  className="rounded-full border border-[var(--border)] px-3 py-1.5 text-sm hover:border-[var(--brand)] hover:text-[var(--brand-dark)]"
                >
                  {t.label}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <FlowBlock
              id="lead-journey"
              title="1. Lead → Appointment → Patient"
              purpose="End-to-end patient acquisition. Watch data move channel → CRM → call center → HIS → patient."
              zohoWhere="Zoho CRM · HIS · WhatsApp · SMS"
              chart={diagrams.leadJourney}
              animated={<LeadJourneyAnimatedFlow />}
              steps={[
                "CRM Setup → Pipelines: New, Contacted, Qualified, Appointment Booked, Visited, Converted to Patient + No-Show / Lost / Cancelled / Rebooked",
                "Lead fields required: Mobile, Branch, Service, Language, UTM/Campaign, Lost Reason, Consent",
                "Blueprint: require Lost Reason on Lost; require Branch+Service before Qualified",
                "On HIS Confirmed OR MRN created → Convert Lead to Contact; set MRN read-only",
                "Wire LeadChain + website/app webhooks so Excel Meta download is retired",
              ]}
            />

            <FlowBlock
              id="assignment"
              title="2. Lead assignment + 5-minute SLA"
              purpose="Blue packet = successful assign. Amber packet = missing Branch/Service/Language → queue + Cliq."
              zohoWhere="CRM Assignment Rules · Tasks · Cliq"
              chart={diagrams.assignment}
              animated={<AssignmentAnimatedFlow />}
              steps={[
                "Create Branch groups for call center users (28 branches)",
                "Assignment Rule order: Branch → Service → Language → Round Robin",
                "Fallback: Unassigned Central Queue + Cliq alert to supervisor",
                "Workflow on Lead Create: Task “First call”, Due = Now + 5 minutes",
                "Workflow: if still New after due → escalate Branch Manager + SLA Breach tag",
                "Sharing: agents see assigned leads only; managers see branch",
              ]}
            />

            <FlowBlock
              id="his-sync"
              title="3. HIS C-Med ↔ Zoho CRM"
              purpose="Request goes out to HIS. Green packet comes back with confirm / MRN."
              zohoWhere="CRM Functions · Middleware · HIS API"
              chart={diagrams.hisSync}
              animated={<HisSyncAnimatedFlow />}
              steps={[
                "Custom module: Appointments (Request ID, HIS Appt ID, Status, Branch, Service, Doctor, Slot)",
                "Statuses: Booked, Confirmed, Cancelled, No-Show, Rescheduled, Completed",
                "CRM → HIS: appointment REQUEST only (no diagnosis/Rx/labs)",
                "HIS → CRM: MRN, status changes, visit completed dates",
                "Middleware for auth, retry, mapping, Integration Errors module + Cliq",
                "Sandbox test: book / confirm / cancel / no-show / rebook / repeat patient",
              ]}
            />

            <FlowBlock
              id="reminders"
              title="4. Appointment reminders"
              purpose="One confirmation splits into two reminder packets (24h and 2h)."
              zohoWhere="CRM Workflow · WhatsApp AI · SMS Deluge"
              chart={diagrams.reminder}
              animated={<ReminderAnimatedFlow />}
              steps={[
                "Trigger when Appointment Status = Confirmed",
                "Schedule action at Appointment Datetime − 24 hours → WA + SMS templates AR/EN",
                "Schedule action at Appointment Datetime − 2 hours → WA + SMS",
                "Log each send as CRM activity; mark Reminder_24h / Reminder_2h checkboxes",
                "On No-Show status from HIS → enroll No-Show rebook journey in MA",
              ]}
            />

            <FlowBlock
              id="reactivation"
              title="5. Inactive patient reactivation"
              purpose="Bring back patients with no visit/appointment in 6 months."
              zohoWhere="CRM formula · Marketing Automation"
              chart={diagrams.reactivation}
              steps={[
                "Contact field: Last Visit Date (from HIS sync)",
                "Formula/Inactive flag: no visit or appointment in last 180 days",
                "Nightly workflow or MA segment: Inactive = true",
                "MA journey: WA → SMS → Email → Call task (as in diagram)",
                "Segments also: Diabetic, Dental, Lab, Optical, VIP, Post-surgery",
                "Campaign send requires Marketing Manager + Department Head approval",
              ]}
            />

            <FlowBlock
              id="desk"
              title="6. Support / complaints (Zoho Desk)"
              purpose="Patient issues tracked with SLA and linked to CRM."
              zohoWhere="Zoho Desk · CRM Contact sync"
              chart={diagrams.ticketFlow}
              steps={[
                "Departments: Appointment, Billing, Complaints, Service Info, Feedback",
                "Channels: email, web, chat, WhatsApp, call",
                "Assign by Branch + Category + Service",
                "SLA + escalation to Branch Manager then AVP",
                "Link ticket to CRM Contact; CSAT on close",
              ]}
            />

            <FlowBlock
              id="architecture"
              title="7. Full system architecture"
              purpose="How all channels and Zoho apps connect to HIS."
              zohoWhere="CRM Plus suite"
              chart={diagrams.systemArchitecture}
              steps={[
                "Enable CRM, MA, Desk, SalesIQ, Social, Projects, Analytics, Cliq",
                "LeadChain for Meta/Google/TikTok/Snap/LinkedIn (no Excel)",
                "SalesIQ AR/EN chatbot creates CRM leads + optional appt intent",
                "Zoho Projects replaces Asana for Marketing / IT / Ops",
                "Analytics dashboards: CEO, Branch, Marketing, CC, Appointments, ROI, Support",
                "Snapchat publishing stays native — leads still via LeadChain",
              ]}
            />
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/implement" className="btn btn-teal">
              Open micro-step runbook
            </Link>
            <Link
              href="/checklist"
              className="btn border border-[var(--border)] bg-white"
            >
              Track with checklist
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
