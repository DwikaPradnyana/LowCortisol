import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sun, Warning, Flame, Briefcase, BatteryFull, CalendarX, Wind, Coffee, Stack, Check, ArrowRight, Info, PlusCircle, CheckCircle, Sparkle
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { dashboardService } from "../services/api";

const RISK_UI = {
  Low: { label: "LOW RISK", textColor: "text-teal-600", bgColor: "bg-teal-500/10", borderColor: "border-teal-500/30", gradientText: "from-teal-400 to-teal-600", glowOrb: "bg-teal-500", hex: "#0d9488", icon: Sun },
  Medium: { label: "ELEVATED", textColor: "text-amber-600", bgColor: "bg-amber-500/10", borderColor: "border-amber-500/30", gradientText: "from-amber-400 to-amber-600", glowOrb: "bg-amber-500", hex: "#d97706", icon: Warning },
  High: { label: "HIGH RISK", textColor: "text-orange-600", bgColor: "bg-orange-500/10", borderColor: "border-orange-500/30", gradientText: "from-orange-500 to-red-600", glowOrb: "bg-orange-500", hex: "#ea580c", icon: Flame },
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
    keyDrivers: [],
    recommendedActions: []
  });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.status === 'success') {
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

  const curUI = RISK_UI[apiData.todayStatus.risk] || RISK_UI.Low;

  const renderIcon = (iconName, className) => {
    const icons = { Briefcase, BatteryFull, CalendarX, Wind, Coffee, Stack };
    const IconComponent = icons[iconName] || Info;
    return <IconComponent weight="bold" className={className} />;
  };

  if (isLoading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-muted-foreground animate-pulse">
          <Sparkle weight="duotone" className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium">Sinkronisasi data model...</span>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return <div className="p-8 text-center text-red-500 font-medium">{errorMsg}</div>;
  }

  return (
    <div className="space-y-6 relative max-w-7xl mx-auto">
      <style>{`@keyframes dotIn { from { opacity: 0; transform: scale(0.4); } to { opacity: 1; transform: scale(1); } }`}</style>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Hi, {apiData.user.name}. <span className="text-muted-foreground/60 font-medium">How are you feeling today?</span>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">Monitor your patterns and prevent exhaustion.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard/checkin")}
          disabled={apiData.hasCheckedInToday}
          className="w-full md:w-auto bg-foreground hover:bg-foreground/90 text-background px-6 py-3 rounded-full font-medium transition-all shadow-md flex items-center justify-center gap-2 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
        >
          {apiData.hasCheckedInToday ? <Check weight="bold" className="h-5 w-5" /> : <PlusCircle weight="fill" className="h-5 w-5" />}
          {apiData.hasCheckedInToday ? "Routine Logged" : "Log Daily Routine"}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 auto-rows-auto">
        <GlassCard className="md:col-span-4 md:row-span-2 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-1000 ${curUI.glowOrb}`} />
          
          <div className="relative z-10 flex items-start justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Current Burnout Status</div>
              <h2 className={`mt-2 text-5xl md:text-6xl font-bold tracking-tighter leading-none bg-gradient-to-r ${curUI.gradientText} bg-clip-text text-transparent drop-shadow-sm`}>
                {curUI.label}
              </h2>
            </div>
            
            {apiData.hasCheckedInToday && (
              <div className="hidden md:flex flex-col items-end gap-1.5">
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${curUI.bgColor} ${curUI.borderColor} ${curUI.textColor}`}>
                  <CheckCircle weight="bold" className="h-3.5 w-3.5" /> Checked In Today
                </div>
              </div>
            )}
          </div>

          <div className="relative z-10 mt-8">
            <div className="flex gap-2 rounded-2xl border border-slate-200/50 bg-slate-50/50 p-1.5 backdrop-blur-xl">
              {["Low", "Medium", "High"].map((level) => {
                const isCurrent = apiData.todayStatus.risk === level;
                const segUI = RISK_UI[level];
                return (
                  <div key={level} className={`flex-1 rounded-xl py-2.5 text-center transition-all duration-500 border ${isCurrent ? `${segUI.bgColor} ${segUI.borderColor} shadow-sm` : 'border-transparent bg-transparent'}`}>
                    <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? segUI.textColor : 'text-slate-400'}`}>
                      {level === "Medium" ? "MODERATE" : level}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-start gap-3 bg-white/70 backdrop-blur-md p-4 rounded-2xl border border-white shadow-sm">
              <Sparkle className={`h-5 w-5 mt-0.5 shrink-0 ${curUI.textColor}`} weight="fill" />
              <p className="text-sm font-medium leading-relaxed text-foreground/80">
                {apiData.todayStatus.insight || "Data belum cukup untuk memberikan insight. Silakan lakukan Check-in."}
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-6 rounded-2xl border border-slate-200/50 bg-white/50 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Weekly Pattern</div>
            </div>
            <div className="flex items-center justify-between px-2">
              {apiData.weeklyTrends.map((w, i) => {
                const rUI = RISK_UI[w.r] || RISK_UI.Low;
                const isToday = i === apiData.weeklyTrends.length - 1;
                return (
                  <div key={i} className="group flex flex-col items-center gap-2 relative" onMouseEnter={() => setHoveredDay(i)} onMouseLeave={() => setHoveredDay(null)}>
                    <div className="relative flex items-center justify-center h-6 w-6">
                      <span className={`flex rounded-full border transition-all duration-300 ${isToday ? "h-5 w-5" : "h-3.5 w-3.5"} group-hover:scale-125`}
                        style={{
                          background: w.r === "None" ? "#e2e8f0" : `radial-gradient(circle at 30% 30%, white, ${rUI.hex})`,
                          borderColor: w.r === "None" ? "#cbd5e1" : `${rUI.hex}55`,
                          boxShadow: isToday && w.r !== "None" ? `0 0 0 4px ${rUI.hex}15, 0 0 12px ${rUI.hex}40` : w.r !== "None" ? `0 0 6px ${rUI.hex}20` : 'none',
                          animation: `dotIn 0.5s ${i * 0.05}s ease-out backwards`,
                        }}
                      />
                    </div>
                    <span className={`text-[11px] font-semibold ${isToday ? "text-primary" : "text-muted-foreground/60"}`}>{w.d}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </GlassCard>

        <div className="md:col-span-2 space-y-6 flex flex-col">
          <GlassCard className="p-6 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Data Confidence</div>
            <h3 className="mt-1 text-base font-semibold text-foreground">AI Synchronization</h3>
            <div className="mt-4 flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <Info weight="bold" className="h-5 w-5 text-primary" />
              </div>
              <div className="text-xs font-medium text-muted-foreground leading-relaxed">
                Consistency is key. Logging your routine daily helps the AI map your specific burnout triggers accurately.
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex-1">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Key Drivers</div>
            <ul className="mt-4 space-y-4">
              {apiData.keyDrivers.map((d) => {
                const colorMap = { orange: { text: "text-orange-500", bg: "bg-orange-500/10" }, indigo: { text: "text-indigo-500", bg: "bg-indigo-500/10" }, primary: { text: "text-primary", bg: "bg-primary/10" } };
                const theme = colorMap[d.colorTheme] || colorMap.primary;
                return (
                  <li key={d.id} className="flex items-start gap-3">
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${theme.bg}`}>
                      {renderIcon(d.iconType, `h-4 w-4 ${theme.text}`)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold text-foreground">{d.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{d.desc}</div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </GlassCard>
        </div>

        <GlassCard className="md:col-span-3 p-6 h-full flex flex-col">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">What you can do today</div>
          <h3 className="mt-1 text-lg font-semibold text-foreground">Recommended Actions</h3>
          <ul className="mt-4 space-y-3 flex-1">
            {apiData.recommendedActions.map((a) => (
              <li key={a.id} className={`flex items-center gap-3 rounded-2xl border p-3 transition-colors ${a.done ? "border-teal-500/30 bg-teal-500/5" : "border-slate-200/50 bg-slate-50/50 hover:bg-white"}`}>
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl ${a.done ? "bg-teal-500 text-white shadow-sm" : "bg-white shadow-sm border border-slate-100"}`}>
                  {a.done ? <Check weight="bold" className="h-4 w-4" /> : renderIcon(a.iconType, "h-4 w-4 text-primary")}
                </div>
                <div className="flex-1 text-sm font-semibold text-foreground">{a.label}</div>
                <span className="text-xs font-medium text-muted-foreground">{a.time}</span>
              </li>
            ))}
          </ul>
        </GlassCard>

        <GlassCard className="md:col-span-3 p-6 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">Action Required</div>
            <h3 className="mt-1 text-lg font-semibold text-foreground">
              {apiData.hasCheckedInToday ? "Routine Logged" : "Log your routine"}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {apiData.hasCheckedInToday 
                ? "Your data for today has been securely synchronized with the AI model." 
                : "Take 15 seconds to log your sleep, work hours, and cognitive load."}
            </p>
          </div>
          <Button 
            onClick={() => navigate("/dashboard/checkin")}
            disabled={apiData.hasCheckedInToday}
            size="lg" 
            className={`mt-6 w-full transition-all duration-300 ${apiData.hasCheckedInToday ? "bg-teal-50 text-teal-600 border border-teal-200 shadow-none opacity-100 cursor-default hover:bg-teal-50 hover:translate-y-0" : "shadow-md shadow-primary/20"}`}
          >
            {apiData.hasCheckedInToday ? (
              <><Check weight="bold" className="h-5 w-5 mr-2" /> Completed for Today</>
            ) : (
              <>Start Full Check-in <ArrowRight weight="bold" className="h-4 w-4 ml-1" /></>
            )}
          </Button>
        </GlassCard>

      </div>
    </div>
  );
}