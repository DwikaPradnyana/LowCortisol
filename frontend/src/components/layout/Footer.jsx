import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import LogoIcon from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-32">
      <GlassCard className="flex flex-col items-center justify-between gap-6 p-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center">
            <img 
              src={LogoIcon} 
              alt="LowCortisol Logo" 
              className="object-contain h-8 w-8" 
            />
          </div>
          <div>
            <div className="font-semibold text-foreground">LowCortisol</div>
            <div className="text-sm text-muted-foreground">© 2026 · Take care, gently.</div>
          </div>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
          <Link to="#" className="hover:text-primary transition-colors">Privacy</Link>
          <Link to="#" className="hover:text-primary transition-colors">Research</Link>
          <Link to="#" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </GlassCard>
    </footer>
  );
}