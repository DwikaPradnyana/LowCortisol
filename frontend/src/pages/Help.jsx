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
    // PERBAIKAN: px-4 untuk mobile, pb-24 untuk menghindari Chatbot float
    <div className="space-y-5 sm:space-y-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 sm:pb-10">
      <div className="px-1 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Help Center
        </h1>

        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-muted-foreground">
          Panduan penggunaan sistem, edukasi recovery, dan transparansi AI LowCortisol.
        </p>
      </div>

      <GlassCard className="p-4 sm:p-5 border-primary/10">
        <div className="relative">
          <MagnifyingGlass
            className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 text-slate-400 h-4 w-4 sm:h-5 sm:w-5"
          />

          <input
            type="text"
            placeholder="Cari bantuan seputar burnout..."
            className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/70 py-3 sm:py-4 pl-10 sm:pl-12 pr-4 text-xs sm:text-sm outline-none transition focus:border-primary/30 focus:ring-4 focus:ring-primary/10"
          />
        </div>
      </GlassCard>

      <div>
        <div className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Pemahaman Dasar
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {quickInsights.map((item) => (
            <GlassCard
              key={item.title}
              className="group p-5 sm:p-6 transition-all duration-300 hover:border-primary/20 hover:shadow-lg"
            >
              <div className="inline-flex rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-indigo-100 p-2.5 sm:p-3 text-primary">
                <item.Icon className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
              </div>

              <h3 className="mt-4 sm:mt-5 text-base sm:text-lg font-bold text-foreground leading-tight">
                {item.title}
              </h3>

              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {item.desc}
              </p>

              <div className="mt-4 sm:mt-5 inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-primary">
                Pelajari
                <ArrowRight size={12} className="sm:w-3.5 sm:h-3.5" />
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Panduan Sistem
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {systemGuides.map((guide) => (
            <GlassCard
              key={guide.group}
              className="p-5 sm:p-6 border-slate-200/70"
            >
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary">
                  <guide.Icon className="h-4 w-4 sm:h-5 sm:w-5" weight="duotone" />
                </div>

                <h3 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                  {guide.group}
                </h3>
              </div>

              <div className="mt-4 sm:mt-5 space-y-1.5 sm:space-y-2">
                {guide.items.map((item) => (
                  <button
                    key={item}
                    className="flex w-full items-center justify-between rounded-lg sm:rounded-xl px-2.5 py-2 sm:px-3 sm:py-2 text-xs sm:text-sm text-slate-600 transition hover:bg-slate-50 hover:text-primary text-left"
                  >
                    <span className="truncate pr-2">{item}</span>
                    <ArrowRight size={13} className="shrink-0" />
                  </button>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Edukasi Recovery
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {educationCards.map((card) => (
            <GlassCard key={card.title} className="p-5 sm:p-6">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-slate-100 text-slate-700">
                <card.Icon className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
              </div>

              <h3 className="mt-3 sm:mt-4 text-base sm:text-lg font-bold text-foreground leading-tight">
                {card.title}
              </h3>

              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
                {card.desc}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>

      <GlassCard className="p-5 sm:p-7 border-amber-200/40 bg-gradient-to-br from-amber-50/40 to-white">
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-600">
            <Database className="h-6 w-6 sm:h-7 sm:w-7" weight="duotone" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600">
              <LockKey className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
              Baseline Perilaku AI
            </div>

            <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-bold text-foreground leading-tight">
              Mengapa Sebagian Data Tidak Bisa Diubah?
            </h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
              LowCortisol menggunakan baseline perilaku historis untuk memahami
              pola burnout jangka panjang. Karena itu, beberapa data onboarding
              dikunci agar analisis AI tetap konsisten dan tidak menghasilkan
              interpretasi yang bias.
            </p>

            <div className="mt-4 sm:mt-5 rounded-xl sm:rounded-2xl border border-amber-200/50 bg-white/70 p-3.5 sm:p-4">
              <div className="flex items-start sm:items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <WarningCircle
                  weight="fill"
                  className="h-4 w-4 sm:h-4 sm:w-4 shrink-0 mt-0.5 sm:mt-0 text-orange-500"
                />
                <span className="leading-tight">Konsistensi data membantu AI memberikan analisis yang lebih akurat.</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-7">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-primary/10 text-primary">
              <EnvelopeSimple className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                Butuh Bantuan?
              </h3>

              <p className="mt-1 text-xs sm:text-sm text-muted-foreground max-w-md leading-relaxed">
                Tim support kami membantu masalah akun, onboarding, maupun penggunaan sistem recovery.
              </p>
            </div>
          </div>

          {/* PERBAIKAN: Flex column di mobile agar tidak terpotong */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 w-full md:w-auto">
            <button className="w-full sm:w-auto rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-bold text-slate-700 transition hover:bg-slate-50">
              Kirim Email
            </button>

            <button className="w-full sm:w-auto rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-primary/20 transition hover:opacity-90">
              Hubungi Support
            </button>
          </div>
        </div>
      </GlassCard>

      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-violet-200/40 bg-gradient-to-br from-violet-100/30 to-white p-5 sm:p-7">
        <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-violet-300/20 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col md:flex-row items-start justify-between gap-5 sm:gap-6">
          <div className="flex items-start gap-3 sm:gap-4 max-w-xl">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white/70 text-violet-600 shadow-sm">
              <FirstAidKit className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground leading-tight">
                Kamu Tidak Sendiri
              </h3>

              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                Jika Anda merasa kewalahan secara emosional atau kesulitan menghadapi tekanan sehari-hari,
                pertimbangkan untuk berbicara dengan orang terpercaya, profesional kesehatan mental,
                atau layanan bantuan terdekat.
              </p>

              <div className="mt-3 sm:mt-4 flex items-start gap-2 rounded-xl sm:rounded-2xl border border-violet-200/40 bg-white/60 p-3.5 sm:p-4">
                <BookOpen
                  weight="fill"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 mt-0.5 text-violet-500"
                />

                <p className="text-[10px] sm:text-xs leading-relaxed text-slate-500">
                  LowCortisol bukan sistem diagnosis medis. Platform ini hanya memberikan insight perilaku,
                  edukasi burnout, dan rekomendasi recovery berbasis data.
                </p>
              </div>
            </div>
          </div>

          <button className="w-full md:w-auto rounded-full bg-white/80 px-5 py-2.5 text-xs sm:text-sm font-bold text-violet-600 shadow-lg transition hover:bg-white shrink-0">
            Cari Dukungan
          </button>
        </div>
      </div>
    </div>
  );
}