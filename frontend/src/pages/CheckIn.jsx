import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Briefcase, MoonStars, Brain, Check, Spinner, 
  Smiley, SmileyMeh, SmileySad, WarningCircle, 
  Monitor, Users, Heart, CaretDown, CaretUp,
  BatteryCharging, Star, ShieldCheck,
  Barbell, Target, Clock // FIX: Tambahan ikon yang relevan secara UX
} from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import { checkinService, dashboardService } from "../services/api";

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
    // FIX: Mengamankan state agar tidak memicu error Uncontrolled Input di React
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
      const message = err.response?.data?.error || "Gagal menyimpan jurnal.";
      setErrorMsg(message);
      setIsSubmitting(false);
    }
  };

  const NullableSlider = ({ field, label, icon: Icon, min, max, step, def, unit, isRequired = false }) => {
    const isTouched = formData[field] !== null;
    const displayValue = isTouched ? formData[field] : def;

    return (
      <div className={`p-4 rounded-xl transition-all duration-300 ${
        isTouched 
          ? "border border-slate-200 bg-white shadow-sm" 
          : "border border-slate-300 border-dashed bg-slate-50/50"
      }`}>
        <div className="flex justify-between items-start text-sm mb-3">
          <span className={`font-semibold flex items-center gap-2 ${isTouched ? "text-slate-800" : "text-slate-500"}`}>
            {Icon && <Icon size={18} weight={isTouched ? "fill" : "regular"} className={isTouched ? "text-primary" : "text-slate-400"} />} 
            {label}
            {isRequired && !isTouched && <span className="ml-1 text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Wajib</span>}
          </span>
          <span className={`font-bold text-xs px-2 py-1 rounded-md transition-colors ${isTouched ? "bg-primary/10 text-primary" : "bg-slate-200 text-slate-500"}`}>
            {isTouched ? `${displayValue} ${unit}` : "Geser ➔"}
          </span>
        </div>
        <input 
          type="range" min={min} max={max} step={step} 
          value={displayValue} 
          onChange={(e) => handleSliderChange(field, e.target.value)}
          className={`w-full h-2 rounded-lg cursor-pointer transition-all ${isTouched ? "accent-primary" : "accent-slate-300 grayscale opacity-60"}`} 
        />
      </div>
    );
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
      <div className="mx-auto max-w-md text-center mt-20 p-4 animate-in fade-in">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
          <Check weight="bold" className="h-6 w-6" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mt-4">Jurnal Tersimpan</h2>
        <p className="text-muted-foreground text-sm mt-2">Terima kasih sudah meluangkan waktu untuk refleksi hari ini.</p>
        <button onClick={() => navigate("/dashboard")} className="mt-6 w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition">
          Kembali ke Dasbor
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6 pb-32">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Jurnal Harian</h1>
        <p className="text-sm text-muted-foreground mt-1">Luangkan waktu sejenak, bagaimana harimu berjalan?</p>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleFinalSubmit} className="space-y-6">
        
        <GlassCard className="p-4 sm:p-6 shadow-sm border-white/60 space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Star weight="fill" className="text-amber-400 h-5 w-5" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700">Refleksi Inti</h2>
          </div>
            
          <div className="space-y-5">
            <div className={`p-4 rounded-xl transition-all duration-300 ${formData.beban_kerja_persepsi !== null ? "border border-slate-200 bg-white shadow-sm" : "border border-slate-300 border-dashed bg-slate-50/50"}`}>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                <Briefcase size={18} weight={formData.beban_kerja_persepsi ? "fill" : "regular"} className={formData.beban_kerja_persepsi ? "text-primary" : "text-slate-400"} />
                Gimana beban kerjamu hari ini?
                {formData.beban_kerja_persepsi === null && <span className="ml-auto text-[9px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-1.5 py-0.5 rounded">Wajib</span>}
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
                      className={`flex flex-col items-center gap-1.5 rounded-lg border py-2.5 transition-colors ${
                        active ? "border-primary bg-primary/10 text-primary ring-1 ring-primary/30" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                      }`}>
                      <m.I weight={active ? "fill" : "regular"} className="h-5 w-5" />
                      <span className="text-[11px] font-bold">{m.l}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <NullableSlider field="jam_kerja_per_hari" label="Total waktu kerja hari ini" icon={Briefcase} min={0} max={16} step={1} def={8} unit="Jam" isRequired={true} />
            <NullableSlider field="jam_tidur_per_hari" label="Durasi tidur semalam" icon={MoonStars} min={0} max={12} step={0.5} def={7} unit="Jam" isRequired={true} />
            <NullableSlider field="tingkat_stres" label="Gimana tingkat stresmu hari ini?" icon={Brain} min={1} max={10} step={1} def={5} unit="/ 10" isRequired={true} />
            <NullableSlider field="produktivitas_diri" label="Merasa produktif hari ini?" icon={Check} min={1} max={10} step={1} def={7} unit="/ 10" isRequired={true} />
          </div>
        </GlassCard>

        <div className="rounded-2xl border border-slate-200 bg-white/50 overflow-hidden transition-all duration-300">
          <button type="button" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
            className="w-full flex items-center justify-between p-5 text-sm font-semibold text-slate-700 hover:bg-white/80 transition-colors">
            <span className="flex items-center gap-2"><Monitor size={18} className="text-slate-400" /> Bercerita lebih detail (Opsional)</span>
            {isAdvancedOpen ? <CaretUp weight="bold" /> : <CaretDown weight="bold" />}
          </button>
          
          {isAdvancedOpen && (
            <div className="p-4 sm:p-5 border-t border-slate-200 bg-slate-50/30 space-y-5 animate-in fade-in duration-300">
              
              {/* FIX: Ikon lembur diganti menjadi Clock dari sebelumnya Heart */}
              <NullableSlider field="jam_lembur_per_hari" label="Ada tambahan waktu lembur?" icon={Clock} min={0} max={8} step={1} def={2} unit="Jam" />
              <NullableSlider field="jam_layar_per_hari" label="Berapa lama menatap layar?" icon={Monitor} min={0} max={16} step={1} def={8} unit="Jam" />
              <NullableSlider field="frekuensi_meeting_per_hari" label="Jumlah meeting hari ini" icon={Users} min={0} max={10} step={1} def={3} unit="Kali" />
              
              {/* IMPLEMENTASI: Dua Parameter Baru Sesuai Kontrak ML */}
              <NullableSlider field="frekuensi_olahraga_per_minggu" label="Frekuensi olahraga minggu ini" icon={Barbell} min={0} max={7} step={1} def={1} unit="Kali" />
              <NullableSlider field="jumlah_deadline_per_minggu" label="Jumlah tenggat waktu (deadline) minggu ini" icon={Target} min={0} max={15} step={1} def={2} unit="Tugas" />

              <div className={`p-4 rounded-xl transition-all duration-300 ${formData.keluhan_fisik_utama !== null ? "border border-slate-200 bg-white shadow-sm" : "border border-slate-300 border-dashed bg-slate-50/50"}`}>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <BatteryCharging size={18} weight={formData.keluhan_fisik_utama ? "fill" : "regular"} className={formData.keluhan_fisik_utama ? "text-primary" : "text-slate-400"} />
                  Ada keluhan fisik yang terasa?
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {['Tidak Ada', 'Sakit Kepala', 'Nyeri Punggung', 'Mata Lelah', 'Kelelahan'].map((opt) => {
                    const active = formData.keluhan_fisik_utama === opt;
                    return (
                      <button type="button" key={opt} 
                        onClick={() => handleExplicitSelect("keluhan_fisik_utama", active ? null : opt)}
                        className={`rounded-lg border p-2.5 text-[11px] font-medium transition-colors ${
                          active ? "bg-slate-800 border-slate-800 text-white shadow-md" : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}>{opt}</button>
                    );
                  })}
                </div>
              </div>

              <NullableSlider field="kualitas_tidur" label="Gimana kualitas tidurmu semalam?" icon={MoonStars} min={1} max={10} step={1} def={6} unit="/ 10" />
              <NullableSlider field="kepuasan_kerja" label="Merasa puas dengan pekerjaan hari ini?" icon={Briefcase} min={1} max={10} step={1} def={6} unit="/ 10" />
              <NullableSlider field="work_life_balance" label="Punya waktu untuk diri sendiri hari ini?" icon={Heart} min={1} max={10} step={1} def={5} unit="/ 10" />
              <NullableSlider field="dukungan_atasan" label="Merasa didukung oleh tim/atasan hari ini?" icon={ShieldCheck} min={1} max={10} step={1} def={6} unit="/ 10" />
            </div>
          )}
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-slate-200 p-4 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
          <div className="mx-auto max-w-2xl flex items-center justify-between gap-4">
            <div className="hidden sm:block">
              {isCoreValid ? (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1"><Check weight="bold" /> Siap disimpan</span>
              ) : (
                <span className="text-xs font-medium text-slate-500">Isi 5 refleksi wajib untuk menyimpan.</span>
              )}
            </div>
            
            <button type="submit" disabled={!isCoreValid || isSubmitting}
              className="flex-1 sm:flex-none w-full sm:w-auto ml-auto rounded-full bg-slate-900 px-10 py-3.5 text-sm font-bold text-white shadow-lg hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition flex items-center justify-center gap-2">
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