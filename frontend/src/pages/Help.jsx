import {
  MagnifyingGlass, Brain, Heartbeat, ShieldCheck, Sparkle, Pulse, Leaf, Moon, Coffee, FirstAidKit, EnvelopeSimple, ArrowRight, LockKey, Database, Cpu, WarningCircle, BookOpen,
} from "@phosphor-icons/react";

import GlassCard from "../components/ui/GlassCard";

const quickInsights = [
  {
    Icon: Heartbeat,
    title: "Cara Daily Check-In Bekerja",
    desc: "Pahami bagaimana AI membaca kondisi stres dan pemulihan Anda setiap hari.",
  },
  {
    Icon: Brain,
    title: "Memahami Risiko Burnout",
    desc: "Pelajari arti status Stabil, Waspada, dan Risiko Tinggi.",
  },
  {
    Icon: Sparkle,
    title: "Rekomendasi Recovery AI",
    desc: "Mengapa sistem memberikan intervensi pemulihan tertentu.",
  },
];

const systemGuides = [
  {
    group: "AI Perilaku",
    Icon: Cpu,
    items: [
      "Bagaimana AI mengevaluasi pola",
      "Apa itu baseline pengguna",
      "Mengapa konsistensi penting",
    ],
  },
  {
    group: "Recovery & Kesehatan Mental",
    Icon: Leaf,
    items: [
      "Pemulihan sistem saraf",
      "Mengatasi kelelahan mental",
      "Mengurangi overload pekerjaan",
    ],
  },
  {
    group: "Privasi & Akun",
    Icon: ShieldCheck,
    items: [
      "Keamanan dan enkripsi data",
      "Mengapa sebagian data dikunci",
      "Mengelola sesi akun",
    ],
  },
];

const educationCards = [
  {
    Icon: Moon,
    title: "Kurang Tidur",
    desc: "Kurang tidur yang terjadi terus-menerus dapat meningkatkan stres dan menurunkan fokus.",
  },
  {
    Icon: Coffee,
    title: "Kelelahan Mental",
    desc: "Tubuh bisa terlihat baik-baik saja, tetapi otak sebenarnya sudah kelelahan.",
  },
  {
    Icon: Pulse,
    title: "Akumulasi Stres",
    desc: "Burnout biasanya terjadi perlahan akibat stres yang terus menumpuk.",
  },
];

export default function Help() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto p-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Help Center
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Panduan penggunaan sistem, edukasi recovery, dan transparansi AI LowCortisol.
        </p>
      </div>

      <GlassCard className="p-4 sm:p-5 border-primary/10">
        <div className="relative">
          <MagnifyingGlass
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Cari bantuan seputar burnout, recovery, AI, atau dashboard..."
            className="w-full rounded-2xl border border-slate-200 bg-white/70 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </GlassCard>

      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pemahaman Dasar
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {quickInsights.map((item) => (
            <GlassCard
              key={item.title}
              className="group p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              <div className="inline-flex rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-100 p-3 text-primary">
                <item.Icon size={22} weight="duotone" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>

              <div className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-primary">
                Pelajari
                <ArrowRight size={12} />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Panduan Sistem
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {systemGuides.map((guide) => (
            <GlassCard
              key={guide.group}
              className="p-6 border-slate-200/70"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <guide.Icon size={18} weight="duotone" />
                </div>

                <h3 className="text-lg font-bold text-foreground">
                  {guide.group}
                </h3>
              </div>

              <div className="mt-5 space-y-2">
                {guide.items.map((item) => (
                  <button
                    key={item}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-primary"
                  >
                    {item}

                    <ArrowRight size={13} />
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Edukasi Recovery
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {educationCards.map((card) => (
            <GlassCard key={card.title} className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <card.Icon size={22} weight="duotone" />
              </div>

              <h3 className="mt-4 text-lg font-bold text-foreground">
                {card.title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard className="p-7 border-amber-200/40 bg-gradient-to-br from-amber-50/40 to-white">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <Database size={26} weight="duotone" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
              <LockKey size={14} />
              Baseline Perilaku AI
            </div>

            <h3 className="mt-2 text-xl font-bold text-foreground">
              Mengapa Sebagian Data Tidak Bisa Diubah?
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              LowCortisol menggunakan baseline perilaku historis untuk memahami
              pola burnout jangka panjang. Karena itu, beberapa data onboarding
              dikunci agar analisis AI tetap konsisten dan tidak menghasilkan
              interpretasi yang bias.
            </p>

            <div className="mt-5 rounded-2xl border border-amber-200/50 bg-white/70 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <WarningCircle
                  size={16}
                  weight="fill"
                  className="text-orange-500"
                />
                Konsistensi data membantu AI memberikan analisis yang lebih akurat.
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <EnvelopeSimple size={22} weight="duotone" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">
                Butuh Bantuan?
              </h3>

              <p className="mt-1 text-sm text-muted-foreground max-w-md">
                Tim support kami membantu masalah akun, onboarding, maupun penggunaan sistem recovery.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              Kirim Email
            </button>

            <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:opacity-90">
              Hubungi Support
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="relative overflow-hidden rounded-3xl border border-violet-200/40 bg-gradient-to-br from-violet-100/30 to-white p-7">
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl" />

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-6">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="flex h-12 w-32 items-center justify-center rounded-2xl bg-white/70 text-violet-600 shadow-sm">
              <FirstAidKit size={22} weight="duotone" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-foreground">
                Kamu Tidak Sendiri
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600">
                Jika Anda merasa kewalahan secara emosional atau kesulitan menghadapi tekanan sehari-hari,
                pertimbangkan untuk berbicara dengan orang terpercaya, profesional kesehatan mental,
                atau layanan bantuan terdekat.
              </p>

              <div className="mt-4 flex items-start gap-2 rounded-2xl border border-violet-200/40 bg-white/60 p-4">
                <BookOpen
                  size={16}
                  weight="fill"
                  className="mt-0.5 text-violet-500"
                />

                <p className="text-xs leading-relaxed text-slate-500">
                  LowCortisol bukan sistem diagnosis medis. Platform ini hanya memberikan insight perilaku,
                  edukasi burnout, dan rekomendasi recovery berbasis data.
                </p>
              </div>
            </div>
          </div>

          <button className="rounded-full bg-white/80 px-5 py-2.5 text-sm font-bold text-violet-600 shadow-lg transition hover:bg-white">
            Cari Dukungan
          </button>
        </div>
      </div>
    </div>
  );
}