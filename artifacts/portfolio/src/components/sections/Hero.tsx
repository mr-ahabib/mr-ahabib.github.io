import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { HeroTerminal } from "@/components/HeroTerminal";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
      {/* Section-level ambient tints */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.05] to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/[0.06] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-14">
        {/* Terminal + holographic avatar share a centered row so they line up */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Terminal intro ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="order-2 lg:order-1 w-full"
          >
            <HeroTerminal />
          </motion.div>

          {/* ── Right — Holographic Avatar ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 relative flex items-center justify-center min-h-[420px] sm:min-h-[480px]"
          >
            {/* Orbiting perspective rings */}
            <div className="pointer-events-none absolute inset-0 grid place-items-center [perspective:1000px]">
              <div className="[transform:rotateX(72deg)]">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                  className="h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full border border-primary/25"
                />
              </div>
              <div className="[transform:rotateX(72deg)]">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
                  className="h-[400px] w-[400px] sm:h-[520px] sm:w-[520px] rounded-full border border-dashed border-accent/20"
                />
              </div>
            </div>

            {/* Projection beam rising from the pedestal */}
            <div
              className="pointer-events-none absolute bottom-16 left-1/2 -translate-x-1/2 w-52 sm:w-64 h-80 sm:h-96 bg-gradient-to-t from-primary/15 via-primary/5 to-transparent"
              style={{ clipPath: "polygon(36% 100%, 64% 100%, 90% 0, 10% 0)", filter: "blur(3px)" }}
            />

            {/* Holographic pedestal */}
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 w-64 sm:w-80">
              <div className="h-14 w-full rounded-[100%] bg-primary/25 blur-2xl" />
              <div className="mx-auto -mt-9 h-[3px] w-3/4 rounded-full bg-primary/70 blur-[1px]" />
              <div className="mx-auto mt-1.5 h-px w-1/2 rounded-full bg-accent/50 blur-[1px]" />
            </div>

            {/* Avatar projection */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="holo-flicker relative z-10"
            >
              <div className="relative w-56 h-72 sm:w-72 sm:h-96">
                {/* glow frame */}
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/40 to-accent/40 blur-2xl opacity-50" />
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden border border-primary/40 shadow-[0_0_45px_hsl(var(--primary)/0.28)]"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 66%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 66%, transparent 99%)",
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/avatar.png`}
                    alt="Md. Ahashan Habib"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* hologram colour tint */}
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/25 via-transparent to-accent/35 mix-blend-screen" />
                  {/* fine scanlines */}
                  <div className="holo-scanlines absolute inset-0 opacity-70" />
                  {/* moving scan bar */}
                  <div className="holo-scanbar absolute left-0 h-10 w-full bg-gradient-to-b from-transparent via-primary/45 to-transparent" />
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* CTA + stats — sit below the terminal, sharing its left edge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-9 lg:mt-12 w-full max-w-xl"
        >
          <div className="flex flex-wrap items-center gap-4 sm:gap-5">
            {/* Primary — filled gradient HUD button */}
            <a
              href="https://mr-ahabib.github.io/images/AhashanHabib.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="clip-hud group relative inline-flex items-center gap-2 overflow-hidden bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 [filter:drop-shadow(0_10px_22px_hsl(var(--primary)/0.4))]"
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

          <div className="mt-8 flex gap-10 border-t border-border/60 pt-6">
            {[
              { label: "Publications", value: "3+" },
              { label: "Projects", value: "10+" },
              { label: "Experience", value: "1yr+" },
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
