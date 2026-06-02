import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { List, X } from "@phosphor-icons/react";
import LogoIcon from "../../assets/logo.png"; 
import Button from "../ui/Button"; 

export default function TopNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/insights", label: "Insights" },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-auto mt-4 flex w-[95%] max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/60 px-6 py-3 backdrop-blur-2xl shadow-sm transition-all duration-300">
      
      {/* 1. BRAND LOGO */}
      <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105 z-50">
        <img 
          src={LogoIcon} 
          alt="LowCortisol Logo" 
          className="h-8 w-8 object-contain" 
        />
        <span className="font-semibold text-foreground tracking-tight">
          LowCortisol
        </span>
      </Link>

      {/* 2. DESKTOP NAVIGATION */}
      <div className="hidden md:flex items-center gap-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-white/80 text-primary shadow-sm"
                  : "text-muted-foreground hover:bg-white/50 hover:text-foreground"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* 3. DESKTOP AUTH BUTTON */}
      <div className="hidden md:flex items-center gap-3">        
        <Button to="/auth">
          Sign In
        </Button>
      </div>

      {/* 4. MOBILE HAMBURGER TOGGLE */}
      <button 
        className="md:hidden flex items-center justify-center p-2 text-slate-600 hover:text-primary transition-colors z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {isMobileMenuOpen ? <X weight="bold" className="h-6 w-6" /> : <List weight="bold" className="h-6 w-6" />}
      </button>

      {/* 5. MOBILE MENU DROPDOWN */}
      {isMobileMenuOpen && (
        <div className="absolute top-[110%] left-0 right-0 w-full rounded-2xl border border-white/60 bg-white/95 p-4 backdrop-blur-3xl shadow-xl md:hidden animate-in fade-in slide-in-from-top-4 z-40 flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-slate-600 hover:bg-slate-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          
          <div className="mt-2 border-t border-slate-100 pt-3">
            <Button to="/auth" className="w-full flex justify-center py-3" onClick={() => setIsMobileMenuOpen(false)}>
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}