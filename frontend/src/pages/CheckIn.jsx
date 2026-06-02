import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, MoonStars, Brain, Check, Spinner, 
  Smiley, SmileyMeh, SmileySad, WarningCircle, 
  Monitor, Users, Heart, CaretDown, CaretUp,
  BatteryCharging, Star, ShieldCheck,
  Barbell, Target, Clock
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import { checkinService, dashboardService } from "../services/api";

// PERBAIKAN FATAL: Ekstraksi komponen ke luar root component untuk mencegah Unmount berulang
const NullableSlider = ({ field, label, icon: Icon, min, max, step, def, unit, isRequired = false, value, onChange }) => {
  const isTouched = value !== null;
  const displayValue = isTouched ? value : def;

  return (
    <div className={`p-4 sm:p-5 rounded-xl transition-all duration-300 ${
      isTouched 
        ? "border border-slate-200 bg-white shadow-sm" 
        : "border border-slate-300 border-dashed bg-slate-50/50"
    }`}>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 text-sm mb-3">
        <span className={`font-semibold flex items-start sm:items-center gap-2 ${isTouched ? "text-slate-800" : "text-slate-500"}`}>
          {Icon && <Icon size={18} weight={isTouched ? "fill" : "regular"} className={`shrink-0 mt-0.5 sm:mt-0 ${isTouched ? "text-primary" : "text-slate-400"}`} />} 
          <span className="leading-tight">{label}</span>
          {isRequired && !isTouched && <span className="shrink-0 text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Wajib</span>}
        </span>
        <span className={`self-start sm:self-auto font-bold text-[10px] sm:text-xs px-2 py-1 rounded-md transition-colors ${isTouched ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"}`}>
          {isTouched ? `${displayValue} ${unit}` : "Geser ➔"}
        </span>
      </div>
      <input 
        type="range" min={min} max={max} step={step} 
        value={displayValue} 
        onChange={(e) => onChange(field, e.target.value)}
        className={`w-full h-2 rounded-lg cursor-pointer transition-all ${isTouched ? "accent-primary" : "accent-slate-300 grayscale opacity-60"}`} 
      />
    </div>
  );
};

export default function CheckIn() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [hasCheckedInToday, setHasCheckedInToday] = useState(false);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const [formData, setFormData] = useState({
    jam_kerja_per_hari: null,
    jam_tidur_per_hari: null,
    beban_kerja_persepsi: null,
    tingkat_stres: null,
    produktivitas_diri: null,
    jam_lembur_per_hari: null,
    jam_layar_per_hari: null,
    frekuensi_meeting_per_hari: null,
    kualitas_tidur: null,
    keluhan_fisik_utama: null,
    kepuasan_kerja: null,
    work_life_balance: null,
    dukungan_atasan: null,
    frekuensi_olahraga_per_minggu: null, 
    jumlah_deadline_per_minggu: null
  });

  useEffect(() => {
    async function verifyCheckInStatus() {
      try {
        const response = await dashboardService.getDashboardData();
        if (response.status === "success" && response.data.hasCheckedInToday) {
          setHasCheckedInToday(true);
        }
      } catch (err) {
        console.error("Gagal sinkronisasi data dasbor:", err);
      } finally {
        setIsPageLoading(false);
      }
    }
    verifyCheckInStatus();
  }, []);

  const handleSliderChange = (field, currentVal) => {
    setFormData(prev => ({ ...prev, [field]: Number(currentVal) }));
    setErrorMsg("");
  };

  const handleExplicitSelect = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrorMsg("");
  };

  const isCoreValid = 
    formData.jam_kerja_per_hari !== null &&
    formData.jam_tidur_per_hari !== null &&
    formData.beban_kerja_persepsi !== null &&
    formData.tingkat_stres !== null &&
    formData.produktivitas_diri !== null;

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!isCoreValid) return;

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const response = await checkinService.submitCheckIn(formData);
      if (response.status === "success") {
        setHasCheckedInToday(true);
        setTimeout(() => navigate("/dashboard"), 1000);
      }
    } catch (err) {
      let message = "Gagal menyimpan jurnal. Silakan coba lagi.";
      
      const serverDetail = err.response?.data?.detail;
      const serverError = err.response?.data?.error;

      if (serverDetail === "AI_SERVICE_UNAVAILABLE" || serverError === "AI_SERVICE_UNAVAILABLE" || err.message === "AI_SERVICE_UNAVAILABLE") {
        message = "Mesin Analisis AI sedang offline atau dalam pemeliharaan. Kami menunda penyimpanan agar data Anda tidak dianalisis secara keliru. Mohon coba beberapa saat lagi.";
      } 
      else if (Array.isArray(serverDetail)) {
        message = serverDetail.join(", ");
      } 
      else if (serverError) {
        message = serverError;
      }

      setErrorMsg(message);
      setIsSubmitting(false);
    }
  };

  if (isPageLoading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Spinner className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (hasCheckedInToday) {
    return (
      <div className="mx-auto max-w-md text-center mt-20 p-4 sm:p-6 animate-in fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
          <Check weight="bold" className="h-6 w-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mt-4">Jurnal Tersimpan</h2>
        <p className="text-muted-foreground text-xs sm:text-sm mt-2 leading-relaxed">Terima kasih sudah meluangkan waktu untuk refleksi hari ini.</p>
        <button onClick={() => navigate("/dashboard")} className="mt-6 w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition">
          Kembali ke Dasbor
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-2 sm:px-4 py-4 sm:py-6 pb-32 sm:pb-36">
      <div className="mb-5 sm:mb-6 px-2 sm:px-0">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground">Jurnal Harian</h1>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">Luangkan waktu sejenak, bagaimana harimu berjalan?</p>
      </div>

      {errorMsg && (
        <div className="mb-5 sm:mb-6 mx-2 sm:mx-0 rounded-xl border border-red-200 bg-red-50 p-3 text-xs sm:text-sm font-medium text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleFinalSubmit} className="space-y-5 sm:space-y-6">
        
        <GlassCard className="p-4 sm:p-6 shadow-sm border-white/60 space-y-5 sm:space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Star weight="fill" className="text-amber-400 h-5 w-5 shrink-0" />
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">Refleksi Inti</h2>
          </div>
            
          <div className="space-y-4 sm:space-y-5">
            <div className={`p-4 sm:p-5 rounded-xl transition-all duration-300 ${formData.beban_kerja_persepsi !== null ? "border border-slate-200 bg-white shadow-sm" : "border border-slate-300 border-dashed bg-slate-50/50"}`}>
              <label className="flex items-start sm:items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Briefcase size={18} weight={formData.beban_kerja_persepsi ? "fill" : "regular"} className={`shrink-0 mt-0.5 sm:mt-0 ${formData.beban_kerja_persepsi ? "text-primary" : "text-slate-400"}`} />
                <span className="leading-tight">Gimana beban kerjamu hari ini?</span>
                {formData.beban_kerja_persepsi === null && <span className="ml-auto shrink-0 text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Wajib</span>}
              </label>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4">
                {[
                  { v: "Ringan", l: "Santai", I: Smiley },
                  { v: "Sedang", l: "Lumayan", I: SmileyMeh },
                  { v: "Berat", l: "Berat", I: SmileySad },
                  { v: "Sangat Berat", l: "Overload", I: WarningCircle }
                ].map((m) => {
                  const active = formData.beban_kerja_persepsi === m.v;
                  return (
                    <button type="button" key={m.v} onClick={() => handleExplicitSelect("beban_kerja_persepsi", m.v)}
                      className={`flex flex-col items-center gap-1.5 rounded-lg border py-2 sm:py-2.5 transition-colors ${
                        active ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}>
                      <m.I weight={active ? "fill" : "regular"} className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-[10px] sm:text-[11px] font-bold">{m.l}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <NullableSlider field="jam_kerja_per_hari" label="Total waktu kerja hari ini" icon={Briefcase} min={0} max={16} step={1} def={8} unit="Jam" isRequired={true} value={formData.jam_kerja_per_hari} onChange={handleSliderChange} />
            <NullableSlider field="jam_tidur_per_hari" label="Durasi tidur semalam" icon={MoonStars} min={0} max={12} step={0.5} def={7} unit="Jam" isRequired={true} value={formData.jam_tidur_per_hari} onChange={handleSliderChange} />
            <NullableSlider field="tingkat_stres" label="Gimana tingkat stresmu hari ini?" icon={Brain} min={1} max={10} step={1} def={5} unit="/ 10" isRequired={true} value={formData.tingkat_stres} onChange={handleSliderChange} />
            <NullableSlider field="produktivitas_diri" label="Merasa produktif hari ini?" icon={Check} min={1} max={10} step={1} def={7} unit="/ 10" isRequired={true} value={formData.produktivitas_diri} onChange={handleSliderChange} />
          </div>
        </GlassCard>

        <div className="rounded-2xl border border-slate-200 bg-white/50 overflow-hidden transition-all duration-300">
          <button type="button" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full flex items-center justify-between p-4 sm:p-5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-white/80 transition-colors">
            <span className="flex items-center gap-2 text-left leading-tight"><Monitor size={18} className="text-slate-400 shrink-0" /> Bercerita lebih detail (Opsional)</span>
            {isAdvancedOpen ? <CaretUp weight="bold" className="shrink-0" /> : <CaretDown weight="bold" className="shrink-0" />}
          </button>
          
          {isAdvancedOpen && (
            <div className="p-3 sm:p-5 border-t border-slate-200 bg-slate-50/30 space-y-4 sm:space-y-5 animate-in fade-in duration-300">
              
              <NullableSlider field="jam_lembur_per_hari" label="Ada tambahan waktu lembur?" icon={Clock} min={0} max={8} step={1} def={2} unit="Jam" value={formData.jam_lembur_per_hari} onChange={handleSliderChange} />
              <NullableSlider field="jam_layar_per_hari" label="Berapa lama menatap layar?" icon={Monitor} min={0} max={16} step={1} def={8} unit="Jam" value={formData.jam_layar_per_hari} onChange={handleSliderChange} />
              <NullableSlider field="frekuensi_meeting_per_hari" label="Jumlah meeting hari ini" icon={Users} min={0} max={10} step={1} def={3} unit="Kali" value={formData.frekuensi_meeting_per_hari} onChange={handleSliderChange} />
              
              <NullableSlider field="frekuensi_olahraga_per_minggu" label="Frekuensi olahraga minggu ini" icon={Barbell} min={0} max={7} step={1} def={1} unit="Kali" value={formData.frekuensi_olahraga_per_minggu} onChange={handleSliderChange} />
              <NullableSlider field="jumlah_deadline_per_minggu" label="Jumlah tenggat waktu (minggu ini)" icon={Target} min={0} max={15} step={1} def={2} unit="Tugas" value={formData.jumlah_deadline_per_minggu} onChange={handleSliderChange} />

              <div className={`p-4 sm:p-5 rounded-xl transition-all duration-300 ${formData.keluhan_fisik_utama !== null ? "border border-slate-200 bg-white shadow-sm" : "border border-slate-300 border-dashed bg-slate-50/50"}`}>
                <label className="flex items-start sm:items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <BatteryCharging size={18} weight={formData.keluhan_fisik_utama ? "fill" : "regular"} className={`shrink-0 mt-0.5 sm:mt-0 ${formData.keluhan_fisik_utama ? "text-primary" : "text-slate-400"}`} />
                  <span className="leading-tight">Ada keluhan fisik yang terasa?</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {['Tidak Ada', 'Sakit Kepala', 'Nyeri Punggung', 'Mata Lelah', 'Kelelahan'].map((opt) => {
                    const active = formData.keluhan_fisik_utama === opt;
                    return (
                      <button type="button" key={opt} 
                        onClick={() => handleExplicitSelect("keluhan_fisik_utama", active ? null : opt)}
                        className={`rounded-lg border p-2 sm:p-2.5 text-[10px] sm:text-[11px] font-medium transition-colors ${
                          active ? "bg-slate-800 border-slate-800 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}>{opt}</button>
                    );
                  })}
                </div>
              </div>

              <NullableSlider field="kualitas_tidur" label="Gimana kualitas tidurmu semalam?" icon={MoonStars} min={1} max={10} step={1} def={6} unit="/ 10" value={formData.kualitas_tidur} onChange={handleSliderChange} />
              <NullableSlider field="kepuasan_kerja" label="Merasa puas dengan pekerjaan hari ini?" icon={Briefcase} min={1} max={10} step={1} def={6} unit="/ 10" value={formData.kepuasan_kerja} onChange={handleSliderChange} />
              <NullableSlider field="work_life_balance" label="Punya waktu untuk diri sendiri hari ini?" icon={Heart} min={1} max={10} step={1} def={5} unit="/ 10" value={formData.work_life_balance} onChange={handleSliderChange} />
              <NullableSlider field="dukungan_atasan" label="Merasa didukung oleh tim/atasan?" icon={ShieldCheck} min={1} max={10} step={1} def={6} unit="/ 10" value={formData.dukungan_atasan} onChange={handleSliderChange} />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 sm:p-4 z-40 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="mx-auto max-w-2xl flex flex-row items-center justify-between gap-3 sm:gap-4 px-2 sm:px-0">
            <div className="hidden sm:block">
              {isCoreValid ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><Check weight="bold" /> Siap disimpan</span>
              ) : (
                <span className="text-xs font-medium text-slate-500">Isi 5 refleksi wajib.</span>
              )}
            </div>
            
            <button type="submit" disabled={!isCoreValid || isSubmitting}
              className="w-full sm:w-auto sm:ml-auto rounded-full bg-slate-900 px-6 sm:px-10 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center justify-center gap-2">
              {isSubmitting ? (
                <><Spinner className="h-4 w-4 animate-spin" /> Menyimpan...</>
              ) : (
                "Simpan Jurnal"
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}