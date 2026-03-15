"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check, HelpCircle, Minus, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const featuresList = [
  { name: "Sub accounts", starter: "2", basic: "4", unlimited: "Unlimited" },
  {
    name: "Team members",
    starter: "3 / subaccount",
    basic: "6 / subaccount",
    unlimited: "Unlimited",
  },
  {
    name: "Funnels",
    starter: "2 (3 steps max)",
    basic: "4 (unlimited steps)",
    unlimited: "Unlimited",
  },
  {
    name: "Pipelines",
    starter: "Unlimited",
    basic: "Unlimited",
    unlimited: "Unlimited",
  },
  { name: "Custom domains", starter: true, basic: true, unlimited: true },
  { name: "AI Funnel Editor", starter: false, basic: true, unlimited: true },
  { name: "Templates", starter: false, basic: "All", unlimited: "All" },
  { name: "White labelling", starter: false, basic: false, unlimited: true },
  { name: "Rebilling", starter: false, basic: false, unlimited: true },
  {
    name: "24/7 Priority support",
    starter: false,
    basic: false,
    unlimited: true,
  },
];

const faqs = [
  {
    question: "Can I use my own custom domain?",
    answer:
      "Yes, you can connect your existing domain to any funnel or website created in Stratos, ensuring your brand stays front and center.",
  },
  {
    question: "How does white-labeling work?",
    answer:
      "With our Unlimited SaaS plan, you can customize the Stratos platform with your agency's logo, colors, and domain. Your clients will never see the Stratos branding.",
  },
  {
    question: "What happens if I exceed my plan limits?",
    answer:
      "If you hit the limits of your current plan (like max sub-accounts or funnels), you will be prompted to upgrade to the next tier to continue growing.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "No, there are no hidden setup fees. You only pay the listed monthly or annual subscription price.",
  },
];

