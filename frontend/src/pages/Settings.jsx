import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  User,
  EnvelopeSimple,
  SignOut,
  ShieldCheck,
  Database,
  Sparkle,
  PencilSimple,
  CheckCircle,
  WarningCircle,
  Brain,
  LockKey,
  Cpu,
  ShieldWarning,
} from "@phosphor-icons/react";

import GlassCard from "../components/ui/GlassCard";
import { userService } from "../services/api";

export default function Settings() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    departemen: "",
    status_wfh: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();

        if (response.status === "success") {
          setProfile(response.data);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isOnboarded");
    localStorage.removeItem("user_name");

    navigate("/auth", { replace: true });
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const payload = {
        name: profile.name,
        departemen: profile.departemen,
        status_wfh: profile.status_wfh,
      };

      const response = await userService.updateProfile(payload);

      if (response.status === "success") {
        setProfile(response.data);

        localStorage.setItem(
          "user_name",
          response.data.name
        );

        setIsEditing(false);
      }
    } catch (err) {
      console.error("Update profile error:", err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    // PERBAIKAN: px-4 untuk mobile, pb-24 agar tidak menabrak Chatbot
    <div className="space-y-5 sm:space-y-6 max-w-5xl mx-auto pb-24 sm:pb-10 px-4 sm:px-6 pt-4 sm:pt-6">

      <div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>

        <p className="mt-1 text-xs sm:text-sm text-muted-foreground">
          Manajemen identitas, integritas data, dan konfigurasi sistem AI.
        </p>
      </div>

      <GlassCard className="overflow-hidden border-primary/10">
        <div className="relative p-5 sm:p-8">

          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5 sm:gap-6">

            <div className="flex items-center gap-4 sm:gap-5">

              <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-500 to-primary text-white shadow-xl text-xl sm:text-2xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="min-w-0">

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground break-words">
                    {profile.name || "User"}
                  </h2>

                  <div className="inline-flex w-max items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                    <ShieldCheck weight="fill" className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    Verified
                  </div>
                </div>

                <div className="mt-1.5 sm:mt-2 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground truncate">
                  <EnvelopeSimple className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
                  <span className="truncate">{profile.email}</span>
                </div>

                <div className="mt-2.5 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-600">
                    {profile.departemen || "No Department"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-slate-600">
                    {profile.status_wfh || "Unknown"}
                  </span>

                </div>
              </div>
            </div>

            {/* PERBAIKAN: Tombol ambil lebar penuh di mobile */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-xs sm:text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <PencilSimple className="h-4 w-4" weight="bold" />

              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-8">

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5 sm:mb-6">
          <User className="h-4 w-4 shrink-0" />
          Profil Adaptif
        </div>

        <div className="grid gap-4 sm:gap-5 md:grid-cols-2">

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-500">
              Full Name
            </label>

            <input
              disabled={!isEditing}
              value={profile.name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  name: e.target.value,
                })
              }
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
            />
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-500">
              Department
            </label>

            <select
              disabled={!isEditing}
              value={profile.departemen}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  departemen: e.target.value,
                })
              }
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Hr">HR</option>
              <option value="Product">Product</option>
              <option value="Data">Data</option>
              <option value="Finance">Finance</option>
              <option value="Sales">Sales</option>
              <option value="Operations">Operations</option>
              <option value="It">IT</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>

          <div className="space-y-1.5 sm:space-y-2">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-wide text-slate-500">
              Work Mode
            </label>

            <select
              disabled={!isEditing}
              value={profile.status_wfh}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  status_wfh: e.target.value,
                })
              }
              className="w-full rounded-xl sm:rounded-2xl border border-slate-200 bg-white/70 px-3 py-2.5 sm:px-4 sm:py-3 text-xs sm:text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
            >
              <option value="">Select Work Mode</option>
              <option value="Ya">WFH</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Tidak">Onsite</option>
            </select>
          </div>

        </div>

        {isEditing && (
          <div className="mt-5 sm:mt-6 flex justify-end">
            {/* PERBAIKAN: Tombol ambil lebar penuh di mobile */}
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs sm:text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <CheckCircle
                weight="fill"
                className="h-4 w-4 shrink-0"
              />

              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-5 sm:p-8 border-amber-200/40 bg-gradient-to-br from-amber-50/50 to-white">

        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">

          <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-amber-500/10 text-amber-600">
            <Brain className="h-5 w-5 sm:h-6 sm:w-6" weight="duotone" />
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-600">
              <Cpu className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              AI Behavioral Contract
            </div>

            <h3 className="mt-1.5 sm:mt-2 text-lg sm:text-xl font-bold text-foreground leading-tight">
              Mengapa Baseline Dibatasi?
            </h3>

            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
              Sistem AI LowCortisol menggunakan profil historis sebagai baseline perilaku jangka panjang. Perubahan ekstrem pada data dasar dapat menggeser distribusi inference dan menurunkan konsistensi analitik burnout.
            </p>

          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-5 sm:p-8">

        <div className="flex items-center gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 sm:mb-6">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          Security & Infrastructure
        </div>

        <div className="space-y-3 sm:space-y-4">

          {/* PERBAIKAN: Flex column di mobile agar badge dan teks tidak tumpang tindih */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 p-4">

            <div>
              <div className="text-xs sm:text-sm font-bold text-foreground">
                TensorFlow AI Endpoint
              </div>

              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                FastAPI inference service aktif dan terkoneksi.
              </div>
            </div>

            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-emerald-600">
              <Sparkle weight="fill" className="h-3.5 w-3.5" />
              Connected
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 rounded-xl sm:rounded-2xl border border-slate-100 bg-white/50 p-4">

            <div>
              <div className="text-xs sm:text-sm font-bold text-foreground">
                Data Storage Encryption
              </div>

              <div className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                MongoDB Atlas secure cloud storage.
              </div>
            </div>

            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-bold text-slate-600">
              <LockKey weight="fill" className="h-3.5 w-3.5" />
              Encrypted
            </div>
          </div>

        </div>
      </GlassCard>

      <GlassCard className="border-red-200/40 p-5 sm:p-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">

          <div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-red-500">
              <ShieldWarning className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />
              Session Control
            </div>

            <h3 className="mt-1.5 sm:mt-2 text-base sm:text-lg font-bold text-foreground">
              Logout Session
            </h3>

            <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Akhiri sesi aktif pada perangkat ini dan hapus token autentikasi lokal.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <SignOut className="h-4 w-4" weight="bold" />
            Logout Account
          </button>
        </div>
      </GlassCard>

    </div>
  );
}