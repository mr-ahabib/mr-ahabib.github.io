import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="group relative grid h-9 w-9 place-items-center rounded-lg border border-primary/50 bg-card/60 text-muted-foreground backdrop-blur shadow-[0_0_2px_hsl(var(--primary)/0.6),0_0_12px_hsl(var(--primary)/0.2)] transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_2px_hsl(var(--primary)),0_0_18px_hsl(var(--primary)/0.4)]"
    >
      {/* Render nothing decisive until mounted to avoid a hydration flash */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="relative"
        >
          {mounted && isDark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/75 backdrop-blur-lg py-3 shadow-[0_8px_30px_hsl(var(--background)/0.6)]"
          : "bg-transparent py-5"
      }`}
    >
      {/* Futuristic gradient glow line at the bottom edge when scrolled */}
      <span
        className={`pointer-events-none absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/70 to-transparent transition-opacity duration-300 ${
          isScrolled ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2.5 font-mono"
            aria-label="Ahashan Habib — home"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
            </span>
            <span className="text-base font-semibold tracking-tight sm:text-lg">
              <span className="text-primary">~/</span>
              <span className="text-foreground">ahashan-habib</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            {/* Desktop Nav — neon panel */}
            <div className="relative hidden lg:block">
              <nav className="relative flex gap-1 rounded-xl border border-primary/45 bg-card/50 px-3 py-1.5 backdrop-blur-md shadow-[0_0_2px_hsl(var(--primary)/0.6),0_0_16px_hsl(var(--primary)/0.2)]">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`group relative px-2 py-1.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`pointer-events-none absolute -bottom-0.5 left-2 right-2 h-0.5 origin-left rounded-full bg-gradient-to-r from-primary to-accent transition-transform duration-300 ease-out ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            <ThemeToggle />

            {/* Mobile toggle */}
            <button
              className="lg:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-xl border-b border-border shadow-xl"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-3 gap-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`text-center text-sm font-medium py-2.5 px-2 rounded-xl transition-all duration-200 ${
                      isActive
                        ? "text-primary bg-primary/10 font-semibold"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
