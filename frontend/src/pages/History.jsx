import { useState, useEffect } from "react";
import { 
  TrendUp, TrendDown, Minus, 
  Flame, CircleDashed, CheckCircle, WarningCircle, Sparkle
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import { dashboardService } from "../services/api";

const RISK_MAP = {
  High: { height: "100%", color: "bg-orange-500", text: "text-orange-600", bg: "bg-orange-500/10", border: "border-orange-500/30", label: "High Risk", Icon: Flame, },
  Medium: { height: "60%", color: "bg-amber-500", text: "text-amber-600", bg: "bg-amber-500/10", border: "border-amber-500/30", label: "Elevated", Icon: WarningCircle, },
  Low: { height: "25%", color: "bg-teal-500", text: "text-teal-600", bg: "bg-teal-500/10", border: "border-teal-500/30", label: "Stable", Icon: CheckCircle, },
  None: { height: "8%", color: "bg-slate-300", text: "text-slate-400", bg: "bg-slate-500/10", border: "border-slate-500/20", label: "No Data", Icon: CircleDashed, }
};

export default function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [trends, setTrends] = useState([]);
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response?.status === 'success') {
          setTrends(response.data.weeklyTrends || []);
          setHasCheckedInToday(response.data.hasCheckedInToday);
        }
      } catch (err) {
        setErrorMsg("Gagal memuat riwayat. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <Sparkle weight="duotone" className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">Memuat riwayat analitik...</span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-xl mx-4 mt-8">{errorMsg}</div>;
  }

  const riskValues = { High: 3, Medium: 2, Low: 1, None: 0 };
  const validTrends = trends.filter(t => t.r !== "None");
  let trendDirection = "stable";
  
  if (validTrends.length >= 2) {
    const last = riskValues[validTrends[validTrends.length - 1].r];
    const prev = riskValues[validTrends[validTrends.length - 2].r];
    if (last < prev) trendDirection = "down";
    if (last > prev) trendDirection = "up";
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10 pt-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Historical Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Catatan riwayat risiko burnout 7 hari terakhir.</p>
      </div>

      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Trajectory</div>
            <h3 className="mt-1 text-lg font-bold text-foreground">7 Hari Terakhir</h3>
          </div>
          {validTrends.length >= 2 && (
            <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
              trendDirection === 'down' ? 'bg-teal-50 text-teal-600 border border-teal-200' :
              trendDirection === 'up' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
              'bg-slate-100 text-slate-600 border border-slate-200'
            }`}>
              {trendDirection === 'down' ? <TrendDown weight="bold" /> : trendDirection === 'up' ? <TrendUp weight="bold" /> : <Minus weight="bold" />}
              {trendDirection === 'down' ? 'Risiko Menurun' : trendDirection === 'up' ? 'Risiko Meningkat' : 'Risiko Stabil'}
            </div>
          )}
        </div>

        <div className="relative mt-10 flex h-40 w-full items-end justify-between gap-2 px-2 border-b border-slate-200 pb-2">
          {trends.map((t, i) => {
            const rMap = RISK_MAP[t.r];
            const isToday = i === trends.length - 1;
            
            return (
              <div key={i} className="group relative flex h-full w-full flex-col items-center justify-end">
                <div 
                  className={`w-full max-w-[3rem] rounded-t-xl transition-all duration-700 shadow-sm ${rMap.color} ${isToday ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}
                  style={{ 
                    height: rMap.height,
                    animation: `dotIn 0.5s ${i * 0.05}s ease-out backwards` 
                  }}
                />
                
                <div className="pointer-events-none absolute -top-8 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <div className={`whitespace-nowrap rounded-md px-2 py-1 text-[10px] font-bold text-white shadow-md ${rMap.color}`}>
                    {rMap.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <div className="flex mt-3 text-[10px] font-bold text-muted-foreground/60 uppercase">
          {trends.map((t, i) => (
            <div key={i} className="flex-1 flex justify-center">
              <span>{t.d}</span>
            </div>
          ))}
        </div>
      </GlassCard>

      <div className="grid gap-6 md:grid-cols-3">
        <GlassCard className="md:col-span-2 p-6 sm:p-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Analisis Mingguan</div>
          <h3 className="mt-1 text-lg font-bold text-foreground">Detail Jurnal</h3>

          <ul className="relative mt-6 space-y-5 pl-7">
            <span className="absolute left-[13px] top-4 bottom-4 w-px bg-slate-200" />
            
            {(() => {
              const loggedTrends = [...trends]
                .reverse()
                .map((t, i) => ({ ...t, isToday: i === 0 }))
                .filter(t => t.r !== "None");

              if (loggedTrends.length === 0) {
                return <div className="text-sm font-medium text-slate-400 -ml-7 mt-4">Belum ada jurnal tercatat dalam 7 hari terakhir.</div>;
              }

              return loggedTrends.map((t, i) => {
                const rMap = RISK_MAP[t.r];
                return (
                  <li key={i} className="relative">
                    <span className={`absolute -left-[1.95rem] top-4 h-3 w-3 rounded-full border-2 border-white shadow-sm ${rMap.color}`} />
                    <div className="rounded-2xl border border-white/60 bg-white/60 p-4 shadow-sm hover:bg-white transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${rMap.bg} ${rMap.text}`}>
                            <rMap.Icon className="h-5 w-5" weight="duotone" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-foreground flex items-center gap-2">
                              {rMap.label}
                              {t.isToday && <span className="text-[9px] uppercase bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold">Hari Ini</span>}
                            </div>
                            <div className="text-xs font-medium text-muted-foreground mt-0.5">Hari {t.d} • Prediksi Model AI</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              });
            })()}
          </ul>
        </GlassCard>

        <GlassCard className="p-6 sm:p-8 h-fit">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Kepatuhan Tracker</div>
          <h3 className="mt-1 text-lg font-bold text-foreground">Sistem</h3>

          <ul className="mt-5 space-y-3">
            <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white/50 p-3 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <CheckCircle className="h-5 w-5" weight="fill" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">Jurnal Hari Ini</div>
                <div className="text-xs text-muted-foreground">{hasCheckedInToday ? "Telah Disimpan" : "Belum Mengisi"}</div>
              </div>
            </li>
            <li className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/50 p-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                <CircleDashed className="h-5 w-5" weight="bold" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-500">Kepatuhan Mingguan</div>
                <div className="text-xs text-slate-400">{validTrends.length} / 7 Hari</div>
              </div>
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}