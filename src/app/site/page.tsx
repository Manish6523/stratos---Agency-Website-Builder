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
import { Check, X } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <section className="min-h-screen w-full  relative flex items-center md:justify-center flex-col">
        {/* grid */}
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-size-[4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        <p className="text-center mt-24 z-5">Run your agency, in one place</p>
        <div className="bg-linear-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative ">
          <h1 className="text-8xl sm:text-9xl font-bold text-center md:text-[250px]">
            Stratos
          </h1>
        </div>
        <div className="flex justify-center items-center relative md:-mt-17.5 px-2">
          <Image
            src={"/assets/preview.png"}
            alt="banner image"
            width={1200}
            height={1200}
            className={`rounded-tl-2xl rounded-tr-2xl border-2 border-muted ${
              // If not mounted, use a neutral class. If mounted, check the theme.
              !mounted ? "" : theme === "light" ? "invert" : "invert-0"
            }`}
          />
          <div className="bottom-0 top-1/2 bg-linear-to-t dark:from-background left-0 right-0 absolute z-10"></div>
        </div>
      </section>

      <section
        className="flex items-center justify-center flex-col gap-4 -mt-10 md:mt-20 pb-20"
        id="pricing"
      >
        <h2 className="text-4xl text-center">Choose what fits you right</h2>
        <p className="text-muted-foreground text-center px-1">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
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
      </section>
    </>
  );
};

export default Home;
