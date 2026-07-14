import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Who I Am</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo column — holographic frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* ambient glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/25 opacity-60 blur-2xl" />
              {/* gradient border frame */}
              <div className="relative rounded-3xl bg-gradient-to-br from-primary/60 via-border/50 to-accent/60 p-px shadow-2xl shadow-primary/20">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.5rem-1px)] bg-card">
                  <img
                    src={`${import.meta.env.BASE_URL}images/avatar.png`}
                    alt="Md. Ahashan Habib"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* holographic tint + scanlines */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/15 mix-blend-screen" />
                  <div className="holo-scanlines absolute inset-0 opacity-30" />
                  {/* HUD corner brackets */}
                  <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-primary/70" />
                  <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-primary/70" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-primary/70" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-primary/70" />
                  {/* status badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Currently at Qanun Limited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <p className="eyebrow mb-3">Profile</p>
            <h3 className="text-2xl sm:text-3xl font-display font-semibold mb-5 text-foreground">
              AI/ML Engineer &amp; Backend Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              AI/ML Engineer building production systems with LLMs, RAG, and deep learning. Full-stack developer experienced in scalable ML applications, medical AI platforms, and research. I bring together clean software engineering and cutting-edge AI.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
              I care about turning research into reliable, scalable products — from data pipelines and model training to the APIs and interfaces that put them in front of real users.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
