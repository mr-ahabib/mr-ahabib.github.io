import { motion } from "framer-motion";

const LANGUAGES = [
  { name: "Java", level: 90 },
  { name: "C++", level: 95 },
  { name: "Solidity", level: 90 },
  { name: "C", level: 85 },
  { name: "Python", level: 85 },
  { name: "PHP", level: 80 },
  { name: "OOP", level: 80 },
  { name: "JavaScript", level: 70 },
];

const FRAMEWORKS = [
  { name: "MERN Stack", level: 95 },
  { name: "React", level: 90 },
  { name: "React Native", level: 90 },
  { name: "MySQL", level: 90 },
  { name: "Large Language Model", level: 90 },
  { name: "Machine Learning", level: 85 },
  { name: "MongoDB", level: 85 },
  { name: "Django", level: 80 },
  { name: "Blockchain", level: 80 },
  { name: "Flask API", level: 80 },
];

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-end mb-2">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-sm text-primary font-semibold">{level}%</span>
      </div>
      <div className="w-full h-2.5 bg-background rounded-full overflow-hidden border border-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-accent relative"
        >
          <div className="absolute top-0 right-0 bottom-0 w-10 bg-white/30 blur-[2px]" />
        </motion.div>
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Professional <span className="text-gradient">Skills</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center text-sm">&lt;/&gt;</span>
              Programming Languages
            </h3>
            <div>
              {LANGUAGES.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 rounded-2xl"
          >
            <h3 className="text-2xl font-display font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-accent/20 text-accent flex items-center justify-center text-sm">⚛</span>
              Frameworks & Technologies
            </h3>
            <div>
              {FRAMEWORKS.map((skill, i) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
