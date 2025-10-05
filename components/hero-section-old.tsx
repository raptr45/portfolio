"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";

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
      {/* Animated floating shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-blue-500/10" />

        {/* Large floating shapes */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-primary/20 to-blue-500/20 blur-3xl"
          animate={{
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-32 left-16 w-80 h-80 rounded-full bg-gradient-to-br from-pink-500/20 to-purple-600/20 blur-3xl"
          animate={{
            y: [0, 40, 0],
            scale: [1, 0.9, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-cyan-400/15 to-blue-600/15 blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Medium floating shapes */}
        <motion.div
          className="absolute top-1/4 right-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-400/20 to-orange-500/20 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-green-400/25 to-emerald-600/25 blur-lg"
          animate={{
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        {/* Small floating particles */}
        {[
          { top: 15, left: 10, duration: 8, delay: 0 },
          { top: 25, left: 85, duration: 9, delay: 1 },
          { top: 45, left: 20, duration: 7, delay: 2 },
          { top: 65, left: 75, duration: 10, delay: 3 },
          { top: 80, left: 45, duration: 6, delay: 4 },
          { top: 35, left: 60, duration: 8, delay: 1.5 },
          { top: 70, left: 30, duration: 9, delay: 2.5 },
          { top: 20, left: 90, duration: 7, delay: 0.5 },
        ].map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-primary/40 to-blue-500/40"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: particle.delay,
            }}
          />
        ))}

        {/* SVG geometric shapes */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          <motion.circle
            cx="1200"
            cy="200"
            r="120"
            fill="url(#grad1)"
            animate={{
              r: [120, 140, 120],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.polygon
            points="200,150 300,50 400,150 300,250"
            fill="url(#grad2)"
            animate={{
              rotate: [0, 360],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ transformOrigin: "300px 150px" }}
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="my-8"
          >
            <span className="text-2xl md:text-5xl font-semibold text-gray-700 dark:text-white/80">
              👋 Hi there, I&apos;m
            </span>
          </motion.div>

          {/* Main Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-6xl font-black mb-6 text-balance leading-none"
          >
            <span className="relative inline-block">
              <span
                className="bg-gradient-to-r from-indigo-500 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Abid Al Wassie
              </span>
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-3xl blur-2xl -z-10"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                  scale: [0.95, 1.02, 0.95],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>

          {/* Enhanced Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="my-8 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary via-blue-600 to-purple-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition duration-300"></div>
              <Badge
                variant="secondary"
                className="relative px-6 py-4 text-lg tracking-widest shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-800 dark:text-white border-2 border-primary/30 hover:border-primary/50 transition-all duration-300 font-bold"
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
                  className="bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent bg-300% font-extrabold"
                  style={{
                    backgroundSize: "300% 100%",
                  }}
                >
                  ⚡ FULL STACK DEVELOPER ⚡
                </motion.span>
              </Badge>
            </div>
          </motion.div>

          {/* Experience Badge */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-green-600 to-teal-600 rounded-2xl blur-lg opacity-60 group-hover:opacity-90 transition duration-300"></div>
              <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-8 py-4 rounded-2xl border-2 border-emerald-500/40 shadow-2xl">
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-300 tracking-wide flex items-center gap-2">
                  🏆 3+ Years Experience
                </span>
              </div>
            </div>
          </motion.div> */}

          {/* Role Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-12"
          >
            <div className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              <div className="mt-4">
                I build{" "}
                <span className="relative inline-block">
                  <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-lg">
                    scaleable web apps
                  </span>
                </span>{" "}
                with TypeScript, React, Next.js, Node.js, and other
                technologies.
              </div>
              <br />
              <span className="text-3xl font-semibold bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
                💫 Let&apos;s build something amazing together!
              </span>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center mb-24"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("work")}
              className="text-2xl px-12 py-6 rounded-2xl shadow-2xl bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 hover:scale-105 hover:shadow-primary/25 transition-all duration-300 font-bold text-white border-0"
            >
              🚀 View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="text-2xl px-12 py-6 rounded-2xl border-2 border-gray-400/40 dark:border-white/30 bg-white/20 dark:bg-white/5 backdrop-blur-sm text-gray-800 dark:text-white hover:bg-white/30 dark:hover:bg-white/10 hover:border-gray-500/60 dark:hover:border-white/50 hover:scale-105 transition-all duration-300 font-bold"
            >
              💬 Let&apos;s Connect
            </Button>
          </motion.div>

          {/* Enhanced Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center gap-6 mb-20"
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
                className="relative w-16 h-16 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-white hover:border-gray-600 dark:hover:bg-gray-800 dark:hover:border-white/40 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
              >
                <a
                  href="https://github.com/AbidAlWassie"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="h-8 w-8 group-hover:scale-110 transition-transform duration-200" />
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
                className="relative w-16 h-16 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-blue-50 hover:border-blue-500 dark:hover:bg-blue-950 dark:hover:border-blue-400 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
              >
                <a
                  href="https://linkedin.com/in/abidalwassie"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-8 w-8 group-hover:scale-110 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-200" />
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
                className="relative w-16 h-16 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-red-50 hover:border-red-500 dark:hover:bg-red-950 dark:hover:border-red-400 hover:shadow-2xl transition-all duration-300 text-gray-700 dark:text-white group"
              >
                <a href="mailto:abidalwassie@outlook.com" aria-label="Email">
                  <Mail className="h-8 w-8 group-hover:scale-110 group-hover:text-red-600 dark:group-hover:text-red-400 transition-all duration-200" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Enhanced scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
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
                className="relative w-16 h-16 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-gray-400/30 dark:border-white/20 hover:bg-white hover:border-primary dark:hover:bg-gray-800 dark:hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 text-gray-700 dark:text-white group"
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
                  <ArrowDown className="h-8 w-8 group-hover:scale-110 group-hover:text-primary transition-all duration-300" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
