"use client";

import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleToggle = () => {
    setIsToggling(true);
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
    setTimeout(() => setIsToggling(false), 200);
  };

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full">
        <div className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`h-11 w-11 rounded-full transition-all bg-primary/5 border duration-300 hover:bg-primary/10 hover:shadow-lg focus:ring-2 flex items-center justify-center cursor-pointer ${
        isToggling ? "scale-90" : "hover:scale-110"
      }`}
      onClick={handleToggle}
      aria-label={`Switch to ${
        resolvedTheme === "dark" ? "light" : "dark"
      } mode`}
    >
      <div className="relative h-6 w-6 overflow-hidden flex items-center justify-center">
        <Sun
          className={`absolute h-6 w-6 transition-all duration-700 ${
            resolvedTheme === "dark"
              ? "rotate-180 scale-0 opacity-0 -translate-y-2"
              : "rotate-0 scale-100 opacity-100 translate-y-0"
          } ${
            isToggling
              ? "transition-all duration-300 ease-out"
              : "ease-[cubic-bezier(0.4,0,0.2,1)]"
          }`}
          strokeWidth={2.75}
        />
        <Moon
          className={`absolute h-6 w-6 transition-all duration-700 ${
            resolvedTheme === "dark"
              ? "rotate-0 scale-100 opacity-100 translate-y-0"
              : "rotate-180 scale-0 opacity-0 translate-y-2"
          } ${
            isToggling
              ? "transition-all duration-300 ease-out"
              : "ease-[cubic-bezier(0.4,0,0.2,1)]"
          }`}
          strokeWidth={2.75}
        />
      </div>
    </Button>
  );
}
