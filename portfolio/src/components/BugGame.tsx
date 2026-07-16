import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Easter-egg mini game: a neon cyber-bug occasionally crawls across the
 * screen. Hovering it turns the cursor into a hammer; left-clicking squashes
 * it with a synthesized crunch and an animated splat corpse.
 *
 * Rare by design — tune the knobs below. Dev/demo hook: run
 * `window.__spawnBug()` in the console to force a bug to appear.
 */
const FIRST_SPAWN_MS: [number, number] = [8_000, 15_000];
const RESPAWN_MS: [number, number] = [20_000, 30_000];
const MAX_SPAWNS = 14; // per page load (splits count too)
const LIFETIME_MS = 70_000; // after this the bug scurries off-screen
const SIZE = 30; // sprite box in px
const MAX_BUGS = 2; // concurrent bugs after multiplying
const SPLIT_MIN_AGE_MS = 5_000; // a bug must live this long before it can split
const SPLIT_CHANCE_PER_SEC = 0.06; // per wandering bug

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Cocky lines the bugs drop while wandering — teasing the developer. */
const TAUNTS = [
  "psst dev, your code has 99 problems 🐛",
  "I saw that TODO you never did 👀",
  "6 hours debugging? that was me 😂",
  "Ctrl+S won't stop me, dev",
  "don't sleep right after deploy 😉",
  "git commit -m 'fix' … again? 😏",
  "your console.log won't save you",
  "this dev can't catch me 😎",
  "works on my machine — not yours 🤷",
  "your unit tests? cute 🐛",
  "find me in production, hehe",
  "npm run cry",
  "I'm a feature, not a bug — tell your boss",
  "Stack Overflow won't save you either",
  "I passed code review 😌",
];
/** Announced right after a bug splits in two. */
const SPLIT_LINES = [
  "npm install more-bugs 🐛🐛",
  "one fix, two new bugs — classic",
  "fork() and multiply, baby",
  "merge conflict? nah, merge bugs",
  "copy-paste is my love language",
];
/** Yelled while you're trying to squash it (cursor closing in / hover). */
const PANICS = [
  "MOVE MOVE MOVE 🏃",
  "too slow, human!",
  "nope nope nope 💨",
  "can't touch this",
  "nice try 😏",
  "you'll never catch me!",
  "missed me! 😜",
  "not today, dev!",
];
/** Said while chewing on the page's content. */
const EAT_LINES = [
  "nom nom nom 🍴",
  "tasty code 😋",
  "mmm, spaghetti code",
  "eating your <div>s 🐛",
  "deleting this line…",
  "yoink! 🍽️",
  "this text looks delicious",
];
/** Random last words on the corpse. */
const LAST_WORDS = [
  "bug_fixed ✓ (probably)",
  "segfault (core dumped)",
  "exit code 137 💀",
  "tell my 400 dependencies…",
  "rm -rf /bug ✓",
  "reverting to legacy afterlife",
  "deprecated 🪦",
];

/** Short synthesized "squish": filtered noise crunch + low pitch-drop thud. */
function playSquish() {
  try {
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();
    const t0 = ctx.currentTime;

    // crunch (noise burst through a falling bandpass)
    const len = Math.floor(ctx.sampleRate * 0.14);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2;
    const noise = ctx.createBufferSource();
    noise.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 0.8;
    bp.frequency.setValueAtTime(1100, t0);
    bp.frequency.exponentialRampToValueAtTime(250, t0 + 0.12);
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.45, t0);
    ng.gain.exponentialRampToValueAtTime(0.001, t0 + 0.14);
    noise.connect(bp).connect(ng).connect(ctx.destination);

    // thud (sine drop)
    const osc = ctx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(150, t0);
    osc.frequency.exponentialRampToValueAtTime(45, t0 + 0.12);
    const og = ctx.createGain();
    og.gain.setValueAtTime(0.35, t0);
    og.gain.exponentialRampToValueAtTime(0.001, t0 + 0.15);
    osc.connect(og).connect(ctx.destination);

    noise.start(t0);
    osc.start(t0);
    noise.stop(t0 + 0.15);
    osc.stop(t0 + 0.16);
    window.setTimeout(() => void ctx.close(), 400);
  } catch {
    /* audio unavailable — stay silent */
  }
}

