import { useEffect, useRef } from "react";

/**
 * Background (ayushcmd.me-style): a delicate, slowly rotating dotted
 * Archimedean spiral with a soft glow at its core, over a calm field of
 * faintly twinkling stars. Theme-aware via a colour probe.
 */

const STAR_COUNT = 80;
const SPIRAL_DOTS = 300;
const SPIRAL_TURNS = 6;

type Star = { x: number; y: number; r: number; tw: number; base: number };

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const probe = probeRef.current;
    if (!canvas || !probe) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let stars: Star[] = [];
    let rgb = "34, 211, 238";
    let alphaMul = 1; // boosted in light mode so the spiral stays visible on paper

    // Eased cursor — ripples radiate from here and follow the mouse smoothly.
    // `active` is the target (1 near, 0 away); `aDisp` eases toward it so the
    // ripple fades in and out instead of popping.
    const cursor = { x: -9999, y: -9999, tx: -9999, ty: -9999, active: 0, aDisp: 0 };
    const RIPPLE_R = 190; // px reach of the ripple
    const RIPPLE_AMP = 4.5; // px max displacement

    const readColor = () => {
      const parsed = getComputedStyle(probe)
        .color.match(/\d+(\.\d+)?/g)
        ?.map(Number);
      if (parsed && parsed.length >= 3) rgb = `${parsed[0]}, ${parsed[1]}, ${parsed[2]}`;
      const isLight = document.documentElement.classList.contains("light");
      alphaMul = isLight ? 1.7 : 1;
    };

    const seed = () => {
      stars = Array.from({ length: STAR_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.5 + Math.random() * 1.2,
        tw: Math.random() * Math.PI * 2,
        base: 0.06 + Math.random() * 0.18,
      }));
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    // smooth ripple: returns [dx, dy, brightness] for a point given cursor state
    const ripple = (x: number, y: number, time: number): [number, number, number] => {
      if (cursor.aDisp <= 0.001) return [0, 0, 0];
      const dx = x - cursor.x;
      const dy = y - cursor.y;
      const d = Math.hypot(dx, dy);
      if (d > RIPPLE_R || d < 0.001) return [0, 0, 0];
      const falloff = 1 - d / RIPPLE_R; // 1 at cursor → 0 at rim
      const smooth = falloff * falloff * (3 - 2 * falloff); // smoothstep edge
      // gentle travelling wave outward from the cursor
      const wave = Math.sin(d * 0.04 - time * 0.005);
      const push = wave * smooth * RIPPLE_AMP * cursor.aDisp;
      return [(dx / d) * push, (dy / d) * push, smooth * cursor.aDisp];
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // ease cursor position AND presence for buttery-smooth ripples
      cursor.x += (cursor.tx - cursor.x) * 0.1;
      cursor.y += (cursor.ty - cursor.y) * 0.1;
      cursor.aDisp += (cursor.active - cursor.aDisp) * 0.06;

      const cx = width * 0.5;
      const cy = height * 0.5;
      // reach the farthest corner so the spiral fills the whole screen
      const maxR = Math.hypot(width, height) * 0.55;

      // soft layered glow core (subtle centre light)
      const glowR = Math.min(width, height) * 0.5;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR);
      glow.addColorStop(0, `rgba(${rgb}, ${0.09 * alphaMul})`);
      glow.addColorStop(0.35, `rgba(${rgb}, ${0.035 * alphaMul})`);
      glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, glowR, 0, Math.PI * 2);
      ctx.fill();

      // faint twinkling stars — ride the ripple wave near the cursor
      for (const s of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.0015 + s.tw);
        const [dx, dy, b] = ripple(s.x, s.y, time);
        ctx.beginPath();
        ctx.arc(s.x + dx, s.y + dy, s.r + b * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${(s.base * twinkle + b * 0.3) * alphaMul})`;
        ctx.fill();
      }

      // two intertwined dotted Archimedean spiral arms, slowly rotating —
      // sizes taper and brightness fades outward for an elegant galaxy feel.
      const rotation = time * 0.00004;
      for (let arm = 0; arm < 2; arm++) {
        const armPhase = arm * Math.PI; // second arm is opposite
        for (let i = 1; i < SPIRAL_DOTS; i++) {
          const p = i / SPIRAL_DOTS;
          const theta = p * SPIRAL_TURNS * Math.PI * 2 + rotation + armPhase;
          const radius = Math.pow(p, 0.82) * maxR; // ease outward = more spread near rim
          const x = cx + Math.cos(theta) * radius;
          const y = cy + Math.sin(theta) * radius;
          const size = 1.5 - p * 0.9; // bigger near the core, small at the rim
          const alpha = (0.36 - p * 0.24) * (0.75 + 0.25 * Math.sin(time * 0.0012 + i * 0.6));
          const [dx, dy, b] = ripple(x, y, time);
          ctx.beginPath();
          ctx.arc(x + dx, y + dy, Math.max(0.5, size) + b * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb}, ${(Math.max(0, alpha) + b * 0.3) * alphaMul})`;
          ctx.fill();
        }
      }
    };

    let raf = 0;
    const step = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      if (cursor.tx < -9000) { cursor.x = e.clientX; cursor.y = e.clientY; }
      cursor.tx = e.clientX;
      cursor.ty = e.clientY;
      cursor.active = 1;
    };
    const onLeave = () => {
      cursor.active = 0;
    };

    readColor();
    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    const themeObserver = new MutationObserver(() => {
      readColor();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Colour probe: canvas reads its computed colour to stay theme-aware */}
      <div ref={probeRef} className="hidden text-primary" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
