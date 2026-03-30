import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    role: "AI/ML Engineer",
    company: "Ethics Advance Technology Ltd",
    date: "Feb 2025 – Present",
    location: "Dhaka, Bangladesh",
    bullets: [
      "Applied domain-adapted LLMs with prompt engineering, document chunking, vector DBs, and RAG for a medical LMS.",
      "Ensured responsible AI practices including fairness and bias mitigation.",
      "Deployed LLM-powered solutions into production, integrating them with web-based LMS applications for real-time use."
    ]
  },
  {
    role: "Research Assistant",
    company: "LUT University, Finland",
    date: "Aug 2024 – Jan 2025",
    location: "Lappeenranta, Finland",
    bullets: [
      "Implemented and evaluated LLM memory editing techniques, including RL-based approaches for optimal edit locations and directions.",
      "Developed factual datasets and performed model ranking to assess accuracy and consistency.",
      "Explored multi-LLM merging to preserve distinct knowledge while maintaining performance."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-secondary/20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Work <span className="text-gradient">Experience</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 md:p-8 rounded-2xl hover:shadow-lg transition-shadow duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-primary to-accent" />
              
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <Briefcase size={18} />
                    <span>{exp.company}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2 md:justify-end">
                    <Calendar size={16} />
                    <span>{exp.date}</span>
                  </div>
                  <div className="flex items-center gap-2 md:justify-end">
                    <MapPin size={16} />
                    <span>{exp.location}</span>
                  </div>
                </div>
              </div>

              <ul className="mt-6 space-y-3">
                {exp.bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 flex-shrink-0" />
                    <span className="text-muted-foreground leading-relaxed">{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}