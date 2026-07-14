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
        <span className="text-gradient text-lg font-semibold sm:text-xl">{shown}</span>
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
    const id = setInterval(() => {
      setRevealed((r) => {
        if (r >= TOTAL) {
          clearInterval(id);
          return r;
        }
        return r + 1;
      });
    }, 26);
    return () => clearInterval(id);
  }, []);

  const done = revealed >= TOTAL;

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
    <div className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card/70 font-mono text-sm shadow-2xl shadow-primary/10 backdrop-blur">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2.5">
        <span className="h-3 w-3 rounded-full bg-red-400/80" />
        <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
        <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
        <span className="ml-2 text-xs text-muted-foreground">ahashan@portfolio: ~</span>
      </div>

      {/* Body */}
      <div className="min-h-[230px] space-y-1.5 p-5 leading-relaxed sm:p-6">
        {LINES.map((line, i) => {
          const full = fullText(line);
          const start = offset;
          offset += full.length + 1;

          if (revealed <= start) return null;
          const shown = full.slice(0, Math.min(full.length, revealed - start));
          const showCursor = i === cursorLine;
          return (
            <div key={i} className="whitespace-pre-wrap break-words">
              {renderLine(line, shown, showCursor)}
            </div>
          );
        })}
        {/* Keep a caret visible on the final prompt once streaming completes */}
        {done && cursorLine !== LINES.length - 1 && <Cursor />}
      </div>
    </div>
  );
}
