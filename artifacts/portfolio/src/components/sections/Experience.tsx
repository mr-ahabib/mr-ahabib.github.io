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
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Career</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

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
                {/* Timeline node */}
                <div className="absolute left-6 md:left-8 top-7 -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12 + 0.2, type: "spring" }}
                    className={`h-4 w-4 rounded-full border-2 border-background ${
                      exp.current
                        ? "bg-primary shadow-[0_0_14px_hsl(var(--primary))]"
                        : "bg-card ring-1 ring-primary/60"
                    }`}
                  />
                  {exp.current && (
                    <span className="absolute h-4 w-4 rounded-full bg-primary/40 animate-ping" />
                  )}
                </div>

                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="group relative rounded-2xl bg-gradient-to-br from-primary/40 via-border/50 to-accent/40 p-px shadow-xl shadow-primary/10 transition-all duration-300 hover:from-primary/70 hover:to-accent/70"
                >
                  <div className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-card/80 p-6 md:p-8 backdrop-blur-xl">
                    {/* Left accent bar */}
                    <div className="absolute top-0 left-0 h-full w-1 bg-gradient-to-b from-primary to-accent" />
                    {/* HUD corner bracket */}
                    <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-display font-bold text-foreground">{exp.role}</h3>
                          {exp.current && (
                            <span className="clip-hud-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                              Current
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 font-semibold text-primary">
                          <Briefcase size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5 font-mono text-xs text-muted-foreground shrink-0">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} />
                          <span>{exp.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} />
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
                          <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-primary/70 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed text-sm">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
