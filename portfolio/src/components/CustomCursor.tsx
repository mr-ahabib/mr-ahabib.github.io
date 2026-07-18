import { useEffect, useRef, useState } from "react";

/**
 * Frosted-glass lens cursor: a lagging translucent circle with a gradient rim,
 * led by a small, bright diamond marker for precise, high-visibility tracking.
 * Only mounts on fine-pointer devices; native cursor on touch / reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer || reduced) return;
    setEnabled(true);
    document.body.classList.add("cursor-none");

    const onMove = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%) rotate(45deg)`;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.body.classList.remove("cursor-none");
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 will-change-transform"
      style={{
        background: "hsl(38 100% 58%)",
        boxShadow: "0 0 8px hsl(38 100% 58%), 0 0 2px hsl(38 100% 70%)",
        borderRadius: "1px",
      }}
    />
  );
}
