import Navbar from '../components/layouts/Navbar'
import { Link } from 'react-router-dom'
import heroPerson from '../assets/hero-person.png'

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/60 border border-white/50 rounded-full px-4 py-1.5 text-xs text-teal-600 font-medium mb-6">
            <span>✦</span> Proactive mental wellness
          </div>
          <h1 className="text-5xl font-bold text-gray-900 leading-tight mb-4">
            Detect Burnout<br />
            <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
              Before It Breaks You
            </span>
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
            A gentle, intelligent companion that listens to your patterns and helps you recover before exhaustion sets in.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/assessment"
              className="bg-gradient-to-r from-blue-500 to-teal-400 text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Start Free Assessment →
            </Link>
            <Link to="/how-it-works" className="text-gray-500 text-sm hover:text-gray-800 transition-colors">
              Learn More
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex justify-center items-end h-[480px]">
          {/* Person image */}
          <img
            src={heroPerson}
            alt="Person holding vegetable"
            className="relative z-10 h-[420px] object-contain drop-shadow-xl"
          />

          {/* Burnout risk card — top left */}
          <div className="absolute top-8 left-4 z-20 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md border border-white/60">
            <p className="text-xs text-gray-400 mb-1">Burnout risk</p>
            <p className="text-green-500 font-semibold text-sm">Low</p>
          </div>

          {/* Mood card — bottom right */}
          <div className="absolute bottom-12 right-0 z-20 bg-white/80 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-md border border-white/60 flex items-center gap-2">
            <span className="text-teal-400 text-lg">✦</span>
            <div>
              <p className="text-xs text-gray-400">Today's mood</p>
              <p className="text-gray-700 font-medium text-sm">Calm · 78</p>
            </div>
          </div>

          {/* Background blob */}
          <div className="absolute top-12 right-8 w-64 h-64 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full blur-3xl opacity-60 z-0" />
        </div>
      </div>
    </section>
  )
}
function FeatureGrid() {
  const features = [
    {
      icon: '◎',
      title: 'Burnout Detection AI',
      desc: 'Smart pattern recognition flags early warning signs before exhaustion takes hold.',
    },
    {
      icon: '♡',
      title: 'Emotional Tracking',
      desc: 'Gentle daily check-ins to map your mood and surface meaningful trends.',
    },
    {
      icon: '✦',
      title: 'Therapy Support',
      desc: 'Connect with licensed therapists in calm, secure conversations.',
    },
    {
      icon: '↗',
      title: 'Recovery Insights',
      desc: 'Personalized guidance that adapts to your pace, never rushed.',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs text-teal-500 font-medium mb-3 tracking-wide uppercase">Complete care toolkit</p>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">A complete care toolkit</h2>
        <p className="text-center text-gray-400 mb-14 max-w-md mx-auto">
          Every feature designed to reduce, never add to, your load.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-gray-50 rounded-2xl p-5 hover:bg-blue-50/50 transition-colors">
              <span className="text-2xl mb-4 block text-blue-400">{f.icon}</span>
              <h3 className="font-semibold text-gray-800 text-sm mb-2">{f.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function HowItWorksSection() {
  const steps = [
    { num: '01', title: 'Track', desc: 'Log your mood, energy, and stress in seconds each day.' },
    { num: '02', title: 'Analyze', desc: 'Our AI identifies subtle patterns and burnout risk factors.' },
    { num: '03', title: 'Recover', desc: 'Receive gentle, science-backed practices tailored to you.' },
  ]

  return (
    <section className="py-24 bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">How it works</h2>
        <p className="text-center text-gray-400 mb-14">Three calm steps. No overwhelm.</p>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="bg-white/60 backdrop-blur-sm rounded-2xl p-7 border border-white/60">
              <p className="text-xs text-gray-300 font-mono mb-4">{s.num}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function TestimonialSection() {
  const testimonials = [
    {
      quote: 'We caught burnout early and avoided losing key team members. It\'s now part of how we run the team.',
      name: 'Amelia Reyes',
      role: 'Head of Design, Northwind',
      initial: 'A',
      color: 'bg-blue-400',
    },
    {
      quote: 'Check-ins are fast, simple, and actually useful. My team sticks with it because it never gets in the way.',
      name: 'Jordan Keller',
      role: 'Engineering Manager, Loomhub',
      initial: 'J',
      color: 'bg-purple-400',
    },
    {
      quote: 'Our team feels calmer and more balanced week to week. The insights are gentle but truly actionable.',
      name: 'Priya Shah',
      role: 'People Lead, Verdant Co.',
      initial: 'P',
      color: 'bg-teal-400',
    },
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <p className="text-center text-xs text-teal-500 font-medium mb-3 tracking-wide uppercase">Customer Stories</p>
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-4 max-w-md mx-auto">
          Trusted by teams who prioritize mental well-being
        </h2>
        <p className="text-center text-gray-400 mb-14 max-w-lg mx-auto">
          From small teams to growing organizations, LowCortisol helps detect burnout early and build healthier work patterns.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-gray-50 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${t.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {t.initial}
                </div>
                <div>
                  <p className="text-gray-800 text-xs font-semibold">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
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

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeatureGrid />
      <HowItWorksSection />
      <TestimonialSection />
      <CTASection />
      <Footer />
    </div>
  )
}