/** Neon cyber-bug, drawn facing up. Red — it's a bug, after all. */
function BugSprite() {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 40 40"
      className="[filter:drop-shadow(0_0_4px_hsl(var(--bug)/0.8))]"
    >
      {/* legs (two alternating groups = scuttle) */}
      <g stroke="hsl(var(--bug))" strokeWidth="1.7" strokeLinecap="round">
        <g className="bug-legs bug-legs-a">
          <line x1="13" y1="15" x2="4" y2="10" />
          <line x1="27" y1="21" x2="36" y2="21" />
          <line x1="13" y1="27" x2="5" y2="33" />
        </g>
        <g className="bug-legs bug-legs-b">
          <line x1="27" y1="15" x2="36" y2="10" />
          <line x1="13" y1="21" x2="4" y2="21" />
          <line x1="27" y1="27" x2="35" y2="33" />
        </g>
      </g>
      {/* antennae */}
      <g stroke="hsl(var(--bug))" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M17 9 Q15 4 11 3" />
        <path d="M23 9 Q25 4 29 3" />
      </g>
      {/* head */}
      <ellipse cx="20" cy="13" rx="5.5" ry="4.5" fill="hsl(var(--card))" stroke="hsl(var(--bug))" strokeWidth="1.6" />
      {/* eyes */}
      <circle cx="18" cy="12" r="1.1" fill="hsl(var(--bug))" />
      <circle cx="22" cy="12" r="1.1" fill="hsl(var(--bug))" />
      {/* abdomen */}
      <ellipse cx="20" cy="25" rx="7.5" ry="9.5" fill="hsl(var(--card))" stroke="hsl(var(--bug))" strokeWidth="1.6" />
      {/* circuit traces */}
      <g stroke="hsl(var(--bug)/0.8)" strokeWidth="1.1" strokeLinecap="round">
        <line x1="20" y1="18" x2="20" y2="32" />
        <line x1="20" y1="22" x2="16" y2="24" />
        <line x1="20" y1="26" x2="24" y2="28" />
      </g>
      <circle cx="16" cy="24" r="1" fill="hsl(var(--bug)/0.9)" />
      <circle cx="24" cy="28" r="1" fill="hsl(var(--bug)/0.9)" />
    </svg>
  );
}

/** Hammer that replaces the cursor while hovering the bug. */
function HammerSprite({ swinging }: { swinging: boolean }) {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      className={swinging ? "hammer-swing" : "hammer-idle"}
      style={{ transformOrigin: "50% 88%" }}
    >
      {/* handle */}
      <rect x="16" y="11" width="4.5" height="22" rx="2" fill="hsl(215 15% 45%)" stroke="hsl(215 15% 30%)" strokeWidth="1" />
      {/* head */}
      <rect
        x="7"
        y="3"
        width="23"
        height="10"
        rx="2.5"
        fill="hsl(217 25% 30%)"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
        className="[filter:drop-shadow(0_0_3px_hsl(var(--bug)/0.7))]"
      />
    </svg>
  );
}

