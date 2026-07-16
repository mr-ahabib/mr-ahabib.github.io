import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2, Bot, ScanText, GraduationCap, Radio } from "lucide-react";
import { Tilt3D } from "@/components/Tilt3D";

const LIVE_PROJECTS = [
  {
    title: "Islamic GPT",
    domain: "gpt-dev.asf.sh",
    link: "https://gpt-dev.asf.sh/",
    description:
      "AI-powered Islamic knowledge assistant for As-Sunnah Foundation — answers questions in Bangla & English with verified references from the Qur'an, Hadith, and Islamic scholars.",
    impact: "Mufti-verified sources · bilingual",
    tags: ["LLM", "RAG", "FastAPI", "React", "PgVector"],
    icon: <Bot size={26} />,
  },
  {
    title: "DoceanAI Cloud",
    domain: "doceanai.cloud",
    link: "https://doceanai.cloud/",
    description:
      "Cloud-based intelligent document processing platform — advanced OCR, document understanding, and NLP that turn scanned files into searchable, AI-ready knowledge bases.",
    impact: "Production-grade document AI platform",
    tags: ["OCR", "LLM", "Knowledge Base", "FastAPI", "React"],
    icon: <ScanText size={26} />,
  },
  {
    title: "AI Medical LMS",
    domain: "ai-lms.eatlbd.com",
    link: "https://ai-lms.eatlbd.com/",
    description:
      "AI-powered medical education platform with intelligent tutoring, domain-adapted LLMs with RAG for personalised learning, and automated assessment generation.",
    impact: "Serving 800+ medical students",
    tags: ["LLMs", "RAG", "Vector DB", "FastAPI", "React"],
    icon: <GraduationCap size={26} />,
  },
];

const PROJECTS = [
  {
    title: "Bangla PDF RAG System",
    description: "An intelligent system that reads Bangla PDFs and provides accurate answers by combining OCR, semantic search, and AI-powered language understanding.",
    tags: ["FastAPI", "RAG", "React", "FAISS", "OCR"],
    link: "https://github.com/mr-ahabib/RAG_API",
  },
  {
    title: "RAG Q&A and MCQ Generator",
    description: "A RAG system that answers questions, supports chat, and generates MCQs from documents, with FastAPI backend and React frontend for an interactive experience.",
    tags: ["FastAPI", "FAISS", "RAG", "React", "Llama"],
    link: "https://github.com/mr-ahabib/RAG_MCQ_QA",
  },
  {
    title: "Book Critic App",
    description: "Mobile app for discovering, reviewing, and discussing books with Redux state management, pagination, and reusable components.",
    tags: ["React Native", "TypeScript", "Express.js", "Redux", "Expo"],
    link: "https://github.com/mr-ahabib/Book_Critic",
  },
  {
    title: "DocLink",
    description: "Medical app that enables users to manage health records, get condition insights through symptom-based disease classification, and scan documents using OCR.",
    tags: ["TypeScript", "React Native", "MySQL", "Express", "OCR"],
    link: "https://github.com/mr-ahabib/DocLink",
  },
  {
    title: "ShopSphere",
    description: "Eco-themed mobile shopping app featuring product browsing, wishlist, cart functionality, and smooth animated UI.",
    tags: ["React Native", "TypeScript", "Expo"],
    link: "https://github.com/mr-ahabib",
  },
  {
    title: "Django LMS",
    description: "LMS backend with role-based access control, JWT authentication, Stripe payments, and REST APIs.",
    tags: ["Django", "Python", "Stripe", "MySQL"],
    link: "https://github.com/mr-ahabib",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Portfolio</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        {/* ── Live production systems ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-3"
        >
          <Radio size={15} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Live in production</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {LIVE_PROJECTS.map((project) => (
            <Tilt3D key={project.title} className="h-full">
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              variants={cardVariants}
              className="neon-glow-sm group relative flex h-full flex-col overflow-hidden rounded-2xl border border-primary/60 bg-card/80 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
            >
              {/* Gradient top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-accent-2" />
              {/* HUD corner bracket */}
              <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

              <div className="mb-5 flex items-start justify-between relative">
                <div className="clip-hud-sm grid h-12 w-12 place-items-center bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {project.icon}
                </div>
                {/* LIVE badge */}
                <span className="mr-6 flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </div>

              <h3 className="text-lg font-display font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="mb-3 flex items-center gap-1.5 font-mono text-xs text-primary/90">
                {project.domain}
                <ExternalLink size={12} className="opacity-60 transition-opacity group-hover:opacity-100" />
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              <p className="mb-4 flex items-center gap-2 font-mono text-xs text-foreground/80">
                <span className="text-primary">&gt;</span> {project.impact}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="clip-hud-sm border border-border/70 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.a>
            </Tilt3D>
          ))}
        </motion.div>

        {/* ── Open source / side projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 flex items-center gap-3"
        >
          <Github size={15} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Open source &amp; builds</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {PROJECTS.map((project, index) => (
            <Tilt3D key={index} className="h-full">
            <motion.div
              variants={cardVariants}
              className="neon-glow-sm group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-primary/45 bg-card/80 p-7 backdrop-blur-xl transition-colors duration-300 hover:border-primary"
              onClick={() => window.open(project.link, "_blank", "noopener,noreferrer")}
            >
              {/* HUD corner bracket */}
              <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />

              <div className="flex justify-between items-start mb-5 relative">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="clip-hud-sm grid h-12 w-12 place-items-center bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
                >
                  <FolderGit2 size={24} />
                </motion.div>
                <div className="flex gap-2.5 text-muted-foreground">
                  <Github size={20} className="group-hover:text-foreground transition-colors" />
                  <ExternalLink size={20} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </div>
              </div>

              <h3 className="text-lg font-display font-bold text-foreground mb-2.5 group-hover:text-primary transition-colors relative">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5 flex-grow relative">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-auto relative">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="clip-hud-sm border border-border/70 bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
            </Tilt3D>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="https://github.com/mr-ahabib"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 font-medium text-sm"
          >
            <Github size={18} />
            View all projects on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}
