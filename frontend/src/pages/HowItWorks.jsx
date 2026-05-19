import { Sparkle, Smiley, SmileyMeh, SmileySad, TrendUp, ArrowRight } from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";
import { HOW_IT_WORKS_STEPS, MOCK_CHART_DATA } from "../constants/howItWorksContent";

export default function HowItWorks() {
  // Pemetaan tema warna agar tidak menggunakan RGBA mentah
  const themeMap = {
    blue: { glow: "bg-primary/20", text: "text-primary", iconBg: "bg-primary/10", border: "border-primary/20" },
    purple: { glow: "bg-indigo-400/20", text: "text-indigo-500", iconBg: "bg-indigo-400/10", border: "border-indigo-400/20" },
    teal: { glow: "bg-teal-400/20", text: "text-teal-500", iconBg: "bg-teal-400/10", border: "border-teal-400/20" },
  };

  return (
    <main className="mx-auto w-[95%] max-w-6xl pb-24 pt-12">
      
      <section className="py-16 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
          <Sparkle weight="fill" className="h-3.5 w-3.5" /> 
          A quiet system that works in the background
        </div>
        <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl">
          How LowCortisol <br />
          <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            gently works for you
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          Three simple steps. No complex dashboards to master, no pressure to perform. Just small daily notices that add up to massive burnout prevention.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {HOW_IT_WORKS_STEPS.map((s) => {
          const style = themeMap[s.theme];
          return (
            <div
              key={s.n}
              className={`group relative overflow-hidden rounded-3xl border border-white/60 bg-white/40 p-7 backdrop-blur-2xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/60`}
            >
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl opacity-50 transition group-hover:opacity-80 ${style.glow}`}
              />
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div className={`inline-flex rounded-2xl ${style.iconBg} p-3 border border-white/60 shadow-sm`}>
                    <s.Icon className={`h-6 w-6 ${style.text}`} weight="duotone" />
                  </div>
                  <span className="text-sm font-bold text-muted-foreground/50">{s.n}</span>
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      <section className="mt-32">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            A glance is all it takes
          </h2>
          <p className="mt-3 text-muted-foreground">The experience, visualized in three lightweight moments.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          
          <GlassCard className="p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Mood</div>
            <div className="mt-1 font-medium text-foreground">One tap</div>
            <div className="mt-5 flex justify-between rounded-2xl border border-white/60 bg-white/50 p-3 shadow-sm">
              {[
                { I: SmileySad, active: false },
                { I: SmileyMeh, active: false },
                { I: Smiley, active: true },
              ].map((m, i) => (
                <div
                  key={i}
                  className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                    m.active ? "bg-white shadow-sm ring-1 ring-slate-100" : ""
                  }`}
                >
                  <m.I
                    weight={m.active ? "fill" : "regular"}
                    className={`h-6 w-6 ${m.active ? "text-primary" : "text-slate-400"}`}
                  />
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Burnout Score</div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="bg-gradient-to-r from-teal-400 to-primary bg-clip-text text-4xl font-bold text-transparent leading-none">
                32
              </span>
              <span className="text-sm font-medium text-muted-foreground/60">/ 100</span>
            </div>
            <div className="mt-6 h-2 w-full overflow-hidden rounded-full bg-slate-100 shadow-inner">
              <div className="h-full w-[32%] rounded-full bg-gradient-to-r from-teal-400 to-primary" />
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3 py-1 text-xs font-medium text-teal-600">
              Low risk · stable
            </div>
          </GlassCard>
          
          <GlassCard className="p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">Insight</div>
            <div className="mt-2 text-sm font-medium leading-relaxed text-foreground">
              You rest significantly better on weekends.
            </div>
            <div className="mt-4 flex h-16 items-end gap-1.5">
              {MOCK_CHART_DATA.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-full bg-gradient-to-t from-primary/60 to-teal-400/60"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-2.5 py-1 text-xs font-medium text-teal-600 w-max">
              <TrendUp weight="bold" className="h-3 w-3" /> gentle upward trend
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 4. CTA SECTION */}
      <section className="mt-32">
        <GlassCard className="flex flex-col items-center gap-6 p-10 text-center md:p-14">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Start your first check-in
          </h2>
          <p className="max-w-md text-lg text-muted-foreground">
            No setup. No overwhelm. Just a soft, frictionless first step.
          </p>
          <Button to="/auth" size="lg" className="mt-2 shadow-primary/20 group">
            Start free assessment
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </GlassCard>
      </section>

      <Footer />
    </main>
  );
}