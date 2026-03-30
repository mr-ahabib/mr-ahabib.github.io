import { ArrowUp } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <a href="#home" className="text-2xl font-display font-bold text-foreground mb-2 block">
            Ahashan<span className="text-primary">.</span>
          </a>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Md. Ahashan Habib. All rights reserved.
          </p>
        </div>
        
        <button 
          onClick={scrollToTop}
          className="p-3 rounded-xl bg-white/5 border border-white/10 text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
