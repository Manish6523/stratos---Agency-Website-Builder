"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Building2,
  Shield,
  LayoutDashboard,
  Zap,
  Palette,
  MapPin,
  Users,
  Globe2,
  Coffee,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import clsx from "clsx";

const principles = [
  {
    title: "Agency Management",
    description:
      "Create and manage digital agencies with hierarchical team members, granular permissions, and centralized control.",
    icon: <Building2 className="w-8 h-8 text-primary" />,
  },
  {
    title: "Client Isolation",
    description:
      "Separate subaccounts for each client ensure independent pipelines, funnels, and media resources remain fully isolated.",
    icon: <Shield className="w-8 h-8 text-primary" />,
  },
  {
    title: "CRM & Pipelines",
    description:
      "Track deals, contacts, and sales processes with highly customizable Kanban boards and built-in value tracking.",
    icon: <LayoutDashboard className="w-8 h-8 text-primary" />,
  },
  {
    title: "Marketing Automation",
    description:
      "Build high-converting funnels, stunning landing pages, and launch automated workflows to drive client growth.",
    icon: <Zap className="w-8 h-8 text-primary" />,
  },
  {
    title: "White-labeling",
    description:
      "Deliver a premium experience with customizable branding, logos, and discrete subdomains tailored per agency.",
    icon: <Palette className="w-8 h-8 text-primary" />,
  },
];

const metrics = [
  {
    label: "Active Agencies",
    value: "2,000+",
    icon: <Building2 className="w-6 h-6" />,
  },
  { label: "Global Users", value: "50k+", icon: <Users className="w-6 h-6" /> },
  { label: "Countries", value: "140", icon: <Globe2 className="w-6 h-6" /> },
  { label: "Cups of Coffee", value: "∞", icon: <Coffee className="w-6 h-6" /> },
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen pt-36 pb-24 px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] z-[-1]" />
      <div className="absolute top-[40%] left-0 -ml-60 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] z-[-1] animate-pulse" />

      <section className="max-w-7xl mx-auto w-full z-10">
        {/* Interactive Hero Section */}
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24 mb-32">
          <div className="flex-1 space-y-8 text-center md:text-left">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight">
              The Engine <br />
              <span className="bg-linear-to-r from-primary via-primary/80 to-secondary-foreground text-transparent bg-clip-text">
                Behind Agencies
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
              We started with a simple belief: Digital agencies should spend
              more time delivering results and less time wrestling with
              fragmented tools. Stratos is the unified platform to scale your
              ambition.
            </p>
          </div>

          {/* Hero Visual - Floating Logo with concentric rings */}
          <div className="flex-1 relative w-full aspect-square max-w-md mx-auto group perspective-1000">
            <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-secondary/10 rounded-full border border-primary/20 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-700 ease-out group-hover:rotate-y-12 group-hover:rotate-x-12">
              {/* Concentric animated rings */}
              <div className="absolute inset-4 border border-primary/20 rounded-full animate-ping animation-duration-[3s]" />
              <div className="absolute inset-12 border border-primary/10 rounded-full animate-spin animation-duration-[10s]" />
              <div className="absolute inset-20 border border-secondary/20 rounded-full animate-reverse-spin animation-duration-[15s]" />

              <Image
                src="/assets/logo.svg"
                alt="Stratos Logo"
                width={200}
                height={200}
                className="opacity-90 dark:invert z-10 drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] dark:drop-shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Base platform shadow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 dark:bg-black/40 blur-xl rounded-[100%]" />
          </div>
        </div>

        {/* Metrics/Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-y border-border/50 py-16 bg-background/50 backdrop-blur-sm rounded-3xl px-8 shadow-sm">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                {metric.icon}
              </div>
              <div className="text-4xl md:text-5xl font-black bg-linear-to-br from-foreground to-foreground/60 text-transparent bg-clip-text">
                {metric.value}
              </div>
              <div className="text-sm uppercase tracking-widest text-muted-foreground font-semibold">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* The Timeline / Story Section */}
        <div className="mb-40 max-w-4xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">How we got here</h2>
            <p className="text-xl text-muted-foreground">
              The evolution of a multi-tenant powerhouse.
            </p>
          </div>

          <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:mx-auto space-y-16">
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary shadow-[0_0_10px_rgba(37,99,235,0.5)] ring-4 ring-background" />
              <div className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">
                2023
              </div>
              <h3 className="text-3xl font-bold mb-4">
                The Fragmentation Problem
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We realized agency owners were spending thousands of dollars a
                month piecing together CRM, pipeline management, and page
                builders. The integrations broke, and the client experience
                suffered. We started sketching the architecture for a unified
                system.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-primary/50 ring-4 ring-background" />
              <div className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">
                2024
              </div>
              <h3 className="text-3xl font-bold mb-4">
                Building Multi-Tenancy
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We engineered a robust top-down database structure ensuring
                absolute isolation between agencies and their respective
                sub-accounts. Stripe Connect was integrated for seamless
                rebilling.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-background border-2 border-primary ring-4 ring-background" />
              <div className="text-sm font-bold text-primary mb-2 tracking-widest uppercase">
                Today
              </div>
              <h3 className="text-3xl font-bold mb-4">The Launch of Stratos</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With visual page builders, advanced automation pipelines, and
                full white-label capabilities, Stratos is now empowering
                thousands of agencies to build and scale their operations.
              </p>
            </div>
          </div>
        </div>

        {/* Principles Section (Re-styled as clean horizontal cards) */}
        <div className="space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Our Engineering Principles
            </h2>
            <p className="text-xl text-muted-foreground">
              We don't just ship features; we adhere to strict architectural
              pillars to ensure the platform scales with you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, idx) => (
              <Card
                key={principle.title}
                className={clsx(
                  "bg-background/60 backdrop-blur-xl border-border/60 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1",
                  idx === principles.length - 1 &&
                    principles.length % 2 !== 0 &&
                    "md:col-span-2 lg:col-span-1",
                )}
              >
                <CardHeader className="space-y-6 pt-8">
                  <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary/10 to-transparent flex items-center justify-center border border-primary/20">
                    {principle.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {principle.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-8">
                  <CardDescription className="text-base text-muted-foreground/90 leading-relaxed font-medium">
                    {principle.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
