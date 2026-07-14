import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Easter-egg mini game: a neon cyber-bug occasionally crawls across the
 * screen. Hovering it turns the cursor into a hammer; left-clicking squashes
 * it with a synthesized crunch and an animated splat corpse.
 *
 * Rare by design — tune the knobs below. Dev/demo hook: run
 * `window.__spawnBug()` in the console to force a bug to appear.
 */
const FIRST_SPAWN_MS: [number, number] = [25_000, 50_000];
const RESPAWN_MS: [number, number] = [20_000, 30_000];
const MAX_SPAWNS = 10; // per page load
const LIFETIME_MS = 70_000; // after this the bug scurries off-screen
const SIZE = 30; // sprite box in px

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

/** Cocky lines the bug drops while wandering. */
const TAUNTS = [
  "follow me if you dare 🐛",
  "hire him — or I multiply",
  "I will vanish you 😈",
  "you can't debug me",
  "I live in production",
  "catch me, mortal",
  "I deleted a semicolon once",
  "your firewall can't stop me",
];
/** Yelled while running from the cursor. */
const PANICS = [
  "too slow, human!",
  "nope nope nope 🏃",
  "can't touch this",
  "MOVE MOVE MOVE",
  "nice try 😏",
];
/** Random last words on the corpse. */
const LAST_WORDS = [
  "bug_fixed ✓",
  "segfault (core dumped)",
  "exit code 137",
  "tell my larvae…",
  "rm -rf /bug ✓",
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

/** Neon cyber-bug, drawn facing up. */
function BugSprite() {
  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox="0 0 40 40"
      className="[filter:drop-shadow(0_0_4px_hsl(var(--primary)/0.8))]"
    >
      {/* legs (two alternating groups = scuttle) */}
      <g stroke="hsl(var(--primary))" strokeWidth="1.7" strokeLinecap="round">
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
      <g stroke="hsl(var(--primary))" strokeWidth="1.4" strokeLinecap="round" fill="none">
        <path d="M17 9 Q15 4 11 3" />
        <path d="M23 9 Q25 4 29 3" />
      </g>
      {/* head */}
      <ellipse cx="20" cy="13" rx="5.5" ry="4.5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.6" />
      {/* eyes */}
      <circle cx="18" cy="12" r="1.1" fill="hsl(var(--primary))" />
      <circle cx="22" cy="12" r="1.1" fill="hsl(var(--primary))" />
      {/* abdomen */}
      <ellipse cx="20" cy="25" rx="7.5" ry="9.5" fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="1.6" />
      {/* circuit traces */}
      <g stroke="hsl(var(--primary)/0.8)" strokeWidth="1.1" strokeLinecap="round">
        <line x1="20" y1="18" x2="20" y2="32" />
        <line x1="20" y1="22" x2="16" y2="24" />
        <line x1="20" y1="26" x2="24" y2="28" />
      </g>
      <circle cx="16" cy="24" r="1" fill="hsl(var(--accent))" />
      <circle cx="24" cy="28" r="1" fill="hsl(var(--accent))" />
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
        className="[filter:drop-shadow(0_0_3px_hsl(var(--primary)/0.7))]"
      />
    </svg>
  );
}

