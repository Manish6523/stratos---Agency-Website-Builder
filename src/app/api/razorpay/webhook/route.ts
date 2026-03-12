import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { logger } from "@/lib/utils";
import { Plan } from "../../../../../generated/prisma/client";

/**
 * Razorpay Webhook Handler
 * Verifies the HMAC-SHA256 signature and processes payment events.
 * Configure this URL in your Razorpay Dashboard → Settings → Webhooks.
 */
export async function POST(req: NextRequest) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { error: "Webhook secret not configured" },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  const razorpaySignature = req.headers.get("x-razorpay-signature");

  if (!razorpaySignature) {
    return NextResponse.json(
      { error: "Missing signature header" },
      { status: 400 },
    );
  }

  // Verify the webhook signature
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    logger("Webhook signature mismatch");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  logger("Razorpay webhook event:", event.event);

  try {
    switch (event.event) {
      /**
       * payment.captured — fired when a payment is successfully captured.
       * We use notes on the order to find the agency and update their subscription.
       */
      case "payment.captured": {
        const payment = event.payload?.payment?.entity;
        if (!payment) break;

        const agencyId = payment.notes?.agencyId;
        const planId = payment.notes?.planId;

        if (!agencyId || !planId) {
          logger("Missing agencyId or planId in payment notes");
          break;
        }

        await upsertAgencySubscription({
          agencyId,
          planId,
          paymentId: payment.id,
          orderId: payment.order_id,
          amount: payment.amount,
        });
        break;
      }

      /**
       * subscription.charged — fired when a recurring subscription payment succeeds.
       */
      case "subscription.charged": {
        const subscription = event.payload?.subscription?.entity;
        const payment = event.payload?.payment?.entity;
        if (!subscription || !payment) break;

        const agencyId = subscription.notes?.agencyId;
        const planId = subscription.plan_id;

        if (!agencyId || !planId) {
          logger("Missing agencyId or planId in subscription notes");
          break;
        }

        await upsertAgencySubscription({
          agencyId,
          planId,
          paymentId: payment.id,
          orderId: payment.order_id || subscription.id,
          amount: payment.amount,
          subscriptionId: subscription.id,
          endAt: subscription.end_at,
        });
        break;
      }

      /**
       * subscription.activated — fired when a new subscription becomes active.
       */
      case "subscription.activated": {
        const subscription = event.payload?.subscription?.entity;
        if (!subscription) break;

        const agencyId = subscription.notes?.agencyId;
        const planId = subscription.plan_id;

        if (!agencyId || !planId) {
          logger("Missing agencyId or planId in activated subscription notes");
          break;
        }

        await upsertAgencySubscription({
          agencyId,
          planId,
          paymentId: "",
          orderId: subscription.id,
          amount: 0,
          subscriptionId: subscription.id,
          endAt: subscription.end_at,
        });
        break;
      }

      default:
        logger(`Unhandled webhook event: ${event.event}`);
    }
  } catch (error) {
    logger("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

/**
 * Helper to upsert an agency subscription record in the database.
 */
async function upsertAgencySubscription({
  agencyId,
  planId,
  paymentId,
  orderId,
  amount,
  subscriptionId,
  endAt,
}: {
  agencyId: string;
  planId: string;
  paymentId: string;
  orderId: string;
  amount: number;
  subscriptionId?: string;
  endAt?: number;
}) {
  const agency = await db.agency.findUnique({
    where: { id: agencyId },
    select: { id: true, customerId: true },
  });

  if (!agency) {
    logger(`Agency not found: ${agencyId}`);
    return;
  }

  // Convert planId to Prisma Plan enum value
  const planEnum = planId as Plan;

  // Default period end: 30 days from now if not provided
  const currentPeriodEndDate = endAt
    ? new Date(endAt * 1000)
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const subscriptionData = {
    active: true,
    agencyId,
    customerId: agency.customerId,
    currentPeriodEndDate,
    priceId: planId,
    subscritiptionId: subscriptionId || orderId,
    plan: planEnum,
    price: String(Math.round(amount / 100)), // Convert paise to rupees
  };

  await db.subscription.upsert({
    where: { agencyId },
    create: subscriptionData,
    update: subscriptionData,
  });

  logger(`Subscription upserted for agency: ${agencyId}, plan: ${planId}`);
}
