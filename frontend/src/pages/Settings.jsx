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
    <div className="space-y-6 max-w-5xl mx-auto pb-10 px-6 pt-4">

      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Settings
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manajemen identitas, integritas data, dan konfigurasi sistem AI.
        </p>
      </div>

      <GlassCard className="overflow-hidden border-primary/10">
        <div className="relative p-6 sm:p-8">

          <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-primary text-white shadow-xl text-2xl font-bold">
                {profile.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>

                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-foreground">
                    {profile.name || "User"}
                  </h2>

                  <div className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-600 border border-emerald-500/20">
                    <ShieldCheck weight="fill" />
                    Verified
                  </div>
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <EnvelopeSimple className="h-4 w-4" />
                  {profile.email}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                    {profile.departemen || "No Department"}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-600">
                    {profile.status_wfh || "Unknown"}
                  </span>

                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              <PencilSimple className="h-4 w-4" weight="bold" />

              {isEditing ? "Cancel Edit" : "Edit Profile"}
            </button>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 sm:p-8">

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          <User className="h-4 w-4" />
          Profil Adaptif
        </div>

        <div className="grid gap-5 md:grid-cols-2">

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
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
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
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
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
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

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
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
              className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-sm outline-none transition focus:border-primary/40 disabled:opacity-60"
            >
              <option value="">Select Work Mode</option>
              <option value="Ya">WFH</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Tidak">Onsite</option>
            </select>
          </div>

        </div>

        {isEditing && (
          <div className="mt-6 flex justify-end">

            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              <CheckCircle
                weight="fill"
                className="h-4 w-4"
              />

              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}
      </GlassCard>

      <GlassCard className="p-6 sm:p-8 border-amber-200/40 bg-gradient-to-br from-amber-50/50 to-white">

        <div className="flex items-start gap-4">

          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
            <Brain className="h-6 w-6" weight="duotone" />
          </div>

          <div className="flex-1">

            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-600">
              <Cpu className="h-4 w-4" />
              AI Behavioral Contract
            </div>

            <h3 className="mt-2 text-xl font-bold text-foreground">
              Mengapa Baseline Dibatasi?
            </h3>

            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Sistem AI LowCortisol menggunakan profil historis sebagai baseline perilaku jangka panjang. Perubahan ekstrem pada data dasar dapat menggeser distribusi inference dan menurunkan konsistensi analitik burnout.
            </p>

          </div>
        </div>
      </GlassCard>

      <GlassCard className="p-6 sm:p-8">

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
          <ShieldCheck className="h-4 w-4" />
          Security & Infrastructure
        </div>

        <div className="space-y-4">

          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/50 p-4">

            <div>
              <div className="text-sm font-bold text-foreground">
                TensorFlow AI Endpoint
              </div>

              <div className="text-xs text-muted-foreground mt-1">
                FastAPI inference service aktif dan terkoneksi.
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600">
              <Sparkle weight="fill" />
              Connected
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white/50 p-4">

            <div>
              <div className="text-sm font-bold text-foreground">
                Data Storage Encryption
              </div>

              <div className="text-xs text-muted-foreground mt-1">
                MongoDB Atlas secure cloud storage.
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
              <LockKey weight="fill" />
              Encrypted
            </div>
          </div>

        </div>
      </GlassCard>

      <GlassCard className="border-red-200/40 p-6 sm:p-8">

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-red-500">
              <ShieldWarning className="h-4 w-4" />
              Session Control
            </div>

            <h3 className="mt-2 text-lg font-bold text-foreground">
              Logout Session
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Akhiri sesi aktif pada perangkat ini dan hapus token autentikasi lokal.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <SignOut className="h-4 w-4" weight="bold" />
            Logout Account
          </button>
        </div>
      </GlassCard>

    </div>
  );
}
