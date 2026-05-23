import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun, Warning, Flame, Briefcase, CalendarX, Wind, Coffee, Stack, Check, ArrowRight, Info, PlusCircle, CheckCircle, Sparkle, MoonStars, Brain
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { dashboardService } from "../services/api";

const RISK_UI = {
  Low: { label: "LOW RISK", textColor: "text-teal-600", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30", gradientText: "from-teal-400 to-teal-600", glowOrb: "bg-teal-500", hex: "#0d9488" },
  Medium: { label: "ELEVATED", textColor: "text-amber-600", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", gradientText: "from-amber-400 to-amber-600", glowOrb: "bg-amber-500", hex: "#d97706" },
  High: { label: "HIGH RISK", textColor: "text-orange-600", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", gradientText: "from-orange-500 to-red-600", glowOrb: "bg-orange-500", hex: "#ea580c" },
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [hoveredDay, setHoveredDay] = useState(null);
  
  const [apiData, setApiData] = useState({
    user: { name: "" },
    hasCheckedInToday: false,
    todayStatus: { risk: "Low", insight: "" },
    weeklyTrends: [],
    personalInsight: null,
    recommendation: null
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response?.status === 'success' && response.data) {
          setApiData(response.data);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/auth");
        }
        setErrorMsg("Gagal memuat data dari server. Pastikan API berjalan.");
      } finally {
        setIsLoading(false);
      }
    };
    loadDashboard();
  }, [navigate]);

  const curUI = RISK_UI[apiData?.todayStatus?.risk] || RISK_UI.Low;

  const renderIcon = (iconName, className) => {
    const icons = { Briefcase, CalendarX, Wind, Coffee, Stack, MoonStars, Brain, Warning, Info, Check, Sparkle };
    const IconComponent = icons[iconName] || Info;
    return <IconComponent weight="duotone" className={className} />;
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <Sparkle weight="duotone" className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">Sinkronisasi data...</span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return <div className="p-8 text-center text-red-500 font-medium bg-red-50 rounded-xl border border-red-200 mx-4 mt-8">{errorMsg}</div>;
  }

  return (
    <div className="space-y-6 relative max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      <style>{`@keyframes dotIn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }`}</style>

      {/* HEADER SECTION (Tidak Diubah) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Hi, {apiData?.user?.name || "User"}. <span className="text-muted-foreground/60 font-medium">How are you feeling today?</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor your patterns and prevent exhaustion.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/checkin")}
          disabled={apiData?.hasCheckedInToday}
          className="w-full md:w-auto bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-full font-medium transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        >
          {apiData?.hasCheckedInToday ? <Check weight="bold" className="h-5 w-5" /> : <PlusCircle weight="fill" className="h-5 w-5" />}
          {apiData?.hasCheckedInToday ? "Routine Logged" : "Log Daily Routine"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 auto-rows-auto">
        
        {/* CENTERPIECE: BURNOUT STATUS (Tidak Diubah) */}
        <GlassCard className="md:col-span-4 md:row-span-2 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden">
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 ${curUI.glowOrb}`} />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Current Status</div>
              <h2 className={`mt-2 text-5xl md:text-6xl font-bold tracking-tighter leading-none bg-gradient-to-r ${curUI.gradientText} bg-clip-text text-transparent drop-shadow-sm`}>
                {curUI.label}
              </h2>
            </div>
            {apiData?.hasCheckedInToday && (
              <div className="inline-flex items-center self-start gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold bg-white/50 backdrop-blur-sm border-slate-200 text-slate-700">
                <CheckCircle weight="fill" className="h-4 w-4 text-emerald-500" /> Logged Today
              </div>
            )}
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex gap-2 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-1.5 backdrop-blur-xl">
              {["Low", "Medium", "High"].map((level) => {
                const isCurrent = apiData?.todayStatus?.risk === level;
                const segUI = RISK_UI[level];
                return (
                  <div key={level} className={`flex-1 rounded-xl py-2.5 text-center transition-all duration-500 border ${isCurrent ? `${segUI.bgColor} ${segUI.borderColor} shadow-sm` : 'border-transparent bg-transparent'}`}>
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${isCurrent ? segUI.textColor : 'text-slate-400'}`}>
                      {level === "Medium" ? "MODERATE" : level}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 flex items-start gap-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
              <Sparkle className={`h-5 w-5 mt-0.5 shrink-0 ${curUI.textColor}`} weight="fill" />
              <p className="text-sm font-medium leading-relaxed text-foreground/80">
                {apiData?.todayStatus?.insight || "Data belum cukup untuk memberikan insight. Silakan lakukan Check-in."}
              </p>
            </div>
          </div>

          {/* WEEKLY PATTERN (Tidak Diubah) */}
          <div className="relative z-10 mt-6 rounded-2xl border border-slate-200/50 bg-white/50 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Weekly Pattern</div>
            </div>
            <div className="flex items-center justify-between px-1 sm:px-2">
              {(apiData?.weeklyTrends || []).map((w, i) => {
                const rUI = RISK_UI[w.r] || RISK_UI.Low;
                const isToday = i === (apiData?.weeklyTrends?.length || 1) - 1;
                return (
                  <div key={i} className="group flex flex-col items-center gap-2 relative" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)}>
                    <div className="relative flex items-center justify-center h-6 w-6">
                      <span className={`flex rounded-full border transition-all duration-300 ${isToday ? "h-5 w-5" : "h-3.5 w-3.5"}`}
                        style={{
                          background: w.r === "None" ? "#e2e8f0" : `radial-gradient(circle at 30% 30%, white, ${rUI.hex})`,
                          borderColor: w.r === "None" ? "#cbd5e1" : `${rUI.hex}55`,
                          boxShadow: isToday && w.r !== "None" ? `0 0 0 4px ${rUI.hex}15, 0 0 12px ${rUI.hex}40` : w.r !== "None" ? `0 0 6px ${rUI.hex}20` : 'none',
                          animation: `dotIn 0.5s ${i * 0.05}s ease-out backwards`,
                        }}
                      />
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-semibold ${isToday ? "text-primary" : "text-muted-foreground/60"}`}>{w.d}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        {/* REFINED: PERSONAL TRIGGER CARD (High Density Explainability) */}
        <GlassCard className="md:col-span-2 md:row-span-2 p-6 flex flex-col relative overflow-hidden bg-white/60">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-6 relative z-10 flex items-center justify-between">
            <span>Personal Trigger</span>
            {apiData?.hasCheckedInToday && (
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            )}
          </div>
          
          {apiData?.hasCheckedInToday && apiData?.personalInsight ? (
            <div className="flex-1 flex flex-col relative z-10 animate-in fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 border border-slate-200">
                  {renderIcon(apiData.personalInsight.iconType || "Info", "h-5 w-5 text-slate-700")}
                </div>
                <h3 className="text-lg font-bold text-foreground leading-tight">
                  {apiData.personalInsight.title || "Insight Utama"}
                </h3>
              </div>
              
              {/* Factor Tags untuk membongkar akumulasi blackbox */}
              {apiData.personalInsight.factors && apiData.personalInsight.factors.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {apiData.personalInsight.factors.map((factor, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-800 text-white shadow-sm">
                      {factor}
                    </span>
                  ))}
                </div>
              )}

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {apiData.personalInsight.description || "Data terkalibrasi."}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col opacity-60 pt-4">
              <div className="h-10 w-10 border-2 border-dashed border-slate-300 rounded-xl mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-3/4 bg-slate-200 rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-slate-200 rounded animate-pulse" />
              </div>
              <p className="mt-4 text-xs font-medium text-slate-500">Menunggu input harian untuk analisis.</p>
            </div>
          )}
        </GlassCard>

        {/* REFINED: TARGETED RECOMMENDATION CARD */}
        <GlassCard className="md:col-span-3 p-6 flex flex-col justify-center relative overflow-hidden bg-white/60">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-5">Recommended Action</div>
          
          {apiData?.hasCheckedInToday && apiData?.recommendation ? (
            <div className="flex items-start gap-4 animate-in fade-in">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${curUI.bgColor} ${curUI.textColor} border ${curUI.borderColor}`}>
                {renderIcon(apiData.recommendation.iconType || "Check", "h-6 w-6")}
              </div>
              <div className="flex-1 pt-0.5">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h4 className="text-base font-bold text-foreground leading-none">{apiData.recommendation.title || "Tindakan Disarankan"}</h4>
                    {apiData.recommendation.basis && (
                      <span className="text-[10px] font-semibold text-muted-foreground mt-1 block">
                        Berdasarkan: {apiData.recommendation.basis}
                      </span>
                    )}
                  </div>
                  {apiData.recommendation.time && (
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 border border-slate-200 text-slate-600 px-2.5 py-1 rounded-md whitespace-nowrap">
                      {apiData.recommendation.time}
                    </span>
                  )}
                </div>
                <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">
                    {apiData.recommendation.description || "Sistem menyarankan penyesuaian rutinitas berdasarkan datamu."}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 opacity-50 pt-1">
              <div className="h-12 w-12 rounded-xl bg-slate-200" />
              <div className="space-y-3 flex-1">
                <div className="h-4 w-1/3 bg-slate-200 rounded-md" />
                <div className="h-3 w-3/4 bg-slate-200 rounded-md" />
              </div>
            </div>
          )}
        </GlassCard>

        {/* ACTION REQUIRED / SYSTEM STATUS (Tidak Diubah) */}
        <GlassCard className="md:col-span-3 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">System Status</div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {apiData?.hasCheckedInToday ? "Routine Logged" : "Log your routine"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {apiData?.hasCheckedInToday 
                ? "Data hari ini telah dievaluasi secara deterministik berdasarkan heuristik operasional." 
                : "Luangkan 15 detik untuk mencatat pola aktivitas dan pemulihanmu hari ini."}
            </p>
          </div>
          <Button 
            onClick={() => navigate("/dashboard/checkin")}
            disabled={apiData?.hasCheckedInToday}
            size="lg" 
            className={`mt-6 w-full transition-all duration-300 ${apiData?.hasCheckedInToday ? "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-none opacity-100 cursor-default hover:bg-emerald-50 hover:translate-y-0" : "bg-foreground text-background shadow-md shadow-primary/20"}`}
          >
            {apiData?.hasCheckedInToday ? (
              <><CheckCircle weight="fill" className="h-5 w-5 mr-2" /> Data Secured</>
            ) : (
              <>Start Full Check-in <ArrowRight weight="bold" className="h-4 w-4 ml-1" /></>
            )}
          </Button>
        </GlassCard>

      </div>
    </div>
  );
}