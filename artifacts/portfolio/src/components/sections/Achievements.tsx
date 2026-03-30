import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";

const ACHIEVEMENTS = [
  {
    title: "Champion",
    event: "Kaggle Competition, UIU",
    year: "2024",
    icon: <Trophy size={32} className="text-yellow-500" />,
    color: "bg-yellow-500/10 border-yellow-500/20"
  },
  {
    title: "Champion",
    event: "Software Lab Project Show, UIU",
    year: "2024",
    icon: <Medal size={32} className="text-primary" />,
    color: "bg-primary/10 border-primary/20"
  },
  {
    title: "Reviewer",
    event: "TENSYMP 2025",
    year: "2025",
    desc: "Organized by IEEE Region 10 Symposium",
    icon: <Star size={32} className="text-blue-500" />,
    color: "bg-blue-500/10 border-blue-500/20"
  },
  {
    title: "Bangladesh Scouts Award",
    event: "Received from the Prime Minister of Bangladesh",
    year: "2012",
    icon: <Award size={32} className="text-green-600" />,
    color: "bg-green-600/10 border-green-600/20"
  }
];

export function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Awards & <span className="text-gradient">Achievements</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {ACHIEVEMENTS.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card p-6 flex items-center gap-6 rounded-2xl border ${achievement.color}`}
            >
              <div className="flex-shrink-0 p-4 rounded-full bg-white shadow-sm">
                {achievement.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground mb-1">{achievement.title}</h3>
                <p className="text-muted-foreground font-medium">{achievement.event}</p>
                {achievement.desc && <p className="text-sm text-muted-foreground mt-1">{achievement.desc}</p>}
                <div className="mt-2 inline-block px-2 py-1 bg-white rounded text-xs font-semibold shadow-sm border border-border">
                  {achievement.year}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}