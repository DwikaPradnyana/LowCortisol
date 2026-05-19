import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, MoonStars, Flame, Check, Spinner, Smiley, SmileyMeh, SmileySad, WarningCircle
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";

// IMPORT LAYANAN API
import { checkinService } from "../services/api";

const getStrictTodayDate = () => {
  const now = new Date();
  return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
};

export default function CheckIn() {
  const navigate = useNavigate();
  
  const [workHours, setWorkHours] = useState(8);
  const [sleepHours, setSleepHours] = useState(7);
  const [cognitiveLoad, setCognitiveLoad] = useState(2); 

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      // MENGIRIM REQUEST KE BACK-END NODE.JS
      const response = await checkinService.submitCheckIn(workHours, sleepHours, cognitiveLoad);
      
      if (response.status === 'success') {
        const strictToday = getStrictTodayDate();
        
        // Membersihkan cache lama
        localStorage.removeItem("mock_dashboardScore");
        localStorage.removeItem("mock_hasCheckedInToday");

        // MENYIMPAN RESPONS NYATA DARI SERVER
        localStorage.setItem("mock_lastCheckInDate", strictToday);
        localStorage.setItem("mock_fatigueRisk", response.data.risk);
        localStorage.setItem("mock_dashboardInsight", response.data.insight);

        setIsSuccess(true);

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        throw new Error("Respons server tidak valid.");
      }
    } catch (err) {
      const message = err.response?.data?.error || "Gagal menghubungi server ML. Periksa koneksi Anda.";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cognitiveOptions = [
    { value: 1, label: "Ringan", I: Smiley },
    { value: 2, label: "Sedang", I: SmileyMeh },
    { value: 3, label: "Berat", I: SmileySad },
    { value: 4, label: "Overload", I: WarningCircle },
  ];

  const strictToday = getStrictTodayDate();
  const hasCheckedIn = localStorage.getItem("mock_lastCheckInDate") === strictToday;

  if (hasCheckedIn && !isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-4 text-center mt-20">
        <div className="h-16 w-16 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center border border-teal-200 shadow-sm">
          <Check weight="bold" className="h-8 w-8" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Check-In Completed</h2>
          <p className="text-muted-foreground mt-2">You have already logged your routine for today.</p>
        </div>
        <button 
          onClick={() => navigate("/dashboard")}
          className="mt-4 px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors shadow-md shadow-primary/20"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto w-full">
      <div className="grid gap-6 lg:grid-cols-5">
        
        <GlassCard className="lg:col-span-3 p-8 border-white/80 shadow-sm">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              How are you, right now?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">A moment to notice — about 10 seconds.</p>
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              {errorMsg}
            </div>
          )}

          <div className="mt-8">
            <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-4">Cognitive Load</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {cognitiveOptions.map((m) => {
                const active = cognitiveLoad === m.value;
                return (
                  <button
                    key={m.value}
                    onClick={() => setCognitiveLoad(m.value)}
                    disabled={isSubmitting || isSuccess}
                    className={`group flex flex-col items-center gap-2 rounded-2xl border py-5 transition-all duration-300 ${
                      active
                        ? "border-primary/50 bg-white shadow-md shadow-primary/20 scale-[1.02] ring-2 ring-primary/20"
                        : "border-slate-200 bg-white/50 hover:bg-white"
                    } disabled:opacity-50`}
                  >
                    <m.I weight={active ? "fill" : "duotone"} className={`h-8 w-8 transition ${active ? "text-primary" : "text-slate-400 group-hover:text-slate-600"}`} />
                    <span className={`text-xs font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                  <Briefcase weight="fill" className="text-orange-500" /> Work Hours
                </span>
                <span className="font-bold text-orange-500 text-lg">{workHours}h</span>
              </div>
              <input type="range" min="0" max="16" step="0.5" value={workHours} onChange={(e) => setWorkHours(+e.target.value)} disabled={isSubmitting || isSuccess} className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50" />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                  <MoonStars weight="fill" className="text-indigo-500" /> Sleep Duration
                </span>
                <span className="font-bold text-indigo-500 text-lg">{sleepHours}h</span>
              </div>
              <input type="range" min="0" max="12" step="0.5" value={sleepHours} onChange={(e) => setSleepHours(+e.target.value)} disabled={isSubmitting || isSuccess} className="w-full accent-indigo-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50" />
            </div>
          </div>
        </GlassCard>

        <div className="lg:col-span-2 space-y-6 flex flex-col">
          <GlassCard className="p-6 border-white/80 shadow-sm flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
                <Flame className="h-5 w-5 text-orange-500" weight="fill" />
              </div>
              <div>
                <div className="text-base font-bold text-foreground">3-day streak</div>
                <div className="text-xs font-medium text-muted-foreground">Keep the momentum going.</div>
              </div>
            </div>

            <div className="mt-auto">
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">Gentle Reminder</div>
                <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                  Small steps matter. Just notice what's true today.
                </p>
              </div>
            </div>
          </GlassCard>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className={`w-full rounded-full py-4 text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              isSuccess ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30" : "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl"
            } disabled:opacity-80 disabled:pointer-events-none`}
          >
            {isSubmitting ? <><Spinner className="h-5 w-5 animate-spin" weight="bold" /> Analyzing...</> : isSuccess ? <><Check className="h-5 w-5" weight="bold" /> Saved</> : "Save Check-in"}
          </button>
        </div>
      </div>
    </div>
  );
}