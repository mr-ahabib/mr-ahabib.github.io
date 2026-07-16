/**
 * Shared framer-motion scroll-reveal presets.
 *
 * Rules to keep scroll feeling like 120 Hz butter:
 *  1. Small initial offset  — large offsets (30–40px) feel jerky because the
 *     delta is too visible. 14–18px is imperceptible at 60+ fps.
 *  2. Long duration         — 0.55–0.75s gives the browser enough frames to
 *     interpolate smoothly even at 60 Hz.
 *  3. easeOutQuint easing   — fast start, slow end. Cubic-bezier values chosen
 *     so the animation is 90% done in the first half of its duration.
 *  4. Generous viewport margin — trigger the animation 120px before the element
 *     enters the viewport so it's already moving when the user's eye lands on it.
 *     This eliminates the "pop" feel completely.
 */

const EASE = [0.25, 1, 0.5, 1] as const; // easeOutQuart
const VIEWPORT = { once: true, margin: "-120px 0px" } as const;

/** Fade up — default for most elements */
export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

/** Fade in from left */
export const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -8 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

/** Fade in from right */
export const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 8 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

/** Gentle scale-in — for stat blocks, icons */
export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: VIEWPORT,
  transition: { duration: 0.7, ease: EASE, delay },
});

/** Stagger container — wraps a list so children animate one after another */
export const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: VIEWPORT,
  transition: { staggerChildren: 0.07, delayChildren: 0.05 },
};

/** Child variant for staggered lists */
export const staggerChild = {
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: EASE },
};
