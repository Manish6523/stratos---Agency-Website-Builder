"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch by only rendering after mount
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="size-8" />; // Placeholder to prevent layout shift

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button 
      size="icon-sm" 
      variant="ghost" 
      className="rounded-full relative border"
      onClick={toggleTheme}
    >
      <Sun 
        size={17} 
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
      />
      <Moon 
        size={17} 
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
      />
    </Button>
  );
}