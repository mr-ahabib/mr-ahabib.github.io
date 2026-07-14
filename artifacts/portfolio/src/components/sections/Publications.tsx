import { motion } from "framer-motion";
import { BookOpen, FileText, ExternalLink } from "lucide-react";

const PUBLICATIONS = [
  {
    title: "A Secure Blockchain Based Brain Tumor Prediction Model Using Swin Transformers",
    authors: "Habib, M. A., Sarwar, M. W., Hasan, M., Mokaddis, M. A.",
    venue: "INDUSCON 2025",
    venueFullName: "IEEE/IAS International Conference on Industry Applications",
    location: "Brazil",
    year: "2025",
    publisher: "IEEE",
    icon: <BookOpen size={22} />,
    color: "from-indigo-500/20 to-violet-500/10",
    accentColor: "text-indigo-600 bg-indigo-50 border-indigo-200",
  },
  {
    title: "ADDomics: Enhancing Multiomics Fusion with Autoencoders and Deep Neural Networks",
    authors: "Habib, Md Ahashan, et al.",
    venue: "TENSYMP 2025",
    venueFullName: "IEEE Region 10 Symposium",
    location: "New Zealand",
    year: "2025",
    publisher: "IEEE",
    icon: <FileText size={22} />,
    color: "from-blue-500/20 to-cyan-500/10",
    accentColor: "text-blue-600 bg-blue-50 border-blue-200",
  },
  {
    title: "PyroVision: A Deep Learning Based Model for Wildfire Detection in Satellite Imagery",
    authors: "Sifat, Shoukat Alam, et al.",
    venue: "ICEEICT 2024",
    venueFullName: "6th International Conference on Electrical Engineering and Information & Communication Technology",
    location: "Dhaka, Bangladesh",
    year: "2024",
    publisher: "IEEE",
    icon: <FileText size={22} />,
    color: "from-rose-500/20 to-orange-500/10",
    accentColor: "text-rose-600 bg-rose-50 border-rose-200",
  },
];

export function Publications() {
  return (
    <section id="publications" className="py-20 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          <p className="text-muted-foreground mt-4 font-mono text-xs uppercase tracking-wider">
            3 peer-reviewed papers · IEEE conferences
          </p>
        </motion.div>

        <div className="space-y-5 sm:space-y-7">
          {PUBLICATIONS.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -3 }}
              className="neon-glow-sm group relative overflow-hidden rounded-2xl border border-primary/45 bg-card/80 p-5 sm:p-7 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              {/* Left accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent" />

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                {/* Icon */}
                <div className="clip-hud-sm grid h-12 w-12 shrink-0 self-start place-items-center bg-primary/12 text-primary">
                  {pub.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-display font-bold text-foreground leading-snug mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-muted-foreground italic mb-3">{pub.authors}</p>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="clip-hud-sm border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-xs font-semibold text-primary">
                      {pub.venue}
                    </span>
                    <span className="text-xs text-muted-foreground">{pub.venueFullName}</span>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="text-primary">&gt; publisher</span> {pub.publisher}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span>{pub.location}</span>
                    <span className="w-1 h-1 rounded-full bg-primary/50" />
                    <span className="clip-hud-sm border border-border/70 bg-secondary/50 px-2 py-0.5 text-primary">{pub.year}</span>
                  </div>
                </div>

                <ExternalLink size={16} className="text-muted-foreground/50 shrink-0 self-start mt-1 hidden sm:block group-hover:text-primary transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
