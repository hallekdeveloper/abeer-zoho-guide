export const brand = {
  partner: "Hallek Technologies",
  client: "Al Abeer Medical Group",
  product: "Zoho CRM Plus Implementation",
  subtitle:
    "End-to-end solution blueprint — architecture, flows, and micro-steps you can implement directly in Zoho.",
};

export const stats = [
  { label: "Branches", value: "28" },
  { label: "Zoho apps", value: "7+" },
  { label: "Integrations", value: "7+" },
  { label: "Users (phase 1)", value: "30–50" },
];

export const goals = [
  "Convert digital leads into booked visits and retained patients",
  "Replace Excel Meta downloads with one CRM pipeline",
  "Automate WhatsApp / SMS / email / push for reminders & reactivation",
  "Integrate HIS C-Med, app, website, call center — never replace clinical HIS",
  "Replace Asana with Zoho Projects; give CEO live Analytics dashboards",
];

export const hardRules = [
  {
    title: "HIS C-Med = source of truth",
    detail: "Patient clinical data and confirmed appointments live only in HIS.",
  },
  {
    title: "Non-clinical in Zoho only",
    detail: "Name, mobile, email, National ID, MRN (read-only), prefs, appointment status history.",
  },
  {
    title: "Forbidden in CRM",
    detail: "Diagnosis, prescriptions, lab results, treatment notes, medical history.",
  },
  {
    title: "Assignment rule",
    detail: "Branch + Service + Language → round-robin in branch call-center team. SLA: 5 minutes.",
  },
  {
    title: "Inactive patient",
    detail: "No visit/appointment in 6 months → automated reactivation journey.",
  },
  {
    title: "Lead → Contact",
    detail: "When HIS confirms appointment OR MRN is created after first visit.",
  },
];

export const apps = [
  {
    name: "Zoho CRM",
    role: "Lead → patient journey hub",
    owner: "Call Center + Marketing",
    bullets: [
      "Lead pipeline & stages",
      "Branch / service / language assignment",
      "Duplicate check (Mobile + National ID + MRN)",
      "Appointment request tracking",
      "5-min first-contact SLA",
    ],
  },
  {
    name: "Marketing Automation",
    role: "Journeys & reactivation",
    owner: "Marketing",
    bullets: [
      "Appointment reminder campaigns",
      "Inactive patient reactivation",
      "Promotional & health awareness",
      "Campaign approval workflow",
      "Segment: Diabetic, Dental, Lab, Optical, VIP…",
    ],
  },
  {
    name: "Zoho Desk",
    role: "Support & complaints",
    owner: "Customer Support",
    bullets: [
      "Tickets by branch + category + service",
      "SLA & escalation rules",
      "CSAT after close",
      "Linked to CRM patient records",
      "Channels: email, chat, WA, call, web",
    ],
  },
  {
    name: "SalesIQ",
    role: "Live chat + AR/EN chatbot",
    owner: "Marketing + Support",
    bullets: [
      "Website & mobile chat",
      "FAQ + lead qualification",
      "Appointment intent flow",
      "Handover to live agent",
      "CRM lead creation",
    ],
  },
  {
    name: "Zoho Social",
    role: "Social publishing & inbox",
    owner: "Social Media",
    bullets: [
      "Post scheduling & approvals",
      "FB, IG, LinkedIn, X, TikTok, YT, GBP…",
      "Branch page tracking",
      "Snapchat: native only (not in Zoho Social)",
      "Performance reports",
    ],
  },
  {
    name: "Zoho Projects",
    role: "Replace Asana",
    owner: "Marketing / IT / Ops",
    bullets: [
      "Campaign briefs & creative approval",
      "IT & operations templates",
      "Milestones, deadlines, time tracking",
      "Attachments & versioning",
      "Project dashboards",
    ],
  },
  {
    name: "Zoho Analytics",
    role: "CEO & KPI dashboards",
    owner: "Management",
    bullets: [
      "CEO / Management / Branch packs",
      "Lead conversion & call center",
      "Appointment show rate",
      "Campaign ROI / ROAS / CPA",
      "Support & reactivation KPIs",
    ],
  },
];

