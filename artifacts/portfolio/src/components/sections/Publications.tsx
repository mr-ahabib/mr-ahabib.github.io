import { motion } from "framer-motion";
import { BookOpen, FileText } from "lucide-react";

const PUBLICATIONS = [
  {
    title: "A Secure Blockchain Based Brain Tumor Prediction Model Using Swin Transformers",
    venue: "2025 INDUSCON",
    location: "Brazil",
    year: "2025",
    icon: <BookOpen size={24} />
  },
  {
    title: "ADDomics: Enhancing Multiomics Fusion with Autoencoders and Deep Neural Networks",
    venue: "2025 TENSYMP",
    location: "New Zealand",
    year: "2025",
    icon: <FileText size={24} />
  },
  {
    title: "PyroVision: A Deep Learning Based Model for Wildfire Detection in Satellite Imagery",
    venue: "2024 ICEEICT",
    location: "Dhaka",
    year: "2024",
    icon: <FileText size={24} />
  }
];

export function Publications() {
  return (
    <section id="publications" className="py-24 bg-secondary/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Research <span className="text-gradient">Publications</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {PUBLICATIONS.map((pub, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:shadow-md transition-all duration-300 flex flex-col sm:flex-row gap-4 sm:items-center bg-white"
            >
              <div className="p-4 bg-primary/10 text-primary rounded-xl flex-shrink-0 self-start sm:self-center">
                {pub.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-foreground leading-snug mb-2">
                  "{pub.title}"
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{pub.venue}</span>
                  <span className="w-1 h-1 rounded-full bg-border"></span>
                  <span>{pub.location}</span>
                  <span className="w-1 h-1 rounded-full bg-border"></span>
                  <span className="bg-secondary px-2 py-0.5 rounded-md border border-border">{pub.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}