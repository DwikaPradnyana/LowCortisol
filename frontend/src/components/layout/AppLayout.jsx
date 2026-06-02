import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import {
  SquaresFour, Heartbeat, TrendUp, Leaf, ClockCounterClockwise, Gear, Question, SignOut, User, List, X
} from "@phosphor-icons/react";
import sidebarLogo from "../../assets/logo.png";
import ChatbotBubble from "../chatbot/ChatbotBubble";

export default function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const userName = localStorage.getItem("user_name") || "User Profile";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isOnboarded");
    localStorage.removeItem("user_name");
    navigate("/auth", { replace: true });
  };

  // Tutup sidebar mobile secara otomatis jika rute (URL) berubah
  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [location.pathname]);

  const navItems = [
    { id: "dashboard", path: "/dashboard", label: "Dashboard", Icon: SquaresFour },
    { id: "checkin", path: "/dashboard/checkin", label: "Check-in", Icon: Heartbeat, primary: true },
    { id: "insights", path: "/dashboard/insights", label: "Insights", Icon: TrendUp },
    { id: "recovery", path: "/dashboard/recovery", label: "Recovery Plan", Icon: Leaf },
    { id: "history", path: "/dashboard/history", label: "History", Icon: ClockCounterClockwise },
  ];

  const bottomNavItems = [
    { id: "settings", path: "/dashboard/settings", label: "Settings", Icon: Gear },
    { id: "help", path: "/dashboard/help", label: "Help", Icon: Question },
  ];

  const currentPage = navItems.find((item) => location.pathname === item.path)?.label || "Dashboard";

  // Abstraksi konten Sidebar agar DRY (Digunakan untuk Desktop dan Mobile)
  const SidebarContent = () => (
    <>
      <div>
        <Link to="/" className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center shrink-0">
            <img src={sidebarLogo} alt="LowCortisol" className="object-contain" />
          </div>
          <span className="text-xl font-bold tracking-tight leading-none text-foreground">
            LowCortisol
          </span>
        </Link>

        <nav className="space-y-2">
          {navItems.map(({ path, label, Icon, primary }) => {
            const isActive = location.pathname === path;
            if (primary) {
              return (
                <Link key={path} to={path}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 ${
                    isActive ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20"
                  }`}
                >
                  <Icon weight={isActive ? "fill" : "bold"} className="h-5 w-5" />
                  {label}
                  {!isActive && <span className="ml-auto h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_8px_rgba(45,212,191,0.8)]" />}
                </Link>
              );
            }
            return (
              <Link key={path} to={path}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-white/70 text-primary shadow-sm border border-white/80" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
                }`}
              >
                <Icon weight={isActive ? "fill" : "regular"} className="h-5 w-5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>

      <nav className="space-y-2">
        {bottomNavItems.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link key={path} to={path}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                isActive ? "bg-white/70 text-primary shadow-sm" : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              }`}
            >
              <Icon weight={isActive ? "fill" : "regular"} className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden p-4 md:p-6 gap-6 bg-transparent relative">
      
      {/* 1. DESKTOP SIDEBAR */}
      <aside className="hidden w-64 shrink-0 flex-col justify-between rounded-[2rem] border border-white/60 bg-white/40 p-6 backdrop-blur-xl shadow-lg md:flex z-20">
        <SidebarContent />
      </aside>

      {/* 2. MOBILE SIDEBAR OVERLAY */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-[60] flex md:hidden">
          {/* Latar Belakang Gelap (Klik untuk menutup) */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileSidebarOpen(false)} 
          />
          {/* Laci Sidebar Mobile */}
          <aside className="relative flex w-64 max-w-[80vw] h-full flex-col justify-between rounded-r-[2rem] border-r border-white/60 bg-white/95 p-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <button 
              onClick={() => setIsMobileSidebarOpen(false)} 
              className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition"
            >
              <X weight="bold" className="h-4 w-4" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* 3. MAIN CONTENT AREA */}
      <div className="flex min-w-0 flex-1 flex-col gap-6 relative z-10">
        
        <header className="flex h-16 shrink-0 items-center justify-between rounded-full border border-white/60 bg-white/40 px-4 md:px-6 backdrop-blur-xl shadow-sm z-30">
          
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full bg-white/50 text-slate-600 hover:bg-white/80 transition shadow-sm border border-white/60"
            >
              <List weight="bold" className="h-5 w-5" />
            </button>
            <h2 className="text-sm font-semibold text-muted-foreground hidden sm:block">{currentPage}</h2>
          </div>
          
          <div className="flex items-center gap-4 relative">
            {/* Tombol Bell Dihapus Sesuai Instruksi */}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-primary text-white font-bold shadow-md ring-2 ring-white/50 hover:ring-white transition-all z-40"
            >
              {userName.charAt(0).toUpperCase()}
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-14 w-56 origin-top-right rounded-2xl border border-white/60 bg-white/100 p-2 backdrop-blur-2xl shadow-xl animate-in fade-in zoom-in-95 z-50">
                <div className="px-3 py-2">
                  <div className="text-sm font-semibold text-foreground">{userName}</div>
                  <div className="text-xs text-muted-foreground">User Account</div>
                </div>
                <div className="my-1 h-px bg-slate-200/50" />
                <button
                  onClick={() => {
                    navigate("/dashboard/settings");
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-white"
                >
                  <User weight="bold" className="h-4 w-4" /> Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-red-500 transition-colors hover:bg-red-50"
                >
                  <SignOut weight="bold" className="h-4 w-4" /> Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto pb-6 relative z-10">
          <Outlet />
        </div>
      </div>

      <ChatbotBubble />
      
    </div>
  );
}