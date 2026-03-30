import { motion } from "framer-motion";
import { Download, Calendar, MapPin, Mail, Phone, User, Briefcase } from "lucide-react";

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
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">About <span className="text-gradient">Me</span></h2>
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
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
              <img
                src={`${import.meta.env.BASE_URL}images/avatar.png`}
                alt="Md. Ahashan Habib"
                className="w-full h-full object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap">
                <span className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border border-border text-foreground text-sm font-medium shadow-xl flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Currently working at Ethics Advance Technology Ltd
                </span>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
               <div className="bg-white border border-border rounded-xl px-6 py-4 shadow-sm flex items-center gap-4">
                 <div className="p-3 bg-primary/10 text-primary rounded-full">
                    <Briefcase size={24} />
                 </div>
                 <div>
                    <p className="text-sm text-muted-foreground font-medium">Education</p>
                    <p className="text-xl font-bold text-foreground">CGPA: 3.62</p>
                 </div>
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
              AI/ML Engineer & Full-Stack Developer
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-lg">
              AI/ML Engineer building production systems with LLMs, RAG, and deep learning. Full-stack developer experienced in scalable ML applications, medical AI platforms, and research. I bring together clean software engineering and cutting-edge AI.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {infoItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl glass-card hover:border-primary/30 hover:shadow-md transition-all">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-primary text-primary-foreground shadow-md shadow-primary/20 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
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