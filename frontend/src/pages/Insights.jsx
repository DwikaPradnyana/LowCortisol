import { CalendarBlank, Coffee, Moon, ArrowRight, TrendUp, ShieldCheck } from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";

// --- DATA SENTRALISASI ---
const INSIGHTS_CARDS = [
  {
    Icon: CalendarBlank,
    title: "Your stress peaks on Mondays",
    desc: "A softer start to the week could quietly change everything.",
    theme: "orange",
    colorHex: "#f97316", // Tailwind orange-500
    chart: [30, 85, 55, 40, 45, 28, 24],
    highlight: 1,
  },
  {
    Icon: Moon,
    title: "You recover better on weekends",
    desc: "Sleep and slower mornings do more than you think.",
    theme: "teal",
    colorHex: "#14b8a6", // Tailwind teal-500
    chart: [42, 50, 48, 55, 52, 82, 78],
    highlight: 5,
  },
  {
    Icon: Coffee,
    title: "Energy drops after long meetings",
    desc: "A 5-minute reset between calls restores focus gently.",
    theme: "indigo",
    colorHex: "#6366f1", // Tailwind indigo-500
    chart: [70, 65, 40, 58, 32, 48, 55],
    highlight: 4,
  },
];

function TintCard({ theme, children, className = "" }) {
  const themeMap = {
    orange: { tint: "rgba(251, 146, 60, 0.15)", glow: "rgba(251, 146, 60, 0.25)" },
    teal: { tint: "rgba(45, 212, 191, 0.15)", glow: "rgba(45, 212, 191, 0.25)" },
    indigo: { tint: "rgba(99, 102, 241, 0.15)", glow: "rgba(99, 102, 241, 0.25)" },
  };
  
  const currentTheme = themeMap[theme];

  return (
    <div
      className={`group relative overflow-hidden rounded-3xl border border-white/60 p-7 backdrop-blur-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${className}`}
      style={{
        background: `linear-gradient(140deg, ${currentTheme.tint} 0%, rgba(255,255,255,0.6) 100%)`,
        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.7), 0 10px 30px ${currentTheme.glow}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl opacity-50 transition group-hover:opacity-80"
        style={{ background: currentTheme.glow }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function Insights() {
  return (
    <main className="mx-auto w-[95%] max-w-6xl pb-24 pt-12">
      
      <section className="py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-xl">
          <TrendUp weight="bold" className="h-3.5 w-3.5" /> 
          A preview of the patterns you'll find
        </div>
        <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl">
          Understand your <br />
          <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            mental patterns
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Gentle observations — not dashboards full of complex charts. LowCortisol notices the small shifts so you don't have to.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {INSIGHTS_CARDS.map((c) => {
          const max = Math.max(...c.chart);
          return (
            <TintCard key={c.title} theme={c.theme}>
              <div className="inline-flex rounded-2xl bg-white/60 p-3 shadow-sm border border-white/60">
                <c.Icon className="h-6 w-6" style={{ color: c.colorHex }} weight="duotone" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-foreground">
                {c.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.desc}
              </p>

              <div className="mt-6 flex h-20 items-end gap-1.5">
                {c.chart.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full shadow-inner transition-all"
                    style={{
                      height: `${(h / max) * 100}%`,
                      background: i === c.highlight
                        ? `linear-gradient(to top, ${c.colorHex}, ${c.colorHex}aa)`
                        : "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.5))",
                      boxShadow: i === c.highlight ? `0 0 12px ${c.colorHex}55` : undefined,
                    }}
                  />
                ))}
              </div>
            </TintCard>
          );
        })}
      </section>

      <section className="mt-16">
        <GlassCard className="p-8">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-md">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">This week (sample)</div>
              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                Your patterns, softly told
              </h3>
              <p className="mt-2 text-muted-foreground">
                Each point is one day's felt mood — no complex numbers to decode.
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3 py-1 text-xs font-medium text-teal-600">
              <TrendUp weight="bold" className="h-3 w-3" /> Calm upward trend
            </div>
          </div>

          <div className="relative mt-8 h-44 w-full">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              <defs>
                <linearGradient id="guest-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary, #4a90ff)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--color-primary, #4a90ff)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {(() => {
                const data = [42, 55, 62, 58, 48, 82, 76];
                const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${100 - v}`).join(" ");
                return (
                  <>
                    <polyline points={`0,100 ${pts} 100,100`} fill="url(#guest-area)" />
                    <polyline
                      points={pts}
                      fill="none"
                      stroke="var(--color-primary, #4a90ff)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  </>
                );
              })()}
            </svg>
          </div>
          <div className="mt-4 flex justify-between text-xs font-medium text-muted-foreground/60">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </GlassCard>
      </section>

      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <GlassCard className="p-8">
          <div className="inline-flex rounded-2xl bg-primary/10 border border-primary/20 p-3 shadow-sm">
            <ShieldCheck weight="duotone" className="h-6 w-6 text-primary" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            How insights prevent burnout
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Burnout rarely arrives suddenly. It accumulates in missed signals. By noticing small patterns early —
            a rough Monday, a tiring meeting rhythm, a late bedtime drift — you can adjust gently, long before exhaustion sets in.
          </p>
        </GlassCard>

        <GlassCard className="p-8">
          <div className="inline-flex rounded-2xl bg-indigo-400/10 border border-indigo-400/20 p-3 shadow-sm">
            <TrendUp weight="duotone" className="h-6 w-6 text-indigo-500" />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Gentle, never prescriptive
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Every insight is paired with a small, optional suggestion. You're always in charge of what to do with it —
            and never judged for doing nothing.
          </p>
        </GlassCard>
      </section>

      <section className="mt-16">
        <GlassCard className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Track your own patterns
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            Your first actionable insight arrives after just three check-ins.
          </p>
          <Button to="/auth" size="lg" className="mt-2 shadow-primary/20 group">
            Track your own patterns
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </GlassCard>
      </section>

      <Footer />
    </main>
  );
}