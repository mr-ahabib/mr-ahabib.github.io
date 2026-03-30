import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    role: "AI Project Co-ordinator",
    company: "Qanun Limited",
    date: "Feb 2026 – Present",
    location: "Dhaka, Bangladesh",
    current: true,
    bullets: [
      "Managed AI-based legal tech projects, including chatbot, OCR, and contract systems.",
      "Coordinated teams and ensured smooth project execution and delivery.",
      "Monitored AI performance, quality, and compliance with legal standards.",
    ],
  },
  {
    role: "AI/ML Engineer",
    company: "Ethics Advance Innovation Hub Ltd.",
    date: "Feb 2025 – Jan 2026",
    location: "Dhaka, Bangladesh",
    current: false,
    bullets: [
      "Applied domain-adapted LLMs with prompt engineering, document chunking, vector DBs, and RAG for a medical LMS.",
      "Ensured responsible AI practices, including fairness and bias mitigation.",
      "Deployed LLM-powered solutions into production, integrating them with web-based LMS applications for real-time use.",
    ],
  },
  {
    role: "Research Assistant",
    company: "United International University",
    date: "Aug 2024 – Jan 2025",
    location: "Dhaka, Bangladesh",
    current: false,
    bullets: [
      "Implemented and evaluated memory editing techniques to inject or update factual knowledge in LLMs.",
      "Worked on implementing techniques to merge multiple LLMs while preserving and integrating distinct factual knowledge.",
      "Explored reinforcement learning (RL)-based strategies to learn optimal edit locations and directions in transformer architectures.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Career</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />

          <div className="space-y-10">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="pl-16 md:pl-20 relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-6 top-6 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.2, type: "spring" }}
                    className={`w-5 h-5 rounded-full border-4 border-white shadow-md ${
                      exp.current ? "bg-primary shadow-primary/30" : "bg-white border-primary/60"
                    }`}
                  />
                  {exp.current && (
                    <span className="absolute w-5 h-5 rounded-full bg-primary/30 animate-ping" />
                  )}
                </div>

                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-l-2xl" />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-display font-bold text-foreground">{exp.role}</h3>
                        {exp.current && (
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <Briefcase size={16} />
                        <span>{exp.company}</span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 text-sm text-muted-foreground shrink-0">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{exp.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12 + i * 0.07 + 0.3 }}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed text-sm">{bullet}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
