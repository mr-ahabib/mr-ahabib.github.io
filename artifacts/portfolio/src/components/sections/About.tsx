import { motion } from "framer-motion";
import { MapPin, Mail, Phone, User, Globe, Linkedin } from "lucide-react";

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
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Who I Am</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">About <span className="text-gradient">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Photo column — holographic frame */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="relative max-w-sm mx-auto lg:max-w-none">
              {/* ambient glow */}
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/25 via-transparent to-accent/25 opacity-60 blur-2xl" />
              {/* gradient border frame */}
              <div className="relative rounded-3xl bg-gradient-to-br from-primary/60 via-border/50 to-accent/60 p-px shadow-2xl shadow-primary/20">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[calc(1.5rem-1px)] bg-card">
                  <img
                    src={`${import.meta.env.BASE_URL}images/avatar.png`}
                    alt="Md. Ahashan Habib"
                    className="w-full h-full object-cover object-top"
                  />
                  {/* holographic tint + scanlines */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-accent/15 mix-blend-screen" />
                  <div className="holo-scanlines absolute inset-0 opacity-30" />
                  {/* status badge */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="flex items-center gap-2 rounded-full border border-primary/30 bg-card/80 px-4 py-2 text-xs font-medium text-foreground shadow-lg backdrop-blur-md">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                      Currently at Qanun Limited
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <p className="eyebrow mb-3">Profile</p>
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-4 text-foreground">
              AI/ML Engineer &amp; Backend Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-base sm:text-lg">
              AI/ML Engineer building production systems with LLMs, RAG, and deep learning. Full-stack developer experienced in scalable ML applications, medical AI platforms, and research. I bring together clean software engineering and cutting-edge AI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {infoItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card flex items-center gap-3 rounded-xl p-3.5 hover:border-primary/40 transition-all"
                >
                  <div className="clip-hud-sm shrink-0 bg-primary/12 p-2.5 text-primary">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{item.label}</p>
                    {item.link ? (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block truncate text-sm font-medium text-primary hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="truncate text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
