import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { HeroTerminal } from "@/components/HeroTerminal";

export function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
      {/* Removed geometric grid background for a clean spiral canvas */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-14">
        {/* ── Terminal (left) + portrait popping out (right) ── */}
        <div className="relative">
          {/* Terminal window — left */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-0 w-full lg:w-[62%]"
          >
            <div className="relative overflow-hidden bg-transparent font-mono">
              {/* faint CRT scanline texture */}
              <div className="holo-scanlines pointer-events-none absolute inset-0 z-10 opacity-[0.04]" />

              {/* Title bar */}
              <div className="relative flex items-center gap-2 px-1 py-3.5">
                <span className="h-3 w-3 rounded-full bg-red-400/90" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/90" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/90" />
                <span className="mx-auto flex items-center gap-2 text-xs text-muted-foreground/70">
                  <span className="text-primary/70">~/</span>ahashan@ai:portfolio
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="hidden sm:inline">online</span>
                </span>
              </div>
              {/* hairline under the title bar */}
              <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

              {/* Body — taller, info centered vertically */}
              <div className="flex min-h-[20rem] items-center sm:min-h-[24rem] lg:min-h-[26rem]">
                <HeroTerminal chrome={false} />
              </div>

              {/* hairline above the footer */}
              <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              {/* Status footer */}
              <div className="relative flex items-center justify-between bg-gradient-to-t from-white/[0.05] to-transparent px-2 py-3 text-xs">
                <span className="text-muted-foreground/70"># AI / Full-Stack Engineer</span>
                <span className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/90">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  open to work
                </span>
              </div>
            </div>
          </motion.div>

          {/* Portrait — larger, popping out on the right, overlapping the terminal edge */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="relative mt-6 flex items-center justify-center lg:absolute lg:-right-6 lg:top-1/2 lg:mt-0 lg:w-[46%] lg:-translate-y-1/2 xl:-right-12"
          >
            {/* "jolchap" watermark — the name behind the portrait */}
            <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-center select-none">
              <span className="bg-gradient-to-b from-primary/15 to-transparent bg-clip-text text-center font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-transparent sm:text-6xl lg:text-7xl">
                Habib
              </span>
              <span
                className="text-center font-display text-5xl font-extrabold uppercase leading-none tracking-tight text-transparent sm:text-6xl lg:text-7xl"
                style={{ WebkitTextStroke: "1px hsl(var(--primary) / 0.18)" }}
              >
                Ahashan
              </span>
            </div>

            {!imageError ? (
              <img
                src={`${import.meta.env.BASE_URL}images/myself.png`}
                alt="Md. Ahashan Habib"
                className="relative z-10 max-h-[24rem] w-auto object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] sm:max-h-[28rem] lg:max-h-[34rem]"
                loading="eager"
                decoding="async"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10 text-3xl font-semibold text-primary">
                AH
              </div>
            )}
          </motion.div>
        </div>

        {/* CTA + stats — sit below the window */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-9 w-full max-w-xl lg:mt-12"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary — filled gradient HUD button */}
            <a
              href={`${import.meta.env.BASE_URL}Ahashan_Habib_CV.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="clip-hud group relative inline-flex items-center gap-2 overflow-hidden bg-gradient-to-r from-primary via-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 [filter:drop-shadow(0_10px_22px_hsl(var(--primary)/0.4))]"
            >
              {/* sheen sweep on hover */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Download size={18} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              Download CV
            </a>

            {/* Secondary — angular gradient-border HUD button */}
            <a
              href="#contact"
              className="group relative inline-flex items-center transition-transform duration-300 hover:-translate-y-0.5"
            >
              {/* border layer */}
              <span className="clip-hud absolute inset-0 bg-border transition-colors duration-300 group-hover:bg-primary/70" />
              {/* fill layer */}
              <span className="clip-hud absolute inset-[1.5px] bg-card/70 backdrop-blur transition-colors duration-300 group-hover:bg-primary/10" />
              {/* content */}
              <span className="relative inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold text-foreground">
                Contact Me
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>

          <div className="mt-10 flex gap-12 border-t border-border/60 pt-8">
            {[
              { label: "IEEE Publications", value: "3" },
              { label: "Live Products", value: "3" },
              { label: "Experience", value: "2yr+" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-xl sm:text-2xl font-display font-bold text-primary">{stat.value}</div>
                <div className="mt-0.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-full"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
