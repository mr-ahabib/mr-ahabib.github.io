import { ArrowUp, Github, Linkedin, GraduationCap, Mail } from "lucide-react";

const SOCIALS = [
  { icon: <Github size={17} />, href: "https://github.com/mr-ahabib", label: "GitHub" },
  { icon: <Linkedin size={17} />, href: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/", label: "LinkedIn" },
  { icon: <GraduationCap size={17} />, href: "https://scholar.google.com/citations?user=PSvun2MAAAAJ&hl=en", label: "Google Scholar" },
  { icon: <Mail size={17} />, href: "mailto:mr.ahashan261@gmail.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-primary/25 bg-background/60 pt-14 pb-8 backdrop-blur">
      {/* neon top line */}
      <span className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Logo + copyright */}
          <div className="text-center md:text-left">
            <a href="#home" className="inline-flex items-center gap-2 font-mono text-lg font-semibold" aria-label="Ahashan Habib — home">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-primary">~/</span>
              <span className="text-foreground">ahashan-habib</span>
            </a>
          </div>

          {/* Socials + scroll-to-top */}
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={s.label}
                className="neon-glow-sm grid h-9 w-9 place-items-center rounded-lg border border-primary/40 bg-card/60 text-muted-foreground backdrop-blur transition-colors duration-200 hover:border-primary hover:text-primary"
              >
                {s.icon}
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="neon-glow-sm group ml-1 grid h-9 w-9 place-items-center rounded-lg border border-primary/60 bg-primary/10 text-primary backdrop-blur transition-colors duration-200 hover:bg-primary hover:text-primary-foreground"
            >
              <ArrowUp size={18} className="transition-transform group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-8 border-t border-border/40 pt-5 text-center font-mono text-xs tracking-wider text-muted-foreground">
          © {year} Md. Ahashan Habib — all rights reserved
        </div>
      </div>
    </footer>
  );
}
