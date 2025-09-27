"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Github, Mail, X, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  {
    href: "https://www.x.com/onemandev_io",
    icon: X,
    label: "Twitter",
  },
  {
    href: "https://www.youtube.com/channel/UCYVf_0t2qsjyHILRsLatlHg",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "https://github.com/AbidAlWassie",
    icon: Github,
    label: "GitHub",
  },
] as const;

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
      className="py-32 bg-gradient-to-br from-primary/5 via-background to-muted/20"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Info */}
          <div className="space-y-10">
            <div className="space-y-6">
              <p className="text-lg font-bold text-primary uppercase tracking-widest">
                📧 Contact
              </p>
              <h2 className="text-5xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Leave a message!
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                I will respond as soon as possible. Let&apos;s create something
                amazing together!
              </p>
            </div>

            <div className="flex items-center gap-4 group p-4 rounded-xl bg-primary/5 hover:bg-primary/10 transition-all duration-200">
              <Mail className="h-7 w-7 text-primary" />
              <a
                href="mailto:abidalwassie@outlook.com"
                className="text-xl md:text-2xl font-semibold hover:text-primary transition-colors"
              >
                abidalwassie@outlook.com
              </a>
              <ArrowRight className="h-6 w-6 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold">🌐 Follow me:</h3>
              <div className="flex gap-6">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="lg"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground hover:scale-110 transition-all duration-200 border-2 border-primary/20 hover:border-primary !text-foreground dark:!text-foreground"
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon className="h-6 w-6 !text-foreground dark:!text-foreground" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="shadow-2xl border-2 border-primary/10 bg-gradient-to-br from-card via-card/95 to-primary/5 backdrop-blur-sm relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full translate-y-12 -translate-x-12"></div>

            <CardContent className="p-8 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-blue-600 text-white shadow-lg">
                    <Mail className="h-8 w-8" />
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Send me a message
                  </h3>
                  <p className="text-muted-foreground">
                    Let&apos;s discuss your next project
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-foreground/80"
                    >
                      Full Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="h-12 px-4 border-2 border-border/50 focus:border-primary/60 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-foreground/80"
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
                      className="h-12 px-4 border-2 border-border/50 focus:border-primary/60 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-semibold text-foreground/80"
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
                      rows={5}
                      className="px-4 py-3 border-2 border-border/50 focus:border-primary/60 bg-background/50 backdrop-blur-sm transition-all duration-300 focus:scale-[1.02] focus:shadow-lg resize-none"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending your message...
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5" />
                      Send Message
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
