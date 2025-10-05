"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Github, Linkedin, Mail, Youtube, Twitter } from "lucide-react";
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
    color: "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
    ring: "ring-gray-900/40 dark:ring-white/40",
  },
  linkedin: {
    key: "linkedin",
    href: "https://linkedin.com/in/abidalwassie",
    label: "LinkedIn",
    tooltip: "Connect with me on LinkedIn",
    icon: Linkedin,
    color: "bg-[#0A66C2] text-white",
    ring: "ring-[#0A66C2]/50",
  },
  youtube: {
    key: "youtube",
    href: "https://www.youtube.com/channel/UCYVf_0t2qsjyHILRsLatlHg",
    label: "YouTube",
    tooltip: "Subscribe on YouTube",
    icon: Youtube,
    color: "bg-[#FF0000] text-white",
    ring: "ring-red-500/40",
  },
  email: {
    key: "email",
    href: "mailto:abidalwassie@outlook.com",
    label: "Email",
    tooltip: "Send me an email",
    icon: Mail,
    color: "bg-gradient-to-br from-primary to-blue-600 text-white",
    ring: "ring-primary/40",
  },
  twitter: {
    key: "twitter",
    href: "https://www.twitter.com/onemandev_io",
    label: "Twitter / X",
    tooltip: "Follow me on X (Twitter)",
    icon: Twitter,
    color: "bg-[#1D9BF0] text-white",
    ring: "ring-sky-500/40",
  },
};

interface SocialLinksProps {
  variant?: "hero" | "footer" | "contact";
  include?: SocialKey[]; // which networks to include, defaults depend on variant
  className?: string; // wrapper extra classes
  size?: "sm" | "md" | "lg"; // fallback size override
  showTooltips?: boolean;
  animated?: boolean; // disable framer motion for minimal contexts
}

export function SocialLinks({
  variant = "hero",
  include,
  className,
  size,
  showTooltips = true,
  animated = true,
}: SocialLinksProps) {
  // Default include sets per variant
  const defaultSets: Record<typeof variant, SocialKey[]> = {
    hero: ["github", "linkedin", "youtube", "email"],
    contact: ["github", "youtube", "linkedin", "twitter"],
    footer: ["github", "youtube", "linkedin", "twitter"],
  } as const;

  const keys = include && include.length ? include : defaultSets[variant];
  const items = keys.map((k) => BASE_ITEMS[k]);

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

  const containerClasses = cn(
    "flex items-center justify-center",
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
            whileHover={animated && variant === "hero" ? { y: -5, scale: 1.06 } : undefined}
            whileTap={animated && variant === "hero" ? { scale: 0.94 } : undefined}
            transition={animated && variant === "hero" ? { type: "spring", stiffness: 420, damping: 26, mass: 0.6 } : undefined}
            className={cn(
              "group relative flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 ring-2 ring-transparent focus-visible:outline-none focus-visible:ring-2",
              finalSize,
              radiusMap[variant],
              color,
              variant === "hero"
                ? `hover:${ring} focus-visible:${ring}`
                : "hover:brightness-110",
            )}
          >
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-150 group-hover:scale-115" />
          </motion.a>
        );

        if (!showTooltips) return content;

        return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>{content}</TooltipTrigger>
              <TooltipContent side="top" className="px-3 py-2 text-sm font-semibold shadow-lg">
                <span className="block leading-snug tracking-wide">{tooltip}</span>
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
