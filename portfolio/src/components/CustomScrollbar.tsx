import { useEffect, useState, useRef } from "react";

export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight > 0) {
        setScrollProgress(window.scrollY / totalScrollableHeight);
      }
      
      // Keep visible while scrolling, fade out after 1.2 seconds of inactivity
      setVisible(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (!isDragging) setVisible(false);
      }, 1200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setVisible(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableHeight <= 0) return;

      // Calculate how far down the screen the mouse is
      const progress = e.clientY / window.innerHeight;
      const targetScroll = Math.max(0, Math.min(totalScrollableHeight, progress * totalScrollableHeight));
      
      window.scrollTo({
        top: targetScroll,
        behavior: "auto" // instant response during drag
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent) => {
    // If user clicks on the track itself (but not the thumb), jump scroll there
    if (e.target === trackRef.current) {
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const clickProgress = e.clientY / window.innerHeight;
      window.scrollTo({
        top: clickProgress * totalScrollableHeight,
        behavior: "smooth"
      });
    }
  };

  // Calculate thumb height proportionally to content height (min 40px, max 200px)
  const docHeight = document.documentElement.scrollHeight || 1;
  const viewHeight = window.innerHeight;
  const ratio = viewHeight / docHeight;
  const thumbHeight = Math.max(45, Math.min(200, ratio * viewHeight));
  const thumbTop = scrollProgress * (viewHeight - thumbHeight);

  return (
    <div
      ref={trackRef}
      onClick={handleTrackClick}
      className={`fixed right-0 top-0 z-[99999] h-full w-2.5 transition-opacity duration-300 pointer-events-auto cursor-pointer bg-white/[0.01] hover:bg-white/[0.04] backdrop-blur-[1px] ${
        visible || isDragging ? "opacity-100" : "opacity-0"
      }`}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => {
        if (!isDragging) setVisible(false);
      }}
      title="Scroll"
    >
      {/* Scrollbar Thumb */}
      <div
        className="absolute left-1/2 w-1.5 -translate-x-1/2 rounded-full cursor-grab active:cursor-grabbing bg-gradient-to-b from-primary via-accent to-accent-2 transition-all duration-150 hover:w-2 [box-shadow:0_0_8px_hsl(var(--primary)/0.4)]"
        style={{
          height: thumbHeight,
          transform: `translate3d(-50%, ${thumbTop}px, 0)`,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