export const integrations = [
  {
    system: "HIS C-Med",
    direction: "Bi-directional",
    data: "MRN, appointments, visits (non-clinical)",
    method: "REST API + middleware",
  },
  {
    system: "Meta / Google / TikTok / Snap / LinkedIn",
    direction: "In → CRM",
    data: "Lead Ads + UTM",
    method: "Zoho LeadChain",
  },
  {
    system: "Website / Landing pages",
    direction: "In → CRM",
    data: "Forms, abandoned booking",
    method: "Webforms / MA LPs / Webhooks",
  },
  {
    system: "Mobile App",
    direction: "Bi-directional",
    data: "Leads, appt requests, confirmations, push",
    method: "Client APIs + CRM Functions",
  },
  {
    system: "Grandstream / AI Call Center",
    direction: "Bi-directional",
    data: "CDR, recordings, click-to-call, missed calls",
    method: "CTI / Telephony API",
  },
  {
    system: "WhatsApp AI",
    direction: "Bi-directional",
    data: "Leads, booking, reminders, campaigns",
    method: "Provider API + webhooks",
  },
  {
    system: "SMS Provider",
    direction: "Out from Zoho",
    data: "Reminders, transactional SMS",
    method: "SMS gateway via Deluge",
  },
];

export const leadStages = [
  "New",
  "Contacted",
  "Qualified",
  "Appointment Booked",
  "Visited",
  "Converted to Patient",
  "No-Show",
  "Lost",
  "Rebooked",
  "Cancelled",
];

export const lostReasons = [
  "No answer",
  "Not interested",
  "Price concern",
  "Booked with competitor",
  "Wrong number",
  "Service not available at branch",
];

export const waves = [
  {
    id: "wave-a",
    name: "Wave A — Foundation",
    tag: "Quick wins",
    color: "teal",
    summary: "CRM org, pipeline, assignment, LeadChain + website forms",
    phases: ["0 Prerequisites", "1 Zoho CRM", "Lead capture start"],
  },
  {
    id: "wave-b",
    name: "Wave B — Patient loop",
    tag: "Critical",
    color: "gold",
    summary: "HIS C-Med sync, reminders, call center CTI, WhatsApp/SMS",
    phases: ["2 Integrations hub"],
  },
  {
    id: "wave-c",
    name: "Wave C — Experience & growth",
    tag: "Advanced",
    color: "ink",
    summary: "Desk, SalesIQ, MA journeys, Social, Projects, Analytics, migration, go-live",
    phases: ["3–11 Desk → Go-Live"],
  },
];

export const roadmap = [
  {
    phase: "0",
    name: "Prerequisites & Access",
    weeks: "Week 0",
    focus: "Accounts, APIs, master data, security sign-off",
  },
  {
    phase: "1",
    name: "Zoho CRM Core",
    weeks: "4 weeks",
    focus: "Modules, stages, assignment, duplicates, branch model",
  },
  {
    phase: "2",
    name: "Integrations Hub",
    weeks: "2 weeks",
    focus: "Lead ads, web/app, HIS, call center, WA, SMS",
  },
  {
    phase: "3",
    name: "Zoho Desk",
    weeks: "2 weeks",
    focus: "Tickets, SLA, branch routing, CRM link",
  },
  {
    phase: "4",
    name: "SalesIQ Chatbot",
    weeks: "2 weeks",
    focus: "AR/EN chat, FAQ, lead create, agent handover",
  },
  {
    phase: "5",
    name: "Marketing Automation",
    weeks: "2 weeks",
    focus: "Segments, reminders, reactivation journeys",
  },
  {
    phase: "6",
    name: "Zoho Social",
    weeks: "1 week",
    focus: "Scheduling, approvals, supported channels",
  },
  {
    phase: "7",
    name: "Zoho Projects",
    weeks: "1 week",
    focus: "Replace Asana — Marketing/IT/Ops templates",
  },
  {
    phase: "8",
    name: "Zoho Analytics",
    weeks: "1 week",
    focus: "CEO + branch + marketing + support dashboards",
  },
  {
    phase: "9",
    name: "Data Migration",
    weeks: "2 weeks",
    focus: "Excel/HIS non-clinical import + dedupe",
  },
  {
    phase: "10–11",
    name: "Training, UAT, Go-Live",
    weeks: "2 weeks",
    focus: "AR/EN training, UAT, handover, 30-day support",
  },
];

