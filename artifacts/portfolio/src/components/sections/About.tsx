import { motion } from "framer-motion";
import { Download, Calendar, MapPin, Mail, Phone, User, Globe, Linkedin } from "lucide-react";

export function About() {
  const infoItems = [
    { icon: <User size={16} />, label: "Name", value: "Md. Ahashan Habib" },
    { icon: <MapPin size={16} />, label: "Address", value: "Uttar Badda, 1212, Dhaka, Bangladesh" },
    { icon: <Mail size={16} />, label: "Email", value: "mr.ahashan261@gmail.com" },
    { icon: <Phone size={16} />, label: "Phone", value: "(+880) 1709180782" },
    { icon: <Globe size={16} />, label: "Website", value: "mr-ahabib.github.io", link: "https://mr-ahabib.github.io/" },
    { icon: <Linkedin size={16} />, label: "LinkedIn", value: "md-ahashan-habib", link: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/" },
  ];

  return (
    <section id="about" className="py-20 sm:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Who I Am</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl transform rotate-3" />
              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl shadow-primary/15 aspect-[4/5]">
                <img
                  src={`${import.meta.env.BASE_URL}images/avatar.png`}
                  alt="Md. Ahashan Habib"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-border text-foreground text-xs font-semibold shadow-xl flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Currently at Qanun Limited
                  </span>
                </div>
              </div>
            </div>

            {/* CGPA badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-5 grid grid-cols-2 gap-4"
            >
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl font-display font-bold text-primary">3.62</p>
                <p className="text-xs text-muted-foreground mt-1">CGPA / 4.00</p>
              </div>
              <div className="glass-card rounded-2xl p-4 text-center">
                <p className="text-2xl font-display font-bold text-primary">3+</p>
                <p className="text-xs text-muted-foreground mt-1">Publications</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-4 text-foreground">
              AI/ML Engineer & Backend Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg">
              AI/ML Engineer building production systems with LLMs, RAG, and deep learning. Full-stack developer experienced in scalable ML applications, medical AI platforms, and research. I bring together clean software engineering and cutting-edge AI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="flex items-center gap-3 p-3.5 rounded-xl glass-card hover:border-primary/30 transition-all"
                >
                  <div className="text-primary bg-primary/10 p-2.5 rounded-lg shrink-0">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sm text-primary hover:underline truncate block"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-sm text-foreground truncate">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="https://mr-ahabib.github.io/images/AhashanHabib.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
            >
              <Download size={18} />
              Download Full CV
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
