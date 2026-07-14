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
              {/* Neon-outlined frame */}
              <div className="neon-glow relative aspect-[4/5] overflow-hidden rounded-3xl border-2 border-primary bg-card">
                <img
                  src={`${import.meta.env.BASE_URL}images/avatar.png`}
                  alt="Md. Ahashan Habib"
                  className="w-full h-full object-cover object-top"
                />
                {/* holographic tint + scanlines + scan bar */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/15 mix-blend-screen" />
                <div className="holo-scanlines absolute inset-0 opacity-30" />
                <div className="holo-scanbar absolute left-0 h-12 w-full bg-gradient-to-b from-transparent via-primary/40 to-transparent" />
                {/* HUD corner brackets */}
                <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l-2 border-t-2 border-primary" />
                <span className="pointer-events-none absolute right-3 top-3 h-6 w-6 border-r-2 border-t-2 border-primary" />
                <span className="pointer-events-none absolute bottom-3 left-3 h-6 w-6 border-b-2 border-l-2 border-primary" />
                <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b-2 border-r-2 border-primary" />
                {/* status badge */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="flex items-center gap-2 rounded-full border border-primary/50 bg-card/90 px-4 py-2 text-xs font-medium text-foreground backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    Currently at As-Sunnah Foundation
                  </span>
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
              I'm an AI/ML engineer who cares about the part most people skip — getting models out of the notebook and into production. Over the past year I've worked hands-on with LLMs, retrieval-augmented generation, and deep learning, including medical AI platforms, while building and maintaining the backend that keeps it all running reliably.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed text-base sm:text-lg">
              What keeps me interested is the distance between a promising result and a product someone can actually depend on. I like owning that whole path: shaping the data, training and evaluating the model, and building the APIs and interfaces that put it in front of real users. These days I'm doing exactly that as an AI &amp; Software Engineer at As-Sunnah Foundation.
            </p>

            {/* Cyberpunk HUD data readout */}
            <div className="neon-glow-sm mt-8 rounded-xl border border-primary/40 bg-card/60 p-5 font-mono text-sm backdrop-blur">
              {[
                { k: "role", v: "AI/ML Engineer · Backend Dev" },
                { k: "stack", v: "Python · PyTorch · RAG · React" },
                { k: "location", v: "Dhaka, Bangladesh" },
              ].map((row) => (
                <div key={row.k} className="flex items-center justify-between gap-4 border-b border-border/40 py-2">
                  <span className="text-primary">&gt; {row.k}</span>
                  <span className="truncate text-muted-foreground">{row.v}</span>
                </div>
              ))}
              <div className="flex items-center justify-between gap-4 pt-2">
                <span className="text-primary">&gt; status</span>
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  available for work
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
