"use client";

import { AnimatedDataFlow } from "@/components/AnimatedDataFlow";

export function AssignmentAnimatedFlow() {
  const nodes = [
    { id: "new", label: "New Lead created", x: 260, y: 20, kind: "start" as const, w: 200 },
    { id: "branch", label: "Preferred Branch set?", x: 255, y: 110, kind: "decision" as const, w: 210, h: 78 },
    { id: "service", label: "Service Interest set?", x: 255, y: 230, kind: "decision" as const, w: 210, h: 78 },
    { id: "lang", label: "Language AR or EN?", x: 255, y: 350, kind: "decision" as const, w: 210, h: 78 },
    { id: "rr", label: "Round-robin assign", detail: "Branch call center group", x: 250, y: 470, kind: "process" as const, w: 220, h: 58 },
    { id: "agent", label: "Assigned Agent", x: 270, y: 560, kind: "success" as const, w: 180 },
    { id: "task", label: "Task: First call", detail: "Due = Created + 5 min", x: 250, y: 650, kind: "success" as const, w: 220, h: 58 },
    { id: "queue", label: "Unassigned Queue", detail: "Cliq alert → supervisor", x: 20, y: 350, kind: "queue" as const, w: 180, h: 58 },
  ];

  const edges = [
    { from: "new", to: "branch", delay: 0, duration: 2.2 },
    { from: "branch", to: "service", label: "Yes", delay: 0.4, duration: 2.2 },
    { from: "service", to: "lang", label: "Yes", delay: 0.8, duration: 2.2 },
    { from: "lang", to: "rr", label: "Match", delay: 1.2, duration: 2.2 },
    { from: "rr", to: "agent", delay: 1.6, duration: 2 },
    { from: "agent", to: "task", delay: 2, duration: 2 },
    { from: "branch", to: "queue", label: "No", tone: "fail" as const, bend: "left" as const, delay: 0.6, duration: 2.6 },
    { from: "service", to: "queue", label: "No", tone: "fail" as const, bend: "left" as const, delay: 1.0, duration: 2.4 },
    { from: "lang", to: "queue", label: "No match", tone: "fail" as const, bend: "left" as const, delay: 1.4, duration: 2.2 },
  ];

  return (
    <AnimatedDataFlow
      nodes={nodes}
      edges={edges}
      width={720}
      height={740}
      caption="Watch the blue packet = successful assignment. Amber packet = falls to unassigned queue."
    />
  );
}

export function LeadJourneyAnimatedFlow() {
  const nodes = [
    { id: "ch", label: "1. Lead in", detail: "Ads / Web / App / WA / Call", x: 40, y: 40, kind: "start" as const, w: 170, h: 58 },
    { id: "crm", label: "2. Zoho CRM Lead", detail: "UTM + Branch + Service", x: 270, y: 40, kind: "system" as const, w: 180, h: 58 },
    { id: "asg", label: "3. Auto-assign", detail: "Branch · Service · Lang", x: 510, y: 40, kind: "process" as const, w: 170, h: 58 },
    { id: "call", label: "4. Call ≤ 5 min", detail: "Call center qualifies", x: 510, y: 150, kind: "process" as const, w: 170, h: 58 },
    { id: "qual", label: "Qualified?", x: 520, y: 250, kind: "decision" as const, w: 150, h: 70 },
    { id: "lost", label: "Lost + Reason", x: 300, y: 250, kind: "queue" as const, w: 150 },
    { id: "req", label: "5. Appt REQUEST", detail: "Created in CRM", x: 510, y: 360, kind: "process" as const, w: 170, h: 58 },
    { id: "his", label: "6. HIS C-Med", detail: "Confirm slot", x: 510, y: 460, kind: "system" as const, w: 170, h: 58 },
    { id: "ok", label: "Confirmed?", x: 520, y: 560, kind: "decision" as const, w: 150, h: 70 },
    { id: "rem", label: "7. Reminders", detail: "T-24h · T-2h WA/SMS", x: 280, y: 560, kind: "success" as const, w: 180, h: 58 },
    { id: "pat", label: "8. Patient / Retain", detail: "MRN sync · MA follow-up", x: 40, y: 560, kind: "success" as const, w: 180, h: 58 },
  ];

  const edges = [
    { from: "ch", to: "crm", delay: 0, duration: 2 },
    { from: "crm", to: "asg", delay: 0.35, duration: 2 },
    { from: "asg", to: "call", delay: 0.7, duration: 1.8 },
    { from: "call", to: "qual", delay: 1.0, duration: 1.6 },
    { from: "qual", to: "lost", label: "No", tone: "fail" as const, delay: 1.3, duration: 2.2 },
    { from: "qual", to: "req", label: "Yes", delay: 1.5, duration: 1.8 },
    { from: "req", to: "his", delay: 1.9, duration: 1.8 },
    { from: "his", to: "ok", tone: "sync" as const, delay: 2.2, duration: 1.6 },
    { from: "ok", to: "rem", label: "Yes", delay: 2.5, duration: 2 },
    { from: "rem", to: "pat", delay: 2.9, duration: 2.2 },
  ];

  return (
    <AnimatedDataFlow
      nodes={nodes}
      edges={edges}
      width={720}
      height={660}
      caption="Data packet travels channel → CRM → agent → HIS → reminders → patient record."
    />
  );
}

