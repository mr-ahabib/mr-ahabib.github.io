import { motion } from "framer-motion";
import { GraduationCap, BookOpen, School, Star } from "lucide-react";

const EDUCATION_DATA = [
  {
    period: "Jan 2020 – Dec 2024",
    abbr: "BSc",
    degree: "Bachelor of Science",
    field: "Computer Science and Engineering",
    institution: "United International University",
    location: "Dhaka, Bangladesh",
    grade: "3.62",
    scale: "4.00",
    ratio: 3.62 / 4,
    meta: "EQF Level 6",
    thesis: "A Secure Blockchain Based Brain Tumor Prediction By Using Swin Transformer",
    perfect: false,
    icon: <GraduationCap size={20} />,
  },
  {
    period: "Jul 2017 – Apr 2019",
    abbr: "HSC",
    degree: "Higher Secondary Certificate",
    field: "Science",
    institution: "Govt. Azizul Haque College, Bogra",
    location: "Bogra, Bangladesh",
    grade: "4.83",
    scale: "5.00",
    ratio: 4.83 / 5,
    meta: "EQF Level 4",
    thesis: null,
    perfect: false,
    icon: <BookOpen size={20} />,
  },
  {
    period: "2015 – 2017",
    abbr: "SSC",
    degree: "Secondary School Certificate",
    field: "Science",
    institution: "BIAM Model School and College, Bogra",
    location: "Bogra, Bangladesh",
    grade: "5.00",
    scale: "5.00",
    ratio: 1,
    meta: "EQF Level 3",
    thesis: null,
    perfect: true,
    icon: <School size={20} />,
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 sm:py-24 relative overflow-x-clip">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px 0px" }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="flex justify-center mb-3">
            <span className="eyebrow">Academic</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
            Academic <span className="text-gradient">Background</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary via-accent to-accent-2 mx-auto rounded-full" />
        </motion.div>

        {/* ── Desktop (lg+): a winding road, one stop per degree ── */}
        <div className="relative mx-auto hidden h-[460px] max-w-5xl lg:block">
          <svg
            viewBox="0 0 1000 460"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="roadEdge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
                <stop offset="50%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
                <stop offset="100%" stopColor="hsl(var(--accent-2))" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            {/* glowing road edges (drawn wide, then covered by the tarmac) */}
            <path d={ROAD_PATH} stroke="url(#roadEdge)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
            {/* tarmac surface */}
            <path id="road-route" d={ROAD_PATH} stroke="hsl(210 30% 9%)" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round" />
            {/* faint asphalt sheen down the crown of the road */}
            <path
              d={ROAD_PATH}
              stroke="hsl(var(--primary))"
              strokeOpacity="0.06"
              strokeWidth="18"
              strokeLinecap="round"
            />
            {/* dashed centre lane line, flowing slowly along the road */}
            <path
              d={ROAD_PATH}
              stroke="hsl(48 96% 62%)"
              strokeWidth="2.5"
              strokeOpacity="0.85"
              strokeDasharray="16 22"
              strokeLinecap="round"
              className="motion-reduce:hidden"
            >
              <animate attributeName="stroke-dashoffset" from="152" to="0" dur="7s" repeatCount="indefinite" />
            </path>
            {/* static centre line for reduced-motion */}
            <path
              d={ROAD_PATH}
              stroke="hsl(48 96% 62%)"
              strokeWidth="2.5"
              strokeOpacity="0.7"
              strokeDasharray="16 22"
              className="hidden motion-reduce:block"
            />

            {/* a car cruising the road */}
            <g className="motion-reduce:hidden">
              <g transform="scale(0.85)">
                {/* body */}
                <rect x="-14" y="-7" width="28" height="14" rx="5" fill="hsl(210 30% 14%)" stroke="hsl(var(--primary))" strokeWidth="1.2" />
                {/* cabin / windscreen glass */}
                <rect x="-5" y="-5" width="11" height="10" rx="2.5" fill="hsl(var(--accent-2))" fillOpacity="0.7" />
                <rect x="-8" y="-4.5" width="3" height="9" rx="1.5" fill="hsl(var(--primary))" fillOpacity="0.5" />
                {/* headlights (front, +x) */}
                <circle cx="13" cy="-4" r="1.5" fill="hsl(48 96% 70%)" />
                <circle cx="13" cy="4" r="1.5" fill="hsl(48 96% 70%)" />
                {/* tail lights (rear, -x) */}
                <circle cx="-13" cy="-4" r="1.3" fill="hsl(0 85% 60%)" />
                <circle cx="-13" cy="4" r="1.3" fill="hsl(0 85% 60%)" />
              </g>
              <animateMotion dur="16s" repeatCount="indefinite" rotate="auto">
                <mpath href="#road-route" />
              </animateMotion>
            </g>
          </svg>

          {ROAD_STOPS.map(({ item, x, y, above }, index) => (
            <RoadStop key={item.degree} item={item} x={x} y={y} above={above} index={index} />
          ))}
        </div>

        {/* ── Mobile / tablet: a vertical road running down the left ── */}
        <div className="relative pl-16 lg:hidden">
          {/* the road itself, in the left gutter */}
          <div className="pointer-events-none absolute bottom-2 left-6 top-2 w-9 -translate-x-1/2" aria-hidden="true">
            {/* glowing edges */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(to bottom, hsl(var(--primary) / 0.5), hsl(var(--accent) / 0.85), hsl(var(--accent-2) / 0.7))",
              }}
            />
            {/* tarmac surface */}
            <div className="absolute inset-y-0 inset-x-[3px] rounded-full" style={{ background: "hsl(210 30% 9%)" }} />
            {/* flowing dashed centre lane */}
            <div
              className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 motion-reduce:hidden"
              style={{
                background:
                  "repeating-linear-gradient(to bottom, hsl(48 96% 62%) 0 9px, transparent 9px 26px)",
                animation: "roadDashY 3.2s linear infinite",
              }}
            />
            {/* static lane for reduced motion */}
            <div
              className="absolute inset-y-0 left-1/2 hidden w-[2px] -translate-x-1/2 motion-reduce:block"
              style={{ background: "repeating-linear-gradient(to bottom, hsl(48 96% 62% / 0.7) 0 9px, transparent 9px 26px)" }}
            />
          </div>

          <div className="space-y-9">
            {EDUCATION_DATA.map((item, index) => {
              const tone = item.perfect ? "accent-2" : "primary";
              return (
                <motion.div
                  key={item.degree}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-120px 0px" }}
                  transition={{ delay: index * 0.08, duration: 0.7 }}
                  className="relative"
                >
                  {/* marker pin sitting on the road */}
                  <span
                    className={`absolute -left-10 top-0.5 grid h-8 w-8 -translate-x-1/2 place-items-center rounded-full border-2 bg-background ${
                      item.perfect ? "border-accent-2 text-accent-2 neon-glow-sm" : "border-primary text-primary"
                    } [&>svg]:h-4 [&>svg]:w-4`}
                  >
                    {item.icon}
                  </span>
                  <span className={`font-mono text-xs font-semibold uppercase tracking-wider text-${tone}`}>{item.period}</span>
                  <h3 className="mt-1 text-base font-display font-bold text-foreground">{item.degree}</h3>
                  <p className={`mt-0.5 text-sm font-semibold text-${tone}`}>{item.field}</p>
                  <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.institution}</p>
                  <p className={`mt-1 font-mono text-xs text-${tone}`}>GPA {item.grade} / {item.scale} · {item.meta}</p>
                  {item.thesis && <p className="mt-2 text-sm italic leading-relaxed text-foreground/80">"{item.thesis}"</p>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* A winding road threaded through the three degree stops (SVG coords, 1000×460). */
const ROAD_PATH =
  "M 20 250 C 90 130 130 150 175 185 C 250 240 360 320 500 300 C 630 282 730 130 830 165 C 905 190 955 220 980 215";
const ROAD_STOPS = [
  { item: EDUCATION_DATA[0], x: 175, y: 185, above: true },
  { item: EDUCATION_DATA[1], x: 500, y: 300, above: false },
  { item: EDUCATION_DATA[2], x: 830, y: 165, above: true },
] as const;

/** A stop on the road: a marker pin sitting on the tarmac + a degree callout. */
function RoadStop({
  item,
  x,
  y,
  above,
  index,
}: {
  item: (typeof EDUCATION_DATA)[number];
  x: number;
  y: number;
  above: boolean;
  index: number;
}) {
  const tone = item.perfect ? "accent-2" : "primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: above ? 16 : -16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.14, duration: 0.5 }}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${x / 10}%`, top: `${(y / 460) * 100}%` }}
    >
      {/* marker pin on the road */}
      <span
        className={`relative grid h-10 w-10 place-items-center rounded-full border-2 bg-background transition-transform duration-300 group-hover:scale-110 ${
          item.perfect ? "border-accent-2 text-accent-2 neon-glow-sm" : "border-primary text-primary"
        } [&>svg]:h-4 [&>svg]:w-4`}
      >
        <span
          className={`absolute inset-0 rounded-full text-${tone} motion-reduce:hidden`}
          style={{ animation: "acadPing 2.4s ease-out infinite" }}
        />
        {item.icon}
      </span>

      {/* degree callout */}
      <div
        className={`absolute left-1/2 w-60 -translate-x-1/2 ${above ? "bottom-full mb-4" : "top-full mt-4"} text-center`}
      >
        <span className={`inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-${tone}`}>
          {item.abbr}
          <span className="text-muted-foreground/70">· {item.period}</span>
        </span>
        <h3 className="mt-1 text-base font-display font-bold leading-snug text-foreground">{item.degree}</h3>
        <p className={`mt-0.5 text-sm font-semibold text-${tone}`}>{item.field}</p>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{item.institution}</p>
        <p className={`mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-${tone}`}>
          {item.perfect && <Star size={10} className="fill-accent-2" />}
          GPA {item.grade} / {item.scale}
          <span className="text-muted-foreground/70">· {item.meta}</span>
        </p>
        {item.thesis && (
          <p className="mt-2 text-xs italic leading-relaxed text-foreground/70">"{item.thesis}"</p>
        )}
      </div>
    </motion.div>
  );
}
