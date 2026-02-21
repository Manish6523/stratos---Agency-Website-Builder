export interface PricingItem {
  title: string;
  description: string;
  price: string;
  duration: string;
  highlight: string;
  features: string[];
  /** Plan ID from Razorpay */
  priceId: string;
}

export const PRICING: PricingItem[] = [
  {
    title: "Starter",
    description: "Perfect for trying out Stratos",
    price: "Free",
    duration: "",
    highlight: "Key features",
    features: ["3 Sub accounts", "2 Team members", "Unlimited pipelines"],
    priceId: "",
  },
  {
    title: "Unlimited Saas",
    description: "The ultimate agency kit",
    price: "₹19,900",
    duration: "month",
    highlight: "Key features",
    features: ["Everything in Starter and Basic", "Rebilling", "24/7 Support team"],
    priceId: "plan_unlimited_saas",
  },
  {
    title: "Basic",
    description: "For serious agency owners",
    price: "₹4,900",
    duration: "month",
    highlight: "Everything in Starter",
    features: ["Everything in Starter", "Unlimited Sub accounts", "Unlimited Team members"],
    priceId: "plan_basic",
  },
];
