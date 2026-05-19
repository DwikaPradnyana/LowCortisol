import {
  Waveform,
  Smiley,
  SmileyMeh,
  SmileySad,
  ShieldCheck,
} from "@phosphor-icons/react";

function TintCard({ tint, glow, children, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden p-7 transition-all duration-300 hover:-translate-y-1 backdrop-blur-2xl ${className}`}
      style={{
        borderRadius: "24px",
        border: "0.667px solid rgba(255, 255, 255, 0.40)",
        background: `linear-gradient(135deg, ${tint} 0%, rgba(255, 255, 255, 0.45) 100%)`,
        boxShadow: `inset 0 1px 0 0 rgba(255, 255, 255, 0.70), 0 10px 30px 0 ${glow}`,
      }}
    >
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl opacity-60 transition group-hover:opacity-90"
        style={{ background: glow }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default function PreventSection() {
  const predictiveBars = [28, 42, 35, 58, 48, 72, 64];
  const workloadData = [
    { name: "Design", v: 58, color: "#4A90E2" },
    { name: "Engineering", v: 82, color: "#F4B678" },
    { name: "Research", v: 44, color: "#7ED6A5" },
  ];

  return (
    <section className="mt-32">
      <div className="mb-10 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200/50 bg-teal-50/50 px-4 py-1.5 text-xs font-semibold text-teal-600 backdrop-blur-xl">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.7)]" />
          Proactive care
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Prevent Burnout Before It Starts
        </h2>
        <p className="mt-2 text-muted-foreground">
          Quiet intelligence, working gently in the background.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 md:grid-rows-2">
        <TintCard
          tint="rgba(126, 214, 165, 0.22)"
          glow="rgba(126, 214, 165, 0.28)"
          className="md:col-span-4"
        >
          <div className="flex h-full flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-xs">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-teal-700 shadow-sm border border-white/40">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-500" />
                </span>
                Live prediction
              </div>
              <h3 className="text-2xl font-semibold text-foreground leading-snug">
                Predict burnout before it happens
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                AI detects early stress patterns and quietly surfaces them — long
                before they reach critical levels.
              </p>
            </div>

            <div className="flex h-28 items-end gap-2.5">
              {predictiveBars.map((h, i) => (
                <div
                  key={i}
                  className="w-5 rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.6)]"
                  style={{
                    height: `${h}%`,
                    background:
                      i === predictiveBars.length - 1
                        ? "linear-gradient(to top, #F4A1A1, #F4B678)"
                        : "linear-gradient(to top, rgba(126,214,165,0.7), rgba(74,144,226,0.5))",
                    boxShadow:
                      i === predictiveBars.length - 1
                        ? "0 0 16px rgba(244,161,161,0.5)"
                        : undefined,
                  }}
                />
              ))}
            </div>
          </div>
        </TintCard>

        <TintCard
          tint="rgba(184, 168, 255, 0.22)"
          glow="rgba(184, 168, 255, 0.30)"
          className="md:col-span-2"
        >
          <h3 className="text-xl font-semibold text-foreground leading-snug">
            Quick emotional check-ins
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Two taps. No friction.
          </p>

          <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/60 bg-white/50 p-3 shadow-sm backdrop-blur-md">
            {[
              { I: SmileySad, active: false },
              { I: SmileyMeh, active: false },
              { I: Smiley, active: true },
            ].map((m, i) => (
              <div
                key={i}
                className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all ${
                  m.active
                    ? "bg-gradient-to-br from-white to-[#EEF0FF] shadow-[0_4px_12px_rgba(184,168,255,0.35)]"
                    : ""
                }`}
              >
                <m.I
                  weight={m.active ? "fill" : "regular"}
                  className={`h-6 w-6 ${
                    m.active ? "text-[#7C6CE0]" : "text-slate-400"
                  }`}
                />
              </div>
            ))}
          </div>
        </TintCard>

        <TintCard
          tint="rgba(244, 182, 120, 0.20)"
          glow="rgba(244, 182, 120, 0.28)"
          className="md:col-span-2"
        >
          <div className="mb-3 inline-flex rounded-xl bg-white/60 p-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-white/40">
            <Waveform className="h-5 w-5 text-[#D9904A]" weight="bold" />
          </div>
          <h3 className="text-xl font-semibold text-foreground leading-snug">
            Balanced workload
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            See who's carrying what.
          </p>

          <div className="mt-5 space-y-4">
            {workloadData.map((w) => (
              <div key={w.name}>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>{w.name}</span>
                  <span className="text-slate-800">{w.v}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-white/50 shadow-inner">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${w.v}%`,
                      background: `linear-gradient(to right, ${w.color}aa, ${w.color})`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </TintCard>

        {/* Card 4. Privacy-first (Blue Tint) */}
        <TintCard
          tint="rgba(74, 144, 226, 0.20)"
          glow="rgba(74, 144, 226, 0.30)"
          className="md:col-span-4"
        >
          <div className="flex h-full flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="max-w-xs">
              <div className="mb-3 inline-flex rounded-xl bg-white/60 p-2 shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)] border border-white/40">
                <ShieldCheck className="h-5 w-5 text-[#4A90E2]" weight="bold" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground leading-snug">
                Privacy by design
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Your data is anonymized at the source. No names, no leaks — just
                quiet insights.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-[#4A90E2] shadow-sm border border-white/40">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4A90E2]" />
                Fully anonymous insights
              </div>
            </div>

            {/* Github-style Contribution Grid */}
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 30 }).map((_, i) => {
                const active = [2, 5, 8, 11, 14, 17, 21, 24, 27].includes(i);
                return (
                  <div
                    key={i}
                    className="h-5 w-5 rounded-md transition-colors"
                    style={{
                      background: active
                        ? "linear-gradient(135deg, rgba(74,144,226,0.7), rgba(74,144,226,0.4))"
                        : "rgba(255,255,255,0.5)",
                      boxShadow: active
                        ? "0 0 10px rgba(74,144,226,0.4), inset 0 1px 0 rgba(255,255,255,0.6)"
                        : "inset 0 1px 0 rgba(255,255,255,0.6)",
                      border: "1px solid rgba(255,255,255,0.4)",
                    }}
                  />
                );
              })}
            </div>
          </div>
        </TintCard>
      </div>
    </section>
  );
}