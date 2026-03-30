import { motion } from "framer-motion";
import { Github, ExternalLink, FolderGit2 } from "lucide-react";

const PROJECTS = [
  {
    title: "Student Assignment Auto Grading",
    description: "Django-based automated grading system utilizing Large Language Models to evaluate student code submissions.",
    tags: ["Django", "LLM", "Python", "Education"],
    link: "https://github.com/mr-ahabib/Django-App-LLM"
  },
  {
    title: "Patient Prescription Management",
    description: "Healthcare platform seamlessly integrating a React Native mobile app with Express and Flask backend APIs.",
    tags: ["React Native", "Express", "Flask", "Healthcare"],
    link: "https://github.com/mr-ahabib/DocLink"
  },
  {
    title: "Little Library DBMS",
    description: "Collaborative database management system designed to assist students and teaching assistants efficiently.",
    tags: ["DBMS", "SQL", "Web", "Academic"],
    link: "https://github.com/mr-ahabib/Little-Library"
  },
  {
    title: "FYDP Horizons",
    description: "Comprehensive Final Year Project Management System streamlining the project lifecycle for university students.",
    tags: ["Project Management", "Full Stack", "Web"],
    link: "https://github.com/mr-ahabib/fydp-horizons"
  },
  {
    title: "Django Note Taking",
    description: "A robust, scalable note-taking web application built with the Django framework for fast organization.",
    tags: ["Django", "Python", "CRUD", "Productivity"],
    link: "https://github.com/mr-ahabib/Django-Note"
  },
  {
    title: "UIU Innovative Horizons",
    description: "Desktop GUI application developed in Java tailored for university-specific management functions.",
    tags: ["Java", "GUI", "Desktop App", "OOP"],
    link: "https://github.com/mr-ahabib/UIU-INNOVATIVE-HORIZONS"
  }
];

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
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Featured <span className="text-gradient">Projects</span></h2>
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
              className="glass-card p-8 rounded-2xl flex flex-col h-full group hover:border-primary/40 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => window.open(project.link, "_blank")}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
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
                  <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-muted-foreground group-hover:border-white/20 transition-colors">
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
