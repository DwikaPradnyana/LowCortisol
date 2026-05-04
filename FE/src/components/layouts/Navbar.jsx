import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Insights', path: '/insights' },
]

export default function Navbar() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <div className="bg-white/70 backdrop-blur-md border border-white/40 rounded-full px-5 py-2.5 flex items-center justify-between shadow-sm">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="LowCortisol" className="w-8 h-8 rounded-full object-cover" />
          <span className="font-semibold text-gray-800 text-sm">LowCortisol</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = location.pathname === link.path
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                  isActive
                    ? 'bg-white text-gray-800 shadow-sm font-medium'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Sign In */}
        <Link
          to="/signin"
          className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-sm font-medium px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
        >
          Sign In
        </Link>
      </div>
    </nav>
  )
}