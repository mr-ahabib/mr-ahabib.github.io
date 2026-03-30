import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, Globe } from "lucide-react";
import { useTypingEffect } from "@/hooks/use-typing";

const PHRASES = [
  "I'm Md. Ahashan Habib",
  "An AI/ML Engineer",
  "A Backend Developer",
  "A Machine Learning Researcher",
];

export function Hero() {
  const typedText = useTypingEffect(PHRASES, 90, 45, 2000);

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 sm:pt-24 overflow-hidden">
      {/* Section-level subtle elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/[0.04] to-transparent" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/[0.05] rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Left Content ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            {/* Role badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-block mb-5 sm:mb-6"
            >
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium border border-primary/20 shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                AI Project Co-ordinator at Qanun Limited
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground font-medium tracking-wide mb-3 text-sm sm:text-base"
            >
              Welcome to my portfolio
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-5 sm:mb-6 text-foreground"
            >
              Hello,{" "}
              <br />
              <span className="text-gradient min-h-[1.2em] inline-block">
                {typedText}
                <span className="animate-pulse font-light text-primary">|</span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-7 sm:mb-8 max-w-xl leading-relaxed"
            >
              Building production AI systems with LLMs, RAG, and deep learning. Full-stack developer passionate about scalable ML applications and cutting-edge research.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-3 items-center"
            >
              <a
                href="https://mr-ahabib.github.io/images/AhashanHabib.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm sm:text-base"
              >
                <Download size={18} />
                Download CV
              </a>
              <a
                href="#contact"
                className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl font-semibold bg-white/80 border border-border text-foreground hover:bg-white hover:border-primary/30 hover:-translate-y-0.5 transition-all duration-300 shadow-sm text-sm sm:text-base"
              >
                Contact Me
              </a>
              <div className="flex gap-2.5">
                {[
                  { href: "https://github.com/mr-ahabib", icon: <Github size={18} />, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/", icon: <Linkedin size={18} />, label: "LinkedIn" },
                  { href: "https://mr-ahabib.github.io/", icon: <Globe size={18} />, label: "Website" },
                  { href: "mailto:mr.ahashan261@gmail.com", icon: <Mail size={18} />, label: "Email" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="p-2.5 rounded-full bg-white/80 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 shadow-sm transition-all duration-300"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mt-10 flex gap-8 sm:gap-10"
            >
              {[
                { label: "Publications", value: "3+" },
                { label: "Projects", value: "10+" },
                { label: "Experience", value: "1yr+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl sm:text-2xl font-display font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 font-medium">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right — Profile Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-1 lg:order-2 flex items-center justify-center relative"
          >
            {/* Decorative rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
              className="absolute w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-dashed border-primary/15"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute w-[330px] h-[330px] sm:w-[420px] sm:h-[420px] lg:w-[500px] lg:h-[500px] rounded-full border border-dashed border-primary/08"
            />

            {/* Floating badges — only on sm+ */}
            <motion.div
              animate={{ y: [-8, 8, -8] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 px-2.5 py-1.5 bg-white rounded-full shadow-lg border border-border text-xs font-semibold text-primary flex items-center gap-1.5 z-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              AI/ML Engineer
            </motion.div>
            <motion.div
              animate={{ y: [8, -8, 8] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-12 sm:bottom-16 left-0 sm:-left-2 px-2.5 py-1.5 bg-white rounded-full shadow-lg border border-border text-xs font-semibold text-foreground z-10"
            >
              🎓 CGPA 3.62
            </motion.div>
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute top-12 sm:top-16 left-0 sm:left-2 px-2.5 py-1.5 bg-white rounded-full shadow-lg border border-border text-xs font-semibold text-foreground z-10"
            >
              🏆 Kaggle Champion
            </motion.div>

            {/* Photo container */}
            <div className="relative w-56 h-64 sm:w-72 sm:h-80 lg:w-80 lg:h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3"></div>
              <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-primary/15">
                <img
                  src={`${import.meta.env.BASE_URL}images/avatar.png`}
                  alt="Md. Ahashan Habib"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-xs text-muted-foreground uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-1 h-8 rounded-full bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-primary rounded-full"
            animate={{ top: ["-50%", "100%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
