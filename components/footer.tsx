import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/AbidAlWassie",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://www.youtube.com/channel/UCYVf_0t2qsjyHILRsLatlHg",
    icon: Youtube,
    label: "YouTube",
  },
  {
    href: "https://linkedin.com/in/abidalwassie",
    icon: Linkedin,
    label: "Linkedin",
  },
  {
    href: "https://www.twitter.com/onemandev_io",
    icon: Twitter,
    label: "Twitter",
  },
] as const;

export function Footer() {
  return (
    <footer className="py-12 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  A
                </span>
              </div>
              <div className="absolute -right-1 top-0 w-5 h-5 bg-primary/20 rounded-full"></div>
            </div>
            <span className="text-xl font-semibold">bid</span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-center">
            &copy; 2025 Copyright:{" "}
            <a
              href="https://github.com/AbidAlWassie"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors font-medium"
            >
              Abid Al Wassie
            </a>
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon: Icon, label }) => (
              <Button
                key={label}
                variant="ghost"
                size="icon"
                asChild
                className="hover:bg-primary hover:text-primary-foreground transition-colors !text-foreground dark:!text-foreground"
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5 !text-foreground dark:!text-foreground" />
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
