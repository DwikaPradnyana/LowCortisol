import { Star } from "@phosphor-icons/react";

const testimonials = [
  {
    quote: "We caught burnout early and avoided losing key team members. It's now part of how we run the team.",
    name: "Amelia Reyes",
    role: "Head of Design",
    initial: "A",
  },
  {
    quote: "Check-ins are fast, simple, and actually useful. My team sticks with it because it never gets in the way.",
    name: "Jordan Keller",
    role: "Engineering Manager",
    initial: "J",
  },
  {
    quote: "Our team feels calmer and more balanced week to week. The insights are gentle but truly actionable.",
    name: "Priya Shah",
    role: "People Lead",
    initial: "P",
  },
];

export default function SocialProof() {
  return (
    <section className="mt-24">
      {/* Header */}
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-medium text-primary backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Customer Stories
        </div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          Trusted by teams who prioritize mental well-being
        </h2>
        <p className="mt-4 text-muted-foreground leading-relaxed">
          From small teams to growing organizations, LowCortisol helps detect burnout early and build healthier work patterns.
        </p>
      </div>

      {/* Grid */}
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="group relative overflow-hidden rounded-[20px] border border-white/60 bg-white/40 p-8 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:bg-white/60"
          >
            <div className="relative z-10">
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    weight="fill"
                    className="h-4 w-4 text-amber-400"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mt-5 text-foreground/80 leading-relaxed">
                "{t.quote}"
              </p>

              {/* Identity */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 border border-primary/20">
                  <span className="text-primary font-semibold">
                    {t.initial}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}