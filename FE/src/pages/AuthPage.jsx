import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/layouts/Navbar'
import logo from '../assets/logo.png'

function InputField({ icon, type, placeholder, value, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-sm">
        {icon}
      </span>
      <input
        type={type}
        required
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50/80 text-sm text-gray-700 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all"
      />
    </div>
  )
}

function SignInForm() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // TODO: replace with Supabase auth
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome back</h2>
        <p className="text-gray-400 text-sm mb-6">We've kept your space ready.</p>
      </div>

      <InputField
        icon="✉"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <InputField
        icon="🔒"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <div className="flex justify-end">
        <button type="button" className="text-xs text-blue-400 hover:text-blue-600 transition-colors">
          Forgot password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-3.5 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? 'Signing in...' : 'Sign In'}
      </button>

      <p className="text-center text-xs text-gray-300 pt-1">
        By continuing you agree to our calm, plain-language Terms.
      </p>
    </form>
  )
}

function RegisterForm() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirm) return
    setLoading(true)
    // TODO: replace with Supabase auth
    setTimeout(() => {
      setLoading(false)
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your space</h2>
        <p className="text-gray-400 text-sm mb-6">A gentle start to feeling better.</p>
      </div>

      <InputField
        icon="👤"
        type="text"
        placeholder="Full name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <InputField
        icon="✉"
        type="email"
        placeholder="Email address"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <InputField
        icon="🔒"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <InputField
        icon="🔒"
        type="password"
        placeholder="Confirm password"
        value={form.confirm}
        onChange={(e) => setForm({ ...form, confirm: e.target.value })}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium py-3.5 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-60"
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>

      <p className="text-center text-xs text-gray-300 pt-1">
        By continuing you agree to our calm, plain-language Terms.
      </p>
    </form>
  )
}

export default function AuthPage() {
  const [mode, setMode] = useState('signin')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/60 to-teal-50">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-4 bg-transparent">

          {/* Left panel — branding card */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-50 via-teal-50/60 to-purple-50 border border-white/80 p-8 flex flex-col justify-between min-h-[420px]">
            {/* Blobs */}
            <div className="absolute top-6 right-8 w-44 h-44 bg-white/60 rounded-full blur-sm" />
            <div className="absolute bottom-16 left-6 w-32 h-32 bg-purple-100/60 rounded-full blur-sm" />

            {/* Logo */}
          <div className="relative z-10 flex items-center gap-2">
            <img src={logo} alt="LowCortisol" className="w-9 h-9 rounded-full object-cover" />
            <span className="font-semibold text-gray-800">LowCortisol</span>
          </div>

            {/* Bottom copy */}
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-gray-800 leading-tight mb-3">
                Take a breath.<br />You're in control.
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                A safe place to notice how you're really doing —<br />
                and rest before you have to.
              </p>
            </div>
          </div>

          {/* Right panel — form card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/80 shadow-sm p-8 flex flex-col justify-center">
            {/* Toggle tabs */}
            <div className="flex bg-gray-50 rounded-2xl p-1 mb-7 gap-1">
              <button
                onClick={() => setMode('signin')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mode === 'signin'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  mode === 'register'
                    ? 'bg-white text-blue-500 shadow-sm'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>

            {mode === 'signin' ? <SignInForm /> : <RegisterForm />}
          </div>

        </div>
      </div>
    </div>
  )
}