import { motion } from "framer-motion";
import { Smartphone, Microscope, Brain, MessageSquare, Code, Globe } from "lucide-react";


const SERVICES = [
  {
    title: "Cross Platform App Developing",
    description: "Building responsive, native-feeling mobile applications for both iOS and Android platforms.",
    icon: <Smartphone size={32} />
  },
  {
    title: "Research",
    description: "Conducting rigorous academic and technical research to uncover new insights in technology.",
    icon: <Microscope size={32} />
  },
  {
    title: "Machine Learning",
    description: "Developing intelligent models and algorithms to solve predictive and analytical problems.",
    icon: <Brain size={32} />
  },
  {
    title: "Large Language Model",
    description: "Integrating and fine-tuning cutting-edge LLMs to build sophisticated AI-driven applications.",
    icon: <MessageSquare size={32} />
  },
  {
    title: "Software Developing",
    description: "Architecting robust, scalable software solutions tailored to complex business requirements.",
    icon: <Code size={32} />
  },
  {
    title: "Full Stack Web Developing",
    description: "Creating comprehensive web applications with seamless frontend interfaces and powerful backends.",
    icon: <Globe size={32} />
  }
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">What I Do</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">My <span className="text-gradient">Services</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        {/* Open icon grid — no boxes; the cut-corner tile is the anchor */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-14">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="group"
            >
              <div className="mb-5 flex items-end justify-between">
                <div className="clip-hud-sm grid h-14 w-14 place-items-center bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105">
                  {service.icon}
                </div>
                <span className="font-mono text-2xl font-bold text-primary/20 transition-colors duration-300 group-hover:text-primary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2 transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
              <span className="mt-4 block h-px w-12 bg-gradient-to-r from-primary via-accent to-accent-2 transition-all duration-300 group-hover:w-24" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
