"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import React from "react";

type SocialKey = "github" | "linkedin" | "youtube" | "email" | "twitter";

interface SocialItemConfig {
  key: SocialKey;
  href: string;
  label: string;
  tooltip: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string; // background + text color classes
  ring: string; // ring hover classes
}

const BASE_ITEMS: Record<SocialKey, SocialItemConfig> = {
  github: {
    key: "github",
    href: "https://github.com/AbidAlWassie",
    label: "GitHub",
    tooltip: "Follow me on GitHub",
    icon: Github,
    color: "bg-social-github",
    ring: "ring-gray-900/40 dark:ring-white/20",
  },
  linkedin: {
    key: "linkedin",
    href: "https://linkedin.com/in/abidalwassie",
    label: "LinkedIn",
    tooltip: "Connect with me on LinkedIn",
    icon: Linkedin,
    color: "bg-social-linkedin",
    ring: "ring-[#0A66C2]/50 dark:ring-white/20",
  },
  youtube: {
    key: "youtube",
    href: "https://www.youtube.com/channel/UCYVf_0t2qsjyHILRsLatlHg",
    label: "YouTube",
    tooltip: "Subscribe on YouTube",
    icon: Youtube,
    color: "bg-social-youtube",
    ring: "ring-red-500/40 dark:ring-white/20",
  },
  email: {
    key: "email",
    href: "mailto:abidalwassie@gmail.com",
    label: "Email",
    tooltip: "Send me an email",
    icon: Mail,
    color: "bg-social-email",
    ring: "ring-primary/40 dark:ring-white/20",
  },
  twitter: {
    key: "twitter",
    href: "https://www.twitter.com/onemandev_io",
    label: "Twitter / X",
    tooltip: "Follow me on X (Twitter)",
    icon: Twitter,
    color: "bg-social-twitter",
    ring: "ring-sky-500/40 dark:ring-white/20",
  },
};

interface SocialLinksProps {
  variant?: "hero" | "footer" | "contact";
  include?: SocialKey[]; // which networks to include, defaults depend on variant
  className?: string; // wrapper extra classes
  size?: "sm" | "md" | "lg"; // fallback size override
  showTooltips?: boolean;
  animated?: boolean; // disable framer motion for minimal contexts
  justify?: "start" | "center" | "end"; // horizontal alignment
  scheme?: "brand" | "neutral"; // color strategy (footer wants neutral)
}

export function SocialLinks({
  variant = "hero",
  include,
  className,
  size,
  showTooltips = true,
  animated = true,
  justify = "center",
  scheme,
}: SocialLinksProps) {
  // Default include sets per variant
  const defaultSets: Record<typeof variant, SocialKey[]> = {
    hero: ["github", "linkedin", "youtube", "email"],
    contact: ["github", "youtube", "linkedin", "twitter"],
    footer: ["github", "youtube", "linkedin", "twitter"],
  } as const;

  const keys = include && include.length ? include : defaultSets[variant];
  const items = keys.map((k) => BASE_ITEMS[k]);

  // Determine color scheme (footer defaults to neutral subtle monochrome)
  const effectiveScheme =
    scheme || (variant === "footer" ? "neutral" : "brand");

  // Size mapping
  const sizeMap = {
    hero: "w-12 h-12 sm:w-14 sm:h-14",
    contact: "w-11 h-11 sm:w-12 sm:h-12",
    footer: "w-10 h-10 sm:w-11 sm:h-11",
  } as const;
  const finalSize =
    size === "sm"
      ? "w-9 h-9"
      : size === "md"
      ? "w-11 h-11"
      : size === "lg"
      ? "w-12 h-12"
      : sizeMap[variant];

  const radiusMap = {
    hero: "rounded-xl",
    contact: "rounded-lg",
    footer: "rounded-lg",
  } as const;

  const gapMap = {
    hero: "gap-4 sm:gap-6",
    contact: "gap-3 sm:gap-4 lg:gap-6 flex-wrap",
    footer: "gap-4",
  } as const;

  const justifyClass =
    justify === "start"
      ? "justify-start"
      : justify === "end"
      ? "justify-end"
      : "justify-center";

  const containerClasses = cn(
    "flex items-center",
    justifyClass,
    gapMap[variant],
    className
  );

  return (
    <div className={containerClasses}>
      {items.map(({ key, href, label, tooltip, icon: Icon, color, ring }) => {
        const content = (
          <motion.a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={animated && variant === "hero" ? { y: -6 } : undefined}
            whileTap={undefined}
            transition={
              animated && variant === "hero"
                ? { type: "tween", ease: [0.25, 0.8, 0.3, 1], duration: 0.02 }
                : undefined
            }
            className={cn(
              "group relative flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ring-2 ring-transparent focus-visible:outline-none focus-visible:ring-2 social-hover",
              finalSize,
              radiusMap[variant],
              effectiveScheme === "brand"
                ? color
                : "bg-white/10 text-white hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20",
              variant === "hero" && effectiveScheme === "brand"
                ? `hover:${ring} focus-visible:${ring}`
                : ""
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-150" />
          </motion.a>
        );

        if (!showTooltips) return content;

        return (
          <Tooltip key={key}>
            <TooltipTrigger asChild>{content}</TooltipTrigger>
            <TooltipContent
              side="top"
              className="px-3 py-2 text-sm font-semibold shadow-lg"
            >
              <span className="block leading-snug tracking-wide">
                {tooltip}
              </span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

// Backwards compatibility export for hero usage
export function HeroSocialLinksWrapper() {
  return <SocialLinks variant="hero" />;
}
