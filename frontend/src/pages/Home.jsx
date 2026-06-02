import { 
  ArrowRight, 
  Lightning, 
  ShieldCheck, 
  Sparkle
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import SocialProof from "../components/home/SocialProof";
import PreventSection from "../components/home/PreventSection";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";

import { FEATURES_DATA, STEPS_DATA } from "../constants/homeContent";

export default function Home() {
  return (
    <main className="mx-auto w-[95%] max-w-6xl pb-24 overflow-hidden">
      
      <section className="relative grid gap-10 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        
        <div className="relative z-10">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur-md">
            <Sparkle weight="fill" className="h-3.5 w-3.5" />
            Proactive mental wellness
          </div>

          <h1 className="max-w-[12ch] text-3xl font-bold leading-[1.05] tracking-tight text-foreground sm:max-w-none sm:text-4xl md:text-5xl lg:text-6xl">
            Detect Burnout

            <span className="block bg-gradient-to-r from-primary via-sky-500 to-teal-400 bg-clip-text text-transparent">
              <Typewriter
                words={[
                  "Before It Breaks You",
                  "Before You Burn Out",
                ]}
                loop={0}
                cursor
                cursorStyle="|"
                typeSpeed={65}
                deleteSpeed={40}
                delaySpeed={2200}
              />
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
            Pendamping cerdas yang membantu memahami pola kerja, tingkat stres,
            dan tanda kelelahan sebelum burnout mulai memengaruhi hidup Anda.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Button
              to="/auth"
              size="lg"
              className="group w-full shadow-primary/20 sm:w-auto"
            >
              Mulai Assessment Gratis

              <ArrowRight
                weight="bold"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Button>

            <Button
              to="/how-it-works"
              variant="outline"
              size="lg"
              className="w-full bg-white/40 backdrop-blur-md sm:w-auto"
            >
              Pelajari Cara Kerja
            </Button>

          </div>
        </div>

        <div className="relative hidden h-[420px] items-center justify-center lg:flex">

          <div className="absolute h-72 w-72 rounded-full bg-gradient-to-br from-primary/30 to-accent/20 blur-3xl" />

          <div className="absolute h-64 w-64 rounded-full border border-white/60 bg-gradient-to-br from-white/60 via-secondary/60 to-accent/30 backdrop-blur-2xl shadow-[inset_0_2px_20px_rgba(255,255,255,0.7),0_20px_60px_rgba(45,212,191,0.15)]" />

          <div className="absolute -right-2 top-12 h-24 w-24 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-[0_10px_30px_rgba(45,212,191,0.15)]" />

          <div className="absolute bottom-10 -left-2 h-32 w-32 rounded-full border border-white/60 bg-gradient-to-br from-secondary/50 to-white/30 backdrop-blur-xl shadow-[0_10px_30px_rgba(45,212,191,0.15)]" />

          <GlassCard className="absolute left-0 top-1/4 animate-[bounce_5s_ease-in-out_infinite] px-5 py-4">
            <div className="flex items-center gap-3">

              <div className="rounded-full bg-accent p-2">
                <Lightning weight="bold" className="h-4 w-4 text-primary" />
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  Kondisi Hari Ini
                </div>

                <div className="font-semibold text-foreground">
                  Stabil · 78%
                </div>
              </div>

            </div>
          </GlassCard>

          <GlassCard className="absolute bottom-1/4 right-0 animate-[bounce_6s_ease-in-out_infinite_reverse] px-5 py-4">
            <div className="flex items-center gap-3">

              <div className="rounded-full bg-primary/15 p-2">
                <ShieldCheck weight="bold" className="h-4 w-4 text-primary" />
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  Risiko Burnout
                </div>

                <div className="font-semibold text-foreground">
                  Rendah
                </div>
              </div>

            </div>
          </GlassCard>

        </div>

      </section>

      <section className="mt-20 md:mt-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Sistem Pencegahan Burnout yang Lebih Cerdas</h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">
            Insight, pemantauan, dan rekomendasi pemulihan dalam satu pengalaman yang tenang dan ringan.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES_DATA.map((f) => (
            <GlassCard key={f.title} hover className="p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-secondary p-3 shadow-sm border border-white/60">
                <f.icon weight="duotone" className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground text-lg">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <PreventSection />

      <section className="mt-20 md:mt-32">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">How it works</h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground">Tiga langkah tenang. Tanpa rasa kewalahan.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          {STEPS_DATA.map((s) => (
            <GlassCard key={s.n} hover className="p-6 md:p-8">
              <div className="text-sm font-bold text-primary mb-3">{s.n}</div>
              <h3 className="text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
      </section>

      <SocialProof />

      <Footer />
      
    </main>
  );
}