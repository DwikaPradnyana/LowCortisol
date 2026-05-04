import Navbar from '../components/layouts/Navbar'
import { Link } from 'react-router-dom'

function HeroSection() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 bg-white/60 border border-white/50 rounded-full px-4 py-1.5 text-xs text-teal-600 font-medium mb-6">
          <span>↗</span> A preview of the patterns you'll find
        </div>
        <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-5">
          Understand your{' '}
          <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
            mental patterns
          </span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto">
          Gentle observations — not dashboards full of charts. LowCortisol notices the small shifts so you don't have to.
        </p>
      </div>
    </section>
  )
}

function InsightCardsSection() {
  const cards = [
    {
      icon: '📅',
      title: 'Your stress peaks on Mondays',
      desc: 'A softer start to the week could quietly change everything.',
      bars: [85, 30, 35, 40, 38, 32, 28],
      highlightIndex: 0,
      highlightColor: '#f97316',
      bg: 'bg-orange-50',
    },
    {
      icon: '🌙',
      title: 'You recover better on weekends',
      desc: 'Sleep and slower mornings do more than you think.',
      bars: [30, 32, 35, 38, 40, 85, 80],
      highlightIndex: 5,
      highlightColor: '#10b981',
      bg: 'bg-teal-50',
    },
    {
      icon: '☕',
      title: 'Energy drops after long meetings',
      desc: 'A 5-minute reset between calls restores focus gently.',
      bars: [70, 65, 30, 60, 55, 28, 65],
      highlightIndex: 2,
      highlightColor: '#8b5cf6',
      bg: 'bg-purple-50',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div key={card.title} className={`${card.bg} rounded-3xl p-7`}>
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-lg shadow-sm mb-5">
                {card.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-base mb-2">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{card.desc}</p>
              <div className="flex items-end gap-1.5">
                {card.bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-full"
                    style={{
                      height: `${h * 0.5}px`,
                      background:
                        i === card.highlightIndex
                          ? card.highlightColor
                          : '#e5e7eb',
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WeeklyChartSection() {
  const points = [
    { day: 'Mon', val: 35 },
    { day: 'Tue', val: 42 },
    { day: 'Wed', val: 38 },
    { day: 'Thu', val: 50 },
    { day: 'Fri', val: 48 },
    { day: 'Sat', val: 65 },
    { day: 'Sun', val: 72 },
  ]

  const maxVal = 100
  const chartH = 120
  const chartW = 560
  const padX = 20

  const coords = points.map((p, i) => {
    const x = padX + (i / (points.length - 1)) * (chartW - padX * 2)
    const y = chartH - (p.val / maxVal) * chartH
    return { x, y, ...p }
  })

  const polyline = coords.map((c) => `${c.x},${c.y}`).join(' ')
  const areaPath = `M${coords[0].x},${chartH} ` +
    coords.map((c) => `L${c.x},${c.y}`).join(' ') +
    ` L${coords[coords.length - 1].x},${chartH} Z`

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 border border-white/60 shadow-sm">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-xs text-gray-400 tracking-widest uppercase mb-1">This week (sample)</p>
              <h2 className="text-2xl font-bold text-gray-900">Your patterns, softly told</h2>
              <p className="text-gray-400 text-sm mt-1">Each point is one day's felt mood — no numbers to decode.</p>
            </div>
            <span className="inline-flex items-center gap-1 text-teal-500 text-xs font-medium bg-teal-50 px-3 py-1.5 rounded-full border border-teal-100">
              ↗ Calm upward trend
            </span>
          </div>

          <div className="mt-8 overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartW} ${chartH + 30}`}
              className="w-full"
              preserveAspectRatio="none"
              style={{ height: '160px' }}
            >
              <defs>
                <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#areaGrad)" />
              <polyline
                points={polyline}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {coords.map((c) => (
                <circle key={c.day} cx={c.x} cy={c.y} r="4" fill="#3b82f6" />
              ))}
              {coords.map((c) => (
                <text
                  key={`label-${c.day}`}
                  x={c.x}
                  y={chartH + 20}
                  textAnchor="middle"
                  fontSize="11"
                  fill="#9ca3af"
                >
                  {c.day}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExplainerSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-blue-400 text-lg shadow-sm mb-5">
              ◎
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">How insights prevent burnout</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Burnout rarely arrives suddenly. It accumulates in missed signals. By noticing small patterns early — a rough Monday, a tiring meeting rhythm, a late bedtime drift — you can adjust gently, long before exhaustion sets in.
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-teal-400 text-lg shadow-sm mb-5">
              ↗
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Gentle, never prescriptive</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every insight is paired with a small, optional suggestion. You're always in charge of what to do with it — and never judged for doing nothing.
            </p>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Track your own patterns</h2>
        <p className="text-gray-400 mb-8">Your first insight arrives after just three check-ins.</p>
        <Link
          to="/assessment"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium px-8 py-3.5 rounded-full hover:opacity-90 transition-opacity"
        >
          Track your own patterns →
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

export default function InsightsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <InsightCardsSection />
      <WeeklyChartSection />
      <ExplainerSection />
      <CTASection />
      <Footer />
    </div>
  )
}