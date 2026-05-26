import { Link } from "react-router-dom";

export default function Button({
  children,
  variant = "default",
  size = "default",
  className = "",
  to,
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";

  const variants = {
    default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md hover:-translate-y-0.5",
    ghost: "text-muted-foreground hover:bg-white/50 hover:text-foreground",
    outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80"
  };

  const sizes = {
    default: "h-10 px-6 py-2",
    sm: "h-9 px-4",
    lg: "h-12 px-8 text-base",
    icon: "h-10 w-10"
  };

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}