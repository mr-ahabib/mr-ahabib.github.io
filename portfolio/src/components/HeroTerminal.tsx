import { useEffect, useState } from "react";

/** A realistic bash prompt: user@host:~$ */
const USER = "ahashan";
const HOST = "portfolio";
const PROMPT = `${USER}@${HOST}:~$`;

type Line =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "name"; text: string };

const LINES: Line[] = [
  { kind: "cmd", text: "whoami" },
  { kind: "name", text: "Md. Ahashan Habib" },
  { kind: "cmd", text: "cat role.txt" },
  { kind: "out", text: "AI/ML Engineer · Backend Developer · ML Researcher" },
  { kind: "cmd", text: "ls ~/focus" },
  { kind: "out", text: "llms/  rag/  deep-learning/  fastapi/  react/" },
  { kind: "cmd", text: "cat mission.txt" },
  { kind: "out", text: "Building production AI systems people can depend on." },
  { kind: "cmd", text: "./contact.sh --init" },
];

const fullText = (l: Line) => (l.kind === "cmd" ? `${PROMPT} ${l.text}` : l.text);
// One extra tick between lines so the caret pauses at each line break.
const TOTAL = LINES.reduce((n, l) => n + fullText(l).length + 1, 0);

const Cursor = () => (
  <span className="ml-0.5 inline-block h-[1.05em] w-[0.55ch] translate-y-[0.15em] bg-emerald-400 align-baseline animate-pulse" />
);

// Coloured segments of the bash prompt — clipped to however many chars show.
const PROMPT_SEGS: { t: string; c: string }[] = [
  { t: USER, c: "text-emerald-400" },
  { t: "@", c: "text-muted-foreground" },
  { t: HOST, c: "text-emerald-400" },
  { t: ":", c: "text-muted-foreground" },
  { t: "~", c: "text-sky-400" },
  { t: "$", c: "text-muted-foreground" },
];

function renderPrompt(shownPrompt: string) {
  let used = 0;
  return PROMPT_SEGS.map((s, i) => {
    const remaining = shownPrompt.length - used;
    used += s.t.length;
    if (remaining <= 0) return null;
    return (
      <span key={i} className={s.c}>
        {s.t.slice(0, remaining)}
      </span>
    );
  });
}

const LINE_MIN_H: Record<Line["kind"], string> = {
  cmd: "min-h-[1.6rem]",
  out: "min-h-[1.6rem]",
  name: "min-h-[1.9rem] sm:min-h-[2.1rem]",
};

function renderLine(line: Line, shown: string, showCursor: boolean) {
  const cursor = showCursor ? <Cursor /> : null;

  if (line.kind === "cmd") {
    const shownPrompt = shown.slice(0, PROMPT.length);
    const rest = shown.slice(PROMPT.length); // leading space + command
    return (
      <>
        {renderPrompt(shownPrompt)}
        <span className="text-foreground">{rest}</span>
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
  return (
    <>
      <span className="text-muted-foreground">{shown}</span>
      {cursor}
    </>
  );
}

export function HeroTerminal({ chrome = true }: { chrome?: boolean }) {
  const [revealed, setRevealed] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setRevealed(TOTAL);
      return;
    }
    let n = 0;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      if (n < TOTAL) {
        n += 1;
        setRevealed(n);
        timer = setTimeout(step, 30);
      } else {
        timer = setTimeout(() => {
          n = 0;
          setRevealed(0);
          timer = setTimeout(step, 600);
        }, 2800);
      }
    };
    timer = setTimeout(step, 30);
    return () => clearTimeout(timer);
  }, []);

  // Index of the last line with any characters revealed (where the caret sits).
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

  const body = (
    <div className="relative space-y-1.5 p-5 font-mono text-[13px] leading-relaxed sm:p-6 sm:text-sm">
      {LINES.map((line, i) => {
        const full = fullText(line);
        const start = offset;
        offset += full.length + 1;

        const shown =
          revealed <= start ? "" : full.slice(0, Math.min(full.length, revealed - start));
        const showCursor = i === cursorLine;
        return (
          <div key={i} className={`whitespace-pre-wrap break-words ${LINE_MIN_H[line.kind]}`}>
            {renderLine(line, shown, showCursor)}
          </div>
        );
      })}
    </div>
  );

  // Bare mode: just the streaming body (the merged window supplies its chrome).
  if (!chrome) return body;

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative overflow-hidden bg-transparent font-mono text-sm">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
        <div className="holo-scanlines pointer-events-none absolute inset-0 opacity-[0.05]" />

        <div className="relative flex items-center gap-2 border-b border-primary/25 bg-background/50 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/90 ring-1 ring-inset ring-black/10" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/90 ring-1 ring-inset ring-black/10" />
          <span className="h-3 w-3 rounded-full bg-emerald-400/90 ring-1 ring-inset ring-black/10" />
          <span className="ml-3 text-xs text-muted-foreground">{USER}@{HOST}: ~/portfolio</span>
          <span className="ml-auto flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-emerald-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            online
          </span>
        </div>

        {body}
      </div>
    </div>
  );
}
