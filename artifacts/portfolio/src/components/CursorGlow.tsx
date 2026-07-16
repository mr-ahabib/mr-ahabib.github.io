import { useEffect, useRef } from "react";

/**
 * Cursor companion (ayushcmd.me-style): a crisp ring that chases the
 * pointer closely and a soft blurred glow that drifts behind it. Both are
 * pure transforms driven by one rAF loop — the native cursor stays visible.
 * Skipped entirely on touch devices and under prefers-reduced-motion.
 */
export function CursorGlow() {
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const glow = glowRef.current;
    if (!ring || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const target = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const glowPos = { x: -100, y: -100 };
    let raf = 0;

    const step = () => {
      // the ring chases fast, the glow lags — the gap is the whole effect
      ringPos.x += (target.x - ringPos.x) * 0.22;
      ringPos.y += (target.y - ringPos.y) * 0.22;
      glowPos.x += (target.x - glowPos.x) * 0.08;
      glowPos.y += (target.y - glowPos.y) * 0.08;
      ring.style.transform = `translate3d(${ringPos.x - 20}px, ${ringPos.y - 20}px, 0)`;
      glow.style.transform = `translate3d(${glowPos.x - 50}px, ${glowPos.y - 50}px, 0)`;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      ring.style.opacity = "1";
      glow.style.opacity = "1";
    };
    const onLeave = () => {
      ring.style.opacity = "0";
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* soft trailing halo */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 100,
          height: 100,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s ease",
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.09) 0%, transparent 65%)",
          filter: "blur(4px)",
        }}
      />
      {/* crisp chasing ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s ease",
          border: "1px solid hsl(var(--primary) / 0.45)",
        }}
      />
    </>
  );
}
