import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Briefcase, Heartbeat, CaretRight, CaretLeft, CheckCircle, CircleNotch } from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import { userService } from "../services/api";

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    jenis_kelamin: "", usia: "", pendidikan_terakhir: "", status_pernikahan: "",
    tipe_perusahaan: "", departemen: "", lama_bekerja_tahun: "", status_wfh: "",
    keamanan_pekerjaan: "", riwayat_kesehatan_mental: "", status_merokok: "", frekuensi_konflik_kerja: 1
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = (name === "usia" || name === "lama_bekerja_tahun" || name === "frekuensi_konflik_kerja") 
      ? (value === "" ? "" : Number(value)) 
      : value;
      
    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
    setErrorMsg("");
  };

  const setPillValue = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.jenis_kelamin || !formData.usia || !formData.pendidikan_terakhir || !formData.status_pernikahan) return false;
      if (formData.usia < 15 || formData.usia > 70) {
        setErrorMsg("Usia harus antara 15 hingga 70 tahun.");
        return false;
      }
    }
    if (step === 2) {
      if (!formData.tipe_perusahaan || !formData.departemen || formData.lama_bekerja_tahun === "" || !formData.status_wfh) return false;
      if (formData.lama_bekerja_tahun < 0 || formData.lama_bekerja_tahun > 50) {
        setErrorMsg("Lama bekerja harus antara 0 hingga 50 tahun.");
        return false;
      }
    }
    if (step === 3) {
      if (!formData.keamanan_pekerjaan || !formData.riwayat_kesehatan_mental || !formData.status_merokok) return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setErrorMsg("");
      setStep(step + 1);
    } else if (!errorMsg) {
      setErrorMsg("Mohon lengkapi semua kolom di tahap ini.");
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    if (!validateStep()) {
      if (!errorMsg) setErrorMsg("Mohon lengkapi semua kolom terakhir.");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const response = await userService.submitOnboarding(formData);
      if (response.status === 'success') {
        localStorage.setItem("isOnboarded", "true");
        navigate("/dashboard");
      }
    } catch (err) {
      const message = err.response?.data?.detail 
        ? err.response.data.detail.join(", ") 
        : err.response?.data?.error || "Gagal menyimpan data profil.";
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  const stepsConfig = [
    { num: 1, title: "Personal", icon: User },
    { num: 2, title: "Work", icon: Briefcase },
    { num: 3, title: "Health", icon: Heartbeat },
  ];

  return (
    <div className="flex min-h-[85vh] items-center justify-center p-4">
      <div className="w-full max-w-lg">
        
        <div className="relative mb-6 px-4">
            <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-slate-200" />
            <div className="absolute top-5 left-[10%] h-0.5 bg-primary transition-all duration-500"
                style={{ width: step === 1 ? "0%" : step === 2 ? "34%" : "68%", }} />

            <div className="relative z-10 flex items-center justify-between">
                {stepsConfig.map((s) => (
                    <div key={s.num} className="flex flex-col items-center gap-2">
                        
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-500 ${ step >= s.num ? "bg-primary text-white shadow-md shadow-primary/30" : "bg-slate-200 text-slate-400" }`} >
                            <s.icon weight={step >= s.num ? "bold" : "regular"} className="h-5 w-5" />
                        </div>

                        <span className={`text-xs font-semibold ${ step >= s.num ? "text-foreground" : "text-muted-foreground" }`} >
                            {s.title}
                        </span>

                    </div>
                ))}
            </div>
        </div>

        <GlassCard className="p-8 shadow-xl">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">
              {step === 1 ? "Tell us about you" : step === 2 ? "Your work profile" : "Wellbeing baseline"}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {step === 1 ? "Data ini digunakan AI untuk kalibrasi dasar." : step === 2 ? "Bagaimana bentuk lingkungan kerjamu?" : "Faktor eksternal penentu kapasitas kognitif."}
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 animate-in fade-in">
              {errorMsg}
            </div>
          )}

          <div className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-500">
            {step === 1 && (
              <>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Jenis Kelamin</label>
                  <div className="flex gap-2">
                    {['Laki-laki', 'Perempuan'].map(opt => (
                      <button key={opt} onClick={() => setPillValue('jenis_kelamin', opt)}
                        className={`flex-1 py-3 text-sm font-medium rounded-xl border transition-all ${
                          formData.jenis_kelamin === opt ? "bg-primary/10 border-primary text-primary ring-1 ring-primary/20" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Usia (Tahun)</label>
                  <input type="number" name="usia" value={formData.usia} onChange={handleInputChange} placeholder="Minimal 15" min="15" max="70"
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Pendidikan Terakhir</label>
                  <select name="pendidikan_terakhir" value={formData.pendidikan_terakhir} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option value="" disabled>Pilih pendidikan</option>
                    {['SD', 'SMP', 'SMA', 'D3', 'S1', 'S2', 'S3'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Status Pernikahan</label>
                  <select name="status_pernikahan" value={formData.status_pernikahan} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 cursor-pointer">
                    <option value="" disabled>Pilih status</option>
                    {['Belum Menikah', 'Menikah', 'Cerai/Duda/Janda'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Tipe Perusahaan</label>
                  <select name="tipe_perusahaan" value={formData.tipe_perusahaan} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary cursor-pointer">
                    <option value="" disabled>Pilih entitas</option>
                    {['Swasta', 'BUMN', 'Startup', 'Freelance'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Departemen</label>
                  <select name="departemen" value={formData.departemen} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary cursor-pointer">
                    <option value="" disabled>Pilih bidang</option>
                    {['Engineering', 'Hr', 'Product', 'Data', 'Finance', 'Sales', 'Operations', 'It', 'Marketing'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Lama Bekerja (Tahun)</label>
                  <input type="number" name="lama_bekerja_tahun" value={formData.lama_bekerja_tahun} onChange={handleInputChange} placeholder="Contoh: 2" min="0" max="50"
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary" />
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Status WFH (Work From Home)</label>
                  <div className="flex gap-2">
                    {['Ya', 'Tidak', 'Hybrid'].map(opt => (
                      <button key={opt} onClick={() => setPillValue('status_wfh', opt)}
                        className={`flex-1 py-3 text-sm font-medium rounded-xl border transition-all ${
                          formData.status_wfh === opt ? "bg-primary/10 border-primary text-primary" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}>{opt}</button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Keamanan Pekerjaan</label>
                  <select name="keamanan_pekerjaan" value={formData.keamanan_pekerjaan} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary cursor-pointer">
                    <option value="" disabled>Apakah posisi Anda terancam?</option>
                    {['Tidak Aman', 'Cukup Aman', 'Aman', 'Sangat Aman'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Riwayat Kesehatan Mental</label>
                  <select name="riwayat_kesehatan_mental" value={formData.riwayat_kesehatan_mental} onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white/50 py-3 px-4 text-sm outline-none transition focus:border-primary cursor-pointer">
                    <option value="" disabled>Diagnosa klinis sebelumnya (jika ada)</option>
                    {['Tidak Ada', 'Pernah Depresi', 'Kecemasan'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 block">Status Merokok</label>
                  <div className="flex gap-2">
                    {['Tidak', 'Ya', 'Kadang'].map(opt => (
                      <button key={opt} onClick={() => setPillValue('status_merokok', opt)}
                        className={`flex-1 py-3 text-sm font-medium rounded-xl border transition-all ${
                          formData.status_merokok === opt ? "bg-primary/10 border-primary text-primary" : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                        }`}>{opt}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block">Frekuensi Konflik Kerja</label>
                    <span className="text-xs font-bold text-primary">{formData.frekuensi_konflik_kerja} / 10</span>
                  </div>
                  <input type="range" name="frekuensi_konflik_kerja" min="1" max="10" step="1" 
                    value={formData.frekuensi_konflik_kerja} onChange={handleInputChange} 
                    className="w-full accent-primary h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-1 font-medium">
                    <span>Harmonis</span>
                    <span>Penuh Tekanan</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mt-8 flex gap-3">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading} className="px-5">
                <CaretLeft weight="bold" className="h-5 w-5" />
              </Button>
            )}
            
            {step < 3 ? (
              <Button type="button" onClick={nextStep} className="flex-1 flex justify-center items-center gap-2">
                Continue <CaretRight weight="bold" className="h-5 w-5" />
              </Button>
            ) : (
              <Button type="button" onClick={handleSubmit} disabled={isLoading} className="flex-1 flex justify-center items-center gap-2">
                {isLoading ? (
                  <><CircleNotch className="h-5 w-5 animate-spin" /> Saving Profile...</>
                ) : (
                  <><CheckCircle weight="bold" className="h-5 w-5" /> Finish Setup</>
                )}
              </Button>
            )}
          </div>

        </GlassCard>
      </div>
    </div>
  );
}