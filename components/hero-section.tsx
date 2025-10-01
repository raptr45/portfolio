"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import data from "@/lib/assets";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

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
            {/* WEB DEVELOPER Badge */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <Badge
                variant="secondary"
                className="px-4 py-2 text-sm font-semibold bg-primary/10 text-primary border border-primary/30 uppercase tracking-widest"
              >
                WEB DEVELOPER
              </Badge>
            </motion.div> */}

            {/* Enhanced Badge Make it smaller and more minimal in design */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-300"></div>
                <Badge
                  variant="secondary"
                  className="relative px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold tracking-widest bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white border border-primary/30 hover:border-primary/50 transition-all duration-300 uppercase"
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="bg-gradient-to-r from-primary via-blue-500 to-purple-500 bg-clip-text text-transparent bg-300% font-extrabold"
                    style={{
                      backgroundSize: "300% 100%",
                    }}
                  >
                    ⚡ FULL STACK DEVELOPER ⚡
                  </motion.span>
                </Badge>
              </div>
            </motion.div>

            {/* Main Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-tight"
            >
              <span className="text-gray-800 dark:text-white">
                Abid Al Wassie
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              I build
              <span className="text-primary font-bold bg-primary/10 mx-1 px-2 py-1 rounded-lg">
                scaleable web apps
              </span>
              with TypeScript, React, Next.js, Node.js, and other modern
              technologies.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  onClick={() => scrollToSection("work")}
                  className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl shadow-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold text-white border-0 cursor-pointer hover:shadow-xl w-full sm:w-auto"
                >
                  🚀 View My Work
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-4 sm:py-6 rounded-xl border-2 border-gray-400/40 dark:border-white/30 bg-transparent hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 font-semibold cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 w-full sm:w-auto"
                >
                  💬 Let&apos;s Connect
                </Button>
              </motion.div>
            </motion.div>
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

        {/* Social Links - Centered at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12 lg:mt-16 mb-8 sm:mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-accent-foreground/50 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-white hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-white/40 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
            >
              <a
                href="https://github.com/AbidAlWassie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 transition-transform duration-200" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-blue-50 hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
            >
              <a
                href="https://linkedin.com/in/abidalwassie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.15, y: -8 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl blur-lg opacity-0 group-hover:opacity-70 transition duration-300"></div>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-red-50 hover:border-red-500 dark:hover:bg-red-950 dark:hover:border-red-400 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
            >
              <a href="mailto:abidalwassie@outlook.com" aria-label="Email">
                <Mail className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-200" />
              </a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Enhanced scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative group"
          >
            <div className="absolute -inset-3 bg-gradient-to-b from-primary/30 to-blue-600/30 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition duration-300"></div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("experience")}
              className="relative w-12 h-12 sm:w-14 hidden lg:flex sm:h-14 cursor-pointer rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-white hover:border-primary dark:hover:bg-gray-800 dark:hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 text-gray-700 dark:text-white group"
              aria-label="Scroll to experience section"
            >
              <motion.div
                animate={{
                  y: [0, 4, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
              </motion.div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
