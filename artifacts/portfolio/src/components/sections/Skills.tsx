import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench } from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
  { skill: "Python", value: 92 },
  { skill: "ML", value: 88 },
  { skill: "React", value: 85 },
  { skill: "LLM/RAG", value: 90 },
  { skill: "Backend", value: 83 },
  { skill: "Research", value: 86 },
];

function CapabilityRadar() {
  return (
    <div className="neon-glow-sm relative mx-auto mb-16 sm:mb-20 max-w-3xl rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-2xl p-5 sm:p-7">
        {/* HUD corner brackets */}
        <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
        <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-primary/40" />

        <div className="mb-2 flex items-center justify-between">
          <span className="eyebrow">capability_matrix</span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            6 vectors tracked
          </span>
        </div>

        <div className="h-[320px] w-full sm:h-[380px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={KEY_SKILLS} outerRadius="65%" margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.6} />
              <PolarAngleAxis
                dataKey="skill"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#radarFill)"
                fillOpacity={0.65}
                dot={{ r: 3, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                isAnimationActive
                animationDuration={1200}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--primary))" }}
                formatter={(v: number) => [`${v}%`, "proficiency"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Numeric legend */}
        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          {KEY_SKILLS.map((s) => (
            <span key={s.skill}>
              <span className="text-primary font-semibold">{s.value}%</span> {s.skill}
            </span>
          ))}
        </div>
      </div>
    </div>
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

        {/* Capability radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <CapabilityRadar />
        </motion.div>

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
              className="neon-glow-sm group relative rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              <div className="relative h-full overflow-hidden rounded-2xl p-5 sm:p-6">
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
