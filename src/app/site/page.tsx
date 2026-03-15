"use client";
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
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col w-full overflow-x-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full flex items-center justify-center flex-col pt-20 px-4">
        {/* Background Grid & Spotlight */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8 animate-fade-in">
            <Sparkles className="w-3 h-3" />
            <span>The all-in-one agency OS</span>
          </div>

          <h1 className="text-6xl md:text-[180px] lg:text-[220px] font-black text-center tracking-tighter leading-none mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50 px-2">
              Stratos
            </span>
          </h1>

          <p className="max-w-[600px] text-center text-muted-foreground text-lg md:text-xl mb-10 leading-relaxed">
            Revolutionize your agency workflow. Manage clients, build funnels,
            and automate billing in a single, unified workspace.
          </p>

          <div className="flex gap-4 mb-20">
            <Button size="lg" className="rounded-full px-8 font-bold group">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="relative w-full max-w-[1200px] px-4 animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/20 blur-[120px] rounded-full -z-10" />
          <div className="rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-2 shadow-2xl">
            <Image
              src={"/assets/preview.png"}
              alt="Stratos Dashboard"
              width={1200}
              height={1200}
              className={clsx(
                "rounded-xl border border-border shadow-inner transition-all duration-500",
                !mounted ? "" : theme === "light" ? "invert" : "invert-0",
              )}
            />
          </div>
          {/* Bottom fade for preview */}
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-t from-background via-background/20 to-transparent z-10" />
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-4 bg-background" id="pricing">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground text-lg">
              Choose the plan that fits your agency size. No hidden fees.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8">
            {pricingCards.map((card) => {
              const isHighlighted = card.title === "Unlimited Saas";
              return (
                <Card
                  key={card.title}
                  className={clsx(
                    "w-80 flex flex-col justify-between relative overflow-hidden",
                    {
                      "border-2 border-primary shadow-lg shadow-primary/10":
                        isHighlighted,
                    },
                  )}
                >
                  {isHighlighted && (
                    <div className="absolute top-4 right-4">
                      <span className="text-[11px] font-semibold text-primary bg-primary/10 rounded-full px-2.5 py-1">
                        Most Popular
                      </span>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle
                      className={clsx("", {
                        "text-muted-foreground": !isHighlighted,
                      })}
                    >
                      {card.title}
                    </CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-bold">{card.price}</span>
                      {card.duration && (
                        <span className="text-sm text-muted-foreground mb-1">
                          /{card.duration}
                        </span>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col items-start gap-4">
                    <div className="h-px bg-border w-full" />
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      {card.highlight}
                    </p>
                    <ul className="space-y-2.5 w-full">
                      {card.features.map((feature) => (
                        <li
                          key={feature.label}
                          className="flex items-center gap-2.5 text-sm"
                        >
                          {feature.available ? (
                            <Check className="h-4 w-4 shrink-0 text-primary" />
                          ) : (
                            <X className="h-4 w-4 shrink-0 text-muted-foreground/40" />
                          )}
                          <span
                            className={
                              feature.available
                                ? "text-foreground/80"
                                : "text-muted-foreground/40 line-through"
                            }
                          >
                            {feature.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      href={`/agency`}
                      className={clsx(
                        "w-full text-center p-2.5 rounded-md font-medium transition-colors",
                        isHighlighted
                          ? "bg-primary text-primary-foreground hover:bg-primary/90"
                          : "bg-muted text-muted-foreground hover:bg-muted/80",
                      )}
                    >
                      Get Started
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
