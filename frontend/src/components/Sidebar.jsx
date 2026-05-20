import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  Home, Sparkles, Users, Building2, List, Database,
  GitBranch, Mail, Phone, CheckSquare, Calendar,
  MessageSquare, Briefcase, Workflow, BarChart2,
  Globe, FileText, Bookmark, Settings, LogOut,
  ChevronDown, ChevronRight, Zap, Star
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const sections = [
  {
    label: 'Prospect and enrich',
    items: [
      { label: 'People', icon: Users, path: '/people' },
      { label: 'Companies', icon: Building2, path: '/companies' },
      { label: 'Lists', icon: List, path: '/lists' },
      { label: 'Data enrichment', icon: Database, path: '/data-enrichment' },
    ],
  },
  {
    label: 'Engage',
    items: [
      { label: 'Sequences', icon: GitBranch, path: '/sequences' },
      { label: 'Emails', icon: Mail, path: '/emails' },
      { label: 'Calls', icon: Phone, path: '/calls' },
      { label: 'Tasks', icon: CheckSquare, path: '/tasks' },
    ],
  },
  {
    label: 'Win deals',
    items: [
      { label: 'Meetings', icon: Calendar, path: '/meetings' },
      { label: 'Conversations', icon: MessageSquare, path: '/conversations' },
      { label: 'Deals', icon: Briefcase, path: '/deals' },
    ],
  },
  {
    label: 'Tools and automation',
    items: [
      { label: 'Workflows', icon: Workflow, path: '/workflows' },
      { label: 'Analytics', icon: BarChart2, path: '/analytics' },
    ],
  },
  {
    label: 'Inbound',
    items: [
      { label: 'Website visitors', icon: Globe, path: '/website-visitors', badge: 'New' },
      { label: 'Forms', icon: FileText, path: '/forms' },
    ],
  },
  {
    label: 'Saved records',
    items: [
      { label: 'People', icon: Users, path: '/saved-people' },
      { label: 'Companies', icon: Building2, path: '/saved-companies' },
    ],
  },
]

function NavSection({ section, location }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="mb-1">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
      >
        <span>{section.label}</span>
        {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
      </button>
      {open && (
        <div className="space-y-0.5 mt-0.5">
          {section.items.map(({ label, icon: Icon, path, badge }) => {
            const active = location.pathname === path
            return (
              <Link
                key={path}
                to={path}
                className={`flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors group ${
                  active
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon size={15} />
                  <span>{label}</span>
                </div>
                {badge && (
                  <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-medium">
                    {badge}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function Sidebar() {
  const location = useLocation()
  const { user, signout } = useAuth()
  const navigate = useNavigate()
  const [onboardingVisible, setOnboardingVisible] = useState(true)

  const handleSignout = () => {
    signout()
    navigate('/login')
  }

  return (
    <aside className="w-60 bg-gray-900 flex flex-col h-screen fixed left-0 top-0 border-r border-gray-800 z-30">
      {/* Logo */}
      <div className="px-3 pt-4 pb-2 border-b border-gray-800">
        <Link
          to="/"
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm font-medium transition-colors mb-1 ${
            location.pathname === '/' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <Star size={15} className="text-yellow-400" fill="currentColor" />
          <span>Home</span>
        </Link>
        <Link
          to="/ai-assistant"
          className={`flex items-center justify-between px-2 py-1.5 rounded-md text-sm font-medium transition-colors ${
            location.pathname === '/ai-assistant' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Sparkles size={15} className="text-blue-400" />
            <span>AI Assistant</span>
          </div>
          <span className="text-xs bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-medium">New</span>
        </Link>
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto space-y-2">
        {sections.map((section) => (
          <NavSection key={section.label} section={section} location={location} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-gray-800 px-2 py-3 space-y-1">
        {/* Upgrade button */}
        <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold text-sm py-1.5 rounded-md transition-colors">
          Upgrade
        </button>

        {/* Onboarding hub */}
        {onboardingVisible && (
          <div className="bg-gray-800 rounded-md px-3 py-2 mt-1">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-300 font-medium">Onboarding hub</span>
              <button onClick={() => setOnboardingVisible(false)} className="text-gray-500 hover:text-gray-300 text-xs">✕</button>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-1">
              <div className="bg-blue-500 h-1 rounded-full" style={{ width: '2%' }} />
            </div>
            <p className="text-xs text-gray-500 mt-1">2% Completed</p>
          </div>
        )}

        <Link
          to="/deliverability"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Zap size={15} />
          <span>Deliverability suite</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Settings size={15} />
          <span>Admin Settings</span>
        </Link>

        {/* User + signout */}
        <div className="flex items-center gap-2 px-2 py-1.5 mt-1">
          <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0">
            {user?.full_name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate">{user?.full_name}</p>
          </div>
          <button onClick={handleSignout} className="text-gray-500 hover:text-white transition-colors" title="Sign out">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
