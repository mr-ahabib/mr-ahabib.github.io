import { useEffect, useRef } from "react";

/**
 * 3D data-field background: points scattered through real z-depth, projected
 * with perspective, drifting slowly toward the viewer. Nearby points link up
 * into faint constellations. The camera leans with the pointer and glides
 * with page scroll, so the field and the page read as one connected space.
 *
 * Theme-split rendering: dark mode draws glowing neon motes (cyan→green by
 * depth); light mode draws crisp ink points on paper — plotted data, not neon.
 */

type P = {
  x: number; // view-space [-1, 1]
  y: number;
  z: number; // depth [Z_NEAR, Z_FAR]
  drift: number; // per-particle z speed factor
};

const Z_NEAR = 0.4;
const Z_FAR = 2.1;
const AREA_PER_POINT = 16000; // px² of screen per particle (capped)
const MAX_POINTS = 120;
const LINK_PX = 105; // screen-space link distance
const LINK_DZ = 0.45; // only link points at similar depth

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const probesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const probes = probesRef.current;
    if (!canvas || !probes) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let points: P[] = [];
    let isLight = document.documentElement.classList.contains("light");
    // gradient stops: [primary, accent, accent-2], re-read on theme change
    let stops: [number, number, number][] = [
      [34, 211, 238],
      [45, 212, 191],
      [74, 222, 128],
    ];
    const pointer = { x: 0, y: 0 };
    const smooth = { x: 0, y: 0, scroll: 0 };

    const readTheme = () => {
      isLight = document.documentElement.classList.contains("light");
      const parsed = Array.from(probes.children).map((el) =>
        getComputedStyle(el as HTMLElement)
          .color.match(/\d+(\.\d+)?/g)
          ?.map(Number),
      );
      stops = parsed.map((p, i) =>
        p && p.length >= 3 ? ([p[0], p[1], p[2]] as [number, number, number]) : stops[i],
      ) as typeof stops;
    };

    /** Colour by nearness t ∈ [0,1] (0 = far, 1 = near): accent-2 → accent → primary. */
    const colorAt = (t: number): [number, number, number] => {
      const seg = t < 0.5 ? 0 : 1;
      const local = (t - seg * 0.5) * 2;
      const [c1, c2] = seg === 0 ? [stops[2], stops[1]] : [stops[1], stops[0]];
      return [lerp(c1[0], c2[0], local), lerp(c1[1], c2[1], local), lerp(c1[2], c2[2], local)];
    };

    const spawnPoint = (atFar: boolean): P => ({
      x: (Math.random() * 2 - 1) * 1.3,
      y: (Math.random() * 2 - 1) * 1.3,
      z: atFar ? Z_FAR : Z_NEAR + Math.random() * (Z_FAR - Z_NEAR),
      drift: 0.6 + Math.random() * 0.8,
    });

    const seed = () => {
      const count = Math.min(MAX_POINTS, Math.floor((width * height) / AREA_PER_POINT));
      points = Array.from({ length: count }, () => spawnPoint(false));
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

    /** Perspective-project a point to screen space with the current camera. */
    const project = (p: P) => {
      const camX = smooth.x * 0.14;
      const camY = smooth.y * 0.09 - smooth.scroll * 0.00012;
      const cx = width / 2;
      const cy = height / 2;
      return {
        sx: cx + ((p.x - camX) * cx) / p.z,
        sy: cy + ((p.y - camY) * cy) / p.z,
        near: 1 - (p.z - Z_NEAR) / (Z_FAR - Z_NEAR), // 0 far → 1 near
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const proj = points.map(project);

      // constellation links between nearby points at similar depth
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          if (Math.abs(points[i].z - points[j].z) > LINK_DZ) continue;
          const dx = proj[i].sx - proj[j].sx;
          const dy = proj[i].sy - proj[j].sy;
          const d = Math.hypot(dx, dy);
          if (d < LINK_PX) {
            const near = (proj[i].near + proj[j].near) / 2;
            const [r, g, b] = colorAt(near);
            const alpha = (1 - d / LINK_PX) * (isLight ? 0.1 : 0.14) * (0.4 + 0.6 * near);
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = isLight ? 0.7 : 0.9;
            ctx.beginPath();
            ctx.moveTo(proj[i].sx, proj[i].sy);
            ctx.lineTo(proj[j].sx, proj[j].sy);
            ctx.stroke();
          }
        }
      }

      // points — glowing motes in dark, crisp plotted ink in light
      for (let i = 0; i < points.length; i++) {
        const { sx, sy, near } = proj[i];
        if (sx < -40 || sx > width + 40 || sy < -40 || sy > height + 40) continue;
        const [r, g, b] = colorAt(near);
        const radius = (isLight ? 1.1 : 1.3) + near * (isLight ? 1.6 : 2.4);

        if (!isLight) {
          // soft halo hugging the mote (tight, not a bloom)
          ctx.fillStyle = `rgba(${r},${g},${b},${0.1 + 0.1 * near})`;
          ctx.beginPath();
          ctx.arc(sx, sy, radius * 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(${r},${g},${b},${isLight ? 0.28 + 0.34 * near : 0.45 + 0.5 * near})`;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    let raf = 0;
    let last = performance.now();
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      smooth.x += (pointer.x - smooth.x) * 0.05;
      smooth.y += (pointer.y - smooth.y) * 0.05;
      smooth.scroll += (window.scrollY - smooth.scroll) * 0.08;

      // fly slowly toward the viewer; recycle to the far plane
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.z -= dt * 0.055 * p.drift;
        if (p.z < Z_NEAR) points[i] = spawnPoint(true);
      }

      draw();
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: MouseEvent) => {
      pointer.x = (e.clientX / width) * 2 - 1;
      pointer.y = (e.clientY / height) * 2 - 1;
    };

    readTheme();
    resize();

    if (reduceMotion) {
      draw();
    } else {
      window.addEventListener("mousemove", onPointer);
      raf = requestAnimationFrame(step);
    }

    window.addEventListener("resize", resize);
    const themeObserver = new MutationObserver(() => {
      readTheme();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onPointer);
      themeObserver.disconnect();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Colour probes: canvas reads their computed colours to stay theme-aware */}
      <div ref={probesRef} className="hidden">
        <span className="text-primary" />
        <span className="text-accent" />
        <span className="text-accent-2" />
      </div>

      {/* Light mode only: faint wide drafting grid — clean paper, not busy */}
      <div
        aria-hidden="true"
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--primary) / 0.05) 1px, transparent 1px)," +
            "linear-gradient(90deg, hsl(var(--primary) / 0.05) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
