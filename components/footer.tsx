import { SocialLinks } from "./social-links";

export function Footer() {
  return (
    <footer className="py-12 bg-muted/30 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo */}
          <div className="relative w-26 h-16 flex items-center">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <span className="text-white font-bold text-4xl">A</span>
            </div>
            <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-4xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pointer-events-none">
              bid
            </span>
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
          <SocialLinks variant="footer" showTooltips className="mt-2" />
        </div>
      </div>
    </footer>
  );
}
