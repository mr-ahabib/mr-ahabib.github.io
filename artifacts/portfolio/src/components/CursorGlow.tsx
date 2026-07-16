import { useEffect, useRef } from "react";

/**
 * Custom pointer (ayushcmd.me-style): the native cursor is hidden and
 * replaced by a frosted glass lens — a 40px bubble that blurs whatever
 * passes beneath it, with a tiny specular highlight so it reads as glass —
 * chased by a 100px soft primary-tinted halo that lags further behind.
 * It also has a crisp 6px dot precisely at the cursor's location.
 *
 * Only active for fine pointers without reduced-motion; the `custom-cursor`
 * class on <html> is what actually hides the native cursor, so touch
 * devices and reduced-motion users keep theirs untouched.
 */
export function CursorGlow() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const lens = lensRef.current;
    const glow = glowRef.current;
    if (!dot || !lens || !glow) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.documentElement.classList.add("custom-cursor");

    const target = { x: -100, y: -100 };
    const lensPos = { x: -100, y: -100 };
    const glowPos = { x: -100, y: -100 };
    let raf = 0;

    const step = () => {
      lensPos.x += (target.x - lensPos.x) * 0.06;
      lensPos.y += (target.y - lensPos.y) * 0.06;
      glowPos.x += (target.x - glowPos.x) * 0.022;
      glowPos.y += (target.y - glowPos.y) * 0.022;
      
      lens.style.transform = `translate3d(${lensPos.x - 13}px, ${lensPos.y - 13}px, 0)`;
      glow.style.transform = `translate3d(${glowPos.x - 60}px, ${glowPos.y - 60}px, 0)`;
      raf = requestAnimationFrame(step);
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      // the dot stays exactly on target INSTANTLY
      dot.style.transform = `translate3d(${target.x - 3}px, ${target.y - 3}px, 0)`;
      
      dot.style.opacity = "1";
      lens.style.opacity = "1";
      glow.style.opacity = "1";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
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
      {/* crisp dot center */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 6,
          height: 6,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.3s ease",
          background: "hsl(var(--primary) / 0.9)",
          boxShadow: "0 0 6px hsl(var(--primary) / 0.6)",
        }}
      />
      {/* soft trailing halo */}
      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 120,
          height: 120,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99997,
          willChange: "transform",
          opacity: 0,
          transition: "opacity 0.4s ease",
          background: "radial-gradient(circle, rgba(118,171,174,0.18) 0%, rgba(118,171,174,0.08) 45%, transparent 72%)",
          filter: "blur(14px)",
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
          width: 26,
          height: 26,
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
