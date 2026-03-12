import React from "react";
import { Separator } from "@/components/ui/separator";
import { pricingCards } from "@/lib/constants";
import PricingCard from "./_component/pricing-card";
import Unauthorized from "@/components/unauthorized";
import { constructMetadata } from "@/lib/utils";
import { getAgencySubscription } from "@/lib/queries";
import { getAgencyPayments } from "@/lib/razorpay/razorpay-action";
import { currentUser } from "@clerk/nextjs/server";

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

  const [agencySubscription, user, paymentHistory] = await Promise.all([
    getAgencySubscription(agencyId),
    currentUser(),
    getAgencyPayments(agencyId),
  ]);

  // console.table(agencySubscription)

  const activePlan = agencySubscription?.Subscription?.plan;
  const customerId = agencySubscription?.customerId || "";

  return (
    <>
      <h1 className="text-3xl md:hidden font-bold mb-4">Billing</h1>
      <Separator className="mb-6 md:hidden" />

      {/* Active subscription banner */}
      {activePlan && (
        <div className="mb-6 rounded-lg border border-primary/30 bg-primary/5 px-6 py-4">
          <p className="text-sm font-medium">
            Active Plan:{" "}
            <span className="text-primary font-bold capitalize">
              {activePlan.replace("plan_", "").replace("_", " ")}
            </span>
            {agencySubscription?.Subscription?.currentPeriodEndDate && (
              <span className="text-muted-foreground ml-2 font-normal">
                (renews{" "}
                {new Date(
                  agencySubscription.Subscription.currentPeriodEndDate,
                ).toLocaleDateString("en-IN")}
                )
              </span>
            )}
          </p>
        </div>
      )}

      <h2 className="text-2xl mb-4">Current Plan</h2>
      <div className="flex flex-col lg:flex-row! justify-between gap-8 mb-4">
        {pricingCards.map((card) => (
          <PricingCard
            key={card.title}
            title={card.title}
            description={card.description}
            amt={card.price}
            duration={card.duration ? `/${card.duration}` : ""}
            features={card.features}
            highlightTitle={card.highlight}
            highlightDescription="Everything you need to scale."
            buttonCta={
              card.priceId === activePlan
                ? "Current Plan"
                : card.priceId === ""
                  ? "Free Plan"
                  : "Upgrade"
            }
            isPlanExists={card.priceId === activePlan}
            customerId={customerId}
            prices={[
              {
                recurring: true,
                productId: card.priceId,
                amount: card.amountInRupees,
              },
            ]}
            agencyId={agencyId}
            planId={card.priceId}
            userName={user?.fullName || user?.firstName || ""}
            userEmail={user?.emailAddresses?.[0]?.emailAddress || ""}
          />
        ))}
      </div>

      <h2 className="text-2xl mb-4">Payment History</h2>
      {paymentHistory.length > 0 ? (
        <div className="rounded-md border bg-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-4 gap-4 px-6 py-3 bg-muted/50 border-b text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            <span>Date</span>
            <span>Plan</span>
            <span>Method</span>
            <span className="text-right">Amount</span>
          </div>
          {/* Rows */}
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="grid grid-cols-4 gap-4 px-6 py-4 border-b last:border-0 items-center hover:bg-muted/30 transition-colors"
            >
              <div>
                <p className="text-sm font-medium">
                  {payment.createdAt.toLocaleDateString("en-IN")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {payment.createdAt.toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm capitalize font-medium">
                  {payment.planId
                    ? payment.planId.replace("plan_", "").replace("_", " ")
                    : "—"}{" "}
                  Plan
                </p>
                <p className="text-xs text-muted-foreground font-mono truncate">
                  {payment.id}
                </p>
              </div>
              <p className="text-sm capitalize text-muted-foreground">
                {payment.method || "—"}
              </p>
              <div className="text-right">
                <p className="text-sm font-semibold">
                  ₹{payment.amount.toLocaleString("en-IN")}
                </p>
                <span
                  className={`text-xs rounded-full px-2 py-0.5 font-medium ${
                    payment.status === "captured"
                      ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                      : payment.status === "failed"
                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-md border bg-card p-12 text-center border-dashed">
          <p className="text-muted-foreground">
            No transactions found. Upgrade to a paid plan to unlock all
            features.
          </p>
        </div>
      )}
    </>
  );
};

export default AgencyBillingPage;

export const metadata = constructMetadata({
  title: "Billing - Stratos",
});
