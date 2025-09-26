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
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f2027] via-[#2c5364] to-[#232526]"
    >
      {/* Animated SVG background shapes */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1440 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-0 w-full h-full"
        >
          <circle
            cx="1200"
            cy="100"
            r="180"
            fill="#6EE7B7"
            fillOpacity="0.12"
          />
          <circle cx="300" cy="500" r="220" fill="#60A5FA" fillOpacity="0.10" />
          <ellipse
            cx="900"
            cy="400"
            rx="180"
            ry="80"
            fill="#F472B6"
            fillOpacity="0.10"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 flex justify-center"
          >
            <Badge
              variant="secondary"
              className="px-6 py-3 text-lg tracking-widest shadow-lg bg-accent/80 text-primary border-2 border-primary"
            >
              CREATIVE FULL STACK DEVELOPER
            </Badge>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-8 text-balance bg-gradient-to-r from-primary via-pink-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg"
          >
            Hi, I&apos;m{" "}
            <span className="underline decoration-wavy decoration-4 decoration-primary">
              Abid Al Wassie
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-3xl text-white/80 mb-10 max-w-3xl mx-auto font-medium"
          >
            I build{" "}
            <span className="text-primary font-bold">modern web apps</span> with
            TypeScript, React, Next.js, and creative technologies.
            <br />
            <span className="text-pink-400">
              Let&apos;s create something remarkable together.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center mb-14"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("work")}
              className="text-2xl px-12 py-5 rounded-full shadow-xl bg-gradient-to-r from-primary to-blue-500 hover:scale-105 hover:shadow-2xl transition-transform duration-200"
            >
              🚀 View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="text-2xl px-12 py-5 rounded-full border-2 border-primary hover:bg-primary/10 hover:scale-105 transition-transform duration-200"
            >
              ✉️ Get In Touch
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex justify-center gap-6 mb-14"
          >
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/20 !text-foreground hover:!text-primary dark:!text-foreground"
            >
              <a
                href="https://github.com/AbidAlWassie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-7 w-7 !text-foreground dark:!text-foreground" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/20 !text-foreground hover:!text-primary dark:!text-foreground"
            >
              <a
                href="https://linkedin.com/in/abidalwassie"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-7 w-7 !text-foreground dark:!text-foreground" />
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              asChild
              className="hover:bg-primary/20 !text-foreground hover:!text-primary dark:!text-foreground"
            >
              <a href="mailto:contact@example.com" aria-label="Email">
                <Mail className="h-7 w-7 !text-foreground dark:!text-foreground" />
              </a>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToSection("about")}
              className="animate-bounce bg-white/10 hover:bg-primary/20"
              aria-label="Scroll to about section"
            >
              <ArrowDown className="h-7 w-7" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
