import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench } from "lucide-react";

const CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 size={22} />,
    color: "from-indigo-500/20 to-violet-500/10",
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "Solidity"],
  },
  {
    title: "Frameworks",
    icon: <Layers size={22} />,
    color: "from-blue-500/20 to-cyan-500/10",
    skills: ["FastAPI", "Django", "React", "React Native", "Node.js (Express.js)"],
  },
  {
    title: "Databases",
    icon: <Database size={22} />,
    color: "from-emerald-500/20 to-green-500/10",
    skills: ["MySQL", "PostgreSQL"],
  },
  {
    title: "AI / ML",
    icon: <Brain size={22} />,
    color: "from-rose-500/20 to-pink-500/10",
    skills: ["LLMs", "NLP", "Machine Learning", "Deep Learning", "RAG", "Transformers", "Hugging Face", "PyTorch", "TensorFlow", "LangChain"],
  },
  {
    title: "Technologies",
    icon: <Wrench size={22} />,
    color: "from-amber-500/20 to-orange-500/10",
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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          <circle cx="50%" cy="50%" r={radius} stroke="currentColor" strokeWidth="7" fill="transparent" className="text-primary/10" />
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 + 0.2 }}
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="7"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        <span className="absolute text-xs sm:text-sm font-bold text-foreground">{value}%</span>
      </div>
      <span className="text-xs sm:text-sm font-medium text-muted-foreground text-center leading-tight px-1">{name}</span>
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
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Expertise</p>
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
              className="glass-card p-5 sm:p-6 rounded-2xl hover:shadow-lg hover:border-primary/25 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient top accent */}
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${category.color}`} />

              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2.5 bg-gradient-to-br ${category.color} text-primary rounded-xl`}>
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
                    className="px-2.5 py-1.5 bg-white/70 text-secondary-foreground text-xs sm:text-sm font-medium rounded-lg border border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