const PricingPage = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-16 max-w-3xl mx-auto space-y-6">
        <Badge
          variant="outline"
          className="text-primary border-primary/20 bg-primary/5 px-4 py-1.5 text-sm mb-4"
        >
          Pricing Plans
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Simple,{" "}
          <span className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text">
            Transparent
          </span>{" "}
          Pricing
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Choose the right plan for your agency. Grow without limits and
          white-label everything to provide a premium client experience.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span
            className={clsx(
              "text-sm font-medium transition-colors",
              !isAnnual ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-primary/20 relative transition-colors flex items-center px-1"
          >
            <div
              className={clsx(
                "w-5 h-5 rounded-full bg-primary transition-all duration-300 shadow-sm",
                isAnnual ? "translate-x-7" : "translate-x-0",
              )}
            />
          </button>
          <span
            className={clsx(
              "text-sm font-medium transition-colors flex items-center gap-2",
              isAnnual ? "text-foreground" : "text-muted-foreground",
            )}
          >
            Annually{" "}
            <Badge
              variant="secondary"
              className="bg-green-500/10 text-green-600 dark:text-green-400 border-none text-[10px] uppercase font-bold tracking-wider py-0"
            >
              Save 20%
            </Badge>
          </span>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto w-full mb-24">
        {pricingCards.map((card) => {
          const isHighlighted = card.title === "Unlimited Saas";
          // Mock annual pricing logic
          const monthlyPrice = parseInt(card.price.replace(/[^0-9]/g, "")) || 0;
          const displayPrice =
            isAnnual && monthlyPrice > 0
              ? "₹" + Math.floor(monthlyPrice * 0.8)
              : card.price;

          return (
            <Card
              key={card.title}
              className={clsx(
                "flex flex-col justify-between relative overflow-hidden transition-all duration-500 hover:-translate-y-2 bg-background/60 backdrop-blur-xl border-border/50",
                {
                  "border-primary/50 shadow-2xl shadow-primary/10":
                    isHighlighted,
                  "shadow-xl": !isHighlighted,
                },
              )}
            >
              {isHighlighted && (
                <>
                  <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-transparent to-transparent opacity-50 pointer-events-none" />
                  <div className="absolute top-0 right-0 left-0 h-1 bg-linear-to-r from-primary to-secondary" />
                  <div className="absolute top-6 right-6">
                    <span className="text-[10px] font-bold text-primary-foreground bg-primary rounded-full px-3 py-1 uppercase tracking-wider shadow-sm">
                      Most Popular
                    </span>
                  </div>
                </>
              )}
              <CardHeader className="pt-10 z-10">
                <CardTitle
                  className={clsx("text-2xl font-bold", {
                    "text-primary": isHighlighted,
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription className="h-12 mt-2 text-base">
                  {card.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-5xl font-extrabold tracking-tight">
                    {displayPrice}
                  </span>
                  {card.duration && (
                    <span className="text-sm font-medium text-muted-foreground ml-2">
                      / {isAnnual ? "month, billed annually" : card.duration}
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="z-10 grow">
                <div className="h-px bg-border/50 w-full mb-6" />
                <p className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">
                  {card.highlight}
                </p>
                <ul className="space-y-4 w-full">
                  {card.features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-3 text-sm leading-snug"
                    >
                      {feature.available ? (
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="h-3.5 w-3.5 text-primary" />
                        </div>
                      ) : (
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <X className="h-3.5 w-3.5 text-muted-foreground/50" />
                        </div>
                      )}
                      <span
                        className={clsx(
                          feature.available
                            ? "text-foreground/90 font-medium"
                            : "text-muted-foreground/50",
                        )}
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="z-10 pb-10">
                <Button
                  asChild
                  size="lg"
                  className={clsx(
                    "w-full font-bold text-md h-12 transition-all",
                    isHighlighted
                      ? "shadow-lg shadow-primary/25 hover:shadow-primary/40"
                      : "",
                  )}
                  variant={isHighlighted ? "default" : "secondary"}
                >
                  <Link href="/agency">
                    Get Started {isHighlighted && "Free"}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Feature Comparison Table */}
      <div className="w-full max-w-5xl mx-auto mb-32 hidden md:block">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Compare plans in detail</h2>
          <p className="text-muted-foreground mt-4">
            Find the exact features you need to scale your agency.
          </p>
        </div>
        <div className="overflow-x-auto rounded-xl border bg-card text-card-foreground shadow-sm">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs tracking-wider">
              <tr>
                <th className="p-4 font-semibold w-1/3">Feature</th>
                <th className="p-4 font-semibold w-1/5 text-center">Starter</th>
                <th className="p-4 font-semibold w-1/5 text-center text-primary">
                  Basic
                </th>
                <th className="p-4 font-semibold w-1/5 text-center">
                  Unlimited SaaS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {featuresList.map((feature, idx) => (
                <tr key={idx} className="hover:bg-muted/20 transition-colors">
                  <td className="p-4 font-medium flex items-center gap-2">
                    {feature.name}
                    <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.starter === "boolean" ? (
                      feature.starter ? (
                        <Check className="w-5 h-5 mx-auto text-primary" />
                      ) : (
                        <Minus className="w-5 h-5 mx-auto text-muted-foreground/30" />
                      )
                    ) : (
                      <span className="text-muted-foreground">
                        {feature.starter}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.basic === "boolean" ? (
                      feature.basic ? (
                        <Check className="w-5 h-5 mx-auto text-primary" />
                      ) : (
                        <Minus className="w-5 h-5 mx-auto text-muted-foreground/30" />
                      )
                    ) : (
                      <span className="text-muted-foreground font-medium">
                        {feature.basic}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {typeof feature.unlimited === "boolean" ? (
                      feature.unlimited ? (
                        <Check className="w-5 h-5 mx-auto text-primary" />
                      ) : (
                        <Minus className="w-5 h-5 mx-auto text-muted-foreground/30" />
                      )
                    ) : (
                      <span className="text-foreground font-semibold">
                        {feature.unlimited}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="w-full max-w-3xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
        </div>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={"item-" + index}
              className="border-border/50 px-2"
            >
              <AccordionTrigger className="text-left font-semibold text-lg hover:no-underline hover:text-primary transition-colors py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Section */}
      <div className="w-full max-w-5xl mx-auto bg-linear-to-tr from-primary/10 via-primary/5 to-secondary/10 rounded-3xl p-12 text-center border border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

        <h2 className="text-4xl font-bold mb-4 relative z-10">
          Ready to scale your agency?
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
          Join thousands of agencies who have streamlined their operations and
          grown their revenue with Stratos.
        </p>
        <Button
          size="lg"
          className="h-14 px-8 text-lg font-bold rounded-full relative z-10 shadow-xl shadow-primary/20"
        >
          Start Your Free Trial
        </Button>
      </div>
    </div>
  );
};

export default PricingPage;
