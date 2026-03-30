import { useState, useEffect } from "react";

export function useTypingEffect(phrases: string[], typingSpeed = 100, deletingSpeed = 50, pauseDelay = 2000) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      if (isDeleting) {
        setText(fullText.substring(0, text.length - 1));
      } else {
        setText(fullText.substring(0, text.length + 1));
      }

      let speed = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && text === fullText) {
        speed = pauseDelay;
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        speed = 500;
      }

      timer = setTimeout(handleTyping, speed);
    };

    timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, phrases, typingSpeed, deletingSpeed, pauseDelay]);

  return text;
}
