"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemePicker } from "@/components/global/theme-picker";
import Userbutton from "@/components/global/user-button";
import { Button } from "@/components/ui/button";
import { User } from "@clerk/nextjs/server";
import { cn } from "@/lib/utils";

type Props = {
  user?: null | User;
};

const Navigation = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Add a subtle shadow when scrolling down
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Pricing", href: "/site/pricing" },
    { label: "About", href: "/site/about" },
    { label: "Docs", href: "/site/documentation" },
    { label: "Features", href: "/site/features" },
  ];

  return (
    <header 
      className={cn(
        "fixed left-0 right-0 z-50 transition-all duration-300 ease-in-out mx-auto overflow-hidden",
        scrolled 
          ? "top-2 sm:top-4 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-6xl bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-2xl" 
          : "top-0 w-full max-w-full bg-background/40 backdrop-blur-md border-b border-transparent rounded-none"
      )}
    >
      <div className="flex items-center justify-between px-4 py-3 md:px-8 max-w-7xl mx-auto">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="relative overflow-hidden transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3">
            <Image
              src="/assets/logo.svg"
              width={26}
              height={26}
              alt="stratos logo"
              className="drop-shadow-md"
            />
          </div>
          <span className="text-xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
            Stratos.
          </span>
        </Link>

        {/* Center: Desktop Links (Hidden on Mobile) */}
        <nav className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <ul className="flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.label} className="relative group">
                <Link 
                  href={link.href} 
                  className={cn(
                    "transition-colors px-2 py-1",
                    pathname === link.href 
                      ? "text-foreground font-semibold" 
                      : "text-muted-foreground group-hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
                {/* Animated minimal underline */}
                <span 
                  className={cn(
                    "absolute -bottom-1 h-[2px] bg-primary transition-all duration-300 ease-out rounded-full",
                    pathname === link.href
                      ? "w-full left-0 opacity-100"
                      : "w-0 left-1/2 opacity-0 group-hover:w-full group-hover:left-0 group-hover:opacity-100"
                  )}
                ></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right: Actions */}
        <aside className="flex items-center gap-2">
          <div className="hidden sm:block">
            <ThemePicker />
          </div>

          {/* Login Button - With subtle glow hover */}
          {!user && (
            <Link href="/agency">
              <Button 
                size="sm" 
                className="h-7 md:h-8 px-3 text-xs md:text-xs font-medium cursor-pointer shadow-[0_0_10px_rgba(var(--primary),0.1)] hover:shadow-[0_0_20px_rgba(var(--primary),0.4)] transition-all duration-300 hover:scale-105"
              >
                Login
              </Button>
            </Link>
          )}

          {/* Avatar */}
          <Userbutton />

          {/* Hamburger Menu Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 cursor-pointer text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="size-5 transition-transform rotate-90" />
            ) : (
              <Menu className="size-5 transition-transform" />
            )}
          </button>
        </aside>
      </div>

      {/* Premium Mobile Dropdown */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-background/95 backdrop-blur-2xl border-b border-border/40 w-full",
          isOpen ? "max-h-[400px] opacity-100 shadow-xl" : "max-h-0 opacity-0"
        )}
      >
        <div className="flex flex-col py-4 px-6 gap-1">
          {navLinks.map((link, index) => (
            <Link 
              key={link.label}
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center w-full text-base font-medium px-4 py-3 rounded-xl transition-all",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-primary/5"
              )}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="flex items-center justify-between px-4 pt-4 mt-2 border-t border-border/40 sm:hidden">
            <span className="text-sm font-medium text-muted-foreground">Appearance</span>
            <ThemePicker />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;