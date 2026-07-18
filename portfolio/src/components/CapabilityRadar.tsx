import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

/* ── A spider that weaves its web in real time behind the radar ──────────────
 * One continuous SVG path traces the whole web in weaving order: the radial
 * spokes first (out-and-back from the hub), then a capture spiral outward.
 * The path draws itself via stroke-dashoffset while the spider rides the same
 * path via <animateMotion> — same duration, so the thread appears exactly at
 * the spider's spinnerets. Both loop forever, perfectly in sync (SMIL, no JS). */
const WEB_CX = 200;
const WEB_CY = 200;
const WEB_SPOKES = 8;
const WEB_RMAX = 188;
const WEB_ANGLE = (i: number) => (i * 2 * Math.PI) / WEB_SPOKES - Math.PI / 2;
const wpt = (r: number, a: number) => `${(WEB_CX + r * Math.cos(a)).toFixed(1)} ${(WEB_CY + r * Math.sin(a)).toFixed(1)}`;

const WEB_RINGS = [52, 92, 132, 172];

function buildWebPath() {
  let d = `M ${WEB_CX} ${WEB_CY}`;
  // radial spokes — the spider darts out to the rim and back to the hub for each
  for (let i = 0; i < WEB_SPOKES; i++) {
    d += ` L ${wpt(WEB_RMAX, WEB_ANGLE(i))} L ${WEB_CX} ${WEB_CY}`;
  }
  // capture threads — angular segments spanning the spokes, ring by ring,
  // stepping outward along a spoke between rings (a real orb-web, not a disc)
  d += ` L ${wpt(WEB_RINGS[0], WEB_ANGLE(0))}`;
  WEB_RINGS.forEach((r, idx) => {
    // alternate the direction each ring so the spider genuinely runs back and forth
    const order = idx % 2 === 0 ? [1, 2, 3, 4, 5, 6, 7, 0] : [7, 6, 5, 4, 3, 2, 1, 0];
    order.forEach((i) => {
      d += ` L ${wpt(r, WEB_ANGLE(i))}`;
    });
    // step outward along the current spoke to the next ring
    const next = WEB_RINGS[idx + 1];
    if (next) d += ` L ${wpt(next, WEB_ANGLE(0))}`;
  });
  return d;
}

const WEB_PATH = buildWebPath();
const WEAVE_DUR = "19s";

function SpiderWeb() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.3] motion-reduce:opacity-25"
      fill="none"
      aria-hidden="true"
    >
      {/* faint finished web left behind, so the frame never looks empty */}
      <path d={WEB_PATH} stroke="hsl(var(--primary))" strokeWidth={0.5} strokeOpacity={0.28} />

      {/* the live thread being spun — drawn in step with the spider */}
      <path
        id="weave-thread"
        d={WEB_PATH}
        stroke="hsl(var(--primary))"
        strokeWidth={0.9}
        pathLength={1}
        strokeDasharray={1}
        strokeLinecap="round"
        className="motion-reduce:hidden"
      >
        <animate attributeName="stroke-dashoffset" from={1} to={0} dur={WEAVE_DUR} repeatCount="indefinite" />
      </path>

      {/* the spider, riding the thread it lays */}
      <g className="motion-reduce:hidden" style={{ color: "hsl(var(--accent-2))" }}>
        <g>
          <g transform="scale(1.9)">
            {/* legs — four per side, angled fore/aft like a real spider */}
            {[-1, 1].map((side) =>
              [0, 1, 2, 3].map((k) => (
                <path
                  key={`leg-${side}-${k}`}
                  d={`M0 0 q ${side * 6} ${-5 + k * 3.5} ${side * 9} ${-7 + k * 4.5}`}
                  stroke="currentColor"
                  strokeWidth={0.7}
                  fill="none"
                  strokeLinecap="round"
                />
              ))
            )}
            <ellipse cx={0} cy={3} rx={3} ry={4.2} fill="currentColor" />
            <circle cx={0} cy={-2} r={2} fill="currentColor" />
          </g>
          <animateMotion dur={WEAVE_DUR} repeatCount="indefinite" rotate="auto">
            <mpath href="#weave-thread" />
          </animateMotion>
        </g>
      </g>
    </svg>
  );
}

const KEY_SKILLS = [
  { skill: "Python", value: 92 },
  { skill: "ML", value: 88 },
  { skill: "React", value: 85 },
  { skill: "LLM/RAG", value: 90 },
  { skill: "Backend", value: 83 },
  { skill: "Research", value: 86 },
];

/**
 * Skills radar chart. Kept in its own file and lazy-loaded from Skills so
 * recharts lands in a separate chunk instead of the critical bundle.
 */
export default function CapabilityRadar() {
  return (
    <div className="relative">
      {/* Open HUD instrument — corner ticks only, no card chrome */}
      <span className="pointer-events-none absolute -left-1 -top-1 h-5 w-5 border-l-2 border-t-2 border-primary/50" />
      <span className="pointer-events-none absolute -right-1 -top-1 h-5 w-5 border-r-2 border-t-2 border-primary/50" />
      <span className="pointer-events-none absolute -bottom-1 -left-1 h-5 w-5 border-b-2 border-l-2 border-primary/50" />
      <span className="pointer-events-none absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-primary/50" />

      <div className="relative px-2 py-1">
        <div className="mb-1 flex items-center justify-between">
          <span className="eyebrow">capability_matrix</span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            6 vectors tracked
          </span>
        </div>

        <div className="relative h-[300px] w-full sm:h-[340px]">
          <SpiderWeb />
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={KEY_SKILLS} outerRadius="65%" margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <defs>
                <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.55} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.55} />
                </linearGradient>
              </defs>
              <PolarGrid stroke="hsl(var(--border))" strokeOpacity={0.6} />
              <PolarAngleAxis
                dataKey="skill"
                tick={{
                  fill: "hsl(var(--muted-foreground))",
                  fontSize: 11,
                  fontFamily: "var(--font-mono)",
                }}
              />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#radarFill)"
                fillOpacity={0.65}
                dot={{ r: 3, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                isAnimationActive
                animationDuration={1200}
              />
              <Tooltip
                cursor={false}
                contentStyle={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: 10,
                  fontFamily: "var(--font-mono)",
                  fontSize: 12,
                }}
                labelStyle={{ color: "hsl(var(--foreground))" }}
                itemStyle={{ color: "hsl(var(--primary))" }}
                formatter={(v: number) => [`${v}%`, "proficiency"]}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Numeric legend */}
        <div className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
          {KEY_SKILLS.map((s) => (
            <span key={s.skill}>
              <span className="text-primary font-semibold">{s.value}%</span> {s.skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
