import { motion } from "framer-motion";
import { GraduationCap, BookOpen } from "lucide-react";

const EDUCATION_DATA = [
  {
    period: "Jan 2020 – Dec 2024",
    degree: "Bachelor of Science",
    field: "Computer Science and Engineering",
    institution: "United International University",
    location: "Dhaka, Bangladesh",
    details: "Final Grade: CGPA 3.62 / 4.00 · EQF Level 6",
    thesis: "A Secure Blockchain Based Brain Tumor Prediction By Using Swin Transformer",
    color: "from-primary/20 to-accent/10",
    icon: <GraduationCap size={22} />,
  },
  {
    period: "Jul 2017 – Apr 2019",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    institution: "Govt. Azizul Haque College, Bogra",
    location: "Bogra, Bangladesh",
    details: "EQF Level 4",
    thesis: null,
    color: "from-blue-500/20 to-indigo-500/10",
    icon: <BookOpen size={22} />,
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Academic</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-8">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="neon-glow-sm group relative rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8">
                {/* Gradient accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
                {/* HUD corner bracket */}
                <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Icon tile */}
                  <div className="clip-hud-sm grid h-14 w-14 shrink-0 place-items-center bg-primary/15 text-primary">
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Period chip */}
                    <span className="clip-hud-sm mb-3 inline-block bg-primary/12 px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                      {item.period}
                    </span>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-tight">
                      {item.degree}
                    </h3>
                    <p className="text-primary font-semibold text-sm mt-0.5">{item.field}</p>

                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                      <span className="font-medium">{item.institution}</span>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-primary/50" />
                      <span className="font-mono text-xs">{item.location}</span>
                    </div>

                    <p className="clip-hud-sm mt-3 inline-block border border-border/60 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-muted-foreground">
                      {item.details}
                    </p>

                    {item.thesis && (
                      <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-3.5">
                        <BookOpen size={15} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="eyebrow mb-1 text-[10px]">Thesis</p>
                          <p className="text-sm text-foreground/80 leading-relaxed italic">"{item.thesis}"</p>
                        </div>
                      </div>
                    )}
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
