import { db } from "@/lib/db";
import { razorpay } from "@/lib/razorpay";
import { logger, toPaise } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const {
    subAccountConnectedId, // The Razorpay Account ID of the Sub-account
    prices,
    subAccountId,
  }: {
    subAccountConnectedId: string;
    subAccountId: string;
    // Note: You need to pass the actual amount now as Razorpay Orders
    // require an explicit amount in Paise.
    prices: { recurring: boolean; productId: string; amount: number }[];
  } = await req.json();

  const origin = req.headers.get("origin");

  // 1. Validations
  if (!subAccountConnectedId || !subAccountId || !prices.length) {
    return NextResponse.json(
      { error: "Required IDs are missing" },
      { status: 400 },
    );
  }

  if (
    !process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT ||
    !process.env.NEXT_PUBLIC_PLATFORM_ONETIME_FEE
  ) {
    return NextResponse.json(
      { error: "Platform fee configuration missing" },
      { status: 400 },
    );
  }

  const subAccountWithAgency = await db.subAccount.findUnique({
    where: { id: subAccountId },
    include: { Agency: true },
  });

  if (!subAccountWithAgency) {
    return NextResponse.json(
      { error: "Sub Account not found" },
      { status: 400 },
    );
  }

  const isSubscription = prices.some((p) => p.recurring);
  const totalAmount = prices.reduce((acc, curr) => acc + curr.amount, 0);
  const amountInPaise = toPaise(totalAmount);

  try {
    /**
     * RAZORPAY ROUTE LOGIC:
     * We create an Order and add a 'transfers' array to split the payment.
     * Platform Fee Calculation:
     */
    const platformFeePercent = isSubscription
      ? Number(process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT)
      : 0;

    const platformFixedFee = isSubscription
      ? 0
      : toPaise(Number(process.env.NEXT_PUBLIC_PLATFORM_ONETIME_FEE));

    // Calculate how much the SUB-ACCOUNT gets (Total - Platform Fee)
    const transferAmount = isSubscription
      ? Math.floor(amountInPaise * (1 - platformFeePercent / 100))
      : amountInPaise - platformFixedFee;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${subAccountId.slice(0, 10)}`,
      transfers: [
        {
          account: subAccountConnectedId, // The Sub-account's Razorpay ID
          amount: transferAmount,
          currency: "INR",
          notes: {
            subAccountId,
            type: isSubscription ? "subscription_split" : "onetime_split",
          },
          on_linked_account_payment: "refund", // Handle refunds automatically
        } as any,
      ],
      notes: {
        subAccountId,
        agencyId: subAccountWithAgency.Agency.id,
      },
    });

    return NextResponse.json(
      {
        orderId: order.id,
        amount: order.amount,
      } as any,
      {
        headers: {
          "Access-Control-Allow-Origin": origin || "*",
          "Access-Control-Allow-Methods": "GET,OPTIONS,POST",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      },
    );
  } catch (error: any) {
    logger(error);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}

export async function OPTIONS(request: Request) {
  const allowedOrigin = request.headers.get("origin");
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin || "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
