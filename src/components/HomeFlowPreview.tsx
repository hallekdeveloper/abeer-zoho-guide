"use client";

import Link from "next/link";
import { FlowBlock } from "@/components/FlowBlock";
import { LeadJourneyAnimatedFlow } from "@/components/AnimatedFlows";
import { diagrams } from "@/data/diagrams";

export function HomeFlowPreview() {
  return (
    <div className="space-y-6">
      <div>
        <h2>Core flow (preview)</h2>
        <p className="lead">
          Animated packets show how lead data moves. Full set is on the Flows
          page.
        </p>
      </div>
      <FlowBlock
        id="preview-lead"
        title="Lead → Appointment → Patient"
        purpose="Main business process from digital lead to retained patient."
        zohoWhere="CRM + HIS + WA/SMS"
        chart={diagrams.leadJourney}
        animated={<LeadJourneyAnimatedFlow />}
        steps={[
          "Build Lead stages exactly as numbered in the diagram",
          "Assignment rule: Branch + Service + Language → round-robin",
          "Appointment Request custom module → push to HIS via middleware",
          "On HIS confirm or MRN create: convert Lead → Contact",
        ]}
      />
      <Link href="/flows" className="btn btn-teal">
        See all animated flows →
      </Link>
    </div>
  );
}
