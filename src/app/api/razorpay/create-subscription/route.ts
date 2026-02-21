import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import { logger, toPaise } from "@/lib/utils";

export async function POST(req: NextRequest) {
  // priceId in Razorpay context is usually the Plan ID or the Amount
  const { priceId, customerId, amount } = await req.json();

  if (!priceId) {
    return NextResponse.json("Plan/Price ID not found", { status: 400 });
  }

  try {
    // 1. Check if agency exists and has an active sub
    const agency = await db.agency.findFirst({
      where: { customerId }, // Or search by clerkId/email if customerId isn't set yet
      include: { Subscription: true },
    });

    // 2. Logic for Razorpay Order Creation
    // In Razorpay, we create an 'Order' first. The frontend uses this Order ID.
    const options = {
      amount: toPaise(amount), // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        agencyId: agency?.id,
        planId: priceId,
      },
    };

    const order = await razorpay.orders.create(options as any) as any;

    /* NOTE: If you want to use the actual 'Subscriptions' API (recurring), 
      you would use razorpay.subscriptions.create({ plan_id: priceId, ... })
      But for Stratos, the Orders API is more flexible for custom checkout modals.
    */

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });

  } catch (error) {
    logger("Razorpay Order Error:", error);
    return NextResponse.json("Internal server error", { status: 500 });
  }
}