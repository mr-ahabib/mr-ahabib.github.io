import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const EXPERIENCES = [
  {
    role: "AI & Software Engineer",
    company: "As-Sunnah Foundation",
    date: "May 2026 – Present",
    location: "Dhaka, Bangladesh",
    current: true,
    bullets: [
      "Building AI-powered products and internal tools - from LLM/RAG features to full-stack web applications.",
      "Developing, deploying, and maintaining machine learning models integrated into production systems.",
      "Owning backend services and APIs that power the organisation's software platforms.",
    ],
  },
  {
    role: "AI Project Co-ordinator",
    company: "Qanun Limited (Contractual)",
    date: "Feb 2026 – Apr 2026",
    location: "Dhaka, Bangladesh",
    current: false,
    bullets: [
      "Managed AI-based legal tech projects, including enterprise knowledge base, OCR, Legal Research, and contract systems.",
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
    company: "LUT University, Finland",
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Career</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
            {EXPERIENCES.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-120px 0px" }}
                transition={{ delay: index * 0.1, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="group relative border-l-2 border-primary/25 pl-7 transition-colors duration-300 hover:border-primary/70"
              >
                {/* timeline node */}
                <span
                  className={`absolute -left-[7px] top-1.5 h-3 w-3 rotate-45 border-2 ${
                    exp.current
                      ? "border-primary bg-primary shadow-[0_0_10px_hsl(var(--primary)/0.8)]"
                      : "border-primary/60 bg-background"
                  }`}
                />

                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-display font-bold text-foreground">{exp.role}</h3>
                  {exp.current && (
                    <span className="clip-hud-sm bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Current
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 font-semibold text-primary">
                  <Briefcase size={15} />
                  <span>{exp.company}</span>
                </div>

                <div className="mt-1.5 mb-4 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} />
                    {exp.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                </div>

                <ul className="space-y-2">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-primary/60 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed text-sm">{bullet}</span>
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
