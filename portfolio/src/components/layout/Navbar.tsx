import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

type Lenis = { scrollTo: (target: string | HTMLElement, opts?: { offset?: number; duration?: number }) => void };

/** Smooth-scroll to a section, accounting for the fixed header, via Lenis. */
function scrollToSection(href: string) {
  const el = document.querySelector(href);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.1 });
  } else {
    const y = (el as HTMLElement).getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    let raf = 0;
    // The active section is the last one whose top has scrolled past a line a
    // little below the fixed header. Reliable even for very tall sections and
    // when several are on screen at once (which broke the observer approach).
    const update = () => {
      raf = 0;
      setIsScrolled(window.scrollY > 50);
      const line = window.scrollY + 140;
      let current = "home";
      document.querySelectorAll<HTMLElement>("section[id]").forEach((sec) => {
        const top = sec.getBoundingClientRect().top + window.scrollY;
        if (top <= line) current = sec.id;
      });
      // near the very bottom, force the last section active
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        const all = document.querySelectorAll<HTMLElement>("section[id]");
        if (all.length) current = all[all.length - 1].id;
      }
      setActiveSection(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1280) setMobileMenuOpen(false); };
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
            onClick={(e) => { e.preventDefault(); scrollToSection("#home"); }}
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
            <div className="relative hidden xl:block">
              <nav className="neon-glow-sm relative flex gap-1 rounded-xl border border-primary/45 bg-card/50 px-3 py-1.5 backdrop-blur-md">
                {NAV_LINKS.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                      className={`group relative px-2 py-1.5 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-primary"
                          : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {link.name}
                      <span
                        className={`pointer-events-none absolute -bottom-0.5 left-2 right-2 h-0.5 origin-left rounded-full bg-gradient-to-r from-primary via-accent to-accent-2 transition-transform duration-300 ease-out ${
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

            {/* Mobile toggle */}
            <button
              className="xl:hidden p-2 rounded-lg text-foreground hover:text-primary hover:bg-primary/5 transition-all"
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
            className="xl:hidden absolute top-full left-0 w-full border-b border-primary/25 bg-background/95 backdrop-blur-xl shadow-[0_20px_40px_-12px_hsl(var(--background))]"
          >
            {/* neon top edge */}
            <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
            <nav className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 py-5">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`group relative flex items-center gap-2.5 overflow-hidden rounded-xl border px-3.5 py-3 transition-all duration-200 ${
                      isActive
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border/60 bg-card/40 text-muted-foreground hover:border-primary/40 hover:text-primary"
                    }`}
                    onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); scrollToSection(link.href); }}
                  >
                    {/* active left bar */}
                    <span
                      className={`absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-gradient-to-b from-primary via-accent to-accent-2 transition-opacity duration-200 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <span className="font-mono text-[10px] tabular-nums text-primary/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium">{link.name}</span>
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
