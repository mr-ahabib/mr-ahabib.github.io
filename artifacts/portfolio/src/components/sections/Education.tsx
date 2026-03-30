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
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Academic</p>
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
            >
              <div className="glass-card rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-primary/30 transition-all duration-300 relative overflow-hidden">
                {/* Gradient accent top bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.color}`} />

                <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                  {/* Icon */}
                  <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-primary shadow-sm`}>
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Period badge */}
                    <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3 border border-primary/20">
                      {item.period}
                    </span>

                    <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-tight">
                      {item.degree}
                    </h3>
                    <p className="text-primary font-semibold text-sm mt-0.5">{item.field}</p>

                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-muted-foreground">
                      <span className="font-medium">{item.institution}</span>
                      <span className="hidden sm:block w-1 h-1 rounded-full bg-border" />
                      <span>{item.location}</span>
                    </div>

                    <p className="mt-3 text-sm text-foreground/70 bg-secondary/60 inline-block px-3 py-1.5 rounded-lg border border-border/60">
                      {item.details}
                    </p>

                    {item.thesis && (
                      <div className="mt-4 flex items-start gap-2.5 p-3.5 rounded-xl bg-primary/5 border border-primary/15">
                        <BookOpen size={15} className="text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs text-primary font-semibold mb-0.5">Thesis</p>
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
