"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditorBtns } from "@/lib/constants";
import { getFunnel, getSubaccountDetails } from "@/lib/queries";
import { loadRazorpay } from "@/lib/razorpay/razorpay-client";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import { CreditCard, Loader2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  element: EditorElement;
};

const Checkout = (props: Props) => {
  const { dispatch, state, subaccountId, funnelId, pageDetails } = useEditor();
  const router = useRouter();

  const [livePrices, setLivePrices] = useState<
    { recurring: boolean; productId: string; amount: number }[]
  >([]);
  const [subAccountConnectAccId, setSubAccountConnectAccId] = useState("");
  const [loading, setLoading] = useState(false);

  const styles = props.element.styles;

  // Fetch the sub-account's connected Razorpay account ID
  useEffect(() => {
    if (!subaccountId) return;
    const fetchData = async () => {
      const subaccountDetails = await getSubaccountDetails(subaccountId);
      if (subaccountDetails?.connectAccountId) {
        setSubAccountConnectAccId(subaccountDetails.connectAccountId);
      }
    };
    fetchData();
  }, [subaccountId]);

  // Fetch the funnel's live product prices
  useEffect(() => {
    if (!funnelId) return;
    const fetchData = async () => {
      const funnelData = await getFunnel(funnelId);
      setLivePrices(JSON.parse(funnelData?.liveProducts || "[]"));
    };
    fetchData();
  }, [funnelId]);

  const handleDragStart = (e: React.DragEvent, type: EditorBtns) => {
    e.stopPropagation();
    if (type === null) return;
    e.dataTransfer.setData("componentType", type);
    e.dataTransfer.setData("componentId", props.element.id);
  };

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };

  const goToNextPage = async () => {
    const funnelPages = await getFunnel(funnelId);
    if (!funnelPages || !pageDetails) return;
    if (funnelPages.FunnelPages.length > pageDetails.order + 1) {
      const nextPage = funnelPages.FunnelPages.find(
        (page) => page.order === pageDetails.order + 1,
      );
      if (!nextPage) return;
      router.replace(
        `${process.env.NEXT_PUBLIC_SCHEME}${funnelPages.subDomainName}.${process.env.NEXT_PUBLIC_DOMAIN}/${nextPage.pathName}`,
      );
    }
  };

  /**
   * Initiates the Razorpay checkout flow for an end-customer purchasing from a funnel.
   */
  const handleRazorpayCheckout = async () => {
    if (!state.editor.liveMode) return;

    if (!livePrices.length || !subaccountId) {
      toast.error("No products configured for this funnel.");
      return;
    }

    setLoading(true);

    try {
      // 1. Load Razorpay checkout.js
      const razorpayLoaded = await loadRazorpay();
      if (!razorpayLoaded) {
        toast.error("Failed to load Razorpay. Please check your connection.");
        setLoading(false);
        return;
      }

      // 2. Create a Razorpay order via the checkout-session API
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/razorpay/create-checkout-session`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subAccountConnectedId: subAccountConnectAccId,
            prices: livePrices,
            subAccountId: subaccountId,
          }),
        },
      );

      if (!res.ok) {
        const err = await res.json();
        toast.error(err?.error || "Could not initiate payment. Try again.");
        setLoading(false);
        return;
      }

      const { orderId, amount } = await res.json();

      // 3. Open Razorpay checkout modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency: "INR",
        name: "Stratos",
        description: "Product Purchase",
        order_id: orderId,
        theme: { color: "#6C5CE7" },
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          toast.success("Payment successful! Thank you for your purchase.");
          await goToNextPage();
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.info("Payment cancelled.");
          },
        },
      };

      // @ts-ignore — Razorpay loaded dynamically
      const rzp = new window.Razorpay(options);
      rzp.on(
        "payment.failed",
        (response: { error: { description: string } }) => {
          toast.error("Payment failed: " + response.error.description);
          setLoading(false);
        },
      );
      rzp.open();
      setLoading(false);
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div
      style={styles}
      draggable
      onDragStart={(e) => handleDragStart(e, "paymentForm")}
      onClick={handleOnClickBody}
      className={clsx(
        "p-[2px] w-full my-[5px] relative text-[16px] transition-all flex items-center justify-center",
        {
          "border-blue-500!":
            state.editor.selectedElement.id === props.element.id,
          "border-solid!": state.editor.selectedElement.id === props.element.id,
          "border-dashed border border-slate-300": !state.editor.liveMode,
        },
      )}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left rounded-none rounded-t-lg tracking-normal font-sans">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-px rounded-none rounded-t-lg text-white! tracking-normal font-sans">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}

      {/* Editor placeholder view */}
      {!state.editor.liveMode && (
        <div className="flex flex-col items-center gap-3 py-8 px-6 w-full max-w-sm border border-dashed border-primary/40 rounded-lg bg-primary/5">
          <CreditCard className="h-8 w-8 text-primary/60" />
          <p className="text-sm font-medium text-center text-muted-foreground">
            Razorpay Payment Form
          </p>
          <p className="text-xs text-center text-muted-foreground/70">
            Customers will see a Razorpay checkout button here.
            <br />
            Configure products in the funnel settings.
          </p>
        </div>
      )}

      {/* Live mode checkout button */}
      {state.editor.liveMode && (
        <Button
          onClick={handleRazorpayCheckout}
          disabled={loading}
          className="w-full max-w-sm bg-[#6C5CE7] hover:bg-[#5a4dcf] text-white font-semibold py-3 rounded-lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-4 w-4" />
              Pay Securely via Razorpay
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default Checkout;
