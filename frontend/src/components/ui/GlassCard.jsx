export default function GlassCard({
  children,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={`relative rounded-3xl border border-white/60 bg-white/40 backdrop-blur-xl shadow-sm transition-all duration-300 ${
        hover ? "hover:shadow-md hover:bg-white/60 hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}