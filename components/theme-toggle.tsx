"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
        <div className="h-6 w-6" />
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-11 w-11 rounded-full bg-primary/5 border border-primary/20 hover:bg-primary/10 transition-colors duration-200 flex items-center justify-center"
      onClick={handleToggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <div className="relative h-6 w-6 flex items-center justify-center">
        {isDark ? (
          <Moon
            className="h-6 w-6 transition-opacity duration-200"
            strokeWidth={2.5}
          />
        ) : (
          <Sun
            className="h-6 w-6 transition-opacity duration-200"
            strokeWidth={2.5}
          />
        )}
      </div>
    </Button>
  );
}
