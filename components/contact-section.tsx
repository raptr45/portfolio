"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Github, Mail, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const socialLinks = [
  {
    href: "https://www.twitter.com/onemandev_io",
    icon: Twitter,
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
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-sm font-medium text-primary uppercase tracking-wider">
                Contact
              </p>
              <h2 className="text-4xl font-bold text-balance">
                Leave a message!
              </h2>
              <p className="text-muted-foreground text-lg">
                I will respond as soon as possible.
              </p>
            </div>

            <div className="flex items-center gap-3 group">
              <Mail className="h-5 w-5 text-primary" />
              <a
                href="mailto:abidalwassie@outlook.com"
                className="text-lg font-medium hover:text-primary transition-colors"
              >
                abidalwassie@outlook.com
              </a>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Follow me:</h3>
              <div className="flex gap-4">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="icon"
                    asChild
                    className="hover:bg-primary hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-semibold mb-6">
                  Send me a message
                </h3>

                <div className="space-y-4">
                  <Input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />

                  <Input
                    name="email"
                    type="email"
                    placeholder="Your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                  />

                  <Textarea
                    name="message"
                    placeholder="Your message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={5}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
