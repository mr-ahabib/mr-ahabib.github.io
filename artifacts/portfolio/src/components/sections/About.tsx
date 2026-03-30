import { motion } from "framer-motion";
import { Download, Calendar, MapPin, Mail, Phone, User } from "lucide-react";

export function About() {
  const infoItems = [
    { icon: <User size={18} />, label: "Name", value: "Md. Ahashan Habib" },
    { icon: <Calendar size={18} />, label: "Date of birth", value: "July 14, 2000" },
    { icon: <MapPin size={18} />, label: "Address", value: "Dhaka-1212, Bangladesh" },
    { icon: <Mail size={18} />, label: "Email", value: "mr.ahashan261@gmail.com" },
    { icon: <Phone size={18} />, label: "Phone", value: "+8801709-180782" },
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden glass-card p-2 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="Md. Ahashan Habib"
                className="w-full h-full object-cover rounded-2xl grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                <span className="px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-sm font-medium shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for Freelance
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <h3 className="text-2xl font-display font-semibold mb-6 text-foreground">
              Machine Learning Researcher & Backend Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              I am currently pursuing my undergraduate degree in Computer Science & Engineering at United International University. My academic journey has sparked a deep interest in areas like artificial intelligence, blockchain, software developing, and research. I'm passionate about building scalable solutions and uncovering insights from complex data.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {infoItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl glass-card hover:bg-white/10 transition-colors">
                  <div className="text-primary bg-primary/10 p-3 rounded-lg">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://mr-ahabib.github.io/images/AhashanHabib.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-white text-background hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-primary/25 transition-all duration-300"
            >
              <Download size={20} />
              Download Full CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
