import React from "react";
import { Separator } from "@/components/ui/separator";
import { pricingCards } from "@/lib/constants";
import PricingCard from "./_component/pricing-card";
import Unauthorized from "@/components/unauthorized";
import { constructMetadata } from "@/lib/utils";
import { getAgencySubscription } from "@/lib/queries";

interface AgencyBillingPageProps {
  params: Promise<{
    agencyId: string | undefined;
  }>;
}

const AgencyBillingPage: React.FC<AgencyBillingPageProps> = async ({
  params,
}) => {
  const { agencyId } = await params;

  if (!agencyId) return <Unauthorized />;

  // We still fetch the agency data to see if they have an "active" flag in DB
  // but we ignore the actual payment requirements.
  const agencySubscription = await getAgencySubscription(agencyId);

  return (
    <>
      <h1 className="text-3xl md:hidden font-bold mb-4">Billing</h1>
      <Separator className="mb-6 md:hidden" />
      <h2 className="text-2xl mb-4">Current Plan</h2>
      <div className="flex flex-col lg:flex-row! justify-between gap-8 mb-4">
        
        {pricingCards.map((card) => (
          <PricingCard
            key={card.title}
            title={card.title}
            description={card.description}
            amt={card.price}
            duration={card.duration ? `/${card.duration}` : ''}
            features={card.features}
            highlightTitle={card.highlight}
            highlightDescription="Everything you need to scale."
            // Since payments are ditched, we can show "Active" for their current tier 
            // or just let them explore the UI.
            buttonCta={card.title === 'Starter' ? 'Current Plan' : 'Select Plan'}
            isPlanExists={true} 
            customerId=""
            prices={[]}
          />
        ))}
      </div>

      <h2 className="text-2xl mb-4">Payment History</h2>
      <div className="rounded-md border bg-card p-12 text-center border-dashed">
        <p className="text-muted-foreground">
          No transactions found. Stratos is currently an open-access platform.
        </p>
      </div>
    </>
  );
};

export default AgencyBillingPage;

export const metadata = constructMetadata({
  title: "Billing - Stratos",
});