import { useEffect, useRef } from "react";

/**
 * Constellation background (ayushcmd.me-style): scattered star-points that
 * twinkle gently, brighten with a tight glow when the cursor comes near,
 * and link up with hairline lines to close neighbours. The points don't
 * travel anywhere — all the life comes from the twinkle and the cursor —
 * so the field stays calm.
 *
 * Theme-aware: reads the primary colour from a probe element, so it's
 * electric cyan on black in dark mode and indigo ink on paper in light.
 */

const AREA_PER_POINT = 26000; // px² of screen per star (capped below)
const MAX_POINTS = 90;
const LINK_DIST = 140; // px — draw a line when two stars are this close
const NEAR_DIST = 220; // px — cursor proximity radius

type Star = { x: number; y: number; tw: number };

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
    const cursor = { x: -9999, y: -9999 };

    const readColor = () => {
      const parsed = getComputedStyle(probe)
        .color.match(/\d+(\.\d+)?/g)
        ?.map(Number);
      if (parsed && parsed.length >= 3) rgb = `${parsed[0]}, ${parsed[1]}, ${parsed[2]}`;
    };

    const seed = () => {
      const count = Math.min(MAX_POINTS, Math.floor((width * height) / AREA_PER_POINT));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        tw: Math.random() * Math.PI * 2,
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

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      // stars — twinkle at rest, flare with a tight glow near the cursor
      for (const s of stars) {
        const t = Math.max(0, 1 - Math.hypot(s.x - cursor.x, s.y - cursor.y) / NEAR_DIST);
        const twinkle = 0.5 + 0.5 * Math.sin(time * 0.002 + s.tw);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1 + 1.8 * t, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${0.25 * twinkle + 0.7 * t})`;
        if (t > 0.1) {
          ctx.shadowBlur = 8 * t;
          ctx.shadowColor = `rgba(${rgb}, 0.9)`;
        } else {
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      // constellation lines between close neighbours
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DIST) continue;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${rgb}, ${(1 - d / LINK_DIST) * 0.18})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    };

    let raf = 0;
    const step = (time: number) => {
      draw(time);
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      cursor.x = e.clientX;
      cursor.y = e.clientY;
    };
    const onLeave = () => {
      cursor.x = -9999;
      cursor.y = -9999;
    };

    readColor();
    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave);
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
      window.removeEventListener("mouseleave", onLeave);
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
