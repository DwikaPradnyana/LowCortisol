import { useState, useEffect } from "react";
import {
  Brain,
  Cpu,
  Database,
  Pulse,
  CheckCircle,
  Target,
  ListChecks,
  TrendUp,
  TrendDown,
  ShieldCheck,
  Sparkle,
  Lightning,
} from "@phosphor-icons/react";

import GlassCard from "../components/ui/GlassCard";
import { dashboardService } from "../services/api";

export default function Insights() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await dashboardService.getDashboardData();

        if (response?.status === "success") {
          setApiData(response.data);
        }
      } catch (err) {
        setErrorMsg("Gagal memuat modul Explainable AI.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInsights();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <Brain weight="duotone" className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">
            Menginisialisasi Explainable AI Engine...
          </span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-center text-red-500">
        {errorMsg}
      </div>
    );
  }

  const insight = apiData?.personalInsight;
  const factors = insight?.factors || [];
  const hasFactors = factors.length > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-10 pt-6">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          System Insights
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Transparansi analitik dan reasoning engine di balik prediksi burnout LowCortisol.
        </p>
      </div>

      <GlassCard className="border-primary/20 bg-gradient-to-br from-white/70 to-primary/5 p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-sm border border-slate-100 text-primary">
            <Target className="h-7 w-7" weight="duotone" />
          </div>

          <div className="flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-primary">
              Deteksi Dinamis Hari Ini
            </div>

            <h2 className="mt-1 text-2xl font-bold">
              Primary Stress Drivers
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sistem mendeteksi pola perilaku yang paling berkontribusi terhadap
              deviasi risiko burnout Anda hari ini.
            </p>

            <div className="mt-5">
              {hasFactors ? (
                <div className="flex flex-wrap gap-2">
                  {factors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white shadow-sm"
                    >
                      <Pulse weight="bold" />
                      {factor}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4">
                  <div className="flex items-center gap-2 text-sm font-semibold text-teal-700">
                    <CheckCircle weight="fill" />
                    Tidak Ada Faktor Dominan
                  </div>

                  <p className="mt-1 text-xs leading-relaxed text-teal-700/80">
                    Sistem tidak menemukan satu variabel tunggal yang mendominasi profil risiko Anda hari ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Cpu className="h-4 w-4" />
            AI Evaluation Matrix
          </div>

          <h3 className="mt-3 text-lg font-bold">
            27 Behavioral Parameters
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Prediksi burnout dilakukan melalui evaluasi multidimensi terhadap sinyal perilaku, fisiologis, dan konteks kerja.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-xl border border-slate-100 bg-white/60 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <Database className="text-indigo-500" weight="fill" />
                Profil Statis
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Usia, departemen, pola kerja, status WFH, dan baseline stres struktural.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white/60 p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <ListChecks className="text-orange-500" weight="fill" />
                Sinyal Dinamis
              </div>

              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                Tidur, layar, deadline, konflik kerja, meeting, dan recovery harian.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <TrendUp className="h-4 w-4" />
            Risk Momentum
          </div>

          <h3 className="mt-3 text-lg font-bold">Current State</h3>

          {apiData?.todayStatus?.risk === "High" ? (
             <div className="mt-5 rounded-2xl bg-orange-50 border border-orange-100 p-5">
               <div className="flex items-center gap-3">
                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                   <TrendUp weight="bold" />
                 </div>
                 <div>
                   <div className="text-sm font-bold text-orange-700">Critical Load Detected</div>
                   <div className="text-xs text-orange-700/80">Ambang batas toleransi terlampaui.</div>
                 </div>
               </div>
               <p className="mt-4 text-xs leading-relaxed text-orange-800/80">Sistem mendeteksi defisit pemulihan akut. Kapasitas kognitif beroperasi di bawah baseline.</p>
             </div>
          ) : apiData?.todayStatus?.risk === "Medium" ? (
            <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500 text-white">
                  <TrendDown weight="bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-700">Recovery Debt Detected</div>
                  <div className="text-xs text-amber-700/80">Pemulihan mulai tertinggal dari aktivitas.</div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-amber-800/80">Sistem mendeteksi kombinasi beban kerja dan defisit istirahat yang meningkat secara bertahap.</p>
            </div>
          ) : (
            <div className="mt-5 rounded-2xl bg-teal-50 border border-teal-100 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
                  <ShieldCheck weight="bold" />
                </div>
                <div>
                  <div className="text-sm font-bold text-teal-700">Equilibrium Maintained</div>
                  <div className="text-xs text-teal-700/80">Kapasitas stres dan pemulihan seimbang.</div>
                </div>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-teal-800/80">Sistem memvalidasi ritme kerja yang berkelanjutan tanpa indikasi kelelahan sistemik.</p>
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkle className="h-4 w-4" />
            System Recommendation
          </div>

          <h3 className="mt-3 text-lg font-bold">
            Priority Intervention
          </h3>

          <div className="mt-5">
            {apiData?.recommendation ? (
               <div className="rounded-xl border border-slate-100 bg-white/70 p-4">
                 <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                   <Lightning className="text-primary" weight="fill" />
                   {apiData.recommendation.title}
                 </div>
                 <p className="mt-3 text-xs leading-relaxed text-slate-600">
                   {apiData.recommendation.description}
                 </p>
                 {apiData.recommendation.time && (
                    <div className="mt-4 inline-block rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Target Waktu: {apiData.recommendation.time}
                    </div>
                 )}
               </div>
            ) : (
              <div className="flex h-32 flex-col items-center justify-center text-center">
                <span className="text-xs font-medium text-slate-400">Membutuhkan input jurnal harian<br/>untuk menghasilkan intervensi medis.</span>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6 border-dashed border-slate-200 bg-slate-50/70">
        <div className="flex items-start gap-3">
          <Brain className="mt-1 h-5 w-5 text-slate-500" weight="duotone" />

          <div>
            <h4 className="text-sm font-bold text-slate-700">Tentang Explainable AI</h4>

            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              LowCortisol tidak membaca emosi atau kondisi mental secara langsung.
              Sistem melakukan inferensi berdasarkan pola perilaku, recovery,
              dan tekanan kerja yang dikumpulkan melalui jurnal harian pengguna.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}