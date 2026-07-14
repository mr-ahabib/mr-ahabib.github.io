import { useEffect, useState } from "react";
import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { HeroTerminal } from "@/components/HeroTerminal";

const ORBIT_TITLES = ["AI Engineer", "Software Engineer", "Researcher"];

/** One title riding the tilted orbit — bright in front, dim behind the avatar. */
function OrbitTitle({ text, phase, rx, ry }: { text: string; phase: number; rx: number; ry: number }) {
  const time = useTime();
  // one full orbit every 26s, matching the inner ring's spin
  const angle = useTransform(time, (t) => (t / 26000) * Math.PI * 2 + phase);
  const x = useTransform(angle, (a) => Math.cos(a) * rx);
  const y = useTransform(angle, (a) => Math.sin(a) * ry);
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2); // 0 = behind, 1 = in front
  const scale = useTransform(depth, [0, 1], [0.78, 1.05]);
  const opacity = useTransform(depth, [0, 1], [0.35, 1]);
  const zIndex = useTransform(depth, (d) => (d > 0.5 ? 20 : 5));

  return (
    // no backdrop-blur here — recomputing a blurred backdrop every frame of
    // the orbit causes visible shimmer; will-change keeps it on the GPU
    <motion.span
      aria-hidden="true"
      style={{ x, y, scale, opacity, zIndex }}
      className="pointer-events-none absolute left-1/2 top-1/2 will-change-transform"
    >
      <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/40 bg-card/95 px-2.5 py-1 font-mono text-[10px] text-primary sm:text-xs">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {text}
      </span>
    </motion.span>
  );
}

/** The three titles spaced 120° apart on the avatar's orbit ring. */
function OrbitingTitles() {
  const reduced = useReducedMotion();
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // ellipse matching the visible ring (circle tilted ~72°)
  const rx = small ? 140 : 215;
  const ry = small ? 46 : 66;

  if (reduced) {
    const spots = [
      { x: -rx, y: 0 },
      { x: rx, y: 0 },
      { x: 0, y: ry },
    ];
    return (
      <>
        {ORBIT_TITLES.map((t, i) => (
          <span
            key={t}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20"
            style={{ transform: `translate(${spots[i].x}px, ${spots[i].y}px)` }}
          >
            <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-primary/40 bg-card/80 px-2.5 py-1 font-mono text-[10px] text-primary backdrop-blur sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {t}
            </span>
          </span>
        ))}
      </>
    );
  }

  return (
    <>
      {ORBIT_TITLES.map((t, i) => (
        <OrbitTitle key={t} text={t} phase={(i * Math.PI * 2) / 3} rx={rx} ry={ry} />
      ))}
    </>
  );
}

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
      {/* Cyberpunk neon grid floor */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 overflow-hidden [perspective:340px]"
        style={{
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      >
        <div
          className="absolute inset-x-[-50%] bottom-[-40%] h-[180%] opacity-50 [transform:rotateX(74deg)]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--primary)/0.55) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.55) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
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

            {/* Titles orbiting the avatar like planets */}
            <OrbitingTitles />

            {/* Pedestal — crisp neon lines (no glow bloom) */}
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 w-64 sm:w-80">
              <div className="mx-auto h-[2px] w-3/4 rounded-full bg-primary" />
              <div className="mx-auto mt-1.5 h-px w-1/2 rounded-full bg-accent/70" />
            </div>

            {/* Avatar projection */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="holo-flicker relative z-10"
            >
              <div className="relative w-56 h-72 sm:w-72 sm:h-96">
                <div
                  className="neon-glow relative w-full h-full rounded-3xl overflow-hidden border-2 border-primary"
                  style={{
                    maskImage: "linear-gradient(to bottom, black 66%, transparent 99%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 66%, transparent 99%)",
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/avatar.webp`}
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

          <div className="mt-10 flex gap-12 border-t border-border/60 pt-8">
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
