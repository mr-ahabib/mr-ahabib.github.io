import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * A tiny developer in the corner, forever typing code. Overhears the bugs
 * and fires back comebacks — a little running argument with the bug game.
 */

// comebacks aimed at the bug
const REPLIES = [
  "not again, you little bug 😤",
  "I'll git revert you",
  "stop eating my code! 🔨",
  "npm uninstall bug",
  "that's going in the backlog",
  "sudo kill -9 you",
  "catch these hands, bug 🖐️",
  "writing a unit test for you now",
  "you again?? 😩",
  "patch incoming… 🩹",
  "hold still, I've got a hammer",
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

    const onBug = () => {
      const now = performance.now();
      if (now - lastReply.current < 3800) return; // don't over-talk
      lastReply.current = now;
      const t = window.setTimeout(() => {
        if (!cancelled) showFor(REPLIES[Math.floor(Math.random() * REPLIES.length)], 3000);
      }, 850); // beat, like a reply
      timers.push(t);
    };
    window.addEventListener("bug-speak", onBug);

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
      window.removeEventListener("bug-speak", onBug);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 left-5 z-40 hidden select-none md:block">
      <div className="relative flex items-end gap-2">
        {/* the coder at the keyboard */}
        <motion.div
          animate={{ y: [0, -2.5, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="clip-hud-sm neon-glow-sm relative grid h-12 w-12 shrink-0 place-items-center border border-primary/40 bg-card/80 backdrop-blur-xl"
        >
          <motion.span
            className="text-2xl leading-none"
            animate={{ rotate: [0, -3, 0, 3, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            🧑‍💻
          </motion.span>
          <span className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        </motion.div>

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
