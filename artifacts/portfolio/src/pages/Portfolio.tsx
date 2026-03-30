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

export default function Portfolio() {
  return (
    <div className="relative min-h-screen text-foreground selection:bg-primary/20 selection:text-primary" style={{ backgroundColor: "transparent" }}>
      {/* Global animated background — rendered behind everything */}
      <AnimatedBackground />

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
    </div>
  );
}
