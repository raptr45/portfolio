import { SocialLinks } from "./social-links";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-white/5 dark:border-white/10 bg-[#0d0f19] dark:bg-[#0b0f18] py-8 text-sm">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-6 md:gap-8 justify-between">
          {/* Left: Logo */}
          <div className="relative w-16 h-12 flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <span className="absolute left-[19px] right-0 mx-auto text-center font-bold text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent pointer-events-none">
              bid
            </span>
          </div>

          {/* Center: Copyright */}
          <p className="text-center text-muted-foreground md:flex-1 order-last md:order-none leading-relaxed">
            &copy; {year} Copyright:{" "}
            <a
              href="https://github.com/AbidAlWassie"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 dark:text-blue-400 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Abid Al Wassie
            </a>
          </p>

          {/* Right: Social */}
          <div className="flex-shrink-0">
            <SocialLinks
              variant="footer"
              include={["youtube", "github", "linkedin", "twitter"]}
              showTooltips={false}
              justify="end"
              scheme="neutral"
              className="gap-4"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
