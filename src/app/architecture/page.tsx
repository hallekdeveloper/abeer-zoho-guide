import Link from "next/link";
import { FlowBlock } from "@/components/FlowBlock";
import { PageHeader } from "@/components/SiteChrome";
import { diagrams } from "@/data/diagrams";

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        title="Architecture & data rules"
        description="HIS C-Med is the clinical source of truth. Zoho owns leads, marketing, and non-clinical relationship data."
      />

      <section className="section">
        <div className="wrap space-y-8">
          <FlowBlock
            id="system-map"
            title="System architecture"
            purpose="Channels → Zoho CRM Plus → HIS C-Med."
            zohoWhere="Full CRM Plus stack"
            chart={diagrams.systemArchitecture}
            steps={[
              "Do not replace HIS with CRM",
              "All paid social leads enter via LeadChain into CRM",
              "App/Website push leads and appointment requests into CRM",
              "CRM pushes appointment requests to HIS; HIS confirms back",
              "Analytics reads CRM/Desk/MA (+ HIS non-clinical aggregates only)",
            ]}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <div className="card border-[var(--teal)]/30 bg-[var(--teal-soft)]">
              <h3 className="text-xl text-[var(--teal-dark)]">Allowed in Zoho</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  "Name, mobile, email",
                  "National ID (masked/encrypted)",
                  "MRN read-only",
                  "Branch / service / doctor prefs",
                  "Appointment & visit status history",
                  "Segments, consents, UTM",
                ].map((x) => (
                  <li key={x}>✓ {x}</li>
                ))}
              </ul>
            </div>
            <div className="card border-red-200 bg-red-50">
              <h3 className="text-xl text-[var(--danger)]">HIS only — never in Zoho</h3>
              <ul className="mt-3 space-y-2 text-sm">
                {[
                  "Diagnosis",
                  "Prescriptions",
                  "Lab results",
                  "Treatment notes",
                  "Medical history",
                ].map((x) => (
                  <li key={x}>✕ {x}</li>
                ))}
              </ul>
            </div>
          </div>

          <Link href="/flows" className="btn btn-teal">
            Back to process flows
          </Link>
        </div>
      </section>
    </>
  );
}
