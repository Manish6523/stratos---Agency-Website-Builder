"use server";

import { razorpay } from "@/lib/razorpay";
import { db } from "@/lib/db";
// import { Plan, Prisma } from "";
import { logger } from "@/lib/utils";
import { ADD_ONS } from "@/config/add-ons";
import { Plan, Prisma } from "../../../generated/prisma/client";

/**
 * 1. subscriptionCreate (Formerly Stripe subscriptionCreate)
 * Updated to handle Razorpay Order/Subscription objects.
 */
export const subscriptionCreate = async (
  subscription: any, // This will be the Razorpay Sub or Order object
  customerId: string,
) => {
  try {
    const agency = await db.agency.findFirst({
      where: { customerId },
      include: { SubAccount: true },
    });

    if (!agency) throw new Error("Agency not found");

    const data: Prisma.SubscriptionUncheckedCreateInput = {
      active:
        subscription.status === "active" || subscription.status === "captured",
      agencyId: agency.id,
      customerId,
      // Razorpay uses seconds for timestamps (like Stripe), so * 1000 for JS Date
      currentPeriodEndDate: new Date(
        (subscription.end_at || subscription.expire_by) * 1000,
      ),
      priceId: subscription.plan_id,
      subscritiptionId: subscription.id, // Keeping your schema's typo
      plan: subscription.plan_id as Plan,
    };

    return await db.subscription.upsert({
      where: { agencyId: agency.id },
      create: data,
      update: data,
    });
  } catch (error) {
    logger(error);
  }
};

/**
 * 2. getConnectAccountProducts (For Multi-tenancy)
 * NOTE: Razorpay doesn't have "Connect Accounts" in the same way.
 * This usually maps to "Razorpay Route" or linked accounts.
 */
export const getConnectAccountProducts = async (accountId: string) => {
  // In Razorpay, you'd fetch items/plans specific to a linked account
  // Placeholder returning all items if Route isn't fully set up
  const items = await razorpay.items.all();
  return items.items;
};

/**
 * 3. getAddOnsProducts
 */
export const getAddOnsProducts = async () => {
  // Mapping your ADD_ONS config to Razorpay Items
  const addOns = await razorpay.items.all({
    // You can filter by your ADD_ONS internal IDs if stored in Razorpay
  });
  return addOns;
};

/**
 * 4. getPrices
 */
export const getPrices = async () => {
  // Razorpay 'Plans' are the equivalent of Stripe 'Prices'
  const plans = await razorpay.plans.all();
  return plans;
};

/**
 * 5. getAgencyPayments
 * Fetches all Razorpay payments that have this agencyId in their notes.
 */
export const getAgencyPayments = async (agencyId: string) => {
  try {
    // Fetch last 100 payments — filter by agencyId in notes
    const response = (await razorpay.payments.all({
      count: 100,
    })) as any;

    const allPayments: any[] = response?.items || [];

    // Filter to only this agency's payments
    const agencyPayments = allPayments.filter(
      (p: any) => p.notes?.agencyId === agencyId,
    );

    return agencyPayments.map((p: any) => ({
      id: p.id,
      amount: Math.round(p.amount / 100), // paise → rupees
      currency: p.currency,
      status: p.status, // "captured" | "failed" | "refunded"
      planId: p.notes?.planId || "",
      orderId: p.order_id,
      createdAt: new Date(p.created_at * 1000),
      method: p.method, // "card" | "upi" | "netbanking" etc.
    }));
  } catch (error) {
    logger("getAgencyPayments error:", error);
    return [];
  }
};
