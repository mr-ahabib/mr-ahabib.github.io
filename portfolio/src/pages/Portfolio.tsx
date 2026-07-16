import { lazy, Suspense, useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CursorGlow } from "@/components/CursorGlow";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { CustomScrollbar } from "@/components/CustomScrollbar";
import Lenis from "lenis";
import { AnimatePresence } from "framer-motion";
import { SplashScreen } from "@/components/SplashScreen";

// Everything below the fold loads in its own chunk — the first paint only
// pays for the hero + about. Named exports are mapped to lazy defaults.
const Experience = lazy(() => import("@/components/sections/Experience").then((m) => ({ default: m.Experience })));
const Education = lazy(() => import("@/components/sections/Education").then((m) => ({ default: m.Education })));
const Skills = lazy(() => import("@/components/sections/Skills").then((m) => ({ default: m.Skills })));
const Services = lazy(() => import("@/components/sections/Services").then((m) => ({ default: m.Services })));
const Projects = lazy(() => import("@/components/sections/Projects").then((m) => ({ default: m.Projects })));
const Achievements = lazy(() => import("@/components/sections/Achievements").then((m) => ({ default: m.Achievements })));
const Publications = lazy(() => import("@/components/sections/Publications").then((m) => ({ default: m.Publications })));
const Contact = lazy(() => import("@/components/sections/Contact").then((m) => ({ default: m.Contact })));
const Chatbot = lazy(() => import("@/components/Chatbot").then((m) => ({ default: m.Chatbot })));
const BugGame = lazy(() => import("@/components/BugGame").then((m) => ({ default: m.BugGame })));

export default function Portfolio() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Disable scroll while loading
    if (loading) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }

    const timer = setTimeout(() => {
      setLoading(false);
      lenis.start();
      document.body.style.overflow = "";
    }, 2000);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <SplashScreen />}
      </AnimatePresence>

      <div className="relative min-h-screen text-foreground selection:bg-primary/20 selection:text-primary" style={{ backgroundColor: "transparent" }}>
      {/* Global animated background — rendered behind everything */}
      <AnimatedBackground />

      {/* Custom interactive scrollbar */}
      <CustomScrollbar />

      {/* Cursor ring + trailing glow (desktop pointers only) */}
      <CursorGlow />

      {/* Fine film grain — barely-there texture that makes the glass read as real */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />



      {/* Page content sits above the background */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Suspense fallback={null}>
            <Experience />
            <Education />
            <Skills />
            <Services />
            <Projects />
            <Achievements />
            <Publications />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </div>

      <Suspense fallback={null}>
        <Chatbot />
        <BugGame />
      </Suspense>
    </div>
    </>
  );
}
