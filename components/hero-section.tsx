"use client";

import { HeroBadge } from "@/components/hero/hero-badge";
import { HeroCTAs } from "@/components/hero/hero-ctas";
import { HeroDescription } from "@/components/hero/hero-description";
import { HeroScrollIndicator } from "@/components/hero/hero-scroll-indicator";
import { HeroSocialLinks } from "@/components/hero/hero-social-links";
import { HeroTitle } from "@/components/hero/hero-title";
import { motion } from "framer-motion";
import HeroImageCard from "./hero/hero-image-card";

export function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-[#0f2027] dark:via-[#2c5364] dark:to-[#232526]"
    >
      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto mb-4 md:mb-6 lg:mb-12">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <HeroBadge />
            <HeroTitle />
            <HeroDescription />
            <HeroCTAs
              onWork={() => scrollToSection("work")}
              onContact={() => scrollToSection("contact")}
            />
          </motion.div>

          {/* Right Image Card */}
          <HeroImageCard />

          {/* Available for Work - Animated Shapes */}
          {/* <HeroRight /> */}
        </div>

        <HeroSocialLinks />
        <HeroScrollIndicator onScroll={() => scrollToSection("experience")} />
      </div>
    </section>
  );
}
