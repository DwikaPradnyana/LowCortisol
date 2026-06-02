import { useState, useEffect } from "react";
import {
  Sparkle, Wind, Coffee, Drop, Check, LockKey, Leaf, Brain, Lightning, Moon, Monitor, Pulse, TrendDown, ShieldCheck, Fire,
} from "@phosphor-icons/react";

import GlassCard from "../components/ui/GlassCard";
import { dashboardService } from "../services/api";

const BASELINE_HABITS = [
  {
    id: "h1",
    Icon: Wind,
    title: "Regulasi Pernapasan (4-7-8)",
    desc: "Menurunkan aktivasi sistem saraf simpatik dan membantu stabilisasi detak.",
    impact: "HIGH IMPACT",
    time: "3 Min",
  },
  {
    id: "h2",
    Icon: Coffee,
    title: "Jeda Visual (20-20-20)",
    desc: "Mengurangi overstimulasi visual akibat eksposur layar berkepanjangan.",
    impact: "BASELINE",
    time: "1 Min",
  },
  {
    id: "h3",
    Icon: Drop,
    title: "Hidrasi Kognitif",
    desc: "Mencegah brain fog dan membantu kestabilan fokus jangka pendek.",
    impact: "BASELINE",
    time: "Action",
  },
  {
    id: "h4",
    Icon: Moon,
    title: "Sleep Protection Window",
    desc: "Hindari stimulasi digital 1 jam sebelum tidur.",
    impact: "HIGH IMPACT",
    time: "Tonight",
  },
];

