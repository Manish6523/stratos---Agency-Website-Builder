import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/utils";
import { Plan } from "../../../../../generated/prisma/client";

/**
 * POST /api/razorpay/verify-payment
 * Called by the frontend after a successful Razorpay checkout.
 * Verifies the payment signature and activates the agency subscription.
 */
export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      agencyId,
      planId,
      amount,
    }: {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      agencyId: string;
      planId: string;
      amount: number;
    } = await req.json();

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature ||
      !agencyId ||
      !planId
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json(
        { error: "Razorpay key secret not configured" },
        { status: 500 },
      );
    }

    // Verify the payment signature: HMAC-SHA256 of "order_id|payment_id"
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      logger("Payment signature mismatch");
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 },
      );
    }

    // Fetch the agency to get customerId
    const agency = await db.agency.findUnique({
      where: { id: agencyId },
      select: { id: true, customerId: true },
    });

    if (!agency) {
      return NextResponse.json({ error: "Agency not found" }, { status: 404 });
    }

    // Upsert the subscription record
    const planEnum = planId as Plan;
    const currentPeriodEndDate = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    );

    const subscriptionData = {
      active: true,
      agencyId,
      customerId: agency.customerId,
      currentPeriodEndDate,
      priceId: planId,
      subscritiptionId: razorpay_payment_id,
      plan: planEnum,
      price: String(Math.round(amount / 100)), // paise → rupees
    };

    await db.subscription.upsert({
      where: { agencyId },
      create: subscriptionData,
      update: subscriptionData,
    });

    logger(`Subscription activated for agency: ${agencyId}, plan: ${planId}`);

    return NextResponse.json(
      { success: true, message: "Payment verified and subscription activated" },
      { status: 200 },
    );
  } catch (error: any) {
    logger("Verify payment error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 },
    );
  }
}
