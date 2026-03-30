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
      {/* Decorative gradients */}
      <div className="absolute top-1/4 -right-64 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-64 w-96 h-96 bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">My <span className="text-gradient">Services</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl group hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-background/50 border border-white/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
