import {
  ShieldCheck,
  Brain,
  Heartbeat,
  Sparkle,
  Star,
} from "@phosphor-icons/react";

const highlights = [
  {
    icon: Brain,
    title: "Deteksi burnout lebih awal",
    desc: "Membantu mengenali pola stres dan kelelahan sebelum berkembang menjadi burnout yang lebih serius.",
    accent: "from-[#B8A8FF]/30 to-[#EEF0FF]",
  },

  {
    icon: Heartbeat,
    title: "Check-in yang ringan",
    desc: "Dirancang agar cepat, sederhana, dan tidak mengganggu fokus kerja harian Anda.",
    accent: "from-[#F4B678]/30 to-[#FFF4E8]",
  },

  {
    icon: ShieldCheck,
    title: "Privasi sebagai prioritas",
    desc: "Data diproses dengan pendekatan yang menjaga kenyamanan dan keamanan pengguna sejak awal.",
    accent: "from-[#4A90E2]/25 to-[#EAF3FF]",
  },
];

export default function SocialProof() {
  return (
    <section className="mt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
          <Sparkle weight="fill" className="h-3.5 w-3.5" />
          Why LowCortisol
        </div>

        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Dibangun untuk membantu,
          <br />
          bukan menambah tekanan
        </h2>

        <p className="mt-4 leading-relaxed text-muted-foreground">
          LowCortisol hadir untuk membantu memahami pola stres dan kelelahan kerja
          secara lebih tenang, ringan, dan manusiawi — tanpa dashboard yang melelahkan
          atau check-in yang terasa membebani.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {highlights.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-[24px] border border-white/60 bg-white/40 p-8 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/60 hover:shadow-lg"
          >
            <div
              className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.accent} blur-3xl opacity-70 transition group-hover:opacity-100`}
            />

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/60 bg-white/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <item.icon
                  weight="duotone"
                  className="h-7 w-7 text-primary"
                />
              </div>

              <h3 className="mt-6 text-xl font-semibold text-foreground">
                {item.title}
              </h3>

              <p className="mt-3 leading-relaxed text-muted-foreground">
                {item.desc}
              </p>

              <div className="mt-6 flex items-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} weight="fill" className="h-4 w-4" />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Kami percaya kesehatan mental tidak seharusnya dipantau dengan tekanan tambahan.
          Karena itu, setiap bagian dari LowCortisol dirancang agar terasa ringan,
          tenang, dan tetap membantu di tengah aktivitas kerja sehari-hari.
        </p>
      </div>
    </section>
  );
}