/** Splat corpse with X-eyes, droplets and one twitching leg. */
function SplatSprite() {
  return (
    <svg width="52" height="52" viewBox="0 0 52 52" className="[filter:drop-shadow(0_0_5px_hsl(var(--primary)/0.7))]">
      <path
        d="M26 11 C32 9 38 13 37 19 C44 19 46 27 40 30 C44 35 38 42 32 39 C30 44 21 44 19 39 C12 42 6 35 11 29 C5 25 9 16 17 18 C16 12 21 9 26 11 Z"
        fill="hsl(var(--primary)/0.45)"
        stroke="hsl(var(--primary))"
        strokeWidth="1.5"
      />
      <ellipse cx="26" cy="26" rx="8" ry="7" fill="hsl(var(--primary)/0.55)" />
      {/* X eyes */}
      <g stroke="hsl(var(--background))" strokeWidth="1.8" strokeLinecap="round">
        <line x1="21" y1="23" x2="25" y2="27" />
        <line x1="25" y1="23" x2="21" y2="27" />
        <line x1="28" y1="23" x2="32" y2="27" />
        <line x1="32" y1="23" x2="28" y2="27" />
      </g>
      {/* droplets */}
      <circle cx="8" cy="18" r="1.6" fill="hsl(var(--primary)/0.7)" />
      <circle cx="45" cy="24" r="1.4" fill="hsl(var(--primary)/0.7)" />
      <circle cx="14" cy="43" r="1.7" fill="hsl(var(--primary)/0.7)" />
      <circle cx="40" cy="42" r="1.3" fill="hsl(var(--primary)/0.7)" />
      {/* twitching leg */}
      <line x1="37" y1="33" x2="46" y2="38" stroke="hsl(var(--primary))" strokeWidth="1.6" strokeLinecap="round" className="bug-leg-twitch" />
    </svg>
  );
}

