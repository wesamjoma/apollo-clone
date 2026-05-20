import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search, Eye, Sparkles, User, Bell, Monitor, Globe,
  CreditCard, Zap, Puzzle, LogOut, ChevronRight
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const MENU_ITEMS = [
  { label: 'Your profile',             icon: User,   action: 'profile' },
  { label: 'Activity & notifications', icon: Bell },
  { label: 'Theme',                    icon: Monitor,  arrow: true },
  { label: 'Language',                 icon: Globe,    arrow: true, badge: 'Beta' },
  'divider',
  { label: 'View credit usage',        icon: CreditCard },
  { label: 'Upgrade Plan',             icon: Zap },
  { label: 'Get the Chrome Extension', icon: Puzzle },
  'divider',
  { label: 'Log out',                  icon: LogOut,   action: 'logout' },
]

export default function Topbar() {
  const { user, signout } = useAuth()
  const navigate = useNavigate()
  const initials = user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    if (!menuOpen) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [menuOpen])

  const handleLogout = () => {
    setMenuOpen(false)
    signout()
    navigate('/login')
  }

  return (
    <header className="h-12 bg-gray-900 border-b border-gray-800 flex items-center px-4 gap-4 sticky top-0 z-20">
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        <input
          type="text"
          placeholder="Search across Apollo..."
          className="w-full bg-gray-800 border border-gray-700 rounded-md pl-8 pr-16 py-1.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-600 font-mono">Ctrl K</span>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Visitors count */}
        <button className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
          <Eye size={16} />
          <span className="text-sm font-medium">80</span>
        </button>

        {/* AI Assistant */}
        <button className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-sm px-3 py-1 rounded-md transition-colors">
          <Sparkles size={14} className="text-blue-400" />
          <span>AI Assistant</span>
        </button>

        {/* Avatar + dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-7 h-7 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors"
          >
            {initials}
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-9 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-2xl py-1 z-50">
              {MENU_ITEMS.map((item, i) =>
                item === 'divider' ? (
                  <div key={i} className="border-t border-gray-700 my-1" />
                ) : (
                  <button
                    key={item.label}
                    onClick={
                      item.action === 'logout' ? handleLogout
                      : item.action === 'profile' ? () => { setMenuOpen(false); navigate('/settings') }
                      : () => setMenuOpen(false)
                    }
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    <item.icon size={15} className="shrink-0 text-gray-400" />
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded font-medium">
                        {item.badge}
                      </span>
                    )}
                    {item.arrow && <ChevronRight size={13} className="text-gray-500" />}
                  </button>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
