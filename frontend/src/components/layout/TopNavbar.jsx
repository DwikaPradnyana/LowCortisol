import { Link, NavLink } from "react-router-dom";
import LogoIcon from "../../assets/logo.png"; 
import Button from "../ui/Button"; 

export default function TopNavbar() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/how-it-works", label: "How It Works" },
    { path: "/insights", label: "Insights" },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-auto mt-4 flex w-[95%] max-w-6xl items-center justify-between rounded-full border border-white/40 bg-white/40 px-6 py-3 backdrop-blur-2xl shadow-sm">
      
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
        <img 
          src={LogoIcon} 
          alt="LowCortisol Logo" 
          className="h-8 w-8 object-contain" 
        />
        <span className="font-semibold text-foreground tracking-tight">
          LowCortisol
        </span>
      </Link>

      {/* Main Navigation (Desktop) */}
      <div className="hidden items-center gap-1 md:flex">
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

      {/* Call to Action (Auth) */}
      <div className="flex items-center gap-3">        
        <Button to="/auth">
          Sign In
        </Button>
      </div>
      
    </nav>
  );
}