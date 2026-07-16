import { useEffect, useState } from "react";
import { motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import { HeroTerminal } from "@/components/HeroTerminal";
import { Tilt3D } from "@/components/Tilt3D";
import { WireCube } from "@/components/HudDecor";

/** The solar system: each role is a planet on its own tilted orbit around
 * the avatar-sun — inner orbits run faster, exactly like real planets. */
const TILT = 0.31; // vertical squash of a circle tilted ~72°
const ORBITS = [
  { text: "AI Engineer", rx: 150, duration: 16, planet: "bg-primary", label: "text-primary", ring: "border-primary/30" },
  { text: "Software Engineer", rx: 215, duration: 26, planet: "bg-accent", label: "text-accent", ring: "border-accent/25 border-dashed" },
  { text: "Researcher", rx: 278, duration: 40, planet: "bg-accent-2", label: "text-accent-2", ring: "border-accent-2/25" },
];

/** One planet riding its orbit — bright in front, dim behind the sun. */
function OrbitTitle({
  text,
  phase,
  rx,
  duration,
  planet,
  label,
}: {
  text: string;
  phase: number;
  rx: number;
  duration: number;
  planet: string;
  label: string;
}) {
  const time = useTime();
  const ry = rx * TILT;
  const angle = useTransform(time, (t) => (t / (duration * 1000)) * Math.PI * 2 + phase);
  const x = useTransform(angle, (a) => Math.cos(a) * rx);
  const y = useTransform(angle, (a) => Math.sin(a) * ry);
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2); // 0 = behind, 1 = in front
  const scale = useTransform(depth, [0, 1], [0.72, 1.06]);
  const opacity = useTransform(depth, [0, 1], [0.3, 1]);
  const zIndex = useTransform(depth, (d) => (d > 0.5 ? 20 : 5));

  return (
    // no backdrop-blur here — recomputing a blurred backdrop every frame of
    // the orbit causes visible shimmer; will-change keeps it on the GPU
    <motion.span
      aria-hidden="true"
      style={{ x, y, scale, opacity, zIndex }}
      className="pointer-events-none absolute left-1/2 top-1/2 will-change-transform"
    >
      <span className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-card/95 px-2.5 py-1 font-mono text-[10px] sm:text-xs ${label}`}>
        <span className={`h-2 w-2 rounded-full ${planet} shadow-[0_0_6px_currentColor]`} />
        {text}
      </span>
    </motion.span>
  );
}

/** Orbit rings + planets, scaled down on small screens. */
function SolarSystem() {
  const reduced = useReducedMotion();
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const k = small ? 0.62 : 1; // mobile scale factor

  return (
    <>
      {/* Orbit paths — circles tilted into the same plane the planets ride */}
      <div className="pointer-events-none absolute inset-0 grid place-items-center [perspective:1000px]">
        {ORBITS.map((o) => (
          <div key={o.text} className="col-start-1 row-start-1 [transform:rotateX(72deg)]">
            <div
              className={`rounded-full border ${o.ring}`}
              style={{ width: o.rx * 2 * k, height: o.rx * 2 * k }}
            />
          </div>
        ))}
      </div>

      {/* Planets */}
      {reduced
        ? ORBITS.map((o, i) => {
            const spots = [
              { x: -o.rx * k, y: 0 },
              { x: o.rx * k, y: 0 },
              { x: 0, y: o.rx * TILT * k },
            ];
            return (
              <span
                key={o.text}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 z-20"
                style={{ transform: `translate(${spots[i].x}px, ${spots[i].y}px)` }}
              >
                <span className={`flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-border/70 bg-card/80 px-2.5 py-1 font-mono text-[10px] backdrop-blur sm:text-xs ${o.label}`}>
                  <span className={`h-2 w-2 rounded-full ${o.planet}`} />
                  {o.text}
                </span>
              </span>
            );
          })
        : ORBITS.map((o, i) => (
            <OrbitTitle
              key={o.text}
              text={o.text}
              phase={(i * Math.PI * 2) / 3}
              rx={o.rx * k}
              duration={o.duration}
              planet={o.planet}
              label={o.label}
            />
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
          className="absolute inset-x-[-50%] bottom-[-40%] h-[180%] opacity-20 dark:opacity-50 [transform:rotateX(74deg)]"
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
            {/* The solar system — orbit rings + role planets around the avatar-sun */}
            <SolarSystem />

            {/* Pedestal — crisp neon lines (no glow bloom) */}
            <div className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 w-64 sm:w-80">
              <div className="mx-auto h-[2px] w-3/4 rounded-full bg-primary" />
              <div className="mx-auto mt-1.5 h-px w-1/2 rounded-full bg-accent/70" />
            </div>

            {/* Floating wireframe cubes — 3D filler around the projection */}
            <WireCube size={40} className="left-2 top-16 hidden sm:block" />
            <WireCube size={26} className="right-4 bottom-24 hidden sm:block" />

            {/* Avatar projection */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="holo-flicker relative z-10"
            >
              <Tilt3D max={9} perspective={700}>
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

                {/* Realistic floor reflection — mirrored, faded, slightly blurred */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-0 top-full mt-2 h-28 w-full overflow-hidden opacity-20 blur-[2px] [transform:scaleY(-1)]"
                  style={{
                    maskImage: "linear-gradient(to top, black, transparent 85%)",
                    WebkitMaskImage: "linear-gradient(to top, black, transparent 85%)",
                  }}
                >
                  <img
                    src={`${import.meta.env.BASE_URL}images/avatar.webp`}
                    alt=""
                    className="w-full object-cover object-top"
                  />
                </div>
              </div>
              </Tilt3D>
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
