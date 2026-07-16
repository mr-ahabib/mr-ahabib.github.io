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
    icon: <GraduationCap size={22} />,
  },
  {
    period: "Jul 2017 – Apr 2019",
    degree: "Higher Secondary Certificate (HSC)",
    field: "Science",
    institution: "Govt. Azizul Haque College, Bogra",
    location: "Bogra, Bangladesh",
    details: "GPA 4.83 / 5.00 · EQF Level 4",
    thesis: null,
    icon: <BookOpen size={22} />,
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Academic</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-12">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-120px 0px" }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="group relative border-l-2 border-primary/25 pl-7 transition-colors duration-300 hover:border-primary/70"
            >
              {/* rail node with the section icon */}
              <span className="absolute -left-[15px] top-0 grid h-7 w-7 place-items-center rounded-full border border-primary/50 bg-background text-primary">
                {item.icon}
              </span>

              <span className="mb-2 inline-block font-mono text-[11px] font-semibold uppercase tracking-wider text-primary">
                {item.period}
              </span>

              <h3 className="text-lg sm:text-xl font-display font-bold text-foreground leading-tight">
                {item.degree}
              </h3>
              <p className="text-primary font-semibold text-sm mt-0.5">{item.field}</p>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                <span className="font-medium">{item.institution}</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-primary/50" />
                <span className="font-mono text-xs">{item.location}</span>
              </div>

              <p className="mt-2 font-mono text-xs text-muted-foreground">{item.details}</p>

              {item.thesis && (
                <div className="mt-4 flex items-start gap-2.5 border-l border-primary/30 pl-3.5">
                  <BookOpen size={15} className="text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="eyebrow mb-1 text-[10px]">Thesis</p>
                    <p className="text-sm text-foreground/80 leading-relaxed italic">"{item.thesis}"</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
