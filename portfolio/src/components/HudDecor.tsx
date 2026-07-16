import { motion, useReducedMotion } from "framer-motion";

/**
 * Fixed vertical HUD rails hugging the viewport edges — mono coordinates,
 * tick marks, and a crisp neon line. Pure decoration ("screen filler") that
 * keeps wide screens from feeling empty. Hidden below xl and from readers.
 */
export function HudRails() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-y-0 left-0 right-0 z-20 hidden xl:block">
      {/* Left rail */}
      <div
        className="absolute left-5 top-1/2 flex flex-col items-center gap-4"
        style={{
          transform:
            "translateY(-50%) translate3d(calc(var(--par-x, 0) * 8px), calc(var(--par-y, 0) * 6px), 0)",
          transition: "transform 0.4s ease-out",
        }}
      >
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-primary/50 to-primary/20" />
        <span className="h-1.5 w-1.5 rotate-45 border border-primary/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70 [writing-mode:vertical-rl]">
          md.ahashan.habib // ai.ml.engineer
        </span>
        <span className="h-1.5 w-1.5 rotate-45 border border-primary/60" />
        <span className="h-24 w-px bg-gradient-to-t from-transparent via-primary/50 to-primary/20" />
      </div>

      {/* Right rail */}
      <div
        className="absolute right-5 top-1/2 flex flex-col items-center gap-4"
        style={{
          transform:
            "translateY(-50%) translate3d(calc(var(--par-x, 0) * 8px), calc(var(--par-y, 0) * 6px), 0)",
          transition: "transform 0.4s ease-out",
        }}
      >
        <span className="h-24 w-px bg-gradient-to-b from-transparent via-accent/50 to-accent/20" />
        <span className="h-1.5 w-1.5 rotate-45 border border-accent/60" />
        <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground/70 [writing-mode:vertical-rl]">
          dhaka.bd // 23.78°N 90.42°E
        </span>
        <span className="h-1.5 w-1.5 rotate-45 border border-accent/60" />
        <span className="h-24 w-px bg-gradient-to-t from-transparent via-accent/50 to-accent/20" />
      </div>
    </div>
  );
}

/**
 * Slowly tumbling 3D wireframe cube — crisp neon edges only (no glow bloom).
 * Drop into a section as a floating decorative filler.
 */
export function WireCube({ size = 56, className = "" }: { size?: number; className?: string }) {
  const reduced = useReducedMotion();
  const half = size / 2;
  const faces = [
    `rotateY(0deg) translateZ(${half}px)`,
    `rotateY(90deg) translateZ(${half}px)`,
    `rotateY(180deg) translateZ(${half}px)`,
    `rotateY(270deg) translateZ(${half}px)`,
    `rotateX(90deg) translateZ(${half}px)`,
    `rotateX(-90deg) translateZ(${half}px)`,
  ];

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      animate={reduced ? undefined : { y: [-8, 8, -8] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: size, height: size, perspective: 700 }}
    >
      {/* pointer-parallax wrapper — cubes drift with the 3D background */}
      <div
        className="h-full w-full"
        style={{
          transform:
            "translate3d(calc(var(--par-x, 0) * 22px), calc(var(--par-y, 0) * 14px), 0)",
          transition: "transform 0.4s ease-out",
        }}
      >
      <div className="cube-spin relative h-full w-full" style={reduced ? { transform: "rotateX(-22deg) rotateY(32deg)" } : undefined}>
        {faces.map((transform) => (
          <span
            key={transform}
            className="absolute inset-0 border border-primary/30 bg-primary/[0.03]"
            style={{ transform }}
          />
        ))}
      </div>
      </div>
    </motion.div>
  );
}
