import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Code2, Database, Layers, Brain, Wrench, ServerCog } from "lucide-react";
import { Tilt3D } from "@/components/Tilt3D";
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

/** Same footprint as the radar panel so the lazy swap causes no layout shift. */
function RadarFallback() {
  return (
    <div className="neon-glow-sm relative mx-auto mb-16 sm:mb-20 h-[434px] max-w-3xl rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl sm:h-[510px]">
      <div className="grid h-full place-items-center font-mono text-xs text-muted-foreground">
        loading capability_matrix…
      </div>
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

        {/* Capability radar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Suspense fallback={<RadarFallback />}>
            <CapabilityRadar />
          </Suspense>
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
              className="h-full"
            >
              <Tilt3D className="neon-glow-sm group relative h-full rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl transition-colors duration-300 hover:border-primary">
              <div className="relative h-full overflow-hidden rounded-2xl p-5 sm:p-6">
                {/* Gradient top accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-accent-2" />
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
              </Tilt3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
