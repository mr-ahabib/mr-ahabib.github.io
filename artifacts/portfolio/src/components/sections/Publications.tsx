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
          <a
            href="https://scholar.google.com/citations?user=PSvun2MAAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <BookOpen size={15} />
            View on Google Scholar
            <ExternalLink size={13} />
          </a>
        </motion.div>

        {/* Editorial list — numbered entries with hairline separators */}
        <div className="mx-auto max-w-4xl">
          {PUBLICATIONS.map((pub, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex gap-5 border-b border-border/60 py-7 first:pt-2 last:border-b-0 sm:gap-8"
            >
              <span className="shrink-0 pt-1 font-mono text-2xl font-bold text-primary/35 transition-colors group-hover:text-primary/70 sm:text-3xl">
                {String(index + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0">
                <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug transition-colors group-hover:text-primary">
                  {pub.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground italic">{pub.authors}</p>

                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="clip-hud-sm border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
                    {pub.venue}
                  </span>
                  <span className="text-xs text-muted-foreground">{pub.venueFullName}</span>
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="text-primary">&gt;</span> {pub.publisher}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span>{pub.location}</span>
                  <span className="w-1 h-1 rounded-full bg-primary/50" />
                  <span className="text-primary">{pub.year}</span>
                </div>
              </div>
            </motion.article>
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

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {UNDER_REVIEW.map((paper, index) => (
            <motion.div
              key={paper.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group border-l-2 border-dashed border-primary/35 pl-5 transition-colors duration-300 hover:border-primary/70"
            >
              <h3 className="text-sm sm:text-base font-display font-bold text-foreground leading-snug mb-2">
                {paper.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                <span className="clip-hud-sm border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-primary">
                  {paper.venue}
                </span>
                <span className="text-muted-foreground">{paper.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
