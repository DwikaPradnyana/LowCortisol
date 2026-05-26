import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkle, EnvelopeSimple, LockKey, User, CircleNotch } from "@phosphor-icons/react";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import Logo from "../assets/logo.svg";
import { authService } from "../services/api";

export default function Auth() {
  const navigate = useNavigate();
  
  const [tab, setTab] = useState("signin");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      let response;

      if (tab === "signin") {
        response = await authService.login(formData.email, formData.password);
      } else {
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Password tidak cocok");
        }
        response = await authService.register(formData.name, formData.email, formData.password);
      }

      if (response.status === 'success' && response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user_name", response.data.user.name);
        
        localStorage.setItem("isOnboarded", String(response.data.user.onboarding_completed));
        
        navigate("/dashboard");
      } else {
        throw new Error("Respons server tidak valid.");
      }

    } catch (err) {
      const serverError = err.response?.data?.error;
      setError(serverError || err.message || "Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="mx-auto grid min-h-[calc(100vh-6rem)] w-[95%] max-w-6xl grid-cols-1 gap-8 pb-12 pt-8 md:grid-cols-2">
      
      <div className="relative hidden h-full md:block">
        <GlassCard className="relative h-full overflow-hidden p-10 bg-gradient-to-br from-white/60 to-primary/5">
          <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />
          <div className="absolute right-10 top-20 h-32 w-32 rounded-full border border-white/60 bg-white/40 backdrop-blur-xl shadow-lg shadow-primary/10" />
          <div className="absolute bottom-16 left-12 h-44 w-44 rounded-full border border-white/60 bg-gradient-to-br from-indigo-300/30 to-white/40 backdrop-blur-xl" />

          <div className="relative flex h-full flex-col justify-between z-10">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="" />
              <span className="font-semibold text-lg text-foreground tracking-tight">LowCortisol</span>
            </div>
            <div>
              <h2 className="text-4xl font-bold leading-tight tracking-tight text-foreground">
                Take a breath.<br />You're in control.
              </h2>
              <p className="mt-4 max-w-sm text-muted-foreground leading-relaxed">
                Tempat aman untuk memperhatikan kondisi Anda — dan penyesuaian sebelum kelelahan melanda.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="h-full p-8 md:p-10 shadow-lg">
        <div className="mb-8 flex rounded-full border border-slate-200 bg-slate-50/50 p-1 backdrop-blur-xl">
          {(["signin", "signup"]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setError("");
              }}
              className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-300 ${
                tab === t
                  ? "bg-white text-primary shadow-sm border border-slate-100"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "signin" ? "Sign In" : "Create Account"}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-semibold text-foreground tracking-tight">
            {tab === "signin" ? "Selamat datang kembali!" : "Buat akun baru untuk memulai"}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {tab === "signin" ? "Kami telah menyiapkan tempat Anda." : "Awal yang lembut untuk merasa lebih baik."}
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700 animate-in fade-in slide-in-from-top-2 flex items-center gap-2">
            <CircleNotch weight="bold" className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {tab === "signup" && (
            <div className="group relative">
              <User weight="bold" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>
          )}

          <div className="group relative">
            <EnvelopeSimple weight="bold" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          <div className="group relative">
            <LockKey weight="bold" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
            <input
              type="password"
              name="password"
              required
              minLength={6}
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password (min. 6 characters)"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
            />
          </div>

          {tab === "signup" && (
            <div className="group relative">
              <LockKey weight="bold" className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
              <input
                type="password"
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-12 pr-4 text-sm text-foreground outline-none transition-all focus:border-primary/50 focus:bg-white focus:ring-4 focus:ring-primary/10"
              />
            </div>
          )}

          {tab === "signin" && (
            <div className="flex justify-end pt-1">
              <button type="button" className="text-xs font-medium text-primary hover:underline">
                Forgot password?
              </button>
            </div>
          )}

          <Button 
            type="submit" 
            size="lg" 
            className="mt-4 w-full shadow-md shadow-primary/20"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <CircleNotch weight="bold" className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              tab === "signin" ? "Sign In" : "Create Account"
            )}
          </Button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground/80">
          By continuing you agree to our calm, plain-language <span className="underline cursor-pointer hover:text-foreground">Terms & Privacy</span>.
        </div>
      </GlassCard>

    </main>
  );
}