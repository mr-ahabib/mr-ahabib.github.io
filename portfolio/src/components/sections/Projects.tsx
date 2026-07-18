import { motion } from "framer-motion";
import {
  Github,
  ArrowUpRight,
  Radio,
  Bot,
  ScanText,
  GraduationCap,
  FileText,
  MessagesSquare,
  BookOpen,
  Stethoscope,
  ShoppingBag,
  Server,
} from "lucide-react";
import type { ReactNode } from "react";

type Project = {
  title: string;
  domain: string;
  link: string;
  description: string;
  tags: string[];
  icon: ReactNode;
  live?: boolean;
};

const LIVE_PROJECTS: Project[] = [
  {
    title: "Islamic GPT",
    domain: "gpt-dev.asf.sh",
    link: "https://gpt-dev.asf.sh/",
    description:
      "AI-powered Islamic knowledge assistant - answers in Bangla & English with verified references from the Qur'an, Hadith, and scholars.",
    tags: ["LLM", "RAG", "FastAPI", "React", "PgVector"],
    icon: <Bot size={22} />,
  },
  {
    title: "DoceanAI Cloud",
    domain: "doceanai.cloud",
    link: "https://doceanai.cloud/",
    description:
      "Cloud-based document intelligence - advanced OCR, document understanding, and NLP that turn scanned files into AI-ready knowledge bases.",
    tags: ["OCR", "LLM", "Knowledge Base", "FastAPI", "React"],
    icon: <ScanText size={22} />,
  },
  {
    title: "AI Medical LMS",
    domain: "ai-lms.eatlbd.com",
    link: "https://ai-lms.eatlbd.com/",
    description:
      "AI medical-education platform with intelligent tutoring, domain-adapted LLMs + RAG for personalised learning, and automated assessments.",
    tags: ["LLMs", "RAG", "Vector DB", "FastAPI", "React"],
    icon: <GraduationCap size={22} />,
  },
];

const PROJECTS: Project[] = [
  {
    title: "Bangla PDF RAG System",
    domain: "github.com/mr-ahabib/RAG_API",
    link: "https://github.com/mr-ahabib/RAG_API",
    description:
      "Reads Bangla PDFs and answers accurately by combining OCR, semantic search, and AI-powered language understanding.",
    tags: ["FastAPI", "RAG", "React", "FAISS", "OCR"],
    icon: <FileText size={22} />,
  },
  {
    title: "RAG Q&A and MCQ Generator",
    domain: "github.com/mr-ahabib/RAG_MCQ_QA",
    link: "https://github.com/mr-ahabib/RAG_MCQ_QA",
    description:
      "A RAG system that answers questions, supports chat, and generates MCQs from documents — FastAPI backend with a React frontend.",
    tags: ["FastAPI", "FAISS", "RAG", "React", "Llama"],
    icon: <MessagesSquare size={22} />,
  },
  {
    title: "Book Critic App",
    domain: "github.com/mr-ahabib/Book_Critic",
    link: "https://github.com/mr-ahabib/Book_Critic",
    description:
      "Mobile app for discovering, reviewing, and discussing books, with Redux state management, pagination, and reusable components.",
    tags: ["React Native", "TypeScript", "Express.js", "Redux", "Expo"],
    icon: <BookOpen size={22} />,
  },
  {
    title: "DocLink",
    domain: "github.com/mr-ahabib/DocLink",
    link: "https://github.com/mr-ahabib/DocLink",
    description:
      "Medical app to manage health records, get condition insights via symptom-based disease classification, and scan documents with OCR.",
    tags: ["TypeScript", "React Native", "MySQL", "Express", "OCR"],
    icon: <Stethoscope size={22} />,
  },
  {
    title: "ShopSphere",
    domain: "github.com/mr-ahabib",
    link: "https://github.com/mr-ahabib",
    description:
      "Eco-themed mobile shopping app featuring product browsing, wishlist, cart functionality, and smooth animated UI.",
    tags: ["React Native", "TypeScript", "Expo"],
    icon: <ShoppingBag size={22} />,
  },
  {
    title: "Django LMS",
    domain: "github.com/mr-ahabib",
    link: "https://github.com/mr-ahabib",
    description:
      "LMS backend with role-based access control, JWT authentication, Stripe payments, and REST APIs.",
    tags: ["Django", "Python", "Stripe", "MySQL"],
    icon: <Server size={22} />,
  },
];

/** Grid card — icon-led, no screenshot. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px 0px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      className="clip-hud group relative flex h-full min-h-[15rem] flex-col overflow-hidden border border-primary/40 bg-card/80 p-5 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary [filter:drop-shadow(0_10px_22px_hsl(var(--primary)/0.12))] hover:[filter:drop-shadow(0_14px_28px_hsl(var(--primary)/0.28))]"
    >
      {/* sheen sweep on hover — same as the Download CV button */}
      <span className="pointer-events-none absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="mb-3 flex items-center justify-between">
        <div className="clip-hud-sm grid h-10 w-10 place-items-center bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
          {project.icon}
        </div>
        {project.live ? (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        ) : (
          <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            <Github size={12} />
            Repo
          </span>
        )}
      </div>

      <h3 className="truncate font-display text-base font-bold text-foreground transition-colors group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mb-2 flex items-center gap-1.5 truncate font-mono text-[11px] text-primary/80">
        {project.domain}
        <ArrowUpRight size={11} className="shrink-0 opacity-60 transition-opacity group-hover:opacity-100" />
      </p>
      <p className="mb-4 line-clamp-2 flex-grow text-[13px] leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-auto flex flex-wrap gap-1.5">
        {project.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="clip-hud-sm border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary/90"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.a>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-14"
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
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="mb-6 flex items-center gap-3"
        >
          <Radio size={15} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Live in production</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {LIVE_PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} project={{ ...p, live: true }} index={i} />
          ))}
        </div>

        {/* ── Open source / side projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="mb-6 flex items-center gap-3"
        >
          <Github size={15} className="text-primary" />
          <span className="font-mono text-xs uppercase tracking-widest text-primary">// Open source &amp; builds</span>
          <span className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title + i} project={p} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mt-14"
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
