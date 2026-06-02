import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import LogoIcon from "../../assets/logo.png";

export default function Footer() {
  return (
    <footer className="mt-20 sm:mt-24 md:mt-32">
      <GlassCard className="flex flex-col items-center gap-6 px-5 py-6 text-center sm:px-6 sm:py-7 md:flex-row md:justify-between md:text-left">
        
        <div className="flex flex-col items-center gap-3 sm:flex-row md:items-center">
          <div className="flex h-10 w-10 items-center justify-center shrink-0">
            <img
              src={LogoIcon}
              alt="LowCortisol Logo"
              className="h-8 w-8 object-contain"
            />
          </div>

          <div>
            <div className="font-semibold text-foreground">
              LowCortisol
            </div>

            <div className="text-sm text-muted-foreground">
              © 2026 · Take care, gently.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-muted-foreground md:justify-end">
          <Link
            to="#"
            className="transition-colors hover:text-primary"
          >
            Privacy
          </Link>

          <Link
            to="#"
            className="transition-colors hover:text-primary"
          >
            Research
          </Link>

          <Link
            to="#"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </div>

      </GlassCard>
    </footer>
  );
}