import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

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
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-white/80 backdrop-blur-sm border border-border rounded-2xl p-7 flex flex-col h-full group hover:border-primary/40 hover:shadow-xl shadow-sm transition-all duration-300 cursor-pointer relative overflow-hidden"
              onClick={() => window.open(project.link, "_blank")}
            >
              {/* Hover shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] to-accent/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

              <div className="flex justify-between items-start mb-5 relative">
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                >
                  <FolderGit2 size={26} />
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
                    className="text-xs font-medium px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground border border-border group-hover:border-primary/20 group-hover:bg-primary/5 transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
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
