import { motion } from "framer-motion";
import { Smartphone, Microscope, Brain, MessageSquare, Code, Globe, ArrowUpRight } from "lucide-react";
import { WireCube } from "@/components/HudDecor";

const SERVICES = [
  {
    title: "Large Language Model",
    description: "Integrating and fine-tuning cutting-edge LLMs to build sophisticated AI-driven applications.",
    icon: <MessageSquare size={20} />
  },
  {
    title: "Machine Learning",
    description: "Developing intelligent models and algorithms to solve predictive and analytical problems.",
    icon: <Brain size={20} />
  },
  {
    title: "Full Stack Web Developing",
    description: "Creating comprehensive web applications with seamless frontend interfaces and powerful backends.",
    icon: <Globe size={20} />
  },
  {
    title: "Software Developing",
    description: "Architecting robust, scalable software solutions tailored to complex business requirements.",
    icon: <Code size={20} />
  },
  {
    title: "Cross Platform App Developing",
    description: "Building responsive, native-feeling mobile applications for both iOS and Android platforms.",
    icon: <Smartphone size={20} />
  },
  {
    title: "Research",
    description: "Conducting rigorous academic and technical research to uncover new insights in technology.",
    icon: <Microscope size={20} />
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* 3D wireframe fillers */}
      <WireCube size={48} className="right-[8%] top-16 hidden lg:block" />
      <WireCube size={30} className="left-[6%] bottom-20 hidden lg:block" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split layout: intro column left, service ledger right */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="lg:sticky lg:top-28">
              <span className="eyebrow">What I Do</span>
              <h2 className="mt-3 text-3xl md:text-5xl font-display font-bold text-foreground leading-tight">
                My <span className="text-gradient">Services</span>
              </h2>
              <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-primary via-accent to-accent-2" />
              <p className="mt-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
                From research notebooks to production systems — I take AI ideas
                all the way to software that real people use.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                06 disciplines · 01 pipeline
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-8">
            {SERVICES.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: index * 0.07 }}
                className="group flex items-start gap-5 border-b border-border/60 py-6 first:pt-0 last:border-b-0 sm:gap-7"
              >
                <span className="w-9 shrink-0 pt-1 font-mono text-sm font-semibold text-primary/40 transition-colors duration-300 group-hover:text-primary">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="clip-hud-sm grid h-11 w-11 shrink-0 place-items-center bg-primary/12 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  {service.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-display font-bold text-foreground transition-colors group-hover:text-primary">
                    {service.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-muted-foreground/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