export default function Recovery() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [apiData, setApiData] = useState(null);
  const [localChecked, setLocalChecked] = useState({});

  useEffect(() => {
    const fetchRecoveryData = async () => {
      try {
        const response = await dashboardService.getDashboardData();

        if (response?.status === "success") {
          setApiData(response.data);
        }
      } catch (err) {
        setErrorMsg("Gagal memuat recovery protocol.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecoveryData();
  }, []);

  const toggleCheck = (id) => {
    setLocalChecked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <Leaf weight="duotone" className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">
            Menyusun recovery protocol...
          </span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="mx-4 mt-8 rounded-xl bg-red-50 p-6 sm:p-8 text-center text-sm sm:text-base font-medium text-red-500">
        {errorMsg}
      </div>
    );
  }

  const hasCheckedIn = apiData?.hasCheckedInToday;
  const recommendation = apiData?.recommendation;
  const factors = apiData?.personalInsight?.factors || [];

  return (
    <div className="mx-auto max-w-6xl space-y-5 sm:space-y-6 px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-24 sm:pb-10">

      <div className="px-1 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Recovery Protocol
        </h1>
        <p className="mt-1 sm:mt-1.5 text-xs sm:text-sm text-muted-foreground">
          Intervensi preskriptif berbasis behavioral recovery analytics.
        </p>
      </div>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-3">

        <GlassCard className="relative overflow-hidden p-5 sm:p-6 bg-gradient-to-br from-orange-50/80 to-white">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-200/20 blur-3xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-orange-600">
              <Pulse className="h-4 w-4 shrink-0" />
              Nervous System State
            </div>

            <div className="mt-3 sm:mt-4 flex items-center gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                <TrendDown weight="bold" className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-orange-700 leading-tight">
                  Compensating
                </h3>
                <p className="text-[11px] sm:text-xs text-orange-700/80 mt-0.5">
                  Sistem masih stabil namun mulai menahan beban aktif.
                </p>
              </div>
            </div>

            <div className="mt-4 sm:mt-5 rounded-xl border border-orange-100 bg-white/70 p-3.5 sm:p-4">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-orange-500">
                Recovery Window
              </div>
              <div className="mt-1 text-sm sm:text-base font-bold text-slate-800">
                4–6 Jam
              </div>
              <p className="mt-1 text-[10px] sm:text-xs leading-relaxed text-slate-500">
                Dengan pengurangan stimulasi dan pemulihan tidur yang memadai.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Fire className="h-4 w-4 shrink-0" />
            Recovery Priority
          </div>

          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold text-foreground">
            Neural Load
          </h3>

          <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
            <div className="rounded-xl border border-orange-100 bg-orange-50/70 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-orange-700 truncate">
                  Digital Overstimulation
                </span>
                <span className="shrink-0 rounded-md bg-orange-500 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-white">
                  HIGH
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-amber-100 bg-amber-50/70 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-amber-700 truncate">
                  Sleep Recovery Debt
                </span>
                <span className="shrink-0 rounded-md bg-amber-500 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-white">
                  MEDIUM
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-semibold text-teal-700 truncate">
                  Physical Stability
                </span>
                <span className="shrink-0 rounded-md bg-teal-500 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-white">
                  STABLE
                </span>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            <Brain className="h-4 w-4 shrink-0" />
            AI Trigger Analysis
          </div>

          <h3 className="mt-2 sm:mt-3 text-base sm:text-lg font-bold">
            Why This Was Triggered
          </h3>

          {hasCheckedIn ? (
            <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
              {factors.length > 0 ? (
                factors.map((factor, idx) => (
                  <div
                    key={idx}
                    className="flex items-start sm:items-center gap-2.5 sm:gap-3 rounded-xl border border-slate-100 bg-white/70 p-3"
                  >
                    <div className="flex h-8 w-8 sm:h-9 sm:w-9 shrink-0 items-center justify-center rounded-lg bg-slate-900 text-white mt-0.5 sm:mt-0">
                      <Lightning weight="fill" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                        {factor}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5 leading-relaxed">
                        Berkontribusi terhadap deviasi recovery hari ini.
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl bg-teal-50 p-3.5 sm:p-4 text-xs sm:text-sm text-teal-700">
                  Tidak ada faktor dominan yang terdeteksi.
                </div>
              )}
            </div>
          ) : (
            <div className="mt-4 sm:mt-5 rounded-xl bg-slate-50 p-4 sm:p-5 text-center">
              <LockKey className="mx-auto h-5 w-5 sm:h-6 sm:w-6 text-slate-400" />
              <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-semibold text-slate-700">
                Menunggu Check-In
              </div>
              <p className="mt-1 text-[10px] sm:text-xs text-slate-500 leading-relaxed">
                Sistem membutuhkan jurnal harian untuk menghasilkan recovery analysis.
              </p>
            </div>
          )}
        </GlassCard>
      </div>

      <GlassCard className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-white/70 to-primary/5 p-5 sm:p-6 lg:p-8">
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-primary/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-primary">
              <Sparkle weight="fill" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              AI Priority Intervention
            </div>

            <h2 className="mt-3 sm:mt-4 text-xl sm:text-2xl font-bold leading-tight text-foreground">
              {recommendation?.title || "Pertahankan Stabilitas Recovery"}
            </h2>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm leading-relaxed text-muted-foreground">
              {recommendation?.description ||
                "Tidak ada intervensi kritis yang diperlukan saat ini. Fokus pada pemeliharaan ritme biologis dan kualitas recovery."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4 text-center shadow-sm">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Target Window
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-primary">
                {recommendation?.time || "Tonight"}
              </div>
            </div>

            <div className="rounded-xl sm:rounded-2xl border border-slate-100 bg-white p-3 sm:p-4 text-center shadow-sm">
              <div className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Urgency
              </div>
              <div className="mt-1 text-base sm:text-lg font-bold text-orange-600">
                Medium
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-5 sm:gap-6 lg:grid-cols-5">

        <GlassCard className="lg:col-span-3 p-5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Recovery Stack
              </div>
              <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground">
                Fundamental Habits
              </h3>
            </div>
          </div>

          <div className="space-y-3">
            {BASELINE_HABITS.map((habit) => {
              const isDone = localChecked[habit.id];

              return (
                <button
                  key={habit.id}
                  onClick={() => toggleCheck(habit.id)}
                  className={`group flex flex-col sm:flex-row w-full items-start sm:items-center gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 text-left transition-all duration-300 ${
                    isDone
                      ? "border-teal-500/30 bg-teal-50/50"
                      : "border-slate-100 bg-white/60 hover:border-primary/20 hover:bg-white hover:shadow-sm"
                  }`}
                >
                  <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-3">
                    <div
                      className={`flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg sm:rounded-xl transition-all ${
                        isDone
                          ? "bg-teal-500 text-white shadow-lg shadow-teal-500/20"
                          : "bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary"
                      }`}
                    >
                      {isDone ? (
                        <Check weight="bold" className="h-4 w-4 sm:h-5 sm:w-5" />
                      ) : (
                        <habit.Icon weight="duotone" className="h-4 w-4 sm:h-5 sm:w-5" />
                      )}
                    </div>
                    <span className="sm:hidden shrink-0 rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold text-slate-500">
                      {habit.time}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1 w-full mt-1 sm:mt-0">
                    <div
                      className={`text-xs sm:text-sm font-bold truncate ${
                        isDone ? "text-teal-700/60 line-through" : "text-foreground"
                      }`}
                    >
                      {habit.title}
                    </div>

                    <div className="mt-1 text-[10px] sm:text-xs leading-relaxed text-muted-foreground">
                      {habit.desc}
                    </div>

                    <div className="mt-2">
                      <span className="rounded-md bg-slate-100 px-2 py-1 text-[9px] sm:text-[10px] font-bold text-slate-500">
                        {habit.impact}
                      </span>
                    </div>
                  </div>

                  {/* Waktu di kanan pada desktop */}
                  <span className="hidden sm:block shrink-0 rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-500">
                    {habit.time}
                  </span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="lg:col-span-2 p-5 sm:p-6 lg:p-8 h-fit">

          <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recovery Intelligence
          </div>

          <h3 className="mt-1 text-base sm:text-lg font-bold text-foreground">
            Why Recovery Matters
          </h3>

          <p className="mt-3 sm:mt-4 text-[11px] sm:text-sm leading-relaxed text-muted-foreground">
            Burnout bukan hanya hasil stres tinggi, tetapi akumulasi kegagalan recovery dalam jangka panjang.
          </p>

          <div className="mt-5 sm:mt-6 space-y-3 sm:space-y-4">

            <div className="rounded-xl border border-slate-100 bg-white/60 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <Monitor className="text-orange-500 shrink-0" weight="fill" />
                Cognitive Overload
              </div>

              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs leading-relaxed text-slate-500">
                Paparan layar dan multitasking berlebih memperpanjang aktivasi neurologis.
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-white/60 p-3.5 sm:p-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700">
                <ShieldCheck className="text-teal-500 shrink-0" weight="fill" />
                Parasympathetic Recovery
              </div>

              <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-xs leading-relaxed text-slate-500">
                Sistem saraf membutuhkan ruang pemulihan untuk menjaga stabilitas fokus dan emosi.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}