export function HisSyncAnimatedFlow() {
  const nodes = [
    { id: "u", label: "Patient / Agent", x: 40, y: 80, kind: "start" as const, w: 150 },
    { id: "crm", label: "Zoho CRM", detail: "Appt request", x: 240, y: 80, kind: "system" as const, w: 150, h: 58 },
    { id: "mw", label: "Middleware", detail: "Auth · retry · map", x: 440, y: 80, kind: "process" as const, w: 150, h: 58 },
    { id: "his", label: "HIS C-Med", detail: "Source of truth", x: 640, y: 80, kind: "system" as const, w: 150, h: 58 },
    { id: "back", label: "CRM updated", detail: "Status + MRN", x: 440, y: 240, kind: "success" as const, w: 150, h: 58 },
    { id: "msg", label: "WA / SMS / Push", detail: "Confirm + remind", x: 240, y: 240, kind: "success" as const, w: 150, h: 58 },
  ];

  const edges = [
    { from: "u", to: "crm", delay: 0, duration: 1.8 },
    { from: "crm", to: "mw", delay: 0.4, duration: 1.8 },
    { from: "mw", to: "his", delay: 0.8, duration: 1.8 },
    { from: "his", to: "back", label: "Confirm / MRN", tone: "sync" as const, delay: 1.2, duration: 2.2 },
    { from: "back", to: "msg", delay: 1.7, duration: 1.8 },
    { from: "msg", to: "u", tone: "ok" as const, bend: "left" as const, delay: 2.1, duration: 2.6 },
  ];

  return (
    <AnimatedDataFlow
      nodes={nodes}
      edges={edges}
      width={820}
      height={340}
      caption="Request flows CRM → HIS. Green packet = HIS response syncing back."
    />
  );
}

export function ReminderAnimatedFlow() {
  const nodes = [
    { id: "c", label: "Appt Confirmed", detail: "From HIS → CRM", x: 280, y: 20, kind: "system" as const, w: 170, h: 58 },
    { id: "s", label: "Scheduler", detail: "CRM workflow", x: 290, y: 130, kind: "process" as const, w: 150 },
    { id: "r24", label: "T−24h", detail: "WhatsApp + SMS", x: 80, y: 250, kind: "success" as const, w: 150, h: 58 },
    { id: "r2", label: "T−2h", detail: "WhatsApp + SMS", x: 300, y: 250, kind: "success" as const, w: 150, h: 58 },
    { id: "log", label: "Activity logged", detail: "On Lead / Contact", x: 520, y: 250, kind: "process" as const, w: 150, h: 58 },
  ];

  const edges = [
    { from: "c", to: "s", delay: 0, duration: 1.8 },
    { from: "s", to: "r24", delay: 0.5, duration: 2.2 },
    { from: "s", to: "r2", delay: 0.9, duration: 2.2 },
    { from: "r24", to: "log", delay: 1.4, duration: 2.4 },
    { from: "r2", to: "log", delay: 1.8, duration: 2 },
  ];

  return (
    <AnimatedDataFlow
      nodes={nodes}
      edges={edges}
      width={720}
      height={340}
      caption="Confirmation triggers two reminder packets at different times."
    />
  );
}