/** Splat corpse with X-eyes, droplets and one twitching leg. */
function SplatSprite() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="[filter:drop-shadow(0_0_5px_hsl(var(--bug)/0.7))]">
      <path
        d="M26 11 C32 9 38 13 37 19 C44 19 46 27 40 30 C44 35 38 42 32 39 C30 44 21 44 19 39 C12 42 6 35 11 29 C5 25 9 16 17 18 C16 12 21 9 26 11 Z"
        fill="hsl(var(--bug)/0.45)"
        stroke="hsl(var(--bug))"
        strokeWidth="1.5"
      />
      <ellipse cx="26" cy="26" rx="8" ry="7" fill="hsl(var(--bug)/0.55)" />
      {/* X eyes */}
      <g stroke="hsl(var(--background))" strokeWidth="1.8" strokeLinecap="round">
        <line x1="21" y1="23" x2="25" y2="27" />
        <line x1="25" y1="23" x2="21" y2="27" />
        <line x1="28" y1="23" x2="32" y2="27" />
        <line x1="32" y1="23" x2="28" y2="27" />
      </g>
      {/* droplets */}
      <circle cx="8" cy="18" r="1.6" fill="hsl(var(--bug)/0.7)" />
      <circle cx="45" cy="24" r="1.4" fill="hsl(var(--bug)/0.7)" />
      <circle cx="14" cy="43" r="1.7" fill="hsl(var(--bug)/0.7)" />
      <circle cx="40" cy="42" r="1.3" fill="hsl(var(--bug)/0.7)" />
      {/* twitching leg */}
      <line x1="37" y1="33" x2="46" y2="38" stroke="hsl(var(--bug))" strokeWidth="1.6" strokeLinecap="round" className="bug-leg-twitch" />
    </svg>
  );
}

type BugState = {
  id: number;
  x: number;
  y: number;
  angle: number;
  target: { x: number; y: number };
  speed: number;
  pauseUntil: number;
  fleeing: boolean;
  born: number;
};

