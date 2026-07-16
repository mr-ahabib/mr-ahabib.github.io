import { useEffect, useRef } from "react";

/**
 * Custom pointer (ayushcmd.me-style): the native cursor is hidden and
 * replaced by a frosted glass lens — a 40px bubble that blurs whatever
 * passes beneath it, with a tiny specular highlight so it reads as glass —
 * chased by a 100px soft primary-tinted halo that lags further behind.
 *
 * Only active for fine pointers without reduced-motion; the `custom-cursor`
 * class on <html> is what actually hides the native cursor, so touch
 * devices and reduced-motion users keep theirs untouched.
 */
export function CursorGlow() {
  const lensRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lens = lensRef.current;
    const glow = glowRef.current;
    if (!lens || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const target = { x: -100, y: -100 };
    const lensPos = { x: -100, y: -100 };
    const glowPos = { x: -100, y: -100 };
    let raf = 0;

    const step = () => {
      // the lens chases fast, the halo lags — the gap is the whole effect
      lensPos.x += (target.x - lensPos.x) * 0.22;
      lensPos.y += (target.y - lensPos.y) * 0.22;
      glowPos.x += (target.x - glowPos.x) * 0.08;
      glowPos.y += (target.y - glowPos.y) * 0.08;
      lens.style.transform = `translate3d(${lensPos.x - 20}px, ${lensPos.y - 20}px, 0)`;
      glow.style.transform = `translate3d(${glowPos.x - 50}px, ${glowPos.y - 50}px, 0)`;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      lens.style.opacity = "1";
      glow.style.opacity = "1";
    };
    const onLeave = () => {
      lens.style.opacity = "0";
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(step);

    return () => {
      document.documentElement.classList.remove("custom-cursor");
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
          zIndex: 99997,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s ease",
          background: "radial-gradient(circle, hsl(var(--primary) / 0.07) 0%, transparent 65%)",
          filter: "blur(4px)",
        }}
      />
      {/* frosted glass lens — blurs what's underneath, like a droplet */}
      <div
        ref={lensRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s ease",
          backdropFilter: "blur(4px) saturate(150%)",
          WebkitBackdropFilter: "blur(4px) saturate(150%)",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 12px hsl(var(--primary) / 0.06)",
        }}
      >
        {/* specular highlight — the little gleam that sells the glass */}
        <div
          style={{
            position: "absolute",
            top: 7,
            left: 9,
            width: 10,
            height: 3,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.40)",
            filter: "blur(1.5px)",
            transform: "rotate(-20deg)",
          }}
        />
      </div>
    </>
  );
}
