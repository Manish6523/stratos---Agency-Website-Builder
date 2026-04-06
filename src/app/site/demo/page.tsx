import { Button } from "@/components/ui/button";
import { ArrowRight, Brush, Layers, MousePointerClick, Palette, Sparkles, Wand2, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "Try the Builder | Stratos",
  description: "Experience the Stratos drag-and-drop website builder — no sign-up required. Build stunning pages in minutes.",
};

const features = [
  { icon: MousePointerClick, title: "Drag & Drop", desc: "Place elements anywhere with intuitive drag-and-drop." },
  { icon: Layers, title: "Rich Components", desc: "Headings, text, buttons, images, forms, embeds & more." },
  { icon: Palette, title: "Full Style Control", desc: "Colors, fonts, spacing, borders — customize everything." },
  { icon: Zap, title: "Responsive Preview", desc: "Switch between Desktop, Tablet & Mobile views instantly." },
  { icon: Wand2, title: "AI-Powered", desc: "Generate layouts and text with built-in AI assistance." },
  { icon: Brush, title: "Export Ready", desc: "Export your creation as clean HTML with one click." },
];

export default function DemoPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary/15 blur-[150px] rounded-full -z-10" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo — No sign-up required</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards delay-100">
            <span className="bg-clip-text text-transparent bg-linear-to-b from-foreground to-foreground/50">
              Build pages
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              visually.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-lg text-muted-foreground text-lg md:text-xl leading-relaxed mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards delay-200">
            Stratos comes with a powerful drag-and-drop page builder.
            Try it right now — a pre-built landing page is ready for you to explore and edit.
          </p>

          {/* CTA */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 fill-mode-backwards delay-300">
            <Link href="/site/demo/builder">
              <Button size="lg" className="rounded-full px-10 py-6 text-base font-bold group shadow-lg shadow-primary/20 cursor-pointer">
                Try the Builder
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 border-t border-border/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-4">
            Everything you need to build
          </h2>
          <p className="text-muted-foreground text-center mb-14 max-w-md mx-auto">
            A complete page builder packed into your agency dashboard.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <div
                key={title}
                className="group rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-1.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            Ready to build for real? Sign up and get your own dashboard.
          </p>
          <Link href="/agency">
            <Button variant="outline" className="rounded-full px-8 cursor-pointer">
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
