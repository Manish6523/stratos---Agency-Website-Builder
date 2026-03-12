"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { toast } from "sonner";
import { loadRazorpay } from "@/lib/razorpay/razorpay-client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  features: { label: string; available: boolean }[];
  buttonCta: string;
  title: string;
  description: string;
  amt: string;
  duration: string;
  highlightTitle: string;
  highlightDescription: string;
  customerId: string;
  prices: { recurring: boolean; productId: string; amount: number }[];
  isPlanExists: boolean;
  agencyId: string;
  planId: string;
  userName: string;
  userEmail: string;
}

const PricingCard: React.FC<PricingCardProps> = ({
  amt,
  buttonCta,
  description,
  duration,
  features,
  title,
  isPlanExists,
  prices,
  agencyId,
  planId,
  userName,
  userEmail,
}) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isFreePlan = !planId;
  const isDisabled = isPlanExists || isFreePlan;

  const handleCheckout = async () => {
    if (!planId || isPlanExists) return;
    setLoading(true);
    try {
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Failed to load Razorpay.");
        setLoading(false);
        return;
      }

      const priceData = prices[0];
      const res = await fetch("/api/razorpay/create-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: planId,
          customerId: agencyId,
          amount: priceData?.amount ?? 0,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err?.message || "Could not initiate payment.");
        setLoading(false);
        return;
      }

      const { orderId, amount, currency } = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: currency || "INR",
        name: "Stratos Agency",
        description: `${title} Plan`,
        order_id: orderId,
        prefill: { name: userName, email: userEmail },
        notes: { agencyId, planId },
        theme: { color: "#7C3AED" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                agencyId,
                planId,
                amount,
              }),
            });
            if (verifyRes.ok) {
              toast.success(`🎉 ${title} plan activated!`);
              router.refresh();
            } else {
              const err = await verifyRes.json();
              toast.error(err?.error || "Verification failed.");
            }
          } catch {
            toast.error("Verification error. Contact support.");
          }
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled.");
          },
        },
      };

      // @ts-ignore
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (r: { error: { description: string } }) => {
        toast.error("Payment failed: " + r.error.description);
        setLoading(false);
      });
      rzp.open();
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col lg:w-1/3 rounded-xl border bg-card p-6 gap-6",
        isPlanExists
          ? "border-primary ring-2 ring-primary/20"
          : "border-border",
      )}
    >
      {/* Plan name & price */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-base">{title}</h3>
          {isPlanExists && (
            <span className="text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-0.5">
              Active
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-end gap-1">
          <span className="text-4xl font-bold">{amt}</span>
          {duration && (
            <span className="text-sm text-muted-foreground mb-1">
              /{duration}
            </span>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Features */}
      <ul className="flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f.label} className="flex items-center gap-2.5 text-sm">
            {f.available ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
            ) : (
              <XCircle className="h-4 w-4 shrink-0 text-muted-foreground/40" />
            )}
            <span
              className={
                f.available
                  ? "text-foreground/80"
                  : "text-muted-foreground/40 line-through"
              }
            >
              {f.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <Button
        className="w-full"
        variant={isPlanExists ? "secondary" : "default"}
        onClick={handleCheckout}
        disabled={isDisabled || loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          buttonCta
        )}
      </Button>
    </div>
  );
};

export default PricingCard;
