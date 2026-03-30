import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Github, Send, Globe, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-3">Contact</p>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-3 text-foreground">Let's Connect</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base">
              Whether you have a question, a project idea, or just want to say hi — I'd love to hear from you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CONTACT_LINKS.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-3 p-3.5 rounded-xl glass-card hover:border-primary/30 hover:shadow-md group transition-all duration-200"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-200 shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">{item.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 p-3.5 rounded-xl glass-card">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Message form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-6 sm:p-8 md:p-10 rounded-3xl"
          >
            <h3 className="text-xl sm:text-2xl font-display font-bold mb-6 sm:mb-8 text-foreground">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200 text-sm"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200 text-sm"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl bg-white/80 border border-border text-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-200 resize-none text-sm"
                  placeholder="Tell me about your project or idea..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3.5 rounded-xl font-bold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                {!isSubmitting && <Send size={16} />}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
