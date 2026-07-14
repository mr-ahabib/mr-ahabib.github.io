import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Hi there! 👋 I'm Ahashan's assistant. You can ask me about his experience, skills, projects, publications, education, or contact info!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: "user", text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Process rule-based response
    setTimeout(() => {
      const responseText = getResponse(userMessage.text.toLowerCase());
      const botMessage: Message = { id: Date.now().toString(), sender: "bot", text: responseText };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getResponse = (text: string) => {
    if (text.match(/\b(hello|hi|hey)\b/)) {
      return "Hi there! 👋 I'm Ahashan's assistant. You can ask me about his experience, skills, projects, publications, education, or contact info!";
    }
    if (text.match(/\b(experience|work|job)\b/)) {
      return "Ahashan is currently an AI Project Co-ordinator at Qanun Limited (Feb 2026 – Present). Previously he was an AI/ML Engineer at Ethics Advance Innovation Hub Ltd. (Feb 2025 – Jan 2026) and a Research Assistant at United International University (Aug–Jan 2025).";
    }
    if (text.match(/\b(skills|technology|tech)\b/)) {
      return "Ahashan is proficient in Python, TypeScript, Java, C++, and more. He specializes in AI/ML: LLMs, RAG, LangChain, PyTorch, TensorFlow. Frameworks: FastAPI, Django, React, Next.js, React Native, Node.js.";
    }
    if (text.match(/\b(project|projects)\b/)) {
      return "Ahashan has built several notable projects including a Bangla PDF RAG System, RAG Q&A Generator, DocLink (medical app), ShopSphere, and Django LMS. Visit his GitHub: github.com/mr-ahabib";
    }
    if (text.match(/\b(education|degree|university)\b/)) {
      return "Ahashan completed his B.Sc. in CSE from United International University with a CGPA of 3.62. He also studied at Govt. Azizul Haque College (HSC).";
    }
    if (text.match(/\b(publication|research|paper)\b/)) {
      return "Ahashan has 3 publications: Brain Tumor Prediction (INDUSCON 2025, Brazil), ADDomics multiomics fusion (TENSYMP 2025, New Zealand), and PyroVision wildfire detection (ICEEICT 2024, Dhaka).";
    }
    if (text.match(/\b(achievement|award|champion)\b/)) {
      return "Ahashan is a Kaggle Champion (UIU 2024), Software Lab Project Show Champion (UIU 2024), IEEE TENSYMP 2025 Reviewer, and received the Bangladesh Scouts Award from the Prime Minister (2012).";
    }
    if (text.match(/\b(contact|email|phone)\b/)) {
      return "You can reach Ahashan at mr.ahashan261@gmail.com or +8801709-180782. He's based in Dhaka, Bangladesh.";
    }
    if (text.match(/\b(linkedin)\b/)) {
      return "Connect with Ahashan on LinkedIn: linkedin.com/in/mr-ahabib";
    }
    if (text.match(/\b(github)\b/)) {
      return "Check out Ahashan's projects on GitHub: github.com/mr-ahabib";
    }
    
    return "I'm not sure about that. Try asking about Ahashan's experience, skills, projects, education, or contact info!";
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="neon-glow fixed bottom-24 right-6 z-50 flex h-[500px] max-h-[60vh] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-primary/60 bg-card/95 backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-primary/25 bg-background/60 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-primary">~/</span>
                <span className="font-semibold text-foreground">assistant</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close assistant"
                className="text-muted-foreground transition-colors hover:text-primary"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex flex-grow flex-col gap-4 overflow-y-auto bg-background/40 p-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div
                    className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                      msg.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border border-primary/50 bg-card text-primary"
                    }`}
                  >
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div
                    className={`rounded-2xl p-3 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "rounded-tr-none bg-primary text-primary-foreground"
                        : "rounded-tl-none border border-primary/25 bg-card/80 text-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="mr-auto flex max-w-[85%] gap-2">
                  <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-primary/50 bg-card text-primary">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-tl-none border border-primary/25 bg-card/80 p-4">
                    <motion.div className="h-2 w-2 rounded-full bg-primary/50" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="h-2 w-2 rounded-full bg-primary/70" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="h-2 w-2 rounded-full bg-primary" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex gap-2 border-t border-primary/25 bg-background/60 p-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="ask me anything..."
                className="flex-grow rounded-xl border border-border bg-secondary/40 px-4 py-2 font-mono text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Send"
                className="neon-glow-sm grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send size={17} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        className="neon-glow fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full border border-primary/60 bg-primary text-primary-foreground"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  );
}