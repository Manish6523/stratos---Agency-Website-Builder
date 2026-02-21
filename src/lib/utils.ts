import { Metadata } from "next";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility for merging Tailwind CSS classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Custom logger that only outputs to the console in development mode.
 */
export const logger = (...args: any[]) => {
  if (process.env.NODE_ENV === "development") {
    console.log("%c[DEV]:", "background-color: yellow; color: black", args);
  }
};

/**
 * Formats numbers into currency strings.
 * Default set to INR (Indian Rupee) for your Razorpay integration.
 */
export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD" | "EUR" | "GBP" | "INR";
    maximumFractionDigits?: number;
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const {
    currency = "INR",
    notation = "standard",
    maximumFractionDigits = 2,
  } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits,
  }).format(numericPrice);
}

/**
 * Converts standard currency (Rupees) to the smallest unit (Paise).
 * Essential for Razorpay API calls.
 */
export function toPaise(amount: number) {
  return Math.round(amount * 100);
}

/**
 * Calculates the platform fee and agency payout based on environment variables.
 */
export function calculateSplit(totalAmount: number) {
  const platformPercent =
    Number(process.env.NEXT_PUBLIC_PLATFORM_SUBSCRIPTION_PERCENT) || 0;
  const platformFee = totalAmount * (platformPercent / 100);
  const agencyPayout = totalAmount - platformFee;

  return {
    platformFee,
    agencyPayout,
  };
}

/**
 * Generates SEO metadata for the application.
 */
export function constructMetadata({
  title = "Stratos - Run Your Agency",
  description = "Stratos - The all-in-one platform to run your digital agency efficiently.",
  image = "/assets/preview.png",
  icons = "/assets/plura-logo.svg",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@denvudd",
    },
    icons,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_URL || "http://localhost:3000",
    ),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
