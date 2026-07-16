import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

interface Tilt3DProps {
  children: ReactNode;
  className?: string;
  /** max tilt in degrees */
  max?: number;
  /** perspective distance in px */
  perspective?: number;
}

/**
 * Mouse-tracking 3D tilt wrapper — the card leans toward the cursor and
 * springs back on leave. Purely transform-based (GPU) and disabled for
 * prefers-reduced-motion and touch-only devices (no mousemove → no tilt).
 */
export function Tilt3D({ children, className, max = 8, perspective = 900 }: Tilt3DProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: perspective, transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
      }}
      onMouseLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
