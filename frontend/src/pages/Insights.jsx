import {
  CalendarBlank,
  Coffee,
  Moon,
  ArrowRight,
  TrendUp,
  ShieldCheck,
} from "@phosphor-icons/react";

import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Footer from "../components/layout/Footer";

const INSIGHTS_CARDS = [
  {
    Icon: CalendarBlank,
    title: "Tekanan kerja meningkat di awal minggu",
    desc: "Pola check-in menunjukkan Senin menjadi hari dengan beban mental tertinggi.",
    theme: "orange",
    colorHex: "#f97316",
    chart: [30, 82, 60, 45, 40, 28, 22],
    highlight: 1,
  },
  {
    Icon: Moon,
    title: "Kualitas pemulihan membaik saat akhir pekan",
    desc: "Tidur lebih stabil dan ritme aktivitas lebih ringan membantu tubuh pulih lebih baik.",
    theme: "teal",
    colorHex: "#14b8a6",
    chart: [42, 48, 50, 52, 58, 84, 78],
    highlight: 5,
  },
  {
    Icon: Coffee,
    title: "Energi menurun setelah aktivitas panjang",
    desc: "Pola kelelahan meningkat ketika fokus dipertahankan terlalu lama tanpa jeda.",
    theme: "indigo",
    colorHex: "#6366f1",
    chart: [72, 68, 55, 44, 30, 42, 50],
    highlight: 4,
  },
];

function TintCard({ theme, children, className = "" }) {
  const themeMap = {
    orange: {
      tint: "rgba(251, 146, 60, 0.15)",
      glow: "rgba(251, 146, 60, 0.25)",
    },
    teal: {
      tint: "rgba(45, 212, 191, 0.15)",
      glow: "rgba(45, 212, 191, 0.25)",
    },
    indigo: {
      tint: "rgba(99, 102, 241, 0.15)",
      glow: "rgba(99, 102, 241, 0.25)",
    },
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

      {/* HERO */}
      <section className="py-16 text-center">

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-xl">
          <TrendUp weight="bold" className="h-3.5 w-3.5" />
          Pola kecil yang sering tidak disadari
        </div>

        <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-5xl">
          Pahami ritme <br />
          <span className="bg-gradient-to-r from-primary to-teal-400 bg-clip-text text-transparent">
            mental dan energimu
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
          LowCortisol membantu mengenali perubahan kecil pada pola aktivitas,
          energi, dan stres harian — sebelum semuanya berubah menjadi kelelahan berkepanjangan.
        </p>
      </section>

      {/* INSIGHT CARDS */}
      <section className="grid gap-6 md:grid-cols-3">
        {INSIGHTS_CARDS.map((c) => {
          const max = Math.max(...c.chart);

          return (
            <TintCard key={c.title} theme={c.theme}>

              <div className="inline-flex rounded-2xl bg-white/60 p-3 shadow-sm border border-white/60">
                <c.Icon
                  className="h-6 w-6"
                  style={{ color: c.colorHex }}
                  weight="duotone"
                />
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
                      background:
                        i === c.highlight
                          ? `linear-gradient(to top, ${c.colorHex}, ${c.colorHex}aa)`
                          : "linear-gradient(to top, rgba(255,255,255,0.9), rgba(255,255,255,0.5))",
                      boxShadow:
                        i === c.highlight
                          ? `0 0 12px ${c.colorHex}55`
                          : undefined,
                    }}
                  />
                ))}
              </div>
            </TintCard>
          );
        })}
      </section>

      {/* WEEKLY INSIGHT */}
      <section className="mt-16">

        <GlassCard className="p-8">

          <div className="flex flex-wrap items-start justify-between gap-6">

            <div className="max-w-md">

              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Ringkasan Mingguan
              </div>

              <h3 className="mt-2 text-2xl font-semibold text-foreground">
                Perubahan kecil yang mulai terlihat
              </h3>

              <p className="mt-2 text-muted-foreground">
                Insight dibangun dari pola check-in harian, bukan penilaian instan.
              </p>
            </div>

            <div className="flex items-center gap-1.5 rounded-full bg-teal-50 border border-teal-100 px-3 py-1 text-xs font-medium text-teal-600">
              <TrendUp weight="bold" className="h-3 w-3" />
              kondisi cenderung membaik
            </div>
          </div>

          <div className="relative mt-8 h-44 w-full">

            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full"
            >

              <defs>
                <linearGradient id="guest-area" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="var(--color-primary, #4a90ff)"
                    stopOpacity="0.25"
                  />
                  <stop
                    offset="100%"
                    stopColor="var(--color-primary, #4a90ff)"
                    stopOpacity="0"
                  />
                </linearGradient>
              </defs>

              {(() => {
                const data = [42, 55, 62, 58, 48, 82, 76];

                const pts = data
                  .map(
                    (v, i) =>
                      `${(i / (data.length - 1)) * 100},${100 - v}`
                  )
                  .join(" ");

                return (
                  <>
                    <polyline
                      points={`0,100 ${pts} 100,100`}
                      fill="url(#guest-area)"
                    />

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
            {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>
        </GlassCard>
      </section>

      {/* EXPLANATION */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">

        <GlassCard className="p-8">

          <div className="inline-flex rounded-2xl bg-primary/10 border border-primary/20 p-3 shadow-sm">
            <ShieldCheck weight="duotone" className="h-6 w-6 text-primary" />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Mengapa insight kecil itu penting?
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Burnout jarang terjadi secara tiba-tiba. Biasanya dimulai dari pola kecil yang terus berulang —
            tidur yang mulai berantakan, energi yang cepat habis,
            atau tekanan kerja yang terus meningkat tanpa jeda pemulihan.
          </p>
        </GlassCard>

        <GlassCard className="p-8">

          <div className="inline-flex rounded-2xl bg-indigo-400/10 border border-indigo-400/20 p-3 shadow-sm">
            <TrendUp weight="duotone" className="h-6 w-6 text-indigo-500" />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-foreground">
            Insight yang tidak menghakimi
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            LowCortisol tidak memaksa perubahan besar. Sistem hanya membantu menunjukkan pola yang mungkin selama ini terlewat,
            lalu memberikan rekomendasi kecil yang tetap terasa realistis untuk dijalani.
          </p>
        </GlassCard>
      </section>

      {/* CTA */}
      <section className="mt-16">

        <GlassCard className="flex flex-col items-center gap-6 p-10 text-center md:p-14">

          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Mulai pahami polamu sendiri
          </h2>

          <p className="max-w-md text-lg text-muted-foreground">
            Insight pertama mulai terbentuk hanya dari beberapa check-in harian sederhana.
          </p>

          <Button
            to="/auth"
            size="lg"
            className="mt-2 shadow-primary/20 group"
          >
            Mulai check-in pertama

            <ArrowRight
              weight="bold"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Button>
        </GlassCard>
      </section>

      <Footer />
    </main>
  );
}