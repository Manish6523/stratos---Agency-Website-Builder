"use client";

import {
  Book,
  Code,
  Layers,
  LayoutTemplate,
  ShieldCheck,
  Copy,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Github,
} from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const cleanCode = code.replace(/\\n/g, "\n");
    navigator.clipboard.writeText(cleanCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden my-8 border border-border/50 bg-[#0d1117] shadow-2xl relative group">
      <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-border/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5 mr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="text-muted-foreground hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
        >
          {copied ? (
            <CheckCircle2 className="w-4 h-4 text-green-400" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* THE FIX IS HERE */}
      <pre className="p-6 m-0 text-sm overflow-x-auto text-gray-300 font-mono leading-relaxed text-left">
        <code>
          {code.split("\\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
};

const DocumentationPage = () => {
  const [activeSection, setActiveSection] = useState("quick-start");

  // Simple scroll spy logic
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["quick-start", "architecture", "multi-tenancy"];
      let currentSection = sections[0];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-360 mx-auto flex flex-col items-center">
      {/* Header */}
      <div className="w-full text-center max-w-4xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px] z-[-1]" />
        <Badge
          variant="outline"
          className="mb-6 border-primary/20 text-primary"
        >
          Version 1.6 (Beta)
        </Badge>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          Developer{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary-foreground">
            Portal
          </span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Everything you need to build, deploy, and scale with Stratos. Learn
          about our architecture, multi-tenancy model, and API endpoints.
        </p>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        {/* Left Sidebar Navigation */}
        <div className="hidden lg:block lg:col-span-3">
          <div className="sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto pr-6 pb-10 custom-scrollbar">
            <nav className="space-y-8">
              <div>
                <h3 className="font-bold text-sm tracking-widest text-foreground uppercase mb-4 flex items-center gap-2">
                  <Book className="w-4 h-4 text-primary" /> Getting Started
                </h3>
                <div className="space-y-2 border-l-2 border-border/50 ml-2 pl-4">
                  <a
                    href="#quick-start"
                    className={clsx(
                      "block text-sm transition-colors py-1",
                      activeSection === "quick-start"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Quick Start Guide
                  </a>
                  <a
                    href="#architecture"
                    className={clsx(
                      "block text-sm transition-colors py-1",
                      activeSection === "architecture"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Architecture Overview
                  </a>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm tracking-widest text-foreground uppercase mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" /> Core Concepts
                </h3>
                <div className="space-y-2 border-l-2 border-border/50 ml-2 pl-4">
                  <a
                    href="#multi-tenancy"
                    className={clsx(
                      "block text-sm transition-colors py-1",
                      activeSection === "multi-tenancy"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    Multi-Tenancy Model
                  </a>
                  <a
                    href="#auth"
                    className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                  >
                    Authentication & RBAC
                  </a>
                  <a
                    href="#database"
                    className="block text-sm text-muted-foreground hover:text-foreground py-1 transition-colors"
                  >
                    Database Schema
                  </a>
                </div>
              </div>

              <div className="pt-8 border-t border-border/50">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 bg-background/50"
                >
                  <Github className="w-4 h-4" /> View Source Code
                </Button>
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-7 prose prose-slate dark:prose-invert max-w-none prose-headings:scroll-mt-32 prose-a:text-primary">
          <div className="bg-linear-to-br from-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 mb-16 shadow-lg shadow-primary/5">
            <h3 className="text-2xl font-bold mt-0 mb-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-primary" /> What is Stratos?
            </h3>
            <p className="m-0 text-muted-foreground leading-relaxed text-lg">
              Stratos is an open-source, multi-tenant SaaS platform built
              explicitly for digital agencies. It handles the heavy lifting of
              user management, sub-domain routing, subscription billing, and
              client isolation so you can focus on building your specific
              marketing tools.
            </p>
          </div>

          <h2
            id="quick-start"
            className="text-4xl font-extrabold border-b border-border/50 pb-6 mb-8 flex items-center gap-4"
          >
            <Code className="w-8 h-8 text-primary" />
            Quick Start Guide
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Get your local development environment running in under 5 minutes.
          </p>

          <h3 className="text-2xl font-bold mt-10">Prerequisites</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 list-none pl-0">
            {[
              "Node.js 18+ (LTS)",
              "npm, yarn, or pnpm",
              "MariaDB/MySQL database",
              "Clerk Authentication keys",
              "UploadThing account keys",
              "Stripe API keys (optional for local)",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 bg-muted/30 p-3 rounded-lg border border-border/50 text-sm font-medium"
              >
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />{" "}
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-2xl font-bold mt-12 mb-6">Installation</h3>
          <p>Follow these exact steps to initialize the project:</p>

          <CodeBlock
            language="bash"
            code={
              "# 1. Clone repository\\ngit clone https://github.com/your-org/stratos.git\\ncd stratos\\n\\n# 2. Install dependencies\\nnpm install\\n\\n# 3. Initialize Prisma and push schema to DB\\nnpx prisma generate\\nnpx prisma db push\\n\\n# 4. Start development server\\nnpm run dev\\n# Application running at http://localhost:3000"
            }
          />

          <h2
            id="architecture"
            className="text-4xl font-extrabold border-b border-border/50 pb-6 mt-20 mb-8 flex items-center gap-4"
          >
            <Layers className="w-8 h-8 text-primary" />
            Architecture
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Stratos utilizes a modern edge-ready stack optimized for speed and
            global distribution.
          </p>

          <div className="grid sm:grid-cols-2 gap-8 my-10 not-prose">
            <div className="p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-3">Middleware Routing</h4>
              <p className="text-muted-foreground leading-relaxed">
                Next.js Middleware intercepts all requests to determine
                subdomain routing and authentication state before any page
                renders.
              </p>
            </div>
            <div className="p-8 rounded-3xl border border-border/50 bg-background/50 backdrop-blur-sm shadow-xl hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <LayoutTemplate className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold text-xl mb-3">Dynamic Domains</h4>
              <p className="text-muted-foreground leading-relaxed">
                The <code>[domain]</code> folder acts as a catch-all for any
                custom domains assigned to funnels, treating them as root-level
                sites.
              </p>
            </div>
          </div>

          <h2
            id="multi-tenancy"
            className="text-4xl font-extrabold border-b border-border/50 pb-6 mt-20 mb-8"
          >
            Multi-Tenancy Model
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The database structure strictly enforces a Top-Down isolation
            approach to ensure client data is never leaked between workspaces.
          </p>

          <CodeBlock
            language="sql"
            code={
              "User (Clerk Auth UID)\\n  ↓\\n  └─→ Agency (Tenant Root / Agency ID)\\n        ├─→ Agency Owner/Admin Rules\\n        ├─→ White-label Settings\\n        └─→ SubAccounts (Client Isolation / SubAccount ID)\\n              ├─→ Permissions (User ↔ SubAccount link)\\n              ├─→ Pipelines & Tickets\\n              ├─→ Funnels & Pages\\n              └─→ Media Bucket Files"
            }
          />

          {/* Page Navigation Footer */}
          <div className="grid grid-cols-2 gap-6 mt-20 pt-10 border-t border-border/50 not-prose">
            <Link
              href="/site/features"
              className="group p-6 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/50 transition-colors flex flex-col items-start gap-2"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                <ChevronLeft className="w-4 h-4" /> Previous
              </span>
              <span className="text-lg font-bold">Platform Features</span>
            </Link>
            <div className="p-6 rounded-2xl border border-border/50 bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col items-end gap-2 text-right cursor-not-allowed opacity-50 relative">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                Next <ChevronRight className="w-4 h-4" />
              </span>
              <span className="text-lg font-bold">API Reference</span>
              <Badge className="absolute top-2 right-2 scale-75 bg-background">
                Coming Soon
              </Badge>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Table of Contents / Extra actions) */}
        <div className="hidden lg:block lg:col-span-2">
          <div className="sticky top-32">
            <div className="bg-muted/20 border border-border/50 rounded-xl p-6">
              <h4 className="font-bold text-sm mb-4">On this page</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#quick-start"
                    className="hover:text-primary transition-colors"
                  >
                    Quick Start
                  </a>
                </li>
                <li>
                  <a
                    href="#architecture"
                    className="hover:text-primary transition-colors"
                  >
                    Architecture
                  </a>
                </li>
                <li>
                  <a
                    href="#multi-tenancy"
                    className="hover:text-primary transition-colors"
                  >
                    Multi-Tenancy
                  </a>
                </li>
              </ul>
              <div className="mt-8 pt-8 border-t border-border/50">
                <h4 className="font-bold text-sm mb-4">Need Help?</h4>
                <Button
                  variant="link"
                  className="p-0 h-auto text-primary justify-start hover:no-underline hover:text-primary/80"
                >
                  Join the Discord
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default DocumentationPage;
