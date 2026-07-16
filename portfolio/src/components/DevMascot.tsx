import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A tiny developer sitting in the corner, forever coding. Every so often
 * they pop a funny one-liner. Purely decorative easter-egg.
 */
const LINES = [
  "just one more commit… 🤏",
  "who keeps spawning these bugs?! 🐛",
  "it compiles — ship it 🚀",
  "99 little bugs in the code… 🎵",
  "coffee.exe stopped working ☕",
  "works on my machine 🤷",
  "TODO: fix later (never)",
  "git push --force 😬",
  "rewriting it in Rust, brb",
  "why is it working now?? 🤔",
  "one does not simply exit vim",
  "1 hour of coding = 3 hours debugging",
];

// little scrolling "code" the dev keeps typing
const CODE = ["const fix = () => {", "  return bug ? 🔨 : ship;", "}", "// TODO: refactor", "git commit -m 'wip'"];

export function DevMascot() {
  const [line, setLine] = useState<string | null>(null);
  const [codeIdx, setCodeIdx] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timers: number[] = [];
    let cancelled = false;

    const talk = (delay: number) => {
      const t = window.setTimeout(() => {
        if (cancelled) return;
        setLine(LINES[Math.floor(Math.random() * LINES.length)]);
        const hide = window.setTimeout(() => !cancelled && setLine(null), 3200);
        timers.push(hide);
        talk(6000 + Math.random() * 7000);
      }, delay);
      timers.push(t);
    };
    talk(2500);

    const code = window.setInterval(() => {
      if (!cancelled) setCodeIdx((i) => (i + 1) % CODE.length);
    }, 1400);
    timers.push(code);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      clearInterval(code);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden select-none md:block">
      <div className="relative flex items-end gap-2">
        {/* the coder */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="clip-hud-sm neon-glow-sm relative grid h-12 w-12 shrink-0 place-items-center border border-primary/40 bg-card/80 backdrop-blur-xl"
        >
          <span className="text-2xl leading-none">🧑‍💻</span>
          {/* typing caret */}
          <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

        {/* tiny code stream */}
        <div className="mb-0.5 hidden max-w-[180px] overflow-hidden lg:block">
          <AnimatePresence mode="wait">
            <motion.p
              key={codeIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="truncate font-mono text-[10px] text-muted-foreground/70"
            >
              <span className="text-primary/60">$</span> {CODE[codeIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* funny speech bubble */}
        <AnimatePresence>
          {line && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 whitespace-nowrap"
            >
              <span className="neon-glow-sm relative block rounded-lg border border-primary/50 bg-card/95 px-3 py-1.5 font-mono text-[11px] font-medium text-foreground backdrop-blur after:absolute after:left-5 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-primary/50 after:content-['']">
                {line}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
