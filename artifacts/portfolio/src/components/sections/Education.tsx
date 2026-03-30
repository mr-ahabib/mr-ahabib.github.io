import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

const EDUCATION_DATA = [
  {
    year: "2019 - 2023",
    title: "BSc in Computer Science & Engineering",
    institution: "United International University",
    details: "CGPA 3.62/4.00 | Software Champion",
    icon: <GraduationCap size={20} />
  },
  {
    year: "2017 - 2019",
    title: "Higher Secondary Certificate (HSC)",
    institution: "Govt. Azizul Haque College, Bogura",
    details: "GPA 4.83",
    icon: <GraduationCap size={20} />
  },
  {
    year: "2015 - 2016",
    title: "Secondary School Certificate (SSC)",
    institution: "BIAM Model School and College, Bogura",
    details: "GPA 5.00 | Scholarship",
    icon: <GraduationCap size={20} />
  },
  {
    year: "2014",
    title: "Junior School Certificate (JSC)",
    institution: "BIAM Model School and College, Bogura",
    details: "GPA 5.00 | 13th in Bogura Sadar | Scholarship",
    icon: <Award size={20} />
  },
  {
    year: "2011",
    title: "Primary School Certificate (PSC)",
    institution: "Model Govt. Primary School, Dupchanchia",
    details: "Scholarship",
    icon: <Award size={20} />
  }
];

export function Education() {
  return (
    <section id="education" className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Academic <span className="text-gradient">Background</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="relative border-l-2 border-primary/20 pl-8 ml-4 md:ml-0 md:pl-0 md:border-none">
          {/* Central vertical line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

          {EDUCATION_DATA.map((item, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.1 }}
                className={`mb-12 relative md:w-1/2 ${isEven ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"}`}
              >
                {/* Timeline Dot */}
                <div className={`absolute top-6 w-12 h-12 rounded-full bg-white border-4 border-primary flex items-center justify-center text-primary shadow-lg z-10 
                  -left-14 md:top-6 ${isEven ? "md:-right-6 md:left-auto" : "md:-left-6"}`}>
                  {item.icon}
                </div>

                <div className="glass-card p-6 rounded-2xl hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                  <span className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-sm font-semibold mb-3">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-display font-bold text-foreground mb-1">{item.title}</h3>
                  <h4 className="text-muted-foreground font-medium mb-3">{item.institution}</h4>
                  <p className="text-sm text-foreground/80 bg-secondary inline-block px-3 py-1 rounded border border-border">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}