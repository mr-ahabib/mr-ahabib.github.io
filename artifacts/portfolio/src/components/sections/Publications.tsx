import { motion } from "framer-motion";
import { BookOpen, FileText, ExternalLink, FileClock } from "lucide-react";

const PUBLICATIONS = [
  {
    title: "A Secure Blockchain Based Brain Tumor Prediction Model Using Swin Transformers",
    authors: "Habib, M. A., Sarwar, M. W., Hasan, M., Mokaddis, M. A. — First Author",
    venue: "INDUSCON 2025",
    venueFullName: "IEEE/IAS International Conference on Industry Applications",
    location: "Brazil",
    year: "2025",
    publisher: "IEEE",
    icon: <BookOpen size={22} />,
  },
  {
    title: "ADDomics: Enhancing Multiomics Fusion with Autoencoders and Deep Neural Networks",
    authors: "Habib, M. A., Alvi, R., Sarkar, S., Shuvo, M. A., Hasan, M., Azim, R. — First Author",
    venue: "TENSYMP 2025",
    venueFullName: "IEEE Region 10 Symposium",
    location: "New Zealand",
    year: "2025",
    publisher: "IEEE",
    icon: <FileText size={22} />,
  },
  {
    title: "PyroVision: A Deep Learning Based Model for Wildfire Detection in Satellite Imagery",
    authors: "Sifat, S. A., Hasan, M., Joy, S. B. N., Habib, M. A., Rahman, R. — Co-Author",
    venue: "ICEEICT 2024",
    venueFullName: "6th International Conference on Electrical Engineering and Information & Communication Technology",
    location: "Dhaka, Bangladesh",
    year: "2024",
    publisher: "IEEE",
    icon: <FileText size={22} />,
  },
];

const UNDER_REVIEW = [
  {
    title: "RL-MR: Reinforcement Learning for Dynamic Pretrained Model Ranking",
    venue: "Under review at EMNLP",
    role: "First Author",
  },
  {
    title: "ReinKEdit: A Reinforcement Learning for Knowledge Editing in Large Language Models",
    venue: "Under review at Pattern Recognition",
    role: "First Author",
  },
];

export function Publications() {
  return (
    <section id="publications" className="py-20 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Research</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Research <span className="text-gradient">Publications</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 font-mono text-xs uppercase tracking-wider">
            3 peer-reviewed IEEE papers · 2 under review
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 items-stretch">
          {PUBLICATIONS.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -4 }}
              className="neon-glow-sm group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/45 bg-card/80 p-5 sm:p-6 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-accent-2" />
              {/* HUD corner bracket */}
              <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

              <div className="mb-4 flex items-center justify-between">
                <div className="clip-hud-sm grid h-12 w-12 shrink-0 place-items-center bg-primary/12 text-primary">
                  {pub.icon}
                </div>
                <span className="clip-hud-sm mr-6 border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-xs text-primary">
                  {pub.year}
                </span>
              </div>

              <h3 className="text-base font-display font-bold text-foreground leading-snug mb-2">
                {pub.title}
              </h3>
              <p className="text-sm text-muted-foreground italic mb-4">{pub.authors}</p>

              <div className="mt-auto space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="clip-hud-sm border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
                    {pub.venue}
                  </span>
                  <ExternalLink size={14} className="text-muted-foreground/50 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{pub.venueFullName}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">&gt;</span> {pub.publisher}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span>{pub.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Under review ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 mb-5 flex items-center gap-3"
        >
          <FileClock size={15} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Under review</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {UNDER_REVIEW.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="neon-glow-sm group relative overflow-hidden rounded-2xl border border-primary/35 border-dashed bg-card/60 p-5 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
              <div className="flex items-start gap-4">
                <div className="clip-hud-sm grid h-10 w-10 shrink-0 place-items-center bg-primary/12 text-primary">
                  <FileClock size={18} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm sm:text-base font-display font-bold text-foreground leading-snug mb-2">
                    {paper.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="clip-hud-sm border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-primary">
                      {paper.venue}
                    </span>
                    <span className="text-muted-foreground">{paper.role}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
