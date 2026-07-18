import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Send, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


const SOCIALS = [
  { icon: <Github size={18} />, label: "GitHub", href: "https://github.com/mr-ahabib" },
  { icon: <Linkedin size={18} />, label: "LinkedIn", href: "https://www.linkedin.com/in/md-ahashan-habib-9a81212a5/" },
  { icon: <GraduationCap size={18} />, label: "Google Scholar", href: "https://scholar.google.com/citations?user=PSvun2MAAAAJ&hl=en" },
];

const INPUT =
  "w-full rounded-lg border border-border bg-secondary/40 px-4 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/50 transition-colors focus:border-primary focus:outline-none";

export function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    try {
      const res = await fetch("https://formsubmit.co/ajax/mr.ahashan261@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
          _subject: `Portfolio message from ${form.name}`,
          _template: "table",
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({
        title: "Message transmitted ✓",
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      setForm({ name: "", email: "", message: "" });
    } catch {
      toast({
        title: "Transmission failed",
        description: "Something went wrong — please email me directly at mr.ahashan261@gmail.com.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 relative overflow-hidden">
      <span className="pointer-events-none absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent" />


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-12 sm:mb-14"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Contact</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full mb-5" />
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
            Whether you have a question, a project idea, or just want to say hi - I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          {/* ── Left — direct connect ── */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px 0px" }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="eyebrow mb-4">Direct line</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold leading-tight text-foreground">
                Let&apos;s build something <span className="text-gradient">worth shipping.</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                Fastest way to reach me is email - or drop a message on the right. I usually reply within a day.
              </p>

              {/* big email CTA */}
              <a
                href="mailto:mr.ahashan261@gmail.com"
                className="group mt-7 flex items-center gap-4 rounded-2xl border border-primary/45 bg-card/60 p-4 backdrop-blur-xl transition-colors hover:border-primary neon-glow-sm"
              >
                <span className="clip-hud-sm grid h-11 w-11 shrink-0 place-items-center bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Email me</p>
                  <p className="truncate font-medium text-foreground transition-colors group-hover:text-primary">mr.ahashan261@gmail.com</p>
                </div>
              </a>

              {/* phone CTA */}
              <a
                href="tel:+8801709180782"
                className="group mt-4 flex items-center gap-4 rounded-2xl border border-primary/45 bg-card/60 p-4 backdrop-blur-xl transition-colors hover:border-primary neon-glow-sm"
              >
                <span className="clip-hud-sm grid h-11 w-11 shrink-0 place-items-center bg-primary/12 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Phone size={18} />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Call me</p>
                  <p className="truncate font-medium text-foreground transition-colors group-hover:text-primary">+880 1709-180782</p>
                </div>
              </a>

              {/* location */}
              <div className="mt-4 flex items-center gap-2.5 font-mono text-xs text-muted-foreground">
                <MapPin size={14} className="text-primary" />
                Uttar Badda, Dhaka, Bangladesh
              </div>
            </div>

            {/* social rail */}
            <div className="mt-8">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Find me elsewhere</p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    title={s.label}
                    className="group grid h-12 w-12 place-items-center rounded-xl border border-border/70 bg-secondary/30 text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:text-primary"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── Right — Form ── */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px 0px" }}
            className="neon-glow-sm relative rounded-2xl border border-primary/45 bg-card/80 p-6 sm:p-8 backdrop-blur-xl"
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
              disabled={sending}
              className="clip-hud group relative mt-6 inline-flex w-full items-center justify-center gap-2 overflow-hidden bg-gradient-to-r from-primary via-accent to-accent-2 px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 [filter:drop-shadow(0_6px_16px_hsl(var(--primary)/0.4))]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <Send size={17} className={sending ? "animate-pulse" : undefined} />
              {sending ? "Transmitting…" : "Transmit message"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
