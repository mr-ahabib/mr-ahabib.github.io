import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing";

const PHRASES = [
  "I'm Md. Ahashan Habib",
  "An AI/ML Engineer",
  "A Full-Stack Developer",
  "A Machine Learning Researcher"
];

export function Hero() {
  const typedText = useTypingEffect(PHRASES, 100, 50, 2000);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#000 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, staggerChildren: 0.2 }}
          >
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="inline-block mb-6">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI/ML Engineer at Ethics Advance Technology
              </span>
            </motion.div>
            
            <h2 className="text-foreground font-medium tracking-wide mb-4 text-lg md:text-xl">
              Welcome to my portfolio
            </h2>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 text-foreground">
              Hello, <br />
              <span className="text-gradient min-h-[1.2em] inline-block">
                {typedText}
                <span className="animate-pulse font-light text-primary">|</span>
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
                className="px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl font-semibold bg-white border border-border text-foreground hover:bg-secondary hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                Contact Me
              </a>
              <div className="flex gap-3 ml-2">
                <a
                  href="https://github.com/mr-ahabib"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 shadow-sm transition-all duration-300"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/mr-ahabib/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 shadow-sm transition-all duration-300"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:mr.ahashan261@gmail.com"
                  className="p-3 rounded-full bg-white border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 shadow-sm transition-all duration-300"
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
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-border relative overflow-hidden">
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