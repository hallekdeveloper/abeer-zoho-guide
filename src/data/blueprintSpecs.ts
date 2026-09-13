export type BlueprintTransition = {
  from: string;
  to: string;
  transitionName: string;
  who: string;
  requiredFields: string[];
  criteria: string;
  afterActions: string[];
};

export type BlueprintSpec = {
  id: string;
  name: string;
  app: string;
  module: string;
  purpose: string;
  mermaid: string;
  prerequisites: string[];
  requiredFieldsBeforeEnable: {
    label: string;
    apiName: string;
    why: string;
  }[];
  picklistValues: {
    field: string;
    values: string[];
  }[];
  transitions: BlueprintTransition[];
  copyPasteSetup: string;
};

export const blueprintSpecs: BlueprintSpec[] = [
  {
    id: "bp-lead-journey",
    name: "BP_Lead_Journey",
    app: "Zoho CRM",
    module: "Leads",
    purpose:
      "Forces the correct lead path from New → Converted (or Lost). Blocks skipping qualification without Branch + Service. Requires Lost Reason on Lost.",
    mermaid: `flowchart TD
  A[New] -->|TR_Contacted\\nOwner / Agent| B[Contacted]
  B -->|TR_Qualify\\nRequire Branch + Service + Language| C[Qualified]
  C -->|TR_Book_Appt\\nRequire Appointment link / HIS request| D[Appointment Booked]
  D -->|TR_Visited\\nAfter HIS visit sync| E[Visited]
  E -->|TR_Convert\\nMRN present or HIS confirmed| F[Converted to Patient]
  B -->|TR_Lost\\nRequire Lost_Reason| G[Lost]
  C -->|TR_Lost\\nRequire Lost_Reason| G
  D -->|TR_NoShow\\nFrom HIS No-Show| H[No-Show]
  D -->|TR_Cancel\\nRequire Cancel reason / note| I[Cancelled]
  H -->|TR_Rebook\\nCreate new Appt request| J[Rebooked]
  I -->|TR_Rebook| J
  J -->|TR_Book_Appt| D
`,
    prerequisites: [
      "Leads module exists with custom fields created (see Zoho Build → CRM fields)",
      "Lead Status / Pipeline picklist values created exactly as listed below",
      "Branches module populated (28 branches) and Preferred_Branch lookup works",
      "Service_Interest and Preferred_Language picklists filled",
      "Lost_Reason picklist filled",
      "Appointments custom module exists (for Appointment Booked transition check)",
      "Users/roles exist: Call Center Agent, Branch Manager",
      "Do NOT enable blueprint until fields + picklists are live (or transitions will fail)",
    ],
    requiredFieldsBeforeEnable: [
      { label: "Lead Status", apiName: "Lead_Status", why: "Blueprint stage field" },
      { label: "Preferred Branch", apiName: "Preferred_Branch", why: "Required before Qualify" },
      { label: "Service Interest", apiName: "Service_Interest", why: "Required before Qualify" },
      { label: "Preferred Language", apiName: "Preferred_Language", why: "Required before Qualify" },
      { label: "Lost Reason", apiName: "Lost_Reason", why: "Required on Lost transition" },
      { label: "Mobile", apiName: "Mobile", why: "Must exist for contact process" },
      { label: "MRN", apiName: "MRN", why: "Checked on Convert (read-only from HIS)" },
      { label: "HIS Appointment Request ID", apiName: "HIS_Appointment_Request_ID", why: "Optional check on Book Appt" },
      { label: "SLA Breached", apiName: "SLA_Breached", why: "Visible to managers during Contacted" },
    ],
    picklistValues: [
      {
        field: "Lead_Status",
        values: [
          "New",
          "Contacted",
          "Qualified",
          "Appointment Booked",
          "Visited",
          "Converted to Patient",
          "No-Show",
          "Lost",
          "Cancelled",
          "Rebooked",
        ],
      },
      {
        field: "Lost_Reason",
        values: [
          "No answer",
          "Not interested",
          "Price concern",
          "Booked with competitor",
          "Wrong number",
          "Service not available at branch",
        ],
      },
      {
        field: "Preferred_Language",
        values: ["Arabic", "English"],
      },
      {
        field: "Service_Interest",
        values: [
          "Dental",
          "Lab",
          "Optical",
          "General Clinic",
          "Hospital Specialty",
          "Other",
        ],
      },
    ],
    transitions: [
      {
        from: "New",
        to: "Contacted",
        transitionName: "TR_Contacted",
        who: "Lead Owner (Call Center Agent)",
        requiredFields: ["Mobile"],
        criteria: "User clicks Contacted after first call attempt logged",
        afterActions: ["Optional: create Call activity if not exists"],
      },
      {
        from: "Contacted",
        to: "Qualified",
        transitionName: "TR_Qualify",
        who: "Lead Owner",
        requiredFields: ["Preferred_Branch", "Service_Interest", "Preferred_Language"],
        criteria: "All three fields NOT empty",
        afterActions: ["WF_Lead_Qualified_Create_Appt_Task"],
      },
      {
        from: "Qualified",
        to: "Appointment Booked",
        transitionName: "TR_Book_Appt",
        who: "Operations / Agent",
        requiredFields: ["HIS_Appointment_Request_ID"],
        criteria: "Related Appointments record exists OR HIS_Appointment_Request_ID filled",
        afterActions: ["Keep stage until HIS confirms → then Confirmed workflows"],
      },
      {
        from: "Appointment Booked",
        to: "Visited",
        transitionName: "TR_Visited",
        who: "System (fn_syncAppointmentStatusFromHIS) or Operations",
        requiredFields: [],
        criteria: "HIS visit completed / Appointment Status = Completed",
        afterActions: ["Update Last_Visit_Date on Contact after convert"],
      },
      {
        from: "Visited",
        to: "Converted to Patient",
        transitionName: "TR_Convert",
        who: "System / Branch Manager",
        requiredFields: ["MRN"],
        criteria: "MRN not empty OR Appointment Status was Confirmed + visit done",
        afterActions: ["fn_convertLeadOnConfirm", "Enroll post-visit MA journey"],
      },
      {
        from: "Contacted / Qualified",
        to: "Lost",
        transitionName: "TR_Lost",
        who: "Lead Owner",
        requiredFields: ["Lost_Reason"],
        criteria: "Lost_Reason NOT empty",
        afterActions: ["Optional nurture list if Consent_WhatsApp true"],
      },
      {
        from: "Appointment Booked",
        to: "No-Show",
        transitionName: "TR_NoShow",
        who: "System (HIS sync)",
        requiredFields: [],
        criteria: "Appointment.Status = No-Show",
        afterActions: ["WF_Appt_NoShow_Enroll_MA"],
      },
      {
        from: "Appointment Booked",
        to: "Cancelled",
        transitionName: "TR_Cancel",
        who: "Agent / System",
        requiredFields: [],
        criteria: "Appointment cancelled in HIS/CRM",
        afterActions: ["WF_Appt_Cancelled_Rebook_Task"],
      },
      {
        from: "No-Show / Cancelled",
        to: "Rebooked",
        transitionName: "TR_Rebook",
        who: "Agent",
        requiredFields: ["Preferred_Branch", "Service_Interest"],
        criteria: "New appointment request created",
        afterActions: ["Move back toward Appointment Booked via TR_Book_Appt"],
      },
    ],
    copyPasteSetup: `BLUEPRINT NAME: BP_Lead_Journey
MODULE: Leads
PRIMARY FIELD: Lead_Status

STAGES (create in this order):
New
Contacted
Qualified
Appointment Booked
Visited
Converted to Patient
No-Show
Lost
Cancelled
Rebooked

TRANSITION: TR_Qualify
FROM: Contacted → TO: Qualified
BEFORE TRANSITION – MANDATORY FIELDS:
- Preferred_Branch
- Service_Interest
- Preferred_Language

TRANSITION: TR_Lost
FROM: Contacted OR Qualified → TO: Lost
BEFORE TRANSITION – MANDATORY FIELDS:
- Lost_Reason

TRANSITION: TR_Convert
FROM: Visited → TO: Converted to Patient
BEFORE TRANSITION – MANDATORY FIELDS:
- MRN
`,
  },
  {
    id: "bp-appointment",
    name: "BP_Appointment_Lifecycle",
    app: "Zoho CRM",
    module: "Appointments (Custom Module)",
    purpose:
      "Controls appointment request lifecycle. CRM creates Booked request; HIS confirms; then Completed / Cancelled / No-Show / Rescheduled.",
    mermaid: `flowchart TD
  A[Booked\\nCRM request created] -->|TR_Confirm\\nHIS sync / Operations| B[Confirmed]
  A -->|TR_Cancel_Early| C[Cancelled]
  B -->|TR_Complete\\nHIS visit done| D[Completed]
  B -->|TR_NoShow\\nHIS no-show| E[No-Show]
  B -->|TR_Cancel| C
  B -->|TR_Reschedule| F[Rescheduled]
  F -->|TR_Confirm| B
  E -->|TR_Reschedule| F
  C -->|TR_Reschedule| F
`,
    prerequisites: [
      "Custom module Appointments created with Status picklist",
      "Lookups: Related_Lead, Related_Contact, Branch",
      "Fields: Requested_Slot, HIS_Appointment_ID, Reminder_24h_Sent, Reminder_2h_Sent",
      "Middleware / fn_pushAppointmentRequestToHIS working in sandbox (or manual confirm for UAT)",
      "WF_Appt_Confirmed_Schedule_Reminders exists",
    ],
    requiredFieldsBeforeEnable: [
      { label: "Status", apiName: "Status", why: "Blueprint stage field" },
      { label: "Related Lead", apiName: "Related_Lead", why: "Traceability" },
      { label: "Related Contact", apiName: "Related_Contact", why: "After convert" },
      { label: "Branch", apiName: "Branch", why: "Required before Confirm" },
      { label: "Service", apiName: "Service", why: "Required before Confirm" },
      { label: "Requested Slot", apiName: "Requested_Slot", why: "Required before Confirm" },
      { label: "HIS Appointment ID", apiName: "HIS_Appointment_ID", why: "Set on Confirm from HIS" },
      { label: "Cancel Reason", apiName: "Cancel_Reason", why: "Required on Cancel" },
      { label: "Reminder 24h Sent", apiName: "Reminder_24h_Sent", why: "Updated by reminder function" },
      { label: "Reminder 2h Sent", apiName: "Reminder_2h_Sent", why: "Updated by reminder function" },
    ],
    picklistValues: [
      {
        field: "Status",
        values: ["Booked", "Confirmed", "Cancelled", "No-Show", "Rescheduled", "Completed"],
      },
      {
        field: "Cancel_Reason",
        values: ["Patient request", "Doctor unavailable", "Branch closed", "Duplicate", "Other"],
      },
      {
        field: "Source_Channel",
        values: ["App", "Web", "Call", "WhatsApp", "CRM"],
      },
    ],
    transitions: [
      {
        from: "Booked",
        to: "Confirmed",
        transitionName: "TR_Confirm",
        who: "System (HIS) or Operations",
        requiredFields: ["Branch", "Service", "Requested_Slot", "HIS_Appointment_ID"],
        criteria: "HIS returns Confirmed + Appt ID",
        afterActions: [
          "WF_Appt_Confirmed_Schedule_Reminders",
          "Update related Lead_Status → Appointment Booked",
          "fn_convertLeadOnConfirm (if policy = confirm converts)",
        ],
      },
      {
        from: "Confirmed",
        to: "Completed",
        transitionName: "TR_Complete",
        who: "System (HIS visit close)",
        requiredFields: [],
        criteria: "Visit completed in HIS",
        afterActions: ["Create Visit_History", "Update Contact.Last_Visit_Date", "Lead → Visited / Convert"],
      },
      {
        from: "Confirmed",
        to: "No-Show",
        transitionName: "TR_NoShow",
        who: "System (HIS)",
        requiredFields: [],
        criteria: "HIS status No-Show",
        afterActions: ["WF_Appt_NoShow_Enroll_MA", "Lead_Status → No-Show"],
      },
      {
        from: "Booked / Confirmed",
        to: "Cancelled",
        transitionName: "TR_Cancel",
        who: "Agent / System",
        requiredFields: ["Cancel_Reason"],
        criteria: "Cancel_Reason NOT empty",
        afterActions: ["WF_Appt_Cancelled_Rebook_Task"],
      },
      {
        from: "Confirmed / No-Show / Cancelled",
        to: "Rescheduled",
        transitionName: "TR_Reschedule",
        who: "Agent",
        requiredFields: ["Requested_Slot"],
        criteria: "New slot selected",
        afterActions: ["Push new request to HIS", "Then TR_Confirm when HIS accepts"],
      },
    ],
    copyPasteSetup: `BLUEPRINT NAME: BP_Appointment_Lifecycle
MODULE: Appointments
PRIMARY FIELD: Status

STAGES:
Booked
Confirmed
Cancelled
No-Show
Rescheduled
Completed

TRANSITION: TR_Confirm
FROM: Booked → TO: Confirmed
MANDATORY FIELDS:
- Branch
- Service
- Requested_Slot
- HIS_Appointment_ID

TRANSITION: TR_Cancel
FROM: Booked OR Confirmed → TO: Cancelled
MANDATORY FIELDS:
- Cancel_Reason

AFTER TR_Confirm RUN:
- WF_Appt_Confirmed_Schedule_Reminders
`,
  },
  {
    id: "bp-campaign-approval",
    name: "BP_Campaign_Approval_Path",
    app: "Zoho Marketing Automation / Zoho Projects",
    module: "Campaign task (Projects) OR Campaign record (MA)",
    purpose:
      "No promotional / awareness campaign sends without Marketing Manager + Department Head approval.",
    mermaid: `flowchart LR
  A[Draft] -->|Submit for approval| B[Pending Marketing Manager]
  B -->|Approve| C[Pending Department Head]
  B -->|Reject| A
  C -->|Approve| D[Approved]
  C -->|Reject| A
  D -->|Publish / Send| E[Sent]
`,
    prerequisites: [
      "Decide system of record for approval: Zoho Projects task (recommended) OR MA campaign approval",
      "If Projects: Template Campaign Delivery exists with cf_approver fields",
      "Roles: Marketing User, Marketing Manager, Department Head",
      "Cliq/Email notifications enabled",
      "Link field cf_campaign_id to CRM/MA Campaign_ID",
    ],
    requiredFieldsBeforeEnable: [
      { label: "Campaign Name", apiName: "Name / cf_campaign_name", why: "Identify campaign" },
      { label: "Campaign ID", apiName: "cf_campaign_id", why: "Join to CRM leads / Analytics" },
      { label: "Channel", apiName: "cf_channel", why: "Email / WA / SMS / Social / Mixed" },
      { label: "Branch (optional)", apiName: "cf_branch", why: "Branch campaigns" },
      { label: "Approval Status", apiName: "cf_approval_status", why: "Blueprint/stage field" },
      { label: "Marketing Manager Approver", apiName: "cf_mm_approver", why: "User lookup" },
      { label: "Department Head Approver", apiName: "cf_dh_approver", why: "User lookup" },
      { label: "Rejection Reason", apiName: "cf_rejection_reason", why: "Required on Reject" },
    ],
    picklistValues: [
      {
        field: "cf_approval_status",
        values: [
          "Draft",
          "Pending Marketing Manager",
          "Pending Department Head",
          "Approved",
          "Rejected",
          "Sent",
        ],
      },
      {
        field: "cf_channel",
        values: ["Email", "WhatsApp", "SMS", "Social", "Push", "Mixed"],
      },
    ],
    transitions: [
      {
        from: "Draft",
        to: "Pending Marketing Manager",
        transitionName: "TR_Submit_MM",
        who: "Marketing User",
        requiredFields: ["cf_campaign_id", "cf_channel", "cf_mm_approver"],
        criteria: "Creative/brief attached",
        afterActions: ["Notify Marketing Manager"],
      },
      {
        from: "Pending Marketing Manager",
        to: "Pending Department Head",
        transitionName: "TR_MM_Approve",
        who: "Marketing Manager",
        requiredFields: [],
        criteria: "MM clicks Approve",
        afterActions: ["Notify Department Head"],
      },
      {
        from: "Pending Marketing Manager",
        to: "Draft",
        transitionName: "TR_MM_Reject",
        who: "Marketing Manager",
        requiredFields: ["cf_rejection_reason"],
        criteria: "Rejection reason required",
        afterActions: ["Notify creator"],
      },
      {
        from: "Pending Department Head",
        to: "Approved",
        transitionName: "TR_DH_Approve",
        who: "Department Head",
        requiredFields: [],
        criteria: "DH clicks Approve",
        afterActions: ["Unlock send in MA / schedule Social posts"],
      },
      {
        from: "Approved",
        to: "Sent",
        transitionName: "TR_Send",
        who: "Marketing Manager",
        requiredFields: [],
        criteria: "Campaign executed",
        afterActions: ["Write Campaign_ID onto resulting leads"],
      },
    ],
    copyPasteSetup: `BLUEPRINT / APPROVAL NAME: BP_Campaign_Approval_Path
SYSTEM: Zoho Projects (Campaign Delivery template) — preferred
STATUS FIELD: cf_approval_status

VALUES:
Draft
Pending Marketing Manager
Pending Department Head
Approved
Rejected
Sent

RULE:
Cannot jump Draft → Approved
Cannot Send unless Approved

REJECT always requires: cf_rejection_reason
`,
  },
  {
    id: "bp-ticket",
    name: "BP_Ticket_Support",
    app: "Zoho Desk",
    module: "Tickets",
    purpose:
      "Standardize support handling. Force Branch + Category before Solved. Drive SLA and CSAT.",
    mermaid: `flowchart TD
  A[Open] -->|TR_Acknowledge| B[On Hold]
  A -->|TR_Work| C[In Progress]
  B -->|TR_Work| C
  C -->|TR_Escalate\\nSLA breach / complex| D[Escalated]
  D -->|TR_Work| C
  C -->|TR_Solve\\nRequire Branch + Category + Service| E[Solved]
  E -->|TR_Close\\nSend CSAT| F[Closed]
  E -->|TR_Reopen| C
`,
    prerequisites: [
      "Desk departments created (Appointment, Billing, Complaints, Service Info, Feedback)",
      "Custom fields: cf_branch, cf_category, cf_service",
      "CRM contact sync enabled",
      "SLA policies drafted (confirm exact hours with client)",
      "CSAT survey created",
    ],
    requiredFieldsBeforeEnable: [
      { label: "Status", apiName: "status", why: "Blueprint stages" },
      { label: "Branch", apiName: "cf_branch", why: "Mandatory before Solve" },
      { label: "Category", apiName: "cf_category", why: "Mandatory before Solve" },
      { label: "Service", apiName: "cf_service", why: "Mandatory before Solve" },
      { label: "Priority", apiName: "priority", why: "SLA differentiation" },
      { label: "Contact", apiName: "contactId", why: "CRM link" },
    ],
    picklistValues: [
      {
        field: "status",
        values: ["Open", "On Hold", "In Progress", "Escalated", "Solved", "Closed"],
      },
      {
        field: "cf_category",
        values: ["Appointment issues", "Billing inquiries", "Complaints", "Service information", "Feedback"],
      },
    ],
    transitions: [
      {
        from: "Open",
        to: "In Progress",
        transitionName: "TR_Work",
        who: "Support Agent",
        requiredFields: [],
        criteria: "Agent starts work",
        afterActions: ["First response SLA clock"],
      },
      {
        from: "In Progress",
        to: "Escalated",
        transitionName: "TR_Escalate",
        who: "Agent / System (SLA)",
        requiredFields: [],
        criteria: "SLA breach OR complex complaint",
        afterActions: ["Notify Branch Manager → AVP if needed"],
      },
      {
        from: "In Progress / Escalated",
        to: "Solved",
        transitionName: "TR_Solve",
        who: "Support Agent / Manager",
        requiredFields: ["cf_branch", "cf_category", "cf_service"],
        criteria: "Branch + Category + Service filled",
        afterActions: ["Prepare CSAT"],
      },
      {
        from: "Solved",
        to: "Closed",
        transitionName: "TR_Close",
        who: "Agent / Auto",
        requiredFields: [],
        criteria: "Resolution accepted or auto-close timer",
        afterActions: ["DW_CSAT_On_Close"],
      },
    ],
    copyPasteSetup: `BLUEPRINT NAME: BP_Ticket_Support
MODULE: Tickets (Zoho Desk)
PRIMARY FIELD: status

STAGES:
Open
On Hold
In Progress
Escalated
Solved
Closed

TRANSITION: TR_Solve
MANDATORY FIELDS BEFORE SOLVED:
- cf_branch
- cf_category
- cf_service

AFTER CLOSED:
- Run CSAT survey workflow DW_CSAT_On_Close
`,
  },
  {
    id: "bp-creative",
    name: "BP_Creative_Approval",
    app: "Zoho Projects",
    module: "Tasks (Campaign Delivery template)",
    purpose:
      "Creative/design cannot be marked Done without approver sign-off. Replaces Asana approval habit.",
    mermaid: `flowchart LR
  A[Open] --> B[In Progress]
  B -->|Submit creative| C[Waiting Approval]
  C -->|Approve| D[Approved]
  C -->|Reject + reason| B
  D -->|Publish / hand to Social| E[Done]
`,
    prerequisites: [
      "Zoho Projects portal live",
      "Project template: Campaign Delivery imported",
      "Task custom fields: cf_brief, cf_channel, cf_approver, cf_campaign_id",
      "Document attachments enabled",
      "Approver users assigned",
    ],
    requiredFieldsBeforeEnable: [
      { label: "Task Status", apiName: "status", why: "Blueprint stages" },
      { label: "Brief", apiName: "cf_brief", why: "Required before Waiting Approval" },
      { label: "Channel", apiName: "cf_channel", why: "Required before Waiting Approval" },
      { label: "Approver", apiName: "cf_approver", why: "Who must approve" },
      { label: "Campaign ID", apiName: "cf_campaign_id", why: "Trace to CRM/MA" },
      { label: "Rejection Reason", apiName: "cf_rejection_reason", why: "Required on Reject" },
    ],
    picklistValues: [
      {
        field: "status",
        values: ["Open", "In Progress", "Waiting Approval", "Approved", "Done", "Rejected"],
      },
    ],
    transitions: [
      {
        from: "In Progress",
        to: "Waiting Approval",
        transitionName: "TR_Submit_Creative",
        who: "Designer / Marketing User",
        requiredFields: ["cf_brief", "cf_channel", "cf_approver"],
        criteria: "At least one attachment uploaded",
        afterActions: ["ZP_Task_Approval_Notify → Approver"],
      },
      {
        from: "Waiting Approval",
        to: "Approved",
        transitionName: "TR_Approve_Creative",
        who: "Approver (Marketing Manager)",
        requiredFields: [],
        criteria: "Approver clicks Approve",
        afterActions: ["ZP_Task_Approved_Notify_Owner", "Ready for Zoho Social schedule"],
      },
      {
        from: "Waiting Approval",
        to: "In Progress",
        transitionName: "TR_Reject_Creative",
        who: "Approver",
        requiredFields: ["cf_rejection_reason"],
        criteria: "Rejection reason required",
        afterActions: ["Notify assignee"],
      },
      {
        from: "Approved",
        to: "Done",
        transitionName: "TR_Complete_Creative",
        who: "Assignee",
        requiredFields: [],
        criteria: "Published / handed to Social",
        afterActions: ["Optional link Social post URL in comment"],
      },
    ],
    copyPasteSetup: `BLUEPRINT NAME: BP_Creative_Approval
MODULE: Zoho Projects Tasks
TEMPLATE: Campaign Delivery

STATUSES:
Open
In Progress
Waiting Approval
Approved
Done
Rejected

BLOCKER RULE:
Cannot move to Done unless status was Approved

SUBMIT TO APPROVAL REQUIRES:
- cf_brief
- cf_channel
- cf_approver
- Attachment (creative file)
`,
  },
];
