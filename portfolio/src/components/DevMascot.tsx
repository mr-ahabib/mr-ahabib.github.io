import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A tiny developer in the corner, forever typing code. Overhears the bugs
 * and fires back comebacks — a little running argument with the bug game.
 */

// fallback comeback if an event arrives without a matched reply
const FALLBACK_REPLIES = [
  "not again, you little bug 😤",
  "npm uninstall bug",
  "hold still, I've got a hammer 🔨",
  "who let you into prod?!",
];

// idle mutterings when no bug is talking
const IDLE = [
  "just one more commit… 🤏",
  "it compiles — ship it 🚀",
  "coffee.exe stopped working ☕",
  "works on my machine 🤷",
  "one does not simply exit vim",
  "why is it working now?? 🤔",
];

// lines the dev "types", one char at a time
const CODE = [
  "while (bug.alive) squash();",
  "git commit -m 'fix bug'",
  "npm run build --prod",
  "const coffee = refill();",
  "// TODO: catch that bug",
  "deploy(); pray();",
];

export function DevMascot() {
  const [line, setLine] = useState<string | null>(null);
  const [typed, setTyped] = useState("");
  const lastReply = useRef(0);

  // typewriter: type a code line, pause, wipe, next line
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(CODE[0]);
      return;
    }
    let ci = 0;
    let pos = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      const full = CODE[ci];
      if (pos <= full.length) {
        setTyped(full.slice(0, pos));
        pos += 1;
        timer = setTimeout(tick, 70 + Math.random() * 60);
      } else {
        timer = setTimeout(() => {
          ci = (ci + 1) % CODE.length;
          pos = 0;
          tick();
        }, 1400);
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, []);

  // talk: reply to bugs (via event), and mutter when idle
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;
    const timers: number[] = [];

    const showFor = (text: string, ms: number) => {
      setLine(text);
      const t = window.setTimeout(() => !cancelled && setLine(null), ms);
      timers.push(t);
    };

    const onBug = (e: Event) => {
      const now = performance.now();
      if (now - lastReply.current < 3000) return; // don't over-talk
      lastReply.current = now;
      const reply =
        (e as CustomEvent<string>).detail ||
        FALLBACK_REPLIES[Math.floor(Math.random() * FALLBACK_REPLIES.length)];
      const t = window.setTimeout(() => {
        if (!cancelled) showFor(reply, 3000);
      }, 900); // a beat, so it reads as a reply
      timers.push(t);
    };
    window.addEventListener("bug-speak", onBug as EventListener);

    // occasional idle muttering
    const idle = (delay: number) => {
      const t = window.setTimeout(() => {
        if (cancelled) return;
        if (!reduce && performance.now() - lastReply.current > 6000) {
          showFor(IDLE[Math.floor(Math.random() * IDLE.length)], 3000);
        }
        idle(11000 + Math.random() * 9000);
      }, delay);
      timers.push(t);
    };
    idle(5000);

    return () => {
      cancelled = true;
      window.removeEventListener("bug-speak", onBug as EventListener);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 select-none">
      <div className="relative flex items-end gap-2">
        {/* the coder at the keyboard (animated GIF) */}
        <div className="clip-hud-sm neon-glow-sm relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden border border-primary/40 bg-card/80 backdrop-blur-xl">
          <img
            src={`${import.meta.env.BASE_URL}images/coder.gif`}
            alt="Developer hard at work"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <span className="absolute bottom-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)] animate-pulse" />
        </div>

        {/* live typed code */}
        <div className="mb-0.5 hidden h-4 max-w-[200px] overflow-hidden lg:block">
          <p className="truncate font-mono text-[10px] text-muted-foreground/70">
            <span className="text-primary/60">$</span> {typed}
            <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em] bg-emerald-400 align-baseline animate-pulse" />
          </p>
        </div>

        {/* speech bubble (replies to the bug / idle mutters) */}
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
