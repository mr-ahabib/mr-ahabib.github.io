import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

const PROJECTS = [
  {
    title: "Bangla PDF RAG System",
    description: "An intelligent system that reads Bangla PDFs and provides accurate answers by combining OCR, semantic search, and AI-powered language understanding.",
    tags: ["FastAPI", "RAG", "React", "FAISS", "OCR"],
    link: "https://github.com/mr-ahabib"
  },
  {
    title: "RAG Q&A and MCQ Generator",
    description: "A RAG system that answers questions, supports chat, and generates MCQs from documents.",
    tags: ["FastAPI", "FAISS", "RAG", "React", "Llama"],
    link: "https://github.com/mr-ahabib"
  },
  {
    title: "Book Critic App",
    description: "Mobile app for discovering, reviewing, and discussing books with Redux state management and reusable components.",
    tags: ["React Native", "TypeScript", "Express.js", "Redux", "Expo"],
    link: "https://github.com/mr-ahabib"
  },
  {
    title: "DocLink",
    description: "Medical app that enables users to manage health records, receive condition insights through symptom-based disease classification, and scan documents.",
    tags: ["TypeScript", "React Native", "MySQL", "Express", "OCR"],
    link: "https://github.com/mr-ahabib/DocLink"
  },
  {
    title: "ShopSphere",
    description: "Eco-themed mobile shopping app featuring product browsing, wishlist, cart functionality, and smooth animated UI.",
    tags: ["React Native", "TypeScript", "Expo"],
    link: "https://github.com/mr-ahabib"
  },
  {
    title: "Django LMS",
    description: "LMS backend with role-based access control, JWT authentication, Stripe payments, and REST APIs.",
    tags: ["Django", "Python", "Stripe", "MySQL"],
    link: "https://github.com/mr-ahabib"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Featured <span className="text-gradient">Projects</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl flex flex-col h-full group hover:border-primary/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer bg-white"
              onClick={() => window.open(project.link, "_blank")}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-300">
                  <FolderGit2 size={28} />
                </div>
                <div className="flex gap-3 text-muted-foreground group-hover:text-primary transition-colors">
                  <Github size={22} />
                  <ExternalLink size={22} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
              
              <h3 className="text-xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border group-hover:border-primary/20 transition-colors">
                    {tag}
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