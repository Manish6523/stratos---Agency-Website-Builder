"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  KanbanSquare,
  Users2,
  FolderOpenDot,
  MousePointerClick,
  MonitorSmartphone,
  Sparkles,
  Link as LinkIcon,
  CreditCard,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import clsx from "clsx";

const mainFeatures = [
  {
    title: "Visual Page Builder",
    description:
      "Launch stunning, high-converting websites and funnels in minutes. Our drag-and-drop editor gives you full granular control over every pixel without writing a single line of code.",
    icon: <MousePointerClick className="w-8 h-8 text-primary" />,
    benefits: [
      "Drag-and-drop interface",
      "Global styling & components",
      "Mobile-responsive by design",
    ],
  },
  {
    title: "CRM & Pipelines",
    description:
      "Never lose track of a lead again. Visualize your entire sales process with customizable Kanban boards. Track deal values, assign tasks automatically, and close more clients.",
    icon: <KanbanSquare className="w-8 h-8 text-primary" />,
    benefits: [
      "Customizable deal stages",
      "Automated stage movements",
      "Real-time value tracking",
    ],
  },
  {
    title: "Automation Engine",
    description:
      "Put your agency on autopilot. Build complex trigger-based workflows to handle lead nurturing, team notifications, and client onboarding sequences automatically.",
    icon: <Sparkles className="w-8 h-8 text-primary" />,
    benefits: [
      "Multi-step sequences",
      "Conditional logic branching",
      "Native email & SMS integrations",
    ],
  },
];

const bentoFeatures = [
  {
    title: "Agency Dashboard",
    description:
      "Comprehensive analytics with financial metrics and client tracking.",
    icon: <MonitorSmartphone className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-2",
  },
  {
    title: "Stripe & Razorpay",
    description:
      "Frictionless multi-currency billing architecture built right in.",
    icon: <CreditCard className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Team Management",
    description: "Manage team roles and RBAC permissions.",
    icon: <Users2 className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Media Bucket",
    description: "Full CRUD system for organizing and sharing visual assets.",
    icon: <FolderOpenDot className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Custom Subdomains",
    description: "Distinct workspaces mapped to unlimited custom domains.",
    icon: <LinkIcon className="w-6 h-6" />,
    colSpan: "col-span-1 md:col-span-2 lg:col-span-1",
  },
];

const FeaturesPage = () => {
  return (
    <div className="min-h-screen pt-36 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Hero Section */}
      <div className="relative max-w-7xl mx-auto text-center mb-32 z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] z-[-1]" />

        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-4 py-1.5 mb-6 border border-primary/20">
          Everything You Need
        </Badge>
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 leading-tight">
          Built for <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-primary/80 to-secondary">
            Absolute Control
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-10">
          Stratos replaces dozens of fragmented tools with one cohesive,
          multi-tenant ecosystem designed to scale your agency.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="h-14 px-8 text-lg font-bold rounded-full shadow-xl shadow-primary/25"
          >
            <Link href="/agency">Start Building Free</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-14 px-8 text-lg font-bold rounded-full bg-background/50 backdrop-blur-sm border-border"
          >
            <Link href="/site/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>

      {/* Alternating Features */}
      <div className="max-w-7xl mx-auto space-y-40 mb-40">
        {mainFeatures.map((feature, idx) => {
          const isEven = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={clsx(
                "flex flex-col md:flex-row items-center gap-12 lg:gap-24",
                {
                  "md:flex-row-reverse": !isEven,
                },
              )}
            >
              {/* Text Side */}
              <div className="flex-1 space-y-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center shadow-inner border border-primary/20">
                  {feature.icon}
                </div>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                  {feature.title}
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <ul className="space-y-4 mt-8">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-lg font-medium"
                    >
                      <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="link"
                  className="p-0 text-primary text-lg font-semibold mt-4 gap-2 h-auto hover:no-underline hover:text-primary/80"
                >
                  <Link
                    href="/site/documentation"
                    className="flex items-center gap-2"
                  >
                    Learn more about {feature.title}{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Visual Side (Mockup Placeholder) */}
              <div className="flex-1 w-full relative group">
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-linear-to-tr from-primary/20 to-secondary/20 blur-3xl rounded-[3rem] opacity-50 transition-opacity duration-500 group-hover:opacity-70" />

                {/* Mockup Window */}
                <div className="relative aspect-4/3 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
                  {/* Window Bar */}
                  <div className="h-10 bg-muted/50 border-b border-border/50 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  {/* Window Content */}
                  <div className="flex-1 p-6 flex flex-col gap-4">
                    <div className="w-1/3 h-6 bg-muted rounded-md animate-pulse" />
                    <div className="w-full flex-1 bg-muted/50 rounded-lg border border-border/50 flex items-center justify-center">
                      <span className="text-muted-foreground font-medium flex items-center gap-2">
                        {feature.icon} Interactive UI Simulation
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bento Grid */}
      <div className="max-w-7xl mx-auto mb-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            More powerful capabilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to run your entire stack, built inherently into
            Stratos. No duct-tape required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3 gap-6 auto-rows-[250px]">
          {bentoFeatures.map((item, idx) => (
            <div
              key={idx}
              className={clsx(
                "group relative bg-background/50 border border-border/50 rounded-3xl p-8 overflow-hidden hover:border-primary/50 transition-colors shadow-sm",
                item.colSpan,
              )}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-colors duration-500 group-hover:bg-primary/10" />
              <div className="relative z-10 h-full flex flex-col">
                <div className="w-14 h-14 rounded-2xl bg-secondary/20 text-secondary-foreground flex items-center justify-center mb-auto group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <h2 className="text-4xl font-bold">Experience the difference today</h2>
        <Button
          size="lg"
          className="h-14 px-10 text-lg font-bold rounded-full"
          asChild
        >
          <Link href="/agency">Get Started For Free</Link>
        </Button>
      </div>
    </div>
  );
};

export default FeaturesPage;
