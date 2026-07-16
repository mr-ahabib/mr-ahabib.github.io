import { motion } from "framer-motion";
import { Trophy, Medal, Award, ClipboardCheck } from "lucide-react";

// Oldest → newest so the milestone line reads left to right.
const ACHIEVEMENTS = [
  {
    title: "Bangladesh Scouts Award",
    org: "Bangladesh Scouts",
    year: "2012",
    desc: "National award for excellence in scouting, presented on behalf of the Prime Minister.",
    icon: <Award size={20} className="text-primary" />,
  },
  {
    title: "Kaggle Competition Champion",
    org: "United International University",
    year: "2024",
    desc: "First place in the university-level Kaggle machine learning competition.",
    icon: <Trophy size={20} className="text-primary" />,
  },
  {
    title: "Software Lab Champion",
    org: "United International University",
    year: "2024",
    desc: "First place at the CSE Project Show Fall '24 — Software Lab competition.",
    icon: <Medal size={20} className="text-primary" />,
  },
  {
    title: "IEEE TENSYMP Reviewer",
    org: "IEEE Region 10 Symposium",
    year: "2025",
    desc: "Peer reviewer for AI and machine learning research papers.",
    icon: <ClipboardCheck size={20} className="text-primary" />,
  },
];

function Milestone({ item }: { item: (typeof ACHIEVEMENTS)[number] }) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="clip-hud-sm mb-3 grid h-11 w-11 place-items-center bg-primary/12 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/25">
        {item.icon}
      </div>
      <h3 className="text-sm sm:text-base font-display font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
        {item.title}
      </h3>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.org}</p>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed max-w-[220px]">{item.desc}</p>
    </div>
  );
}

export function Achievements() {
  return (
    <section id="achievements" className="py-20 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-20"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Honours</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Awards &amp; <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        {/* ── Desktop: horizontal milestone line, entries alternating above/below ── */}
        <div className="relative hidden md:block">
          {/* the line itself */}
          <span className="pointer-events-none absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-primary/10 via-primary/50 to-accent-2/40" />

          <div className="grid grid-cols-4 gap-6">
            {ACHIEVEMENTS.map((item, index) => {
              const above = index % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: above ? 16 : -16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: index * 0.12 }}
                  className="grid min-h-[380px] grid-rows-[1fr_auto_1fr] justify-items-center"
                >
                  {/* upper cell */}
                  <div className={`flex items-end pb-7 ${above ? "" : "invisible"}`}>
                    {above && <Milestone item={item} />}
                  </div>

                  {/* node + year on the line */}
                  <div className="relative flex flex-col items-center">
                    <span className="h-3 w-3 rotate-45 border-2 border-primary bg-background transition-all duration-300 group-hover:bg-primary" />
                    <span
                      className={`absolute font-mono text-lg font-bold text-primary/40 ${
                        above ? "top-6" : "bottom-6"
                      }`}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* lower cell */}
                  <div className={`flex items-start pt-7 ${above ? "invisible" : ""}`}>
                    {!above && <Milestone item={item} />}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile: compact vertical rail ── */}
        <div className="md:hidden">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="relative border-l-2 border-primary/25 pb-8 pl-6 last:pb-0"
            >
              <span className="absolute -left-[7px] top-1 h-3 w-3 rotate-45 border-2 border-primary/60 bg-background" />
              <span className="font-mono text-sm font-bold text-primary/60">{item.year}</span>
              <h3 className="mt-1 text-base font-display font-bold text-foreground">{item.title}</h3>
              <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.org}</p>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
