import { useEffect, useRef } from "react";

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
};

// Distance under which two nodes get connected by a line.
const LINK_DIST = 140;
// Roughly one node per this many square pixels (capped below).
const AREA_PER_NODE = 26000;
const MAX_NODES = 70;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const probe = colorRef.current;
    if (!canvas || !probe) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let nodes: Node[] = [];
    // [r,g,b] of the accent colour, re-read when the theme changes.
    let rgb: [number, number, number] = [34, 211, 238];

    const readColor = () => {
      const parsed = getComputedStyle(probe)
        .color.match(/\d+(\.\d+)?/g)
        ?.map(Number);
      if (parsed && parsed.length >= 3) {
        rgb = [parsed[0], parsed[1], parsed[2]];
      }
    };

    const seedNodes = () => {
      const count = Math.min(
        MAX_NODES,
        Math.floor((width * height) / AREA_PER_NODE),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 1,
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
      seedNodes();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const [r, g, b] = rgb;

      // Links first so nodes sit on top.
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const c = nodes[j];
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.16;
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    let raf = 0;
    readColor();
    resize();

    if (reduceMotion) {
      draw();
    } else {
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    // Re-read the accent colour whenever the theme class flips.
    const themeObserver = new MutationObserver(readColor);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Ambient radial glows anchored to corners, tinted with the accent */}
      <div
        className="absolute -top-1/4 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[55vh] w-[55vh] translate-x-1/4 translate-y-1/4 rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent) / 0.16) 0%, transparent 70%)",
        }}
      />
      {/* Colour probe: canvas reads its computed colour to stay theme-aware */}
      <div ref={colorRef} className="hidden text-primary" />
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
