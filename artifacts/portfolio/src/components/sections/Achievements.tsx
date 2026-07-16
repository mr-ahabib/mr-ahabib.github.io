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

        {/* Open honors list — year rail on the left, hairline separators */}
        <div className="mx-auto max-w-3xl">
          {ACHIEVEMENTS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex items-start gap-5 border-b border-border/60 py-6 last:border-b-0 sm:gap-7"
            >
              <span className="w-14 shrink-0 pt-1 font-mono text-sm font-semibold text-primary">
                {item.date.match(/\d{4}/)?.[0] ?? item.date}
              </span>

              <div className="clip-hud-sm grid h-11 w-11 shrink-0 place-items-center bg-primary/12 transition-transform duration-300 group-hover:scale-110">
                {item.icon}
              </div>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug transition-colors group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-0.5 text-sm font-medium text-muted-foreground">{item.org}</p>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
