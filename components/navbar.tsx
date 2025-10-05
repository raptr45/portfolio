"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

// Heroicons imports - outline versions
import {
  BoltIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  PlayIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

// Heroicons imports - solid versions
import {
  BoltIcon as BoltSolidIcon,
  BriefcaseIcon as BriefcaseSolidIcon,
  EnvelopeIcon as EnvelopeSolidIcon,
  PlayIcon as PlaySolidIcon,
  SparklesIcon as SparklesSolidIcon,
} from "@heroicons/react/24/solid";

const navItems = [
  {
    name: "Experience",
    href: "#experience",
    icon: SparklesIcon,
    activeIcon: SparklesSolidIcon,
  },
  {
    name: "Work",
    href: "#work",
    icon: BriefcaseIcon,
    activeIcon: BriefcaseSolidIcon,
  },
  {
    name: "Skills",
    href: "#skills",
    icon: BoltIcon,
    activeIcon: BoltSolidIcon,
  },
  {
    name: "YouTube",
    href: "#youtube",
    icon: PlayIcon,
    activeIcon: PlaySolidIcon,
  },
  // {
  //   name: "Services",
  //   href: "#services",
  //   icon: WrenchScrewdriverIcon,
  //   activeIcon: WrenchScrewdriverSolidIcon,
  // },
  {
    name: "Hire me",
    href: "#contact",
    icon: EnvelopeIcon,
    activeIcon: EnvelopeSolidIcon,
  },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Track animation frame and timeouts to ensure proper cleanup between clicks
  const closeRafRef = useRef<number | null>(null);
  const closeDelayTimeoutRef = useRef<number | null>(null);
  const closeFallbackTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = ["home", ...navItems.map((item) => item.href.slice(1))];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleSectionChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleSectionChange);
    };
  }, []);

  // Ensure we cancel any pending checks/timeouts (called before starting a new one)
  const cancelPendingClosers = () => {
    if (closeRafRef.current !== null) {
      cancelAnimationFrame(closeRafRef.current);
      closeRafRef.current = null;
    }
    if (closeDelayTimeoutRef.current !== null) {
      clearTimeout(closeDelayTimeoutRef.current);
      closeDelayTimeoutRef.current = null;
    }
    if (closeFallbackTimeoutRef.current !== null) {
      clearTimeout(closeFallbackTimeoutRef.current);
      closeFallbackTimeoutRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => cancelPendingClosers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = (href: string, closeMobileMenu = false) => {
    const element = document.getElementById(href.slice(1));
    if (element) {
      // Cancel any previous watchers to avoid races
      cancelPendingClosers();

      // Fast custom smooth scroll
      const targetPosition = element.offsetTop - 80; // Account for navbar height
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 400; // Much faster duration (400ms instead of default ~1000ms)
      let start: number | null = null;

      const animation = (currentTime: number) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);

        // Ease-out function for smooth deceleration
        const ease = 1 - Math.pow(1 - progress, 3);

        window.scrollTo(0, startPosition + distance * ease);

        if (progress < 1) {
          requestAnimationFrame(animation);
        }
      };

      requestAnimationFrame(animation);

      if (closeMobileMenu) {
        const anchorY = 100; // same probe line used in activeSection detection
        let lastScrollY = window.scrollY;

        const checkArrival = () => {
          const rect = element.getBoundingClientRect();
          const reached = rect.top <= anchorY && rect.bottom >= anchorY;
          const near = Math.abs(rect.top - anchorY) < 16;
          const scrolling = Math.abs(window.scrollY - lastScrollY) > 0.5;
          lastScrollY = window.scrollY;

          if (reached || (!scrolling && near)) {
            // slight delay before closing to feel natural
            closeDelayTimeoutRef.current = window.setTimeout(() => {
              setIsMobileMenuOpen(false);
            }, 150);
            closeRafRef.current = null;
            // clear fallback since we're done
            if (closeFallbackTimeoutRef.current !== null) {
              clearTimeout(closeFallbackTimeoutRef.current);
              closeFallbackTimeoutRef.current = null;
            }
            return;
          }
          closeRafRef.current = requestAnimationFrame(checkArrival);
        };

        // kick off the monitor shortly after scroll starts
        closeRafRef.current = requestAnimationFrame(checkArrival);

        // final safety: force-close after 1.8s to avoid getting stuck
        closeFallbackTimeoutRef.current = window.setTimeout(() => {
          setIsMobileMenuOpen(false);
        }, 1800);
      }
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-gradient-to-r dark:from-primary/20 dark:to-blue-600/20 from-primary/30 to-blue-400/30  backdrop-blur-xl backdrop-saturate-150 border-b border-primary/25 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          : "bg-gradient-to-r from-primary/10 to-blue-600/10 backdrop-blur-md backdrop-saturate-125 border-b border-primary/15 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
      )}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            className={cn(
              "flex items-center transition-all duration-200 focus:outline-none focus:ring-2 rounded-lg px-4 -m-2 group min-h-[48px] min-w-[80px] hover:shadow-md relative cursor-pointer",
              activeSection === "home"
                ? "bg-gradient-to-r from-primary/15 to-blue-600/15 border border-primary/30 shadow-md"
                : "bg-gradient-to-r from-primary/5 to-blue-600/5 hover:from-primary/10 hover:to-blue-600/10 border border-primary/20 hover:border-primary/40"
            )}
            onClick={() => scrollToSection("#home")}
            aria-label="Go to top of page"
            style={{ transform: "translateZ(0)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform =
                "translateY(-1px) translateZ(0)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0) translateZ(0)")
            }
          >
            <div className="relative w-16 h-12 flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
                <span className="text-white font-bold text-2xl">A</span>
              </div>
              <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pointer-events-none">
                bid
              </span>
            </div>
            {activeSection === "home" && (
              <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-primary rounded-full" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              const IconComponent = isActive ? item.activeIcon : item.icon;

              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="lg"
                  className={cn(
                    "text-lg text-cyan-600 hover:text-cyan-600 font-semibold transition-all duration-200 px-6 py-3 rounded-full relative flex items-center gap-2 border border-transparent min-h-[48px] hover:shadow-md",
                    isActive
                      ? "text-cyan-600 dark:text-primary bg-cyan-200/15 dark:bg-primary/20 shadow-md border-primary/3 hover:bg-cyan-600/15 dark:hover:bg-primary/15"
                      : "text-cyan-600 dark:text-foreground dark:bg-primary/10 hover:bg-cyan-500/10 dark:hover:bg-primary/10 border-cyan-800/20 dark:border-primary/20 hover:border-cyan-600/35 dark:hover:border-primary/35 bg-cyan-600/5"
                  )}
                  onClick={() => scrollToSection(item.href)}
                  style={{ transform: "translateZ(0)" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform =
                      "translateY(-1px) translateZ(0)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform =
                      "translateY(0) translateZ(0)")
                  }
                >
                  <IconComponent
                    className={cn(
                      "h-5 w-5 transition-colors duration-200 flex-shrink-0",
                      isActive
                        ? "text-cyan-700 dark:text-primary"
                        : "text-current"
                    )}
                  />
                  <span className="whitespace-nowrap">{item.name}</span>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-cyan-700 dark:bg-primary rounded-full" />
                  )}
                </Button>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="border border-primary/10 hover:border-primary/30 bg-primary/5 hover:bg-primary/10 hover:shadow-md transition-all duration-200 p-3 h-12 w-12"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-64 bg-gradient-to-br dark:from-primary/20 dark:to-blue-600/20 from-primary/30 to-blue-400/30 backdrop-blur-xl backdrop-saturate-150 border-l border-primary/25 shadow-[0_8px_30px_rgba(0,0,0,0.12)] [&>button]:bg-red-400/70 [&>button]:hover:bg-red-500/60 [&>button]:outline-white [&>button]:outline-offset-2 [&>button]:outline-2 [&>button]:text-white [&>button]:rounded-lg"
              >
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

                <div className="flex flex-col space-y-6 mt-22 mx-4">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.href.slice(1);
                    const IconComponent = isActive
                      ? item.activeIcon
                      : item.icon;

                    return (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={cn(
                          "justify-start text-left flex items-center gap-3 px-4 py-3 transition-all duration-200 min-h-[48px] border border-transparent hover:shadow-md font-semibold",
                          isActive
                            ? "text-cyan-600 dark:text-primary bg-cyan-200/15 dark:bg-primary/20 border-primary/20 shadow-md"
                            : "text-cyan-600 dark:text-foreground dark:bg-primary/5 hover:text-cyan-600 dark:hover:text-primary hover:bg-cyan-500/10 dark:hover:bg-primary/10 border-primary/5 hover:border-primary/20"
                        )}
                        onClick={() => scrollToSection(item.href, true)}
                      >
                        <IconComponent
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            isActive
                              ? "text-cyan-700 dark:text-primary"
                              : "text-current"
                          )}
                        />
                        <span className="whitespace-nowrap">{item.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
