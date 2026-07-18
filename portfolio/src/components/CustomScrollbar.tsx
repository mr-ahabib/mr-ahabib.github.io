import { useEffect, useState, useRef } from "react";

type Lenis = {
  scrollTo: (target: number, opts?: { immediate?: boolean; duration?: number }) => void;
  on: (event: "scroll", cb: (e: { scroll: number; limit: number; progress: number }) => void) => void;
  off: (event: "scroll", cb: (e: { scroll: number; limit: number; progress: number }) => void) => void;
};

function getLenis(): Lenis | undefined {
  return (window as unknown as { __lenis?: Lenis }).__lenis;
}

export function CustomScrollbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<number | null>(null);
  // Cached layout metrics — refreshed on resize, never read per scroll frame
  // (reading scrollHeight/innerHeight every frame forces a synchronous reflow
  // and is a classic scroll-jank source).
  const metrics = useRef({ scrollable: 1, viewHeight: 1, docHeight: 1 });
  const [, force] = useState(0);

  useEffect(() => {
    const measure = () => {
      const docHeight = document.documentElement.scrollHeight;
      const viewHeight = window.innerHeight;
      metrics.current = {
        docHeight,
        viewHeight,
        scrollable: Math.max(1, docHeight - viewHeight),
      };
      force((n) => n + 1); // reflect new thumb size
    };
    measure();

    const showThenFade = () => {
      setVisible(true);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        if (!isDraggingRef.current) setVisible(false);
      }, 1200);
    };

    // Prefer Lenis's own scroll signal (already computed, no layout read).
    const lenis = getLenis();
    const onLenisScroll = (e: { progress: number }) => {
      setScrollProgress(Number.isFinite(e.progress) ? e.progress : 0);
      showThenFade();
    };
    const onNativeScroll = () => {
      setScrollProgress(window.scrollY / metrics.current.scrollable);
      showThenFade();
    };

    if (lenis) {
      lenis.on("scroll", onLenisScroll);
    } else {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    }
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      if (lenis) lenis.off("scroll", onLenisScroll);
      else window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("resize", measure);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep a ref in sync so the fade timeout can see the latest drag state.
  const isDraggingRef = useRef(false);
  isDraggingRef.current = isDragging;

  const scrollToProgress = (progress: number, immediate: boolean) => {
    const clamped = Math.max(0, Math.min(1, progress));
    const target = clamped * metrics.current.scrollable;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(target, immediate ? { immediate: true } : { duration: 0.6 });
    else window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setVisible(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Instant, Lenis-synced tracking while dragging — no fight with the RAF loop.
      scrollToProgress(e.clientY / window.innerHeight, true);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  const handleTrackClick = (e: React.MouseEvent) => {
    if (e.target === trackRef.current) {
      scrollToProgress(e.clientY / window.innerHeight, false);
    }
  };

  const { viewHeight, docHeight } = metrics.current;
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
        className="absolute left-1/2 top-0 w-1.5 -translate-x-1/2 rounded-full cursor-grab active:cursor-grabbing bg-gradient-to-b from-primary via-accent to-accent-2 will-change-transform hover:w-2 [box-shadow:0_0_8px_hsl(var(--primary)/0.4)]"
        style={{
          height: thumbHeight,
          transform: `translate3d(-50%, ${thumbTop}px, 0)`,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
