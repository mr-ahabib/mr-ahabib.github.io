import { motion } from "framer-motion";
import { Download, Mail, Github } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing";

const PHRASES = [
  "I'm Md. Ahashan Habib",
  "A Backend Developer",
  "I'm a Researcher",
  "On Machine Learning"
];

export function Hero() {
  const typedText = useTypingEffect(PHRASES, 100, 50, 2000);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
          alt="Hero Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-primary font-medium tracking-wide mb-4 text-lg md:text-xl">
              Welcome to my portfolio
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6">
              Hello, <br />
              <span className="text-gradient min-h-[1.2em] inline-block">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl leading-relaxed">
              Transforming ideas into robust software and diving deep into the realms of Machine Learning and AI to solve complex problems.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <a
                href="https://mr-ahabib.github.io/images/AhashanHabib.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold bg-white/5 backdrop-blur-sm border border-white/10 text-foreground hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                Contact Me
              </a>
              <div className="flex gap-4 ml-4">
                <a
                  href="https://github.com/mr-ahabib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="mailto:mr.ahashan261@gmail.com"
                  className="p-3 rounded-full bg-white/5 border border-white/10 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-white/10 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-full"
            animate={{ top: ['-50%', '100%'] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
