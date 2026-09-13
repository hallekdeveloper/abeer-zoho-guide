export const diagrams = {
  systemArchitecture: `flowchart TB
  subgraph CH["Lead & engagement channels"]
    META[Meta / Google / TikTok / Snap / LinkedIn]
    WEB[Website / Landing pages]
    APP[Mobile App]
    WA[WhatsApp AI]
    CC[Call Center]
    SMS[SMS Provider]
  end

  subgraph ZOHO["Zoho CRM Plus"]
    CRM[Zoho CRM]
    MA[Marketing Automation]
    DESK[Zoho Desk]
    SIQ[SalesIQ]
    SOC[Zoho Social]
    PRJ[Zoho Projects]
    ANA[Zoho Analytics]
  end

  HIS[(HIS C-Med - Source of truth)]

  META -->|LeadChain| CRM
  WEB -->|Webform / Webhook| CRM
  APP <-->|API| CRM
  WA <-->|API / Webhook| CRM
  CC <-->|CTI / CDR| CRM
  SMS -->|Deluge SMS API| CRM
  SIQ -->|Create Lead| CRM
  CRM <-->|Appt request / MRN / status| HIS
  CRM --> MA
  CRM --> DESK
  CRM --> ANA
  MA --> ANA
  DESK --> ANA
`,

  leadJourney: `flowchart TD
  A[1. Lead generated<br/>Ads / Web / App / WA / Call] --> B[2. Create Lead in Zoho CRM<br/>Capture UTM + Branch + Service + Language]
  B --> C[3. Auto-assign<br/>Branch + Service + Language<br/>Round-robin in branch team]
  C --> D[4. Call Center contacts<br/>SLA: within 5 minutes]
  D --> E{5. Qualified?}
  E -->|No| F[Mark Lost + Lost Reason<br/>Optional nurture journey]
  E -->|Yes| G[6. Create Appointment REQUEST in CRM]
  G --> H[7. Push request to HIS C-Med via middleware]
  H --> I{8. HIS confirms slot?}
  I -->|No| J[Reschedule or Cancel in CRM + HIS]
  I -->|Yes| K[9. CRM status = Confirmed<br/>Stage = Appointment Booked]
  K --> L[10. Reminders: T-24h and T-2h<br/>WhatsApp + SMS]
  L --> M{11. Patient visits?}
  M -->|No-Show| N[No-Show journey → rebook]
  M -->|Yes| O[12. Visit recorded in HIS<br/>MRN synced to CRM read-only]
  O --> P[13. Convert to Patient / Contact<br/>Start retention / follow-up in MA]
`,

  assignment: `flowchart TD
  L[New Lead created] --> R{Preferred Branch set?}
  R -->|No| Q[Central Unassigned Queue<br/>Cliq alert to supervisor]
  R -->|Yes| S{Service Interest set?}
  S -->|No| Q
  S -->|Yes| G{Language AR or EN?}
  G -->|No match| Q
  G -->|Match| RR[Round-robin assign<br/>to Branch Call Center group]
  RR --> A[Assigned Agent]
  A --> T[Create Task: First call<br/>Due = Created + 5 minutes]
  T --> E{Contacted within SLA?}
  E -->|No| X[Escalate to Branch Manager<br/>Tag SLA Breach]
  E -->|Yes| Y[Move stage to Contacted / Qualified]
`,

  hisSync: `sequenceDiagram
  participant U as Patient or Agent
  participant CRM as Zoho CRM
  participant MW as Middleware
  participant HIS as HIS C-Med

  U->>CRM: Request appointment
  CRM->>CRM: Create Appointment Request record
  CRM->>MW: Send non-clinical payload
  MW->>HIS: Create appointment request API
  HIS-->>MW: Confirmed or Rejected + HIS Appt ID
  MW-->>CRM: Update status + HIS Appt ID
  Note over HIS: Clinical data never leaves HIS
  HIS->>MW: Push MRN / visit done / cancel / no-show
  MW->>CRM: Upsert Contact MRN + visit summary
  CRM->>U: Confirmation + reminders WA/SMS/Push
`,

  reactivation: `flowchart TD
  P[Patient Contact in CRM] --> I{Any visit or appointment<br/>in last 6 months?}
  I -->|Yes| A[Keep in Active segment]
  I -->|No| B[Set Inactive flag]
  B --> C[Enroll in MA Reactivation Journey]
  C --> D[Day 0: WhatsApp offer]
  D --> E[Day 2: SMS follow-up]
  E --> F[Day 5: Email]
  F --> G[Day 7: Call Center Task]
  G --> H{Rebooked?}
  H -->|Yes| J[Back to Appointment flow → HIS]
  H -->|No| K[Pause journey / optional Lost nurture]
`,

  reminder: `flowchart LR
  A[Appointment Confirmed in HIS<br/>synced to CRM] --> B[Schedule reminder workflows]
  B --> C[T-24 hours<br/>WhatsApp + SMS]
  B --> D[T-2 hours<br/>WhatsApp + SMS]
  C --> E[Log activity on Lead/Contact]
  D --> E
  E --> F{Visited / No-Show / Cancelled}
  F -->|Visited| G[MRN sync + Convert]
  F -->|No-Show| H[No-Show rebook journey]
  F -->|Cancelled| I[Capture reason + rebook task]
`,

  ticketFlow: `flowchart TD
  A[Complaint / inquiry arrives<br/>Email / Chat / WA / Call / Web] --> B[Zoho Desk Ticket created]
  B --> C[Auto-assign by<br/>Branch + Category + Service]
  C --> D[Agent works ticket<br/>Linked to CRM Contact]
  D --> E{SLA met?}
  E -->|No| F[Escalate to Branch Manager → AVP]
  E -->|Yes| G[Resolve and Close]
  G --> H[Send CSAT survey]
`,
};
