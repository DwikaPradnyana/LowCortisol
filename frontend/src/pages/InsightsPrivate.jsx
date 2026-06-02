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
      <div className="rounded-xl bg-red-50 p-5 sm:p-6 text-center text-sm font-medium text-red-500 m-4">
        {errorMsg}
      </div>
    );
  }

  const insight = apiData?.personalInsight;
  const factors = insight?.factors || [];
  const hasFactors = factors.length > 0;

  return (
    <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 sm:pb-10">
      
      <div className="px-1 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          System Insights
        </h1>
        <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
          Transparansi analitik dan reasoning engine di balik prediksi burnout LowCortisol.
        </p>
      </div>

      <GlassCard className="border-primary/20 bg-gradient-to-br from-white/70 to-primary/5 p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex h-10 w-10 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-white shadow-sm border border-slate-100 text-primary">
            <Target className="h-5 w-5 sm:h-7 sm:w-7" weight="duotone" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-primary">
              Deteksi Dinamis Hari Ini
            </div>

            <h2 className="mt-1 text-xl sm:text-2xl font-bold leading-tight">
              Primary Stress Drivers
            </h2>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              Sistem mendeteksi pola perilaku yang paling berkontribusi terhadap
              deviasi risiko burnout Anda hari ini.
            </p>

            <div className="mt-4 sm:mt-5">
              {hasFactors ? (
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {factors.map((factor, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl bg-slate-900 px-2.5 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-bold text-white shadow-sm"
                    >
                      <Pulse weight="bold" className="shrink-0" />
                      <span className="truncate">{factor}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-3.5 sm:p-4">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-700">
                    <CheckCircle weight="fill" className="shrink-0" />
                    Tidak Ada Faktor Dominan
                  </div>

                  <p className="mt-1.5 text-[11px] sm:text-xs leading-relaxed text-teal-700/80">
                    Sistem tidak menemukan satu variabel tunggal yang mendominasi profil risiko Anda hari ini.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Cpu className="h-4 w-4 shrink-0" />
            AI Evaluation Matrix
          </div>

          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold">
            27 Behavioral Parameters
          </h3>

          <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground">
            Prediksi burnout dilakukan melalui evaluasi multidimensi terhadap sinyal perilaku, fisiologis, dan konteks kerja.
          </p>

          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">
            <div className="rounded-xl border border-slate-100 bg-white/60 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <Database className="text-indigo-500 shrink-0" weight="fill" />
                Profil Statis
              </div>

              <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-slate-500">
                Usia, departemen, pola kerja, status WFH, dan baseline stres struktural.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white/60 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <ListChecks className="text-orange-500 shrink-0" weight="fill" />
                Sinyal Dinamis
              </div>

              <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-slate-500">
                Tidur, layar, deadline, konflik kerja, meeting, dan recovery harian.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <TrendUp className="h-4 w-4 shrink-0" />
            Risk Momentum
          </div>

          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold">Current State</h3>

          {apiData?.todayStatus?.risk === "High" ? (
             <div className="mt-4 sm:mt-5 rounded-2xl bg-orange-50 border border-orange-100 p-4 sm:p-5">
               <div className="flex items-center gap-3">
                 <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-orange-500 text-white">
                   <TrendUp weight="bold" />
                 </div>
                 <div>
                   <div className="text-xs sm:text-sm font-bold text-orange-700">Critical Load Detected</div>
                   <div className="text-[10px] sm:text-xs text-orange-700/80">Ambang batas toleransi terlampaui.</div>
                 </div>
               </div>
               <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs leading-relaxed text-orange-800/80">Sistem mendeteksi defisit pemulihan akut. Kapasitas kognitif beroperasi di bawah baseline.</p>
             </div>
          ) : apiData?.todayStatus?.risk === "Medium" ? (
            <div className="mt-4 sm:mt-5 rounded-2xl bg-amber-50 border border-amber-100 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-amber-500 text-white">
                  <TrendDown weight="bold" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-amber-700">Recovery Debt Detected</div>
                  <div className="text-[10px] sm:text-xs text-amber-700/80">Pemulihan mulai tertinggal dari aktivitas.</div>
                </div>
              </div>
              <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs leading-relaxed text-amber-800/80">Sistem mendeteksi kombinasi beban kerja dan defisit istirahat yang meningkat secara bertahap.</p>
            </div>
          ) : (
            <div className="mt-4 sm:mt-5 rounded-2xl bg-teal-50 border border-teal-100 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg sm:rounded-xl bg-teal-500 text-white">
                  <ShieldCheck weight="bold" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-teal-700">Equilibrium Maintained</div>
                  <div className="text-[10px] sm:text-xs text-teal-700/80">Kapasitas stres dan pemulihan seimbang.</div>
                </div>
              </div>
              <p className="mt-3 sm:mt-4 text-[11px] sm:text-xs leading-relaxed text-teal-800/80">Sistem memvalidasi ritme kerja yang berkelanjutan tanpa indikasi kelelahan sistemik.</p>
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Sparkle className="h-4 w-4 shrink-0" />
            System Recommendation
          </div>

          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold">
            Priority Intervention
          </h3>

          <div className="mt-4 sm:mt-5">
            {apiData?.recommendation ? (
               <div className="rounded-xl border border-slate-100 bg-white/70 p-3.5 sm:p-4">
                 <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800">
                   <Lightning className="text-primary shrink-0" weight="fill" />
                   <span className="leading-tight">{apiData.recommendation.title}</span>
                 </div>
                 <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs leading-relaxed text-slate-600">
                   {apiData.recommendation.description}
                 </p>
                 {apiData.recommendation.time && (
                    <div className="mt-3 sm:mt-4 inline-block rounded-md bg-slate-100 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Target Waktu: {apiData.recommendation.time}
                    </div>
                 )}
               </div>
            ) : (
              <div className="flex h-24 sm:h-32 flex-col items-center justify-center text-center px-4">
                <span className="text-[11px] sm:text-xs font-medium text-slate-400">Membutuhkan input jurnal harian<br/>untuk menghasilkan intervensi medis.</span>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-5 sm:p-6 border-dashed border-slate-200 bg-slate-50/70">
        <div className="flex flex-col sm:flex-row items-start gap-3">
          <Brain className="mt-0 sm:mt-1 h-5 w-5 text-slate-500 shrink-0" weight="duotone" />

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-700">Tentang Explainable AI</h4>

            <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs leading-relaxed text-slate-500">
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