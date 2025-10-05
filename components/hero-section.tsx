"use client";

import { Button } from "@/components/ui/button";
import data from "@/lib/assets";
import { motion } from "framer-motion";
import Image from "next/image";
import { HeroBadge } from "@/components/hero/hero-badge";
import { HeroTitle } from "@/components/hero/hero-title";
import { HeroDescription } from "@/components/hero/hero-description";
import { HeroCTAs } from "@/components/hero/hero-ctas";
import { HeroSocialLinks } from "@/components/hero/hero-social-links";
import { HeroScrollIndicator } from "@/components/hero/hero-scroll-indicator";

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-[#0f2027] dark:via-[#2c5364] dark:to-[#232526]"
    >
      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center max-w-7xl mx-auto">
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
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex justify-center lg:justify-end order-first lg:order-last"
          >
            <div className="relative mt-16 md:mt-8 lg:mt-12">
              {" "}
              {/* Gradient Background Card, Added Margin */}
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ duration: 0.3 }}
                className="w-64 h-80 sm:w-72 sm:h-[360px] md:w-80 md:h-96 lg:w-96 lg:h-[500px] rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-500 to-sky-600 p-1 shadow-2xl hover:shadow-3xl transition-shadow duration-300"
              >
                <div className="w-full h-full rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-700 via-blue-500 to-sky-700 flex items-end justify-center relative">
                  {/* Profile Image */}
                  <div className="relative w-full h-full">
                    {/* Subtle overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl z-10" />
                    <Image
                      src={data.profile}
                      alt="Abid Al Wassie"
                      fill
                      className="object-cover object-top rounded-3xl transition-transform duration-300 hover:scale-110"
                      priority
                    />
                  </div>
                </div>
              </motion.div>
              {/* Floating decorative elements */}
              <motion.div
                className="pointer-events-none absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 blur-xl opacity-60"
                animate={{
                  y: [0, -15, 0],
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-gradient-to-br from-fuchsia-400 to-indigo-500 blur-lg opacity-50 z-50"
                animate={{
                  y: [0, 15, 0],
                  scale: [1, 0.8, 1],
                  rotate: [0, -180, -360],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
              {/* Additional subtle glow effect */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-600/20 blur-2xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2,
                }}
              />
            </div>
          </motion.div>
        </div>

        <HeroSocialLinks />
        <HeroScrollIndicator onScroll={() => scrollToSection("experience")} />
      </div>
    </section>
  );
}
