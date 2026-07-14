import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Github, Globe, Linkedin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CHANNELS = [
  { icon: <Mail size={16} />, label: "Email", value: "mr.ahashan261@gmail.com", href: "mailto:mr.ahashan261@gmail.com" },
  { icon: <MapPin size={16} />, label: "Location", value: "Uttar Badda, Dhaka, BD", href: null },
  { icon: <Github size={16} />, label: "GitHub", value: "github.com/mr-ahabib", href: "https://github.com/mr-ahabib" },
  { icon: <Linkedin size={16} />, label: "LinkedIn", value: "md-ahashan-habib", href: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/" },
  { icon: <Globe size={16} />, label: "Website", value: "mr-ahabib.github.io", href: "https://mr-ahabib.github.io/" },
];

const INPUT =
  "w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none";

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message transmitted ✓",
      description: "Thanks for reaching out — I'll get back to you soon.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      <span className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Whether you have a question, a project idea, or just want to say hi — I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-glow-sm relative lg:col-span-3 rounded-2xl border border-primary/45 bg-card/80 p-6 sm:p-8 backdrop-blur-xl"
          >
            <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
            <p className="eyebrow mb-5">Send a message</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Name</label>
                <input
                  className={INPUT}
                  placeholder="your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Email</label>
                <input
                  type="email"
                  className={INPUT}
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Message</label>
              <textarea
                rows={5}
                className={`${INPUT} resize-none`}
                placeholder="tell me about your project or idea…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="clip-hud group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-primary to-accent px-7 py-3.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 [filter:drop-shadow(0_6px_16px_hsl(var(--primary)/0.4))]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Send size={17} />
              Transmit message
            </button>
          </motion.form>

          {/* Channels */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="neon-glow-sm relative lg:col-span-2 rounded-2xl border border-primary/45 bg-card/80 p-6 sm:p-7 backdrop-blur-xl"
          >
            <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
            <p className="eyebrow mb-5">Channels</p>

            <div className="space-y-3">
              {CHANNELS.map((c) => {
                const inner = (
                  <>
                    <div className="clip-hud-sm grid h-9 w-9 shrink-0 place-items-center bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      {c.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{c.label}</p>
                      <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">{c.value}</p>
                    </div>
                  </>
                );
                return c.href ? (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 p-2.5 transition-colors hover:border-primary/50"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={c.label} className="group flex items-center gap-3 rounded-lg border border-border/60 bg-secondary/30 p-2.5">
                    {inner}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
