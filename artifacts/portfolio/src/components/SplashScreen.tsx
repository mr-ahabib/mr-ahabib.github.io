import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAME = "Ahashan Habib";
const DURATION = 2000; // keep in sync with Portfolio's splash timeout

export function SplashScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      // easeOutExpo for a fast-then-settle feel
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setProgress(Math.round(eased * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center overflow-hidden bg-[#060809] text-white select-none"
    >
      {/* film grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* masked dotted-grid disc */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[520px] w-[520px] bg-[radial-gradient(circle,hsl(var(--primary)/0.10)_1.4px,transparent_1.4px)] bg-[size:26px_26px] opacity-40"
        style={{ maskImage: "radial-gradient(circle, black 25%, transparent 68%)", WebkitMaskImage: "radial-gradient(circle, black 25%, transparent 68%)" }}
      />

      {/* two faint rotating rings for a subtle 3D feel */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[340px] w-[340px] rounded-full border border-primary/15 sm:h-[420px] sm:w-[420px]"
        animate={{ rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: "hsl(var(--primary) / 0.55)", borderRightColor: "hsl(var(--primary) / 0.25)" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-[280px] w-[280px] rounded-full border border-accent/10 sm:h-[340px] sm:w-[340px]"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{ borderBottomColor: "hsl(var(--accent) / 0.5)" }}
      />

      <div className="z-20 flex flex-col items-center px-6">
        {/* greeting */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 font-mono text-[10px] uppercase tracking-[0.5em] text-primary/70"
        >
          Assalamu Alaikum
        </motion.p>

        {/* loading title */}
        <motion.h1
          initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md text-center font-display text-2xl font-bold leading-snug tracking-tight sm:text-4xl"
        >
          <span className="text-white/60">Loading </span>
          <span className="bg-gradient-to-r from-primary via-accent to-accent-2 bg-clip-text text-transparent">
            {NAME}
          </span>
          <span className="text-white/60">&apos;s Profile</span>
        </motion.h1>

        {/* progress bar + counter */}
        <div className="mt-10 w-60 sm:w-72">
          <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-accent to-accent-2"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
            <span>Please wait</span>
            <span className="tabular-nums text-primary/80">{progress.toString().padStart(3, "0")}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
