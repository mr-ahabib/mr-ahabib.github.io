import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench, Globe } from "lucide-react";

const CATEGORIES = [
  {
    title: "Languages",
    icon: <Code2 size={24} />,
    skills: ["Python", "Java", "TypeScript", "C", "C++", "JavaScript", "Solidity"]
  },
  {
    title: "Frameworks",
    icon: <Layers size={24} />,
    skills: ["FastAPI", "Django", "Next.js", "React", "SQLAlchemy", "React Native", "Node.js", "Express.js"]
  },
  {
    title: "Databases",
    icon: <Database size={24} />,
    skills: ["MySQL", "PostgreSQL", "FAISS", "Vector DBs", "PgVector"]
  },
  {
    title: "Technologies",
    icon: <Globe size={24} />,
    skills: ["Blockchain", "DSA", "OCR", "JWT", "REST APIs", "Stripe", "Expo", "Redux", "Axios"]
  },
  {
    title: "AI/ML",
    icon: <Brain size={24} />,
    skills: ["LLMs", "RAG", "LangChain", "Transformers", "NLP", "Hugging Face", "Machine Learning", "PyTorch", "Pandas", "Deep Learning", "TensorFlow"]
  },
  {
    title: "Tools",
    icon: <Wrench size={24} />,
    skills: ["Git", "GitHub", "GitLab"]
  }
];

const KEY_SKILLS = [
  { name: "Python", value: 90 },
  { name: "Machine Learning", value: 88 },
  { name: "React", value: 90 },
  { name: "LLM/RAG", value: 92 },
  { name: "Full Stack", value: 85 },
  { name: "Research", value: 85 }
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
      className="flex flex-col items-center gap-3"
    >
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-primary/10"
          />
          {/* Progress circle */}
          <motion.circle
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: index * 0.1 + 0.2 }}
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            className="text-primary"
          />
        </svg>
        <span className="absolute text-sm font-bold text-foreground">{value}%</span>
      </div>
      <span className="text-sm font-medium text-muted-foreground text-center">{name}</span>
    </motion.div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Technical <span className="text-gradient">Proficiency</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        {/* Circular Key Skills */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-20">
          {KEY_SKILLS.map((skill, index) => (
            <CircularProgress key={skill.name} name={skill.name} value={skill.value} index={index} />
          ))}
        </div>

        {/* Skill Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 rounded-2xl hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/10 text-primary rounded-xl">
                  {category.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}