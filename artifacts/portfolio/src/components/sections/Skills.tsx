import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench } from "lucide-react";

const CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 size={20} />,
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "Solidity"],
  },
  {
    title: "Frameworks",
    icon: <Layers size={20} />,
    skills: ["FastAPI", "Django", "React", "React Native", "Node.js (Express.js)"],
  },
  {
    title: "Databases",
    icon: <Database size={20} />,
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    icon: <Brain size={20} />,
    skills: ["LLMs", "NLP", "Machine Learning", "Deep Learning", "RAG", "Transformers", "Hugging Face", "PyTorch", "TensorFlow", "LangChain"],
  },
  {
    title: "Technologies",
    icon: <Wrench size={20} />,
    skills: ["Blockchain", "Data Structures & Algorithms", "Digital Image Processing", "Git / GitHub"],
  },
];

const KEY_SKILLS = [
  { name: "Python", value: 92 },
  { name: "Machine Learning", value: 88 },
  { name: "React", value: 85 },
  { name: "LLM / RAG", value: 90 },
  { name: "Backend Dev", value: 83 },
  { name: "Research", value: 86 },
];

function CircularProgress({ name, value, index }: { name: string; value: number; index: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  const gradId = `ring-grad-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        <svg className="w-full h-full -rotate-90">
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
          <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-primary/10" />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 + 0.2 }}
            cx="50%"
            cy="50%"
            r={radius}
            stroke={`url(#${gradId})`}
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            style={{ filter: "drop-shadow(0 0 5px hsl(var(--primary) / 0.5))" }}
          />
        </svg>
        <span className="absolute text-sm font-display font-bold text-gradient">{value}%</span>
      </div>
      <span className="font-mono text-[11px] sm:text-xs text-muted-foreground text-center leading-tight px-1">{name}</span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Technical <span className="text-gradient">Proficiency</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Key skill rings */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-16 sm:mb-20">
          {KEY_SKILLS.map((skill, index) => (
            <CircularProgress key={skill.name} name={skill.name} value={skill.value} index={index} />
          ))}
        </div>

        {/* Skill category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl bg-gradient-to-br from-primary/40 via-border/50 to-accent/40 p-px shadow-lg shadow-primary/10 transition-all duration-300 hover:from-primary/70 hover:to-accent/70"
            >
              <div className="relative h-full overflow-hidden rounded-[calc(1rem-1px)] bg-card/80 p-5 sm:p-6 backdrop-blur-xl">
                {/* Gradient top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent" />
                {/* HUD corner bracket */}
                <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

                <div className="flex items-center gap-3 mb-5">
                  <div className="clip-hud-sm grid h-11 w-11 place-items-center bg-primary/15 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + i * 0.04 }}
                      className="clip-hud-sm border border-border/70 bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
