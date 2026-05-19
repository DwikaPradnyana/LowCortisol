import { useState } from "react";
import { 
  X, 
  Briefcase, 
  MoonStars, 
  Brain, 
  Flame, 
  Check, 
  Spinner,
  Smiley,
  SmileyMeh,
  SmileySad,
  WarningCircle
} from "@phosphor-icons/react";
import GlassCard from "../../components/ui/GlassCard";

export default function CheckInModal({ isOpen, onClose, onSave }) {
  // State Input (Mengikuti Skema ML Blueprint)
  const [workHours, setWorkHours] = useState(8);
  const [sleepHours, setSleepHours] = useState(7);
  const [cognitiveLoad, setCognitiveLoad] = useState(2); // 1: Ringan, 2: Sedang, 3: Berat, 4: Sangat Berat

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Data Dummy untuk UI Streak (Berasal dari Figma)
  const dayLabels = ["S", "S", "R", "K", "J", "S", "M"];
  const baseDays = ["done", "done", "skip", "done", "done", "done"];

  if (!isOpen) return null;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    const payload = {
      work_hours: workHours,
      sleep_hours: sleepHours,
      cognitive_load: cognitiveLoad,
    };

    // Simulasi delay jaringan
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    setIsSubmitting(false);
    setIsSuccess(true);

    // Tahan tampilan sukses sejenak sebelum menutup modal
    setTimeout(() => {
      onSave(payload);
      setIsSuccess(false);
      onClose();
    }, 1000);
  };

  const cognitiveOptions = [
    { value: 1, label: "Ringan", I: Smiley },
    { value: 2, label: "Sedang", I: SmileyMeh },
    { value: 3, label: "Berat", I: SmileySad },
    { value: 4, label: "Overload", I: WarningCircle },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/40 backdrop-blur-sm md:items-center p-4 md:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container - Diperlebar mengikuti desain Figma */}
      <div 
        className="relative w-full max-w-5xl rounded-[2rem] bg-background/95 shadow-2xl animate-in slide-in-from-bottom-10 md:slide-in-from-bottom-4 duration-300 border border-white/60"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Tombol Tutup Floating */}
        <button 
          onClick={onClose}
          disabled={isSubmitting || isSuccess}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-muted-foreground transition hover:bg-slate-200 disabled:opacity-50"
        >
          <X weight="bold" className="h-5 w-5" />
        </button>

        <div className="grid gap-6 lg:grid-cols-5 p-6 md:p-8">
          
          {/* KOLOM KIRI: Form Interaksi Utama */}
          <GlassCard className="lg:col-span-3 p-8 border-white/80 shadow-sm">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-foreground">
                How are you, right now?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">A moment to notice — about 10 seconds.</p>
            </div>

            {/* Input 1: Persepsi Beban Kognitif (Menggantikan Mood Figma) */}
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
                      <m.I
                        weight={active ? "fill" : "duotone"}
                        className={`h-8 w-8 transition ${active ? "text-primary" : "text-slate-400 group-hover:text-slate-600"}`}
                      />
                      <span className={`text-xs font-semibold ${active ? "text-primary" : "text-muted-foreground"}`}>
                        {m.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input 2 & 3: Work & Sleep (Menggantikan Energy & Stress Figma) */}
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {/* Work Hours Slider */}
              <div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                    <Briefcase weight="fill" className="text-orange-500" /> Work Hours
                  </span>
                  <span className="font-bold text-orange-500 text-lg">{workHours}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  step="0.5"
                  value={workHours}
                  onChange={(e) => setWorkHours(+e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  className="w-full accent-orange-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="mt-2 flex justify-between text-[10px] font-medium text-muted-foreground/60">
                  <span>Rest</span>
                  <span>Overwork</span>
                </div>
              </div>

              {/* Sleep Hours Slider */}
              <div>
                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 flex items-center gap-1.5">
                    <MoonStars weight="fill" className="text-indigo-500" /> Sleep Duration
                  </span>
                  <span className="font-bold text-indigo-500 text-lg">{sleepHours}h</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  step="0.5"
                  value={sleepHours}
                  onChange={(e) => setSleepHours(+e.target.value)}
                  disabled={isSubmitting || isSuccess}
                  className="w-full accent-indigo-500 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
                <div className="mt-2 flex justify-between text-[10px] font-medium text-muted-foreground/60">
                  <span>Deprived</span>
                  <span>Optimal</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* KOLOM KANAN: Konteks & Streak */}
          <div className="lg:col-span-2 space-y-6">
            <GlassCard className="p-6 border-white/80 shadow-sm h-full flex flex-col">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20">
                  <Flame className="h-5 w-5 text-orange-500" weight="fill" />
                </div>
                <div>
                  <div className="text-base font-bold text-foreground">3-day streak</div>
                  <div className="text-xs font-medium text-muted-foreground">Last check-in: Yesterday</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8 px-2">
                {dayLabels.map((label, i) => {
                  const isToday = i === dayLabels.length - 1;
                  const state = isToday ? (isSuccess ? "today-done" : "today") : baseDays[i];
                  const isDone = state === "done" || state === "today-done";
                  
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ${
                          isDone
                            ? "border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/30"
                            : state === "today"
                            ? "border-primary bg-primary/10 shadow-[0_0_0_4px_rgba(74,144,226,0.15)]"
                            : "border-slate-200 bg-slate-50"
                        }`}
                      >
                        {isDone && <Check className="h-4 w-4" weight="bold" />}
                        {state === "today" && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
                      </div>
                      <span className={`text-[10px] font-bold ${isToday ? "text-primary" : "text-muted-foreground/60"}`}>{label}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-auto">
                <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-1">Gentle Reminder</div>
                  <p className="text-sm font-medium text-muted-foreground leading-relaxed">
                    Small steps matter. There's nothing to get right — just notice what's true today.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* FOOTER CTA (Bagian Bawah Modal) */}
        <div className="px-6 md:px-8 pb-6 md:pb-8">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className={`w-full rounded-full py-4 text-base font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
              isSuccess 
                ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30" 
                : "bg-primary text-white shadow-lg shadow-primary/30 hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-xl"
            } disabled:opacity-80 disabled:pointer-events-none`}
          >
            {isSubmitting ? (
              <><Spinner className="h-5 w-5 animate-spin" weight="bold" /> Analyzing Patterns...</>
            ) : isSuccess ? (
              <><Check className="h-5 w-5" weight="bold" /> Saved Successfully</>
            ) : (
              "Save Check-in"
            )}
          </button>
        </div>

      </div>
    </div>
  );
}