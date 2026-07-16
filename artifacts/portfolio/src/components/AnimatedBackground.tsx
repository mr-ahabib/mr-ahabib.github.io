import { useEffect, useRef } from "react";

/**
 * Aesthetic dot-matrix background: a fine grid of near-invisible dots that
 * wake up in a soft pool of light around the cursor — the modern developer-
 * site look. Nothing moves on its own except a barely-there breathing, so
 * the page stays calm; the interactivity is the aesthetic.
 *
 * Theme-aware: cool cyan dots in dark mode, indigo ink dots on paper in
 * light mode. Colour is sampled from probe elements on theme flips.
 */

const SPACING = 30; // px between dots
const RADIUS = 230; // spotlight radius around the cursor

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
    let isLight = document.documentElement.classList.contains("light");
    let rgb: [number, number, number] = [34, 211, 238];
    // cursor position (offscreen until first move) + smoothed follower
    const pointer = { x: -9999, y: -9999 };
    const smooth = { x: -9999, y: -9999, scroll: 0 };

    const readTheme = () => {
      isLight = document.documentElement.classList.contains("light");
      const parsed = getComputedStyle(probe)
        .color.match(/\d+(\.\d+)?/g)
        ?.map(Number);
      if (parsed && parsed.length >= 3) rgb = [parsed[0], parsed[1], parsed[2]];
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
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = rgb;
      const base = isLight ? 0.1 : 0.13; // resting dot opacity
      const boost = isLight ? 0.4 : 0.5; // extra opacity inside the spotlight
      const t = time * 0.0004;
      // the grid drifts a hair with scroll so it feels attached to the page
      const offY = (smooth.scroll * 0.12) % SPACING;

      for (let y = -SPACING; y <= height + SPACING; y += SPACING) {
        for (let x = 0; x <= width; x += SPACING) {
          const dy = y - offY;
          const dist = Math.hypot(x - smooth.x, dy - smooth.y);
          const glow = Math.exp(-((dist / RADIUS) ** 2)); // soft falloff
          // barely-there breathing across the field
          const breathe = 0.5 + 0.5 * Math.sin(t + x * 0.01 + dy * 0.013);
          const alpha = base * (0.7 + 0.3 * breathe) + boost * glow;
          const size = 1 + glow * 1.4;

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, dy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    let raf = 0;
    const step = (time: number) => {
      // ease the spotlight toward the cursor — the lag is what feels soft
      if (smooth.x < -5000 && pointer.x > -5000) {
        smooth.x = pointer.x;
        smooth.y = pointer.y;
      }
      smooth.x += (pointer.x - smooth.x) * 0.09;
      smooth.y += (pointer.y - smooth.y) * 0.09;
      smooth.scroll += (window.scrollY - smooth.scroll) * 0.08;
      draw(time);
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    readTheme();
    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("mousemove", onPointer);
      document.documentElement.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointer);
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