export type ImplementSection = {
  id: string;
  title: string;
  intro: string;
  steps: string[];
};

export const implementSections: ImplementSection[] = [
  {
    id: "week-0",
    title: "Week 0 — Prerequisites",
    intro: "Blockers. Do not start full config until these are green.",
    steps: [
      "Confirm CRM Plus org + data center; enable CRM, MA, Desk, SalesIQ, Social, Projects, Analytics, Cliq",
      "Create admins: Hallek + Digital Director + IT Manager",
      "Enable Audit Log, field encryption, export restrictions",
      "Timezone Asia/Riyadh · Currency SAR · Languages AR + EN",
      "Collect 28-branch master list (code, city, type, languages)",
      "Collect service catalog per branch + 30–50 user list with roles",
      "Collect API docs/sandbox: C-Med, App, Website, CC, WhatsApp AI, SMS",
      "Ad account admin for Meta/Google/TikTok/Snap/LinkedIn (LeadChain)",
      "Security workshop: PHI boundary, National ID masking, export approval",
    ],
  },
  {
    id: "crm",
    title: "Phase 1 — Zoho CRM foundation",
    intro: "Build the operational heart of the solution first.",
    steps: [
      "Roles: Admin, VP Read-Only, Branch Manager, Call Center Agent, Marketing, Operations, Support",
      "Create Branches (territories or custom module) for all 28 locations",
      "Map users to home branch; sharing: agents = assigned only; managers = branch; VP = all",
      "Lead fields: Mobile, National ID, Branch, Service, Language, UTM/Campaign, Lost Reason, Consent flags",
      "Contact fields: MRN read-only, Segment, Last Visit, Inactive formula (6 months)",
      "Custom module Appointments: status Booked/Confirmed/Cancelled/No-Show/Rescheduled/Completed",
      "Pipeline stages: New → Contacted → Qualified → Appointment Booked → Visited → Converted (+ terminals)",
      "Blueprint: Lost Reason required; Branch+Service before Qualified",
      "Duplicate rules: Mobile + National ID (+ MRN on Contacts)",
      "Assignment: Branch + Service + Language → round-robin; fallback Unassigned queue + Cliq",
      "Workflow: Lead created → First Contact Due = Now+5m + Task + notify",
      "Workflow: SLA breach escalate to Branch Manager",
      "Reports: leads by source/branch, SLA breach, funnel, lost reasons, agent response",
    ],
  },
  {
    id: "leads",
    title: "Lead capture — kill Excel",
    intro: "Automate every digital source into CRM within minutes.",
    steps: [
      "Install LeadChain; connect Meta, Google Lead Forms, TikTok, Snapchat, LinkedIn",
      "Map ad form fields → CRM; force Branch + Service + Language on every form",
      "Test 1 lead per channel → assignment fires < 1 minute",
      "Website/landing: CRM webforms or webhook Deluge createLeadFromWeb",
      "Hidden fields: Branch Code, UTM_*, Landing URL, Consent",
      "Mobile app: POST leads / appointment-requests / abandoned-bookings → CRM",
      "Retire Meta Excel download SOP; publish new Marketing SOP",
    ],
  },
  {
    id: "his",
    title: "HIS C-Med integration",
    intro: "Bi-directional, non-clinical only. Middleware recommended.",
    steps: [
      "Workshop with C-Med vendor: patient search, appt request, status, cancel/rebook, visit close",
      "Signed field-mapping sheet (IT + Hallek)",
      "Build middleware (Zoho Flow / cloud function) for retry, secrets, logging",
      "CRM → HIS: appointment REQUEST only",
      "HIS → CRM: MRN, appointment status, visit completed dates",
      "On Confirmed or MRN created: convert Lead → Contact; set MRN read-only",
      "Integration Errors module + Cliq alerts",
      "Sandbox matrix: book / confirm / cancel / no-show / rebook / repeat patient",
    ],
  },
  {
    id: "channels",
    title: "Call center · WhatsApp · SMS",
    intro: "Close the contact loop for agents and patients.",
    steps: [
      "PhoneBridge/CTI: click-to-call from CRM; map DIDs → branches",
      "Missed call → Lead or Task; store recording URL on activity",
      "WhatsApp AI: templates AR/EN for reminders, rebook, reactivation, promo",
      "Inbound WA → create/update Lead; opt-out stops marketing",
      "SMS gateway Deluge sendSMS for transactional reminders",
      "Reminders: 24h + 2h before appointment (SMS + WhatsApp; email non-urgent)",
      "App push via middleware for campaign/reminder events",
    ],
  },
  {
    id: "desk-siq",
    title: "Desk + SalesIQ",
    intro: "Support tickets and bilingual chatbot.",
    steps: [
      "Desk departments: Appointment, Billing, Complaints, Service Info, Feedback",
      "Assign tickets by Branch + Category + Service; SLA + escalation",
      "CSAT on close; sync contacts with CRM",
      "SalesIQ on website + mobile WebView",
      "AR + EN bots: FAQ → qualify → CRM lead → optional HIS availability → handover",
      "Offline form + business hours",
    ],
  },
  {
    id: "ma-social-projects",
    title: "MA · Social · Projects",
    intro: "Growth channels and internal delivery.",
    steps: [
      "MA segments: Inactive 6m, chronic, no-show, VIP, branch audiences",
      "Journeys: No-Show rebook, Inactive reactivation, Post-visit, Health awareness",
      "Campaign approval: Marketing Manager + Department Head",
      "Zoho Social: connect supported networks; Snapchat stays native",
      "Post scheduling + approval workflow; branch pages where separate",
      "Projects templates: Campaign brief→creative→approve→publish; IT CR; Ops checklist",
      "Migrate open Asana tasks once; freeze Asana on cutover",
    ],
  },
  {
    id: "analytics-golive",
    title: "Analytics · Migration · Go-Live",
    intro: "Visibility, data cutover, and handover.",
    steps: [
      "Dashboards: CEO, Management, Branch, Marketing, Conversion, CC, Appt, Reactivation, ROI, Social, Support",
      "KPIs: leads, conversion, CPA, ROAS, show rate, retention, answer rate, ROI",
      "Client fills Hallek CSV templates (cleansing is client-owned per BRD)",
      "Trial import 100 → full import; Branch Manager sign-off",
      "Training AR+EN recorded per app; UAT 7 days from Readiness Notice",
      "UAT scripts: Meta→assign→call→HIS→reminders; missed call; chatbot; branch filter; clinical block",
      "Go-live: freeze Excel; enable prod connectors; 30-day hypercare; Closure Certificate",
    ],
  },
];

export const nav = [
  { href: "/", label: "Overview" },
  { href: "/architecture", label: "Architecture" },
  { href: "/flows", label: "Flows" },
  { href: "/build", label: "Zoho Build" },
  { href: "/blueprints", label: "Blueprints" },
  { href: "/apps", label: "Apps & Integrations" },
  { href: "/roadmap", label: "Roadmap" },
  { href: "/implement", label: "Implement" },
  { href: "/checklist", label: "Checklist" },
];
