"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SocialLinks } from "./social-links";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function ContactSection() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/mdobjjbo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-muted/10 to-background"
      aria-labelledby="contact-heading"
    >
      {/* Static subtle glowing circles (replaces previous moving-looking blobs) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-primary/30 via-primary/10 to-transparent blur-3xl opacity-50" />
        <div className="absolute -bottom-32 -left-16 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-blue-600/30 via-blue-600/10 to-transparent blur-3xl opacity-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-gradient-to-b from-indigo-500/20 via-indigo-500/5 to-transparent blur-2xl opacity-40" />
      </div>
      <div className="container relative z-10 mx-auto px-4 sm:px-6 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-10 sm:gap-14 lg:gap-20 items-start">
          {/* Contact Info */}
          <div className="space-y-7 sm:space-y-9 lg:space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6 }}
              className="space-y-5 sm:space-y-7"
            >
              <p className="text-base sm:text-lg font-bold text-primary uppercase tracking-widest">
                📧 Contact
              </p>
              <h2
                id="contact-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gradient-soft"
              >
                Let&apos;s collaborate
              </h2>
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground/90 font-medium leading-relaxed max-w-xl">
                Tell me a bit about your project and I&apos;ll get back to you
                as soon as possible.
              </p>
            </motion.div>

            <motion.a
              href="mailto:abidalwassie@outlook.com"
              aria-label="Email abidalwassie@outlook.com"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-3 sm:gap-4 group p-3 sm:p-4 rounded-2xl border border-primary/15 bg-gradient-to-r from-primary/5 to-blue-600/5 hover:from-primary/10 hover:to-blue-600/10 transition-colors cursor-pointer focus-brand outline-none"
            >
              <Mail className="h-6 w-6 sm:h-7 sm:w-7 text-primary flex-shrink-0 drop-shadow" />
              <span className="text-lg sm:text-xl lg:text-2xl font-semibold group-hover:text-primary transition-colors break-all select-text">
                abidalwassie@outlook.com
              </span>
              <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-muted-foreground group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="space-y-4 sm:space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span role="img" aria-label="globe">
                  🌐
                </span>{" "}
                Follow me
              </h3>
              <SocialLinks
                variant="contact"
                justify="start"
                showTooltips
                className="pt-1"
              />
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card className="relative overflow-hidden w-full border border-primary/20 bg-background/80 dark:bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-lg">
              {/* Subtle corner gradient accents */}
              <div className="pointer-events-none absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-primary/20 to-transparent rounded-full translate-x-10 -translate-y-10 blur-xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 w-44 h-44 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full -translate-x-10 translate-y-10 blur-xl" />
              <CardContent className="p-5 sm:p-7 lg:p-9 relative z-10">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 sm:space-y-8"
                  aria-describedby="contact-note"
                >
                  <div className="text-center space-y-3 sm:space-y-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-brand-solid text-white shadow-md">
                      <Mail className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-gradient-form-heading">
                      Send me a message
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Let&apos;s discuss your next project
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-md font-semibold text-foreground/80"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="h-11 sm:h-12 px-3 sm:px-4 border-none ring-2 ring-primary/40 focus-visible:ring-3 focus-visible:ring-blue-500/80 bg-muted/60 dark:bg-muted/40 backdrop-blur-sm transition-colors duration-200 w-full placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-md font-semibold text-foreground/80"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="h-11 sm:h-12 px-3 sm:px-4 border-none ring-2 ring-primary/40 focus-visible:ring-3 focus-visible:ring-blue-500/80 bg-muted/60 dark:bg-muted/40 backdrop-blur-sm transition-colors duration-200 w-full placeholder:text-muted-foreground/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-md font-semibold text-foreground/80"
                      >
                        Project Details
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Tell me about your project, timeline, and requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        rows={4}
                        className="px-3 sm:px-4 py-3 border-none ring-2 ring-primary/40 focus-visible:ring-3 focus-visible:ring-blue-500/80 bg-muted/60 dark:bg-muted/40 backdrop-blur-sm transition-colors duration-200 resize-none w-full min-h-[140px] placeholder:text-muted-foreground/60"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-14 text-base sm:text-lg font-semibold bg-brand-multi hover:brightness-120 shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary/50"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Sending your message...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 sm:gap-3 text-white">
                        <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                        Send Message
                      </div>
                    )}
                  </Button>
                  <p id="contact-note" className="sr-only">
                    All fields are required.
                  </p>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
