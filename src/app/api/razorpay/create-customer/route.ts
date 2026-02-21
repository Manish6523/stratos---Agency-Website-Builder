import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/utils";
import type { RazorpayCustomer } from "@/lib/types"; 

export async function POST(req: NextRequest) {
  try {
    const body: RazorpayCustomer = await req.json();
    const { email, name, contact, shipping, address } = body;

    // Razorpay is stricter about 'contact' (phone) than Stripe.
    // If your frontend doesn't send it, the API call will fail.
    if (!email || !name || !contact) {
      return NextResponse.json("Missing required fields: email, name, and contact are mandatory.", {
        status: 400,
      });
    }

    const customer = await razorpay.customers.create({
      email,
      name,
      contact: contact, // Using the direct contact field
      notes: {
        address_line1: address?.line1 || "",
        city: address?.city || "",
        postal_code: address?.postal_code || "",
        shipping_name: shipping?.name || "",
      },
    });

    return NextResponse.json({
      customerId: customer.id,
    });
  } catch (error: any) {
    // Razorpay errors often contain a 'description' field
    logger("Razorpay Customer Error:", error.description || error.message);

    return NextResponse.json(error.description || "Internal server error", {
      status: 500,
    });
  }
}