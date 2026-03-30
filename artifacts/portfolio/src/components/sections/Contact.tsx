import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Globe, Linkedin } from "lucide-react";

const CONTACT_LINKS = [
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "mr.ahashan261@gmail.com",
    href: "mailto:mr.ahashan261@gmail.com",
  },
  {
    icon: <Phone size={20} />,
    label: "Phone",
    value: "(+880) 1709180782",
    href: "tel:+8801709180782",
  },
  {
    icon: <MapPin size={20} />,
    label: "Location",
    value: "Uttar Badda, 1212, Dhaka, Bangladesh",
    href: null,
  },
  {
    icon: <Globe size={20} />,
    label: "Website",
    value: "mr-ahabib.github.io",
    href: "https://mr-ahabib.github.io/",
  },
  {
    icon: <Github size={20} />,
    label: "GitHub",
    value: "github.com/mr-ahabib",
    href: "https://github.com/mr-ahabib",
  },
  {
    icon: <Linkedin size={20} />,
    label: "LinkedIn",
    value: "md-ahashan-habib",
    href: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/",
  },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            Whether you have a question, a project idea, or just want to say hi — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {CONTACT_LINKS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ y: -3 }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-2xl glass-card hover:border-primary/35 hover:shadow-lg group transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-250 shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                      {item.value}
                    </p>
                  </div>
                </a>
              ) : (
                <div className="flex items-center gap-4 p-4 rounded-2xl glass-card">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-foreground truncate">{item.value}</p>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
