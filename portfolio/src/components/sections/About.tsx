import { motion } from "framer-motion";

const STATS = [
  { value: "1+", label: "Years Production AI" },
  { value: "5+", label: "LLM / RAG Systems" },
  { value: "3", label: "Medical AI Platforms" },
  { value: "10+", label: "Projects Shipped" },
];

const TRAITS = [
  { icon: "▸", text: "LLMs · RAG · PyTorch · TensorFlow" },
  { icon: "▸", text: "FastAPI · Django · React · Node.js" },
  { icon: "▸", text: "PostgreSQL · FAISS · Vector DBs" },
  { icon: "▸", text: "Docker · CI/CD · HPC (LUMI)" },
];

const EASE = [0.25, 1, 0.5, 1] as const;
const VIEWPORT = { once: true, margin: "-120px 0px" } as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -8 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 8 },
  whileInView: { opacity: 1, x: 0 },
  viewport: VIEWPORT,
  transition: { duration: 0.8, ease: EASE, delay },
});

export function About() {
  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <motion.div {...fadeUp(0)} className="mb-16 sm:mb-20">
          <div className="flex items-center gap-4">
            <span className="eyebrow">Who I Am</span>
            <span className="flex-1 h-px bg-gradient-to-r from-primary/40 to-transparent" />
          </div>
        </motion.div>

        {/* Main two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-20 xl:gap-28 items-start">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-8">
            {/* Big editorial headline */}
            <motion.h2
              {...fadeLeft(0.1)}
              className="text-4xl sm:text-5xl xl:text-6xl font-display font-bold leading-[1.08] tracking-tight text-foreground"
            >
              AI / ML Engineer
              <br />
              <span className="text-gradient">& Backend</span>
              <br />
              Developer.
            </motion.h2>

            {/* Status pill */}
            <motion.div {...fadeLeft(0.2)}>
              <span className="inline-flex items-center gap-2.5 text-sm font-medium text-foreground/80">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
                </span>
                Currently at As-Sunnah Foundation · Dhaka, Bangladesh
              </span>
            </motion.div>

            {/* Bio paragraphs */}
            <motion.div {...fadeLeft(0.3)} className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                I'm an AI/ML engineer who cares about the part most people skip —
                getting models out of the notebook and into production. Over the past
                year I've worked hands-on with LLMs, retrieval-augmented generation,
                and deep learning, including medical AI platforms, while building and
                maintaining the backend that keeps it all running reliably.
              </p>
              <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
                What keeps me interested is the distance between a promising result
                and a product someone can actually depend on. I like owning that whole
                path — shaping the data, training and evaluating the model, and
                building the APIs and interfaces that put it in front of real users.
              </p>
            </motion.div>

            {/* Tech stack list */}
            <motion.div {...fadeLeft(0.4)} className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {TRAITS.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.07, ease: "easeOut" }}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground font-mono"
                >
                  <span className="text-primary text-xs">{t.icon}</span>
                  {t.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="flex flex-col gap-10 lg:pt-4">
            {/* Stat grid */}
            <motion.div
              {...fadeRight(0.15)}
              className="grid grid-cols-2 gap-px bg-border/30 rounded-xl overflow-hidden border border-border/30"
            >
              {STATS.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-background flex flex-col items-center justify-center py-8 px-4 text-center group hover:bg-primary/5 transition-colors duration-300"
                >
                  <span className="text-3xl sm:text-4xl font-display font-bold text-gradient leading-none mb-2">
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest font-mono">
                    {s.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Horizontal rule with label */}
            <motion.div {...fadeRight(0.3)} className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                current_role
              </span>
              <span className="flex-1 h-px bg-border/40" />
            </motion.div>

            {/* Current role block */}
            <motion.div {...fadeRight(0.35)} className="space-y-3">
              <div className="flex items-start gap-4">
                <div className="mt-1 h-8 w-1 rounded-full bg-gradient-to-b from-primary to-primary/20 shrink-0" />
                <div>
                  <p className="text-base font-semibold text-foreground">
                    AI &amp; Software Engineer
                  </p>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    As-Sunnah Foundation · Full-time
                  </p>
                  <p className="text-xs font-mono text-primary/70 mt-1">
                    2024 – Present
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom rule with label */}
            <motion.div {...fadeRight(0.4)} className="flex items-center gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60">
                availability
              </span>
              <span className="flex-1 h-px bg-border/40" />
            </motion.div>

            {/* Availability row */}
            <motion.div {...fadeRight(0.45)} className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Open to freelance &amp; collaborations
              </p>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                available
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