export function BugGame() {
  const [alive, setAlive] = useState(false);
  const [corpse, setCorpse] = useState<{ x: number; y: number; label: string } | null>(null);
  const [hovered, setHovered] = useState(false);
  const [swing, setSwing] = useState(false);
  const [bubble, setBubble] = useState<string | null>(null);

  const bugElRef = useRef<HTMLDivElement | null>(null);
  const hammerElRef = useRef<HTMLDivElement | null>(null);
  const bubbleElRef = useRef<HTMLDivElement | null>(null);
  const cursor = useRef({ x: -9999, y: -9999 });
  const lastPanic = useRef(0);
  const state = useRef({
    x: 0,
    y: 0,
    angle: 0,
    target: { x: 0, y: 0 },
    speed: 60,
    pauseUntil: 0,
    fleeing: false,
    born: 0,
  });
  const spawns = useRef(0);
  const timers = useRef<number[]>([]);

  const pushTimer = (id: number) => timers.current.push(id);

  const spawn = useCallback(() => {
    spawns.current += 1;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const s = state.current;
    // crawl in from a random edge
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0) [s.x, s.y] = [rand(0.1, 0.9) * w, -SIZE];
    else if (edge === 1) [s.x, s.y] = [w + SIZE, rand(0.1, 0.9) * h];
    else if (edge === 2) [s.x, s.y] = [rand(0.1, 0.9) * w, h + SIZE];
    else [s.x, s.y] = [-SIZE, rand(0.1, 0.9) * h];
    s.target = { x: rand(w * 0.2, w * 0.8), y: rand(h * 0.25, h * 0.75) };
    s.angle = (Math.atan2(s.target.y - s.y, s.target.x - s.x) * 180) / Math.PI;
    s.speed = rand(50, 90);
    s.pauseUntil = 0;
    s.fleeing = false;
    s.born = performance.now();
    setAlive(true);
  }, []);

  const scheduleSpawn = useCallback(
    (range: [number, number]) => {
      if (spawns.current >= MAX_SPAWNS) return;
      pushTimer(window.setTimeout(spawn, rand(range[0], range[1])));
    },
    [spawn],
  );

  // Crawl loop — writes transforms directly (no re-renders per frame).
  useEffect(() => {
    if (!alive) return;
    let raf = 0;
    let last = performance.now();

    const step = (now: number) => {
      const s = state.current;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;

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
          if (now - lastPanic.current > 4500) {
            lastPanic.current = now;
            setBubble(pick(PANICS));
            pushTimer(window.setTimeout(() => setBubble(null), 1600));
          }
        }
      }

      const paused = now < s.pauseUntil && !s.fleeing;
      if (!paused) {
        const dx = s.target.x - s.x;
        const dy = s.target.y - s.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 14) {
          if (s.fleeing) {
            setAlive(false);
            scheduleSpawn(RESPAWN_MS);
            return;
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
          setAlive(false);
          scheduleSpawn(RESPAWN_MS);
          return;
        }
      }

      const el = bugElRef.current;
      if (el) {
        el.style.transform = `translate3d(${s.x - SIZE / 2}px, ${s.y - SIZE / 2}px, 0) rotate(${s.angle + 90}deg)`;
        el.dataset.walking = paused ? "false" : "true";
      }
      const bEl = bubbleElRef.current;
      if (bEl) {
        bEl.style.transform = `translate3d(${s.x}px, ${Math.max(s.y - SIZE / 2 - 6, 34)}px, 0)`;
      }
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [alive, scheduleSpawn]);

  // Track the cursor globally while a bug is alive (it dodges anything close).
  useEffect(() => {
    if (!alive) return;
    const onMove = (e: MouseEvent) => {
      cursor.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cursor.current = { x: -9999, y: -9999 };
    };
  }, [alive]);

  // Random cocky taunts while wandering.
  useEffect(() => {
    if (!alive) {
      setBubble(null);
      return;
    }
    let cancelled = false;
    let t = 0;
    const loop = (delay: number) => {
      t = window.setTimeout(() => {
        if (cancelled) return;
        setBubble(pick(TAUNTS));
        window.setTimeout(() => {
          if (!cancelled) setBubble(null);
        }, 2800);
        loop(rand(5000, 9000));
      }, delay);
    };
    loop(rand(1500, 3000));
    return () => {
      cancelled = true;
      clearTimeout(t);
      setBubble(null);
    };
  }, [alive]);

  // First spawn + dev hook. Auto-spawns respect prefers-reduced-motion.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) scheduleSpawn(FIRST_SPAWN_MS);
    (window as unknown as { __spawnBug?: () => void }).__spawnBug = () => {
      spawns.current = Math.min(spawns.current, MAX_SPAWNS - 1);
      spawn();
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

  const kill = (e: React.MouseEvent) => {
    if (e.button !== 0 || !alive) return;
    e.preventDefault();
    const s = state.current;
    playSquish();
    moveHammer(e.clientX || s.x, e.clientY || s.y);
    setSwing(true);
    setCorpse({ x: s.x, y: s.y, label: pick(LAST_WORDS) });
    setAlive(false);
    setHovered(false);
    setBubble(null);
    pushTimer(window.setTimeout(() => setSwing(false), 340));
    pushTimer(window.setTimeout(() => setCorpse(null), 4200));
    scheduleSpawn(RESPAWN_MS);
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-[49]" aria-hidden="true">
      {alive && (
        <div
          ref={bugElRef}
          data-bug
          onMouseDown={kill}
          onMouseEnter={(e) => {
            setHovered(true);
            moveHammer(e.clientX, e.clientY);
          }}
          onMouseMove={(e) => moveHammer(e.clientX, e.clientY)}
          onMouseLeave={() => setHovered(false)}
          className="pointer-events-auto absolute left-0 top-0 h-10 w-10 cursor-none select-none"
        >
          <BugSprite />
        </div>
      )}

      {corpse && (
        <div
          className="absolute left-0 top-0"
          style={{ transform: `translate3d(${corpse.x - 26}px, ${corpse.y - 26}px, 0)` }}
        >
          <div className="bug-splat relative">
            <span className="bug-impact absolute inset-1 rounded-full border-2 border-primary" />
            <SplatSprite />
            <p className="absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] font-semibold text-primary">
              {corpse.label}
            </p>
          </div>
        </div>
      )}

      {alive && bubble && (
        <div
          ref={bubbleElRef}
          className="absolute left-0 top-0 will-change-transform"
          style={{
            transform: `translate3d(${state.current.x}px, ${Math.max(state.current.y - SIZE / 2 - 6, 34)}px, 0)`,
          }}
        >
          <span className="bug-bubble neon-glow-sm relative block -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-primary/60 bg-card/95 px-2.5 py-1 font-mono text-[11px] font-medium text-primary backdrop-blur after:absolute after:left-1/2 after:top-full after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-primary/60 after:content-['']">
            {bubble}
          </span>
        </div>
      )}

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
