import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/contributors', label: 'Contributors' },
    { path: '/chat', label: 'AI Chat' },
    { path: '/network', label: 'Network' },
    { path: '/about', label: 'About' },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D]/85 backdrop-blur-xl border-b border-white/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#AAFF00] to-[#7ACC00] rounded-lg blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#AAFF00] to-[#7ACC00] flex items-center justify-center shadow-lg">
                <span className="text-[#0D0D0D] font-black text-xl" style={{ fontFamily: "'Source Code Pro', monospace" }}>R</span>
              </div>
            </div>
            <div>
              <span className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "'Instrument Sans', sans-serif" }}>Rhythm</span>
              <div className="text-[9px] text-[#6B6B60] uppercase tracking-[2px] -mt-1" style={{ fontFamily: "'Source Code Pro', monospace" }}>Intelligence</div>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1.5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-5 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm tracking-wide",
                  location.pathname === item.path
                    ? "bg-[#AAFF00]/8 text-[#AAFF00] border border-[#AAFF00]/15"
                    : "text-[#A8A89A] hover:text-white hover:bg-white/5"
                )}
                style={{ fontFamily: "'Source Code Pro', monospace" }}
              >
                {item.label}
              </Link>
            ))}

            {/* Beta Indicator */}
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#AAFF00]/6 border border-[#AAFF00]/12">
              <div className="w-[7px] h-[7px] rounded-full bg-[#AAFF00] animate-pulse" />
              <span className="text-[#AAFF00] text-[11px] font-semibold tracking-wider uppercase" style={{ fontFamily: "'Source Code Pro', monospace" }}>Beta</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
