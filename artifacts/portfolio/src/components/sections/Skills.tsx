import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench, ServerCog } from "lucide-react";
import { WireCube } from "@/components/HudDecor";

// recharts is heavy — load the radar in its own chunk, off the critical path
const CapabilityRadar = lazy(() => import("@/components/CapabilityRadar"));

const CATEGORIES = [
  {
    title: "AI / ML",
    icon: <Brain size={20} />,
    skills: ["LLMs", "NLP", "Deep Learning", "RAG", "PyTorch", "TensorFlow", "Transformers", "Hugging Face", "LangChain", "Scikit-learn"],
  },
  {
    title: "Specialized",
    icon: <Wrench size={20} />,
    skills: ["OCR", "Computer Vision", "Document Processing", "Knowledge Base Systems", "Blockchain"],
  },
  {
    title: "Languages",
    icon: <Code2 size={20} />,
    skills: ["Python", "Java", "TypeScript", "JavaScript", "C", "C++", "Solidity"],
  },
  {
    title: "Frameworks",
    icon: <Layers size={20} />,
    skills: ["FastAPI", "Django", "React", "React Native", "Node.js", "Express.js"],
  },
  {
    title: "Databases",
    icon: <Database size={20} />,
    skills: ["PostgreSQL", "MySQL", "FAISS", "PgVector", "Vector Databases"],
  },
  {
    title: "DevOps & Tools",
    icon: <ServerCog size={20} />,
    skills: ["Docker", "Git", "CI/CD", "Linux", "REST APIs", "JWT / OAuth2", "HPC (LUMI)"],
  },
];

/** Same footprint as the radar so the lazy swap causes no layout shift. */
function RadarFallback() {
  return (
    <div className="grid h-[380px] place-items-center font-mono text-xs text-muted-foreground sm:h-[420px]">
      loading capability_matrix…
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24 relative overflow-hidden">
      {/* 3D wireframe fillers */}
      <WireCube size={42} className="left-[7%] top-24 hidden lg:block" />
      <WireCube size={28} className="right-[9%] bottom-32 hidden lg:block" />

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
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        {/* Radar instrument + skill matrix, side by side on wide screens */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Suspense fallback={<RadarFallback />}>
              <CapabilityRadar />
            </Suspense>
          </motion.div>

          {/* Skill matrix — open rows, one per category, split by hairlines */}
          <div className="divide-y divide-border/60 lg:col-span-3">
            {CATEGORIES.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: index * 0.06 }}
                className="flex flex-col gap-3 py-5 sm:flex-row sm:items-start sm:gap-8"
              >
                <div className="flex items-center gap-3 sm:w-44 sm:shrink-0 sm:pt-1">
                  <div className="clip-hud-sm grid h-9 w-9 shrink-0 place-items-center bg-primary/12 text-primary">
                    {category.icon}
                  </div>
                  <h3 className="text-base font-display font-bold text-foreground">{category.title}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.04 + i * 0.03 }}
                      className="clip-hud-sm border border-border/70 bg-secondary/50 px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
