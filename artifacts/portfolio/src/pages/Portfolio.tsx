import { useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Education } from "@/components/sections/Education";
import { Skills } from "@/components/sections/Skills";
import { Services } from "@/components/sections/Services";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Publications } from "@/components/sections/Publications";
import { Contact } from "@/components/sections/Contact";
import { Chatbot } from "@/components/Chatbot";
import { BugGame } from "@/components/BugGame";
import { HudRails } from "@/components/HudDecor";

export default function Portfolio() {
  // Global pointer-parallax vars: the background canvas, wireframe cubes and
  // HUD rails all read --par-x/--par-y so foreground decor shifts with the
  // same 3D depth as the background — one connected space.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const onMove = (e: MouseEvent) => {
      root.style.setProperty("--par-x", String((e.clientX / window.innerWidth) * 2 - 1));
      root.style.setProperty("--par-y", String((e.clientY / window.innerHeight) * 2 - 1));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground selection:bg-primary/20 selection:text-primary" style={{ backgroundColor: "transparent" }}>
      {/* Global animated background — rendered behind everything */}
      <AnimatedBackground />

      {/* Fine film grain — barely-there texture that makes the glass read as real */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[5] opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Fixed HUD side rails — decorative screen filler on wide viewports */}
      <HudRails />

      {/* Page content sits above the background */}
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <About />
          <Experience />
          <Education />
          <Skills />
          <Services />
          <Projects />
          <Achievements />
          <Publications />
          <Contact />
        </main>

        <Footer />
      </div>

      <Chatbot />
      <BugGame />
    </div>
  );
}
