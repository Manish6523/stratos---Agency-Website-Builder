"use client";

import * as React from "react";
import { Check, Moon, Sun, Palette, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/**
 * Register all available themes here.
 * The `value` must match the CSS class name: .theme-<value>
 * To add a new theme, just push a new entry — no other changes needed.
 */
const themes = [
  { name: "Portfolio", value: "portfolio" },
  { name: "notebook", value: "notebook" },
  { name: "Claude", value: "claude" },
  { name: "Kodama Grove", value: "kodama-grove" },
  { name: "Dark Matter", value: "dark-matter" },
  { name: "2077", value: "2077" },
  { name: "MX-Brutalist", value: "mx-brutalist" },
  // Add more themes here:
] as const;

const DEFAULT_THEME = themes[0].value;

export function ThemePicker() {
  const { setTheme, resolvedTheme } = useTheme();
  const [activeTheme, setActiveTheme] = React.useState<string>(DEFAULT_THEME);
  const [mounted, setMounted] = React.useState(false);

  const isDark = resolvedTheme === "dark";

  // Restore saved theme on mount
  React.useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme-flavor") || DEFAULT_THEME;
    applyThemeClass(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const applyThemeClass = (themeValue: string) => {
    const root = document.documentElement;
    themes.forEach((t) => root.classList.remove(`theme-${t.value}`));
    root.classList.add(`theme-${themeValue}`);
    setActiveTheme(themeValue);
    localStorage.setItem("theme-flavor", themeValue);
  };

  const activeThemeName =
    themes.find((t) => t.value === activeTheme)?.name ?? "Portfolio";

  return (
    <div className="flex items-center gap-1">
      {/* ── Theme Selector ── */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 px-2.5 h-8 text-xs font-medium dark:text-white"
          >
            <Palette className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">{activeThemeName}</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          {themes.map((t) => (
            <DropdownMenuItem
              key={t.value}
              onClick={() => applyThemeClass(t.value)}
              className="flex items-center justify-between text-xs"
            >
              {t.name}
              {activeTheme === t.value && (
                <Check className="h-3.5 w-3.5 text-primary" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ── Dark / Light Mode Toggle ── */}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 dark:text-white"
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {mounted && isDark ? (
          <Moon className="h-3.5 w-3.5" />
        ) : (
          <Sun className="h-3.5 w-3.5" />
        )}
        <span className="sr-only">Toggle dark mode</span>
      </Button>
    </div>
  );
}
