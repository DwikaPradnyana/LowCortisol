export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      <div
        className="
          absolute inset-0
          bg-gradient-to-br
          from-background
          via-secondary
          to-accent
        "
      />

      <div
        className="
          absolute -left-32 -top-32
          h-[500px] w-[500px]
          rounded-full
          bg-primary/20
          blur-3xl
        "
      />

      <div
        className="
          absolute right-[-160px] top-1/3
          h-[600px] w-[600px]
          rounded-full
          bg-violet-300/25
          blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-40 left-1/4
          h-[550px] w-[550px]
          rounded-full
          bg-emerald-300/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.04]
          mix-blend-overlay
        "
        style={{
          backgroundImage:
            `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
        }}
      />

    </div>
  );
}