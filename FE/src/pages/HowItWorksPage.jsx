import Navbar from '../components/layouts/Navbar'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 border border-white/50 rounded-full px-4 py-1.5 text-xs text-teal-600 font-medium mb-6">
          <span>✦</span> A quiet system that works in the background
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
          How LowCortisol{' '}
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            gently works for you
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          Three simple steps. No dashboards to master, no pressure to perform. Just small daily notices that add up.
        </p>
      </div>
    </section>
  )
}

function StepsSection() {
  const steps = [
    {
      num: '01',
      icon: '☑',
      title: 'Daily Check-in',
      desc: 'Log your mood and energy in under 10 seconds. Nothing more is asked.',
      color: 'bg-blue-50',
      iconColor: 'text-blue-400',
    },
    {
      num: '02',
      icon: '✦',
      title: 'Smart Insights',
      desc: 'Gentle AI spots early patterns and quietly surfaces what matters.',
      color: 'bg-purple-50',
      iconColor: 'text-purple-400',
    },
    {
      num: '03',
      icon: '◎',
      title: 'Better Recovery',
      desc: 'Receive small, kind suggestions that fit your real life.',
      color: 'bg-teal-50',
      iconColor: 'text-teal-400',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className={`${s.color} rounded-3xl p-8 relative`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-10 h-10 rounded-xl bg-white flex items-center justify-center ${s.iconColor} text-lg shadow-sm`}>
                  {s.icon}
                </div>
                <span className="text-gray-200 font-mono text-sm font-medium">{s.num}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function GlanceSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">A glance is all it takes</h2>
        <p className="text-center text-gray-400 mb-16">The experience, in three lightweight moments.</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Mood card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/60 shadow-sm">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Mood</p>
            <p className="text-2xl font-bold text-gray-900 mb-6">One tap</p>
            <div className="flex gap-3">
              {['😞', '😐', '🙂'].map((emoji, i) => (
                <div
                  key={i}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 ${
                    i === 2
                      ? 'border-teal-400 bg-teal-50'
                      : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Burnout score card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/60 shadow-sm">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Burnout Score</p>
            <div className="flex items-end gap-1 mb-4">
              <span className="text-5xl font-bold text-gray-900">32</span>
              <span className="text-gray-400 text-sm mb-2">/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mb-3">
              <div
                className="bg-gradient-to-r from-teal-400 to-green-400 h-1.5 rounded-full"
                style={{ width: '32%' }}
              />
            </div>
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              Low risk · stable
            </span>
          </div>

          {/* Insight card */}
          <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-7 border border-white/60 shadow-sm">
            <p className="text-xs text-gray-400 tracking-widest uppercase mb-3">Insight</p>
            <p className="text-gray-800 font-semibold mb-6">You rest better on weekends.</p>
            <div className="flex items-end gap-1.5 mb-3">
              {[40, 55, 50, 65, 60, 80, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-lg"
                  style={{
                    height: `${h * 0.7}px`,
                    background:
                      i >= 5
                        ? 'linear-gradient(to top, #2dd4bf, #34d399)'
                        : '#e5e7eb',
                  }}
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-teal-500 text-xs font-medium">
              ↗ gentle upward trend
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

const GRID_COLORS = [
  'b','t','b','g','t',
  'g','b','t','b','g',
  't','g','b','t','b',
  'b','t','g','b','t',
  'g','b','t','g','b',
  't','g','b','t','g',
  'b','t','g','b','t',
]

function PrivacySection() {
  const points = [
    {
      icon: '◎',
      title: 'Anonymous by default',
      desc: 'No names, no identifying information required to use the platform.',
    },
    {
      icon: '⊘',
      title: 'No data selling',
      desc: 'Your patterns are yours. We never sell or share your data with third parties.',
    },
    {
      icon: '✦',
      title: 'Fully encrypted',
      desc: 'All data is encrypted at rest and in transit using industry-standard protocols.',
    },
    {
      icon: '↗',
      title: 'You control deletion',
      desc: 'Delete your data at any time, completely and permanently, in one click.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs text-teal-500 font-medium tracking-wide uppercase mb-3">
              Privacy by design
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Your data stays yours.<br />Always.
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              Your data is anonymized at the source. No names, no leaks — just quiet insights
              that help you without exposing you.
            </p>
            <div className="space-y-4">
              {points.map((p) => (
                <div key={p.title} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center text-teal-400 flex-shrink-0 mt-0.5">
                    {p.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm mb-0.5">{p.title}</p>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual grid — static, no Math.random */}
          <div className="flex justify-center">
            <div className="grid grid-cols-5 gap-2">
              {GRID_COLORS.map((type, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-xl"
                  style={{
                    background:
                      type === 'b' ? 'rgba(59,130,246,0.15)' :
                      type === 't' ? 'rgba(45,212,191,0.15)' :
                      '#f3f4f6',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Start your first check-in</h2>
        <p className="text-gray-400 mb-8">No setup. No overwhelm. Just a soft first step.</p>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Start your first check-in →
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center">
            <span className="text-white text-xs font-bold">LC</span>
          </div>
          <span className="text-sm text-gray-500">LowCortisol</span>
        </div>
        <p className="text-xs text-gray-300">© 2026 · live, gently</p>
        <div className="flex gap-5 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy</a>
          <a href="#" className="hover:text-gray-600">Research</a>
          <a href="#" className="hover:text-gray-600">Contact</a>
        </div>
      </div>
    </footer>
  )
}

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <StepsSection />
      <GlanceSection />
      <PrivacySection />
      <CTASection />
      <Footer />
    </div>
  )
}