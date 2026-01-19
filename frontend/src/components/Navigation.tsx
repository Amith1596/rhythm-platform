import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

export default function Navigation() {
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/contributors', label: 'Contributors' },
  ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-primary-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-600 to-secondary-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">R</span>
            </div>
            <span className="text-xl font-bold text-primary-900">Rhythm</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                  location.pathname === item.path
                    ? "bg-primary-100 text-primary-900"
                    : "text-gray-600 hover:bg-primary-50 hover:text-primary-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
