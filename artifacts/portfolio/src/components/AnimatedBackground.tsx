import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const PARTICLES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  size: Math.random() * 3 + 1.5,
  x: Math.random() * 100,
  y: Math.random() * 100,
  delay: Math.random() * 8,
  duration: Math.random() * 10 + 14,
  opacity: Math.random() * 0.2 + 0.06,
  driftX: (Math.random() - 0.5) * 18,
}));

export function AnimatedBackground() {
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);

  // Three springs at different speeds for parallax
  const fastX = useSpring(rawX, { damping: 40, stiffness: 80 });
  const fastY = useSpring(rawY, { damping: 40, stiffness: 80 });

  const midX = useSpring(rawX, { damping: 70, stiffness: 35 });
  const midY = useSpring(rawY, { damping: 70, stiffness: 35 });

  const slowX = useSpring(rawX, { damping: 120, stiffness: 14 });
  const slowY = useSpring(rawY, { damping: 120, stiffness: 14 });

  // Map normalised [0-1] → pixel offset centred at 0
  const orb1X = useTransform(fastX, [0, 1], [-280, 280]);
  const orb1Y = useTransform(fastY, [0, 1], [-180, 180]);

  const orb2X = useTransform(midX, [0, 1], [-200, 200]);
  const orb2Y = useTransform(midY, [0, 1], [-150, 150]);

  const orb3X = useTransform(slowX, [0, 1], [-150, 150]);
  const orb3Y = useTransform(slowY, [0, 1], [-100, 100]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth);
      rawY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [rawX, rawY]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #4f46e5 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Orb 1 — primary, top-left anchor, fast */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 700,
          height: 700,
          left: "20%",
          top: "10%",
          x: orb1X,
          y: orb1Y,
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(80px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Orb 2 — blue, bottom-right anchor, medium */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 550,
          height: 550,
          left: "75%",
          top: "65%",
          x: orb2X,
          y: orb2Y,
          background: "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)",
          filter: "blur(70px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Orb 3 — violet, bottom-left anchor, slow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 480,
          height: 480,
          left: "10%",
          top: "75%",
          x: orb3X,
          y: orb3Y,
          background: "radial-gradient(circle, rgba(139,92,246,0.10) 0%, transparent 70%)",
          filter: "blur(60px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Spotlight that follows cursor tightly */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: 300,
          height: 300,
          x: useTransform(fastX, [0, 1], [0, window.innerWidth || 1280]),
          y: useTransform(fastY, [0, 1], [0, window.innerHeight || 768]),
          background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
          filter: "blur(30px)",
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -28, 0],
            x: [0, p.driftX, 0],
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Subtle ambient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-violet-500/[0.03]" />
    </div>
  );
}
