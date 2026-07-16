import { useEffect, useRef } from "react";

/**
 * Calm 3D wave-floor background: a perspective plane of smooth signal lines
 * rolling gently along the bottom of the viewport — like quiet waveforms on
 * an oscilloscope. One coherent object, lots of empty space, nothing to
 * chase with your eyes. The camera leans a touch with the pointer and the
 * floor breathes with scroll, keeping it connected to the page's 3D space.
 *
 * Theme-aware: neon cyan→green lines in dark mode, faint indigo ink contour
 * lines on paper in light mode.
 */

const ROWS = 12; // depth rows of the floor
const Z_NEAR = 1;
const Z_FAR = 5.5;
const X_STEP = 26; // px between curve samples

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

      const t = time * 0.00028; // slow, tidal pace
      // horizon sits low so the floor never crowds the content
      const horizon = height * 0.62 + smooth.y * 14 - (smooth.scroll * 0.03) % 40;
      const floorDepth = height - horizon;

      for (let r = 0; r < ROWS; r++) {
        const z = lerp(Z_NEAR, Z_FAR, r / (ROWS - 1));
        const near = 1 - (r / (ROWS - 1)); // 1 = nearest row
        const rowY = horizon + floorDepth / z; // perspective spacing
        const amp = lerp(4, 16, near); // near rows swell more
        const [cr, cg, cb] = colorAt(near);
        const alpha = (isLight ? 0.05 : 0.06) + near * (isLight ? 0.07 : 0.11);

        ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.lineWidth = 0.8 + near * 0.9;
        ctx.beginPath();
        for (let x = -X_STEP; x <= width + X_STEP; x += X_STEP) {
          // two gentle sine components, phase-shifted per depth row
          const wx = (x + smooth.x * 30 * near) * 0.006;
          const y =
            rowY -
            amp * Math.sin(wx + t * 1.4 + z * 1.7) -
            amp * 0.45 * Math.sin(wx * 2.3 - t * 0.9 + z * 0.8);
          if (x === -X_STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // a single hairline horizon glow-line anchors the plane
      const [hr, hg, hb] = colorAt(0.15);
      ctx.strokeStyle = `rgba(${hr},${hg},${hb},${isLight ? 0.1 : 0.16})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();
    };

    let raf = 0;
    const step = (time: number) => {
      smooth.x += (pointer.x - smooth.x) * 0.04;
      smooth.y += (pointer.y - smooth.y) * 0.04;
      smooth.scroll += (window.scrollY - smooth.scroll) * 0.06;
      draw(time);
      raf = requestAnimationFrame(step);
    };

    const onPointer = (e: MouseEvent) => {
      pointer.x = (e.clientX / width) * 2 - 1;
      pointer.y = (e.clientY / height) * 2 - 1;
    };

    readTheme();
    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("mousemove", onPointer);
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
