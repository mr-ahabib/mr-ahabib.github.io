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
      return "Ahashan currently works as an AI/ML Engineer at Ethics Advance Technology Ltd (Feb 2025 – Present). He also worked as a Research Assistant at LUT University, Finland (Aug 2024 – Jan 2025).";
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
            className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-2xl shadow-2xl border border-border z-50 overflow-hidden flex flex-col h-[500px] max-h-[60vh]"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-primary-foreground flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <h3 className="font-semibold">Ask about Ahashan</h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-grow p-4 overflow-y-auto bg-secondary/30 flex flex-col gap-4">
              {messages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === "user" ? "bg-primary text-white" : "bg-white border border-border text-primary"}`}>
                    {msg.sender === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.sender === "user" 
                      ? "bg-primary text-white rounded-tr-none" 
                      : "bg-white border border-border text-foreground rounded-tl-none"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-2 mr-auto max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white border border-border text-primary flex items-center justify-center flex-shrink-0">
                    <Bot size={16} />
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-white border border-border flex gap-1 items-center">
                    <motion.div className="w-2 h-2 bg-primary/40 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-primary/60 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-primary/80 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-border flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-grow px-4 py-2 bg-secondary rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground"
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors disabled:opacity-50 flex-shrink-0"
              >
                <Send size={18} />
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
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white rounded-full shadow-lg shadow-primary/30 flex items-center justify-center z-50 hover:shadow-xl transition-shadow"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </>
  );
}