export function BugGame() {
  const [bugIds, setBugIds] = useState<number[]>([]);
  const [corpses, setCorpses] = useState<{ id: number; x: number; y: number; label: string }[]>([]);
  const [hovered, setHovered] = useState(false);
  const [swing, setSwing] = useState(false);
  // Each bug can have its own speech bubble at once.
  const [bubbles, setBubbles] = useState<{ bugId: number; text: string }[]>([]);

  const bugsRef = useRef(new Map<number, BugState>());
  const elsRef = useRef(new Map<number, HTMLDivElement>());
  const hammerElRef = useRef<HTMLDivElement | null>(null);
  const bubbleEls = useRef(new Map<number, HTMLDivElement>());
  const bubblesRef = useRef<{ bugId: number; text: string }[]>([]);
  bubblesRef.current = bubbles;
  const bubbleTimers = useRef(new Map<number, number>());
  const cursor = useRef({ x: -9999, y: -9999 });
  const lastPanic = useRef(0);
  const lastBite = useRef(0);
  const nextId = useRef(1);
  const spawns = useRef(0);
  const timers = useRef<number[]>([]);

  const anyAlive = bugIds.length > 0;
  const pushTimer = (id: number) => timers.current.push(id);
  const syncIds = () => setBugIds(Array.from(bugsRef.current.keys()));

  /** Make one bug say something for a while (replaces its current line). */
  const say = useCallback((bugId: number, text: string, ms = 2600) => {
    setBubbles((prev) => [...prev.filter((b) => b.bugId !== bugId), { bugId, text }]);
    const existing = bubbleTimers.current.get(bugId);
    if (existing) clearTimeout(existing);
    const t = window.setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.bugId !== bugId));
      bubbleTimers.current.delete(bugId);
    }, ms);
    bubbleTimers.current.set(bugId, t);
    pushTimer(t);
  }, []);

  /** Drop a bug's bubble immediately (on death / flee). */
  const clearBubble = useCallback((bugId: number) => {
    const existing = bubbleTimers.current.get(bugId);
    if (existing) clearTimeout(existing);
    bubbleTimers.current.delete(bugId);
    setBubbles((prev) => prev.filter((b) => b.bugId !== bugId));
  }, []);

  /**
   * "Eat" whatever page text sits under the bug: briefly glitch/gnaw the
   * nearest content element (non-destructive — the class is removed after).
   */
  const biteAt = useCallback((x: number, y: number) => {
    const els = document.querySelectorAll<HTMLElement>(
      "main h1, main h2, main h3, main p, main li, main a, main span",
    );
    for (const el of els) {
      if (el.classList.contains("bug-chomp") || !el.textContent?.trim()) continue;
      const r = el.getBoundingClientRect();
      if (r.width < 24 || r.height < 8 || r.height > 120) continue;
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) {
        el.classList.add("bug-chomp");
        const t = window.setTimeout(() => el.classList.remove("bug-chomp"), 950);
        pushTimer(t);
        return true;
      }
    }
    return false;
  }, []);

  /** Add a bug — from a random screen edge, or at a position (a split). */
  const spawn = useCallback((at?: { x: number; y: number }) => {
    spawns.current += 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const s: BugState = {
      id: nextId.current++,
      x: 0,
      y: 0,
      angle: 0,
      target: { x: rand(w * 0.2, w * 0.8), y: rand(h * 0.25, h * 0.75) },
      speed: rand(50, 90),
      pauseUntil: 0,
      fleeing: false,
      born: performance.now(),
    };
    if (at) {
      s.x = at.x;
      s.y = at.y;
    } else {
      // crawl in from a random edge
      const edge = Math.floor(Math.random() * 4);
      if (edge === 0) [s.x, s.y] = [rand(0.1, 0.9) * w, -SIZE];
      else if (edge === 1) [s.x, s.y] = [w + SIZE, rand(0.1, 0.9) * h];
      else if (edge === 2) [s.x, s.y] = [rand(0.1, 0.9) * w, h + SIZE];
      else [s.x, s.y] = [-SIZE, rand(0.1, 0.9) * h];
    }
    s.angle = (Math.atan2(s.target.y - s.y, s.target.x - s.x) * 180) / Math.PI;
    bugsRef.current.set(s.id, s);
    syncIds();
    return s;
  }, []);

  const scheduleSpawn = useCallback(
    (range: [number, number]) => {
      if (spawns.current >= MAX_SPAWNS) return;
      pushTimer(window.setTimeout(spawn, rand(range[0], range[1])));
    },
    [spawn],
  );

  // Crawl loop — one RAF drives every bug; writes transforms directly
  // (no re-renders per frame).
  useEffect(() => {
    if (!anyAlive) return;
    let raf = 0;
    let last = performance.now();

    const remove = (id: number) => {
      bugsRef.current.delete(id);
      clearBubble(id);
      syncIds();
      if (bugsRef.current.size === 0) scheduleSpawn(RESPAWN_MS);
    };

    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;

      for (const s of Array.from(bugsRef.current.values())) {
        // old age → flee off the nearest edge
        if (!s.fleeing && now - s.born > LIFETIME_MS) {
          s.fleeing = true;
          s.speed = 210;
          s.pauseUntil = 0;
          const exits = [
            { x: s.x, y: -80 },
            { x: w + 80, y: s.y },
            { x: s.x, y: h + 80 },
            { x: -80, y: s.y },
          ];
          s.target = exits.reduce((a, b) =>
            Math.hypot(a.x - s.x, a.y - s.y) < Math.hypot(b.x - s.x, b.y - s.y) ? a : b,
          );
        }

        // evasive maneuvers — sprint away from a stalking cursor
        if (!s.fleeing) {
          const c = cursor.current;
          const d = Math.hypot(s.x - c.x, s.y - c.y);
          if (d < 95) {
            const away = Math.atan2(s.y - c.y, s.x - c.x) + rand(-0.5, 0.5);
            s.target = {
              x: clamp(s.x + Math.cos(away) * 170, 24, w - 24),
              y: clamp(s.y + Math.sin(away) * 170, 24, h - 24),
            };
            s.speed = 210;
            s.pauseUntil = 0;
            if (now - lastPanic.current > 3500) {
              lastPanic.current = now;
              say(s.id, pick(PANICS), 1600);
            }
          }
        }

        // mitosis — a settled, wandering bug occasionally splits in two
        if (
          !s.fleeing &&
          bugsRef.current.size < MAX_BUGS &&
          spawns.current < MAX_SPAWNS &&
          now - s.born > SPLIT_MIN_AGE_MS &&
          Math.random() < dt * SPLIT_CHANCE_PER_SEC
        ) {
          const child = spawn({ x: s.x + rand(-18, 18), y: s.y + rand(-18, 18) });
          child.angle = s.angle + rand(120, 240);
          say(s.id, pick(SPLIT_LINES), 2200);
        }

        // munch on nearby page content now and then
        if (!s.fleeing && now - lastBite.current > 2200 && Math.random() < dt * 0.5) {
          if (biteAt(s.x, s.y)) {
            lastBite.current = now;
            say(s.id, pick(EAT_LINES), 1600);
          }
        }

        const paused = now < s.pauseUntil && !s.fleeing;
        if (!paused) {
          const dx = s.target.x - s.x;
          const dy = s.target.y - s.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 14) {
            if (s.fleeing) {
              remove(s.id);
              continue;
            }
            if (Math.random() < 0.35) s.pauseUntil = now + rand(300, 1400);
            s.target = { x: rand(30, w - 30), y: rand(30, h - 30) };
            s.speed = rand(45, 110);
          } else {
            // turn smoothly toward the target, then advance along heading
            const ta = (Math.atan2(dy, dx) * 180) / Math.PI;
            const da = ((ta - s.angle + 540) % 360) - 180;
            s.angle += da * Math.min(1, dt * (s.fleeing ? 14 : 5));
            const rad = (s.angle * Math.PI) / 180;
            s.x += Math.cos(rad) * s.speed * dt;
            s.y += Math.sin(rad) * s.speed * dt;
          }
          if (s.fleeing && (s.x < -70 || s.x > w + 70 || s.y < -70 || s.y > h + 70)) {
            remove(s.id);
            continue;
          }
        }

        const el = elsRef.current.get(s.id);
        if (el) {
          el.style.transform = `translate3d(${s.x - SIZE / 2}px, ${s.y - SIZE / 2}px, 0) rotate(${s.angle + 90}deg)`;
          el.dataset.walking = paused ? "false" : "true";
        }
      }

      // keep every speech bubble pinned to its bug
      for (const b of bubblesRef.current) {
        const s = bugsRef.current.get(b.bugId);
        const bEl = bubbleEls.current.get(b.bugId);
        if (s && bEl) {
          bEl.style.transform = `translate3d(${s.x}px, ${Math.max(s.y - SIZE / 2 - 6, 34)}px, 0)`;
        }
      }

      if (bugsRef.current.size > 0) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [anyAlive, scheduleSpawn, spawn, say, clearBubble, biteAt]);

  // Track the cursor globally while bugs are alive (they dodge anything close).
  useEffect(() => {
    if (!anyAlive) return;
    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cursor.current = { x: -9999, y: -9999 };
    };
  }, [anyAlive]);

  // Cocky taunts while wandering — every alive bug chimes in, staggered.
  useEffect(() => {
    if (!anyAlive) {
      setBubbles([]);
      return;
    }
    let cancelled = false;
    let t = 0;
    const loop = (delay: number) => {
      t = window.setTimeout(() => {
        if (cancelled) return;
        const ids = Array.from(bugsRef.current.keys());
        ids.forEach((id, i) => {
          window.setTimeout(() => {
            if (!cancelled && bugsRef.current.has(id)) say(id, pick(TAUNTS), 2800);
          }, i * 550);
        });
        loop(rand(5500, 9000));
      }, delay);
    };
    loop(rand(1500, 3000));
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, [anyAlive, say]);

  // First spawn + dev hook. Auto-spawns respect prefers-reduced-motion.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) scheduleSpawn(FIRST_SPAWN_MS);
    (window as unknown as { __spawnBug?: () => void }).__spawnBug = () => {
      spawns.current = Math.min(spawns.current, MAX_SPAWNS - 1);
      void spawn();
    };
    const t = timers.current;
    return () => {
      t.forEach(clearTimeout);
      delete (window as unknown as { __spawnBug?: () => void }).__spawnBug;
    };
  }, [scheduleSpawn, spawn]);

  const mouse = useRef({ x: -100, y: -100 });
  const moveHammer = (x: number, y: number) => {
    mouse.current = { x, y };
    const el = hammerElRef.current;
    if (el) el.style.transform = `translate3d(${x - 10}px, ${y - 28}px, 0)`;
  };

  const kill = (id: number) => (e: React.MouseEvent) => {
    const s = bugsRef.current.get(id);
    if (e.button !== 0 || !s) return;
    e.preventDefault();
    playSquish();
    moveHammer(e.clientX || s.x, e.clientY || s.y);
    setSwing(true);
    const corpseId = id;
    setCorpses((prev) => [...prev, { id: corpseId, x: s.x, y: s.y, label: pick(LAST_WORDS) }]);
    bugsRef.current.delete(id);
    clearBubble(id);
    syncIds();
    setHovered(false);
    pushTimer(window.setTimeout(() => setSwing(false), 340));
    pushTimer(
      window.setTimeout(() => setCorpses((prev) => prev.filter((c) => c.id !== corpseId)), 4200),
    );
    if (bugsRef.current.size === 0) scheduleSpawn(RESPAWN_MS);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[49]" aria-hidden="true">
      {bugIds.map((id) => {
        const s = bugsRef.current.get(id);
        return (
          <div
            key={id}
            ref={(el) => {
              if (el) elsRef.current.set(id, el);
              else elsRef.current.delete(id);
            }}
            data-bug
            onMouseDown={kill(id)}
            onMouseEnter={(e) => {
              setHovered(true);
              moveHammer(e.clientX, e.clientY);
              say(id, pick(PANICS), 1500);
            }}
            onMouseMove={(e) => moveHammer(e.clientX, e.clientY)}
            onMouseLeave={() => setHovered(false)}
            className="pointer-events-auto absolute left-0 top-0 h-10 w-10 cursor-none select-none"
            style={
              s
                ? { transform: `translate3d(${s.x - SIZE / 2}px, ${s.y - SIZE / 2}px, 0) rotate(${s.angle + 90}deg)` }
                : undefined
            }
          >
            <BugSprite />
          </div>
        );
      })}

      {corpses.map((corpse) => (
        <div
          key={corpse.id}
          className="absolute left-0 top-0"
          style={{ transform: `translate3d(${corpse.x - 26}px, ${corpse.y - 26}px, 0)` }}
        >
          <div className="bug-splat relative">
            <span className="bug-impact absolute inset-1 rounded-full border-2 border-bug" />
            <SplatSprite />
            <p className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold text-bug">
              {corpse.label}
            </p>
          </div>
        </div>
      ))}

      {bubbles.map((b) => {
        const s = bugsRef.current.get(b.bugId);
        if (!s) return null;
        return (
          <div
            key={b.bugId}
            ref={(el) => {
              if (el) bubbleEls.current.set(b.bugId, el);
              else bubbleEls.current.delete(b.bugId);
            }}
            className="absolute left-0 top-0 will-change-transform"
            style={{
              transform: `translate3d(${s.x}px, ${Math.max(s.y - SIZE / 2 - 6, 34)}px, 0)`,
            }}
          >
            <span className="bug-bubble neon-glow-sm relative block -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-bug/60 bg-card/95 px-2.5 py-1 font-mono text-[11px] font-medium text-bug backdrop-blur after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-bug/60 after:content-['']">
              {b.text}
            </span>
          </div>
        );
      })}

      {(hovered || swing) && (
        <div
          ref={hammerElRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{ transform: `translate3d(${mouse.current.x - 10}px, ${mouse.current.y - 28}px, 0)` }}
        >
          <HammerSprite swinging={swing} />
        </div>
      )}
    </div>
  );
}
