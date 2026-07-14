import { useEffect, useState } from "react";

type Line =
  | { kind: "comment"; text: string }
  | { kind: "cmd"; prompt: string; text: string }
  | { kind: "name"; text: string }
  | { kind: "out"; text: string };

const LINES: Line[] = [
  { kind: "comment", text: "# status: available · AI Project Co-ordinator @ Qanun Limited" },
  { kind: "cmd", prompt: "$", text: "whoami" },
  { kind: "name", text: "Md. Ahashan Habib" },
  { kind: "cmd", prompt: "$", text: "cat role.txt" },
  { kind: "out", text: "AI/ML Engineer · Backend Developer · ML Researcher" },
  { kind: "cmd", prompt: "$", text: "cat focus.txt" },
  { kind: "out", text: "Building production AI systems with LLMs, RAG," },
  { kind: "out", text: "and deep learning." },
  { kind: "cmd", prompt: "$", text: "./contact.sh --init" },
];

const fullText = (l: Line) => ("prompt" in l ? `${l.prompt} ` : "") + l.text;
// One extra tick between lines so the caret pauses at each line break.
const TOTAL = LINES.reduce((n, l) => n + fullText(l).length + 1, 0);

const Cursor = () => (
  <span className="ml-0.5 inline-block h-[1.05em] w-[0.5ch] translate-y-[0.15em] bg-primary align-baseline animate-pulse" />
);

// Each line reserves its full height from the start (rendered even before its
// text is revealed) so the terminal never grows/shrinks while streaming.
const LINE_MIN_H: Record<Line["kind"], string> = {
  comment: "min-h-[1.5rem]",
  cmd: "min-h-[1.5rem]",
  name: "min-h-[1.9rem] sm:min-h-[2.1rem]",
  out: "min-h-[1.5rem]",
};

function renderLine(line: Line, shown: string, showCursor: boolean) {
  const cursor = showCursor ? <Cursor /> : null;

  if (line.kind === "cmd") {
    return (
      <>
        <span className="text-emerald-400">{shown.slice(0, 1)}</span>
        <span className="text-foreground">{shown.slice(1)}</span>
        {cursor}
      </>
    );
  }
  if (line.kind === "name") {
    return (
      <>
        <span className="text-gradient text-lg font-semibold sm:text-xl [filter:drop-shadow(0_0_9px_hsl(var(--primary)/0.55))]">{shown}</span>
        {cursor}
      </>
    );
  }
  if (line.kind === "comment") {
    return (
      <>
        <span className="text-muted-foreground/60">{shown}</span>
        {cursor}
      </>
    );
  }
  return (
    <>
      <span className="text-muted-foreground">{shown}</span>
      {cursor}
    </>
  );
}

export function HeroTerminal() {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(TOTAL);
      return;
    }
    // Loop forever: type all lines, hold, clear, then retype.
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (n < TOTAL) {
        n += 1;
        setRevealed(n);
        timer = setTimeout(step, 26);
      } else {
        // Hold the finished state, then reset and start again.
        timer = setTimeout(() => {
          n = 0;
          setRevealed(0);
          timer = setTimeout(step, 600);
        }, 2600);
      }
    };
    timer = setTimeout(step, 26);
    return () => clearTimeout(timer);
  }, []);

  // Index of the last line that has any characters revealed (where the caret sits).
  let cursorLine = -1;
  {
    let offset = 0;
    LINES.forEach((l, i) => {
      const start = offset;
      offset += fullText(l).length + 1;
      if (revealed > start) cursorLine = i;
    });
  }

  let offset = 0;

  return (
    <div className="relative w-full max-w-xl">
      {/* Neon-outlined panel */}
      <div className="neon-glow relative overflow-hidden rounded-2xl border border-primary bg-card/85 font-mono text-sm backdrop-blur-xl">
          {/* Glassy top sheen */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          {/* Faint CRT scanline texture */}
          <div className="holo-scanlines pointer-events-none absolute inset-0 opacity-[0.05]" />

          {/* Title bar */}
          <div className="relative flex items-center gap-2 border-b border-primary/25 bg-background/50 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-400/90 ring-1 ring-inset ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-yellow-400/90 ring-1 ring-inset ring-black/10" />
            <span className="h-3 w-3 rounded-full bg-emerald-400/90 ring-1 ring-inset ring-black/10" />
            <span className="ml-3 text-xs text-muted-foreground">ahashan@ai — ~/portfolio</span>
            <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/90">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              online
            </span>
          </div>

          {/* Body — all lines are always rendered (reserving height) so the
              panel size is fixed; only the revealed characters are shown. */}
          <div className="relative space-y-1.5 p-5 leading-relaxed sm:p-6">
            {LINES.map((line, i) => {
              const full = fullText(line);
              const start = offset;
              offset += full.length + 1;

              const shown =
                revealed <= start ? "" : full.slice(0, Math.min(full.length, revealed - start));
              const showCursor = i === cursorLine;
              return (
                <div
                  key={i}
                  className={`whitespace-pre-wrap break-words ${LINE_MIN_H[line.kind]}`}
                >
                  {renderLine(line, shown, showCursor)}
                </div>
              );
            })}
          </div>
      </div>
    </div>
  );
}
