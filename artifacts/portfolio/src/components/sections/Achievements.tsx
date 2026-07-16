import { motion } from "framer-motion";
import { Trophy, Medal, Award, ClipboardCheck } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "IEEE TENSYMP Reviewer",
    org: "IEEE Region 10 Symposium",
    date: "2025",
    desc: "Peer reviewer for AI and machine learning research papers at the IEEE Region 10 Symposium.",
    icon: <ClipboardCheck size={28} className="text-primary" />,
  },
  {
    title: "Kaggle Competition Champion",
    org: "United International University",
    date: "December 2024",
    desc: "Won first place in the university-level Kaggle machine learning competition.",
    icon: <Trophy size={28} className="text-primary" />,
  },
  {
    title: "Software Lab Champion",
    org: "United International University",
    date: "December 2024",
    desc: "First place at the CSE Project Show Fall '24 — Software Lab competition.",
    icon: <Medal size={28} className="text-primary" />,
  },
  {
    title: "Bangladesh Scouts Award",
    org: "Bangladesh Scouts",
    date: "2012",
    desc: "Prestigious national award recognising excellence in scouting, presented on behalf of the Prime Minister of Bangladesh.",
    icon: <Award size={28} className="text-primary" />,
  },
];

export function Achievements() {
  return (
    <section id="achievements" className="py-20 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Honours</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Awards &amp; <span className="text-gradient">Achievements</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -6 }}
              className="neon-glow-sm group relative flex flex-col gap-4 rounded-2xl border border-primary/45 bg-card/80 p-6 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              {/* HUD corner bracket */}
              <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

              <div className="clip-hud-sm grid h-14 w-14 place-items-center bg-primary/12">
                {item.icon}
              </div>

              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground font-medium mb-2">{item.org}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>

              <span className="clip-hud-sm self-start border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                {item.date}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
