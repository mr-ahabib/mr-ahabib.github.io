import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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
    <div className="neon-glow-sm relative mx-auto mb-16 sm:mb-20 max-w-3xl rounded-2xl border border-primary/50 bg-card/80 backdrop-blur-xl">
      <div className="relative overflow-hidden rounded-2xl p-5 sm:p-7">
        {/* HUD corner brackets */}
        <span className="pointer-events-none absolute left-4 top-4 h-4 w-4 border-l-2 border-t-2 border-primary/40" />
        <span className="pointer-events-none absolute right-4 top-4 h-4 w-4 border-r-2 border-t-2 border-primary/40" />
        <span className="pointer-events-none absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-primary/40" />
        <span className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-primary/40" />

        <div className="mb-2 flex items-center justify-between">
          <span className="eyebrow">capability_matrix</span>
          <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
            6 vectors tracked
          </span>
        </div>

        <div className="h-[320px] w-full sm:h-[380px]">
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
