import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Search, Rocket, User, Mail, Bell, Globe, MessageSquare,
  Zap, Users, CreditCard, Puzzle, Brain, FileText, Calendar,
  Share2, Activity, Database, Upload, Trash2, UserPlus, ChevronDown,
  ChevronUp, Edit2, Target, ExternalLink, X, AlertCircle, CheckCircle2
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { changeEmail } from '../api/auth'

// ─── Sidebar structure ────────────────────────────────────────────────────────

const PERSONAL = [
  { label: 'Profile',           icon: User,          key: 'profile' },
  { label: 'Mailboxes',         icon: Mail,          key: 'mailboxes' },
  { label: 'Notifications',     icon: Bell,          key: 'notifications' },
  { label: 'Chrome extension',  icon: Globe,         key: 'chrome-extension' },
  { label: 'Conversations',     icon: MessageSquare, key: 'conversations-personal' },
]

const WORKSPACE = [
  {
    label: 'Deliverability suite', icon: Zap, key: 'deliverability',
    children: ['Overview', 'Domains', 'Mailboxes'],
  },
  {
    label: 'Users and teams', icon: Users, key: 'users-teams',
    children: ['Users'],
  },
  {
    label: 'Billing and credits', icon: CreditCard, key: 'billing',
    children: [
      { label: 'Plan overview' },
      { label: 'Product Add-ons', badge: 'New' },
      { label: 'License settings' },
      { label: 'Credits & AI usage' },
      { label: 'AI run usage' },
    ],
  },
  {
    label: 'Integrations', icon: Puzzle, key: 'integrations',
    children: [
      { label: 'Connected Integrations' },
      { label: 'MCP' },
      { label: 'API Keys', external: true },
    ],
  },
  {
    label: 'Ideal customer profile', icon: Target, key: 'icp',
    children: ['Personas', 'Buying intent', 'Website visitors', 'Signals', 'Scoring'],
  },
  { label: 'AI context center', icon: Brain, key: 'ai-context' },
  {
    label: 'Rules of engagement', icon: FileText, key: 'rules',
    children: ['Prospecting config', 'Snippets'],
  },
  {
    label: 'Team email & sequences', icon: Mail, key: 'team-email',
    children: ['Tracking', 'Sequences'],
  },
  {
    label: 'Team conversations', icon: MessageSquare, key: 'team-conversations',
    children: ['Recording configuration', 'Team permissions', 'Trackers', 'Scorecards', 'Custom field prompts'],
  },
  { label: 'Team meetings', icon: Calendar, key: 'team-meetings' },
  { label: 'Team sharing & defaults', icon: Share2, key: 'team-sharing' },
  {
    label: 'System activity', icon: Activity, key: 'system-activity',
    children: ['Data requests', 'System activity log'],
  },
]

const DATA = [
  {
    label: 'Objects, fields, stages', icon: Database, key: 'objects',
    children: ['Contact fields & stages', 'Account fields & stages', 'Deal fields & stages'],
  },
  {
    label: 'Imports and exports', icon: Upload, key: 'imports',
    children: ['Contact Import', 'Account Import', 'Deals Import', 'CSV Exports', 'Enriched CSVs', 'CSV Export Settings'],
  },
  { label: 'Removal requests', icon: Trash2, key: 'removal' },
]

// ─── Settings sidebar sub-components ─────────────────────────────────────────

function SubItem({ parentKey, child, active, onSelect }) {
  const label = typeof child === 'string' ? child : child.label
  const badge = typeof child === 'object' ? child.badge : null
  const external = typeof child === 'object' ? child.external : false
  const key = `${parentKey}__${label}`
  return (
    <button
      onClick={() => onSelect(key)}
      className={`w-full flex items-center justify-between pl-7 pr-3 py-1.5 text-sm transition-colors rounded-md ${
        active === key ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white hover:bg-gray-800'
      }`}
    >
      <span>{label}</span>
      <div className="flex items-center gap-1">
        {badge && (
          <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded font-semibold">{badge}</span>
        )}
        {external && <ExternalLink size={11} className="text-gray-500" />}
      </div>
    </button>
  )
}

function SectionItem({ item, active, onSelect, open, onToggle }) {
  const isOpen = open[item.key]
  return (
    <div>
      <button
        onClick={() => item.children ? onToggle(item.key) : onSelect(item.key)}
        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors ${
          active === item.key ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <item.icon size={14} className="shrink-0" />
          <span className="truncate">{item.label}</span>
        </div>
        {item.children && (
          isOpen
            ? <ChevronUp size={12} className="text-gray-500 shrink-0" />
            : <ChevronDown size={12} className="text-gray-500 shrink-0" />
        )}
      </button>
      {item.children && isOpen && (
        <div className="mt-0.5 space-y-0.5">
          {item.children.map((child) => (
            <SubItem
              key={typeof child === 'string' ? child : child.label}
              parentKey={item.key}
              child={child}
              active={active}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Settings sidebar ─────────────────────────────────────────────────────────

function SettingsSidebar({ active, onSelect }) {
  const navigate = useNavigate()

  const allExpandableKeys = [...WORKSPACE, ...DATA]
    .filter((i) => i.children)
    .map((i) => i.key)
  const [open, setOpen] = useState(() => Object.fromEntries(allExpandableKeys.map((k) => [k, true])))

  const toggle = (key) => setOpen((p) => ({ ...p, [key]: !p[key] }))

  return (
    <aside className="w-48 bg-gray-900 border-r border-gray-800 flex flex-col h-full shrink-0">
      {/* Back */}
      <div className="px-3 py-3 border-b border-gray-800">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Settings
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2 border-b border-gray-800">
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search settings"
            className="w-full bg-gray-800 border border-gray-700 rounded pl-7 pr-2 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-3">
        <button
          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <Rocket size={14} className="shrink-0" />
          Get started
        </button>

        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
            Personal settings
          </p>
          <div className="space-y-0.5">
            {PERSONAL.map((item) => (
              <button
                key={item.key}
                onClick={() => onSelect(item.key)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  active === item.key ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <item.icon size={14} className="shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
            Workspace settings
          </p>
          <div className="space-y-0.5">
            {WORKSPACE.map((item) => <SectionItem key={item.key} item={item} active={active} onSelect={onSelect} open={open} onToggle={toggle} />)}
          </div>
        </div>

        <div>
          <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider px-3 mb-1">
            Data management
          </p>
          <div className="space-y-0.5">
            {DATA.map((item) => <SectionItem key={item.key} item={item} active={active} onSelect={onSelect} open={open} onToggle={toggle} />)}
          </div>
        </div>
      </nav>

      {/* Add Teammates */}
      <div className="border-t border-gray-800 p-3">
        <button className="w-full flex items-center justify-center gap-2 text-sm text-gray-300 bg-gray-800 hover:bg-gray-700 border border-gray-700 py-1.5 rounded-md transition-colors">
          <UserPlus size={14} />
          Add Teammates
        </button>
      </div>
    </aside>
  )
}

// ─── Imports content ─────────────────────────────────────────────────────────

const IMPORT_TABS = [
  'Contact Import',
  'Account Import',
  'Deals Import',
  'CSV Exports',
  'Enriched CSVs',
  'CSV Export Settings',
]

const PLACEHOLDER_ROWS = [
  { progress: 92, records: 120, dupes: 73 },
  { progress: 78, records: 48,  dupes: 13 },
  { progress: 88, records: 492, dupes: 121 },
  { progress: 68, records: 90,  dupes: 31 },
  { progress: 58, records: 59,  dupes: 29 },
]

function avatarInitials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0][0].toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function formatImportTime(isoString) {
  const d = new Date(isoString)
  const h = d.getHours() % 12 || 12
  const m = d.getMinutes().toString().padStart(2, '0')
  const ampm = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${h}:${m} ${ampm}`
}

function ImportsContent({ activeTab, onTabChange }) {
  const { user } = useAuth()
  const [importHistory, setImportHistory] = useState([])

  useEffect(() => {
    if (!user?.id) return
    const key = `apollo_import_history_${user.id}`
    const oldKey = 'apollo_import_history'
    // Migrate data saved before per-user scoping was added
    const legacy = localStorage.getItem(oldKey)
    if (legacy && !localStorage.getItem(key)) {
      localStorage.setItem(key, legacy)
      localStorage.removeItem(oldKey)
    }
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    setImportHistory(stored)
  }, [activeTab, user?.id])

  const contactImports = importHistory.filter((r) => r.type === 'contact')

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-gray-800 px-6 shrink-0 overflow-x-auto">
        {IMPORT_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(`imports__${tab}`)}
            className={`py-2.5 px-3 text-sm border-b-2 whitespace-nowrap transition-colors -mb-px ${
              activeTab === tab
                ? 'border-blue-500 text-white font-medium'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Contact Import tab content */}
      {activeTab === 'Contact Import' && (
        contactImports.length > 0 ? (
          /* ── Real import history table ── */
          <div className="flex-1 overflow-auto flex flex-col">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 bg-gray-900 border-b border-gray-800">
                <tr>
                  {['Name', 'Progress', 'Total Records', 'Skipped', 'Uploaded By'].map((h) => (
                    <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-400">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contactImports.map((row) => {
                  const initials = avatarInitials(row.uploadedBy)
                  return (
                    <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-900/50 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4">
                        <p className="text-sm text-white font-medium">{row.filename}</p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Created on {formatImportTime(row.createdAt)}
                        </p>
                      </td>

                      {/* Progress */}
                      <td className="px-6 py-4">
                        <div className="w-48 h-2.5 bg-gray-700 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full w-full" />
                        </div>
                      </td>

                      {/* Total Records */}
                      <td className="px-6 py-4 text-sm text-gray-300">{row.totalRecords}</td>

                      {/* Skipped */}
                      <td className="px-6 py-4 text-sm text-gray-300">{row.skipped}</td>

                      {/* Uploaded By */}
                      <td className="px-6 py-4">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                          {initials}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="border-t border-gray-800 px-6 py-3 flex items-center justify-end gap-3 text-xs text-gray-400 shrink-0 mt-auto">
              <span>1 - {contactImports.length} of {contactImports.length}</span>
              <button className="p-1 text-gray-600 cursor-default" disabled>&#8249;</button>
              <span className="w-6 h-6 flex items-center justify-center bg-gray-800 rounded text-white">1</span>
              <button className="p-1 text-gray-600 cursor-default" disabled>&#8250;</button>
            </div>
          </div>
        ) : (
          /* ── Empty state with illustration ── */
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center px-6 py-10">
            <div className="bg-white rounded-lg w-full max-w-xl mb-8 overflow-hidden shadow-md">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    {['Name', 'Progress', 'Total Records', 'Duplicates', 'Uploaded By'].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-blue-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {PLACEHOLDER_ROWS.map((row, i) => (
                    <tr key={i} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3"><div className="h-2.5 bg-gray-200 rounded w-24" /></td>
                      <td className="px-4 py-3">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${row.progress}%` }} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.records}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{row.dupes}</td>
                      <td className="px-4 py-3"><div className="w-6 h-6 bg-gray-200 rounded-full" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">Contact Import</h3>
            <p className="text-gray-400 text-sm text-center max-w-xs mb-6 leading-relaxed">
              Once a user on your team imports a CSV of Contacts, it will be listed here with its record count, progress, and other details.
            </p>
            <Link
              to="/import"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-sm px-5 py-2.5 rounded transition-colors"
            >
              Import Contacts
            </Link>
          </div>
        )
      )}

      {/* Other tabs placeholder */}
      {activeTab !== 'Contact Import' && (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500 text-sm">{activeTab} — Coming soon</p>
        </div>
      )}
    </div>
  )
}

// ─── Profile content ──────────────────────────────────────────────────────────

const PROFILE_TABS = ['General', 'Multi-factor authentication', 'Custom fields', 'Email settings', 'Conversations']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ChangeEmailModal({ onClose, currentEmail }) {
  const { signin } = useAuth()
  const [newEmail, setNewEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const validate = () => {
    if (!newEmail.trim()) return 'New email is required'
    if (!EMAIL_RE.test(newEmail)) return 'Enter a valid email address'
    if (newEmail.toLowerCase() === currentEmail?.toLowerCase())
      return 'New email must be different from your current email'
    if (!password) return 'Current password is required'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) { setError(validationError); return }

    setError('')
    setLoading(true)
    try {
      const res = await changeEmail({ new_email: newEmail, current_password: password })
      signin(res.data.access_token, res.data.user)
      setSuccess(true)
      setTimeout(onClose, 1500)
    } catch (err) {
      const status = err.response?.status
      const detail = err.response?.data?.detail

      if (!err.response) {
        setError('Cannot reach the server. Make sure the backend is running.')
      } else if (status === 401) {
        setError('Your session has expired. Please log in again.')
      } else if (status === 422) {
        // FastAPI validation error — detail is an array
        const msg = Array.isArray(detail) ? detail[0]?.msg : detail
        setError(msg || 'Invalid input. Check your email format.')
      } else if (detail === 'Incorrect password') {
        setError('The password you entered is incorrect.')
      } else if (detail === 'Email already in use') {
        setError('That email is already associated with another account.')
      } else if (detail === 'New email must differ from current email') {
        setError('New email must be different from your current email.')
      } else {
        setError(detail || 'Something went wrong. Please try again.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={!loading ? onClose : undefined} />
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-[420px] p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-semibold text-white">Change email</h2>
          <button onClick={onClose} disabled={loading} className="text-gray-400 hover:text-white transition-colors disabled:opacity-50">
            <X size={18} />
          </button>
        </div>

        {success ? (
          <div className="flex items-center gap-2.5 text-green-400 py-4">
            <CheckCircle2 size={18} />
            <span className="text-sm font-medium">Email updated successfully!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm text-gray-300 mb-1.5">
                New email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                autoFocus
                value={newEmail}
                onChange={(e) => { setNewEmail(e.target.value); setError('') }}
                disabled={loading}
                className="w-full bg-gray-900 border border-gray-600 rounded px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-60"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm text-gray-300 mb-1.5">
                Current Apollo password <span className="text-red-400">*</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError('') }}
                disabled={loading}
                className={`w-full bg-gray-900 border rounded px-3 py-2.5 text-sm text-white focus:outline-none transition-colors disabled:opacity-60 ${
                  error && (error.toLowerCase().includes('password') || error.toLowerCase().includes('session'))
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-gray-600 focus:border-blue-500'
                }`}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-red-400 text-xs mb-4 bg-red-950/40 border border-red-800/50 rounded px-3 py-2">
                <AlertCircle size={13} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="bg-yellow-400 hover:bg-yellow-300 disabled:opacity-60 disabled:cursor-not-allowed text-gray-900 font-semibold text-sm px-4 py-2 rounded transition-colors"
            >
              {loading ? 'Saving…' : 'Change email'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

function ProfileContent({ user }) {
  const [activeTab, setActiveTab] = useState('General')
  const nameParts = (user?.full_name || '').split(' ')
  const [firstName, setFirstName] = useState(nameParts[0] || '')
  const [lastName, setLastName] = useState(nameParts.slice(1).join(' ') || '')
  const [title, setTitle] = useState('')
  const [changeEmailOpen, setChangeEmailOpen] = useState(false)

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
        <h1 className="text-xl font-bold text-white">Profile</h1>
        <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-sm px-4 py-1.5 rounded transition-colors">
          Save
        </button>
      </div>

      <div className="flex border-b border-gray-800 px-6 shrink-0 overflow-x-auto">
        {PROFILE_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2.5 px-3 text-sm border-b-2 whitespace-nowrap transition-colors -mb-px ${
              activeTab === tab
                ? 'border-blue-500 text-white font-medium'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

        {/* Account Info */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Account Info</h2>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">First name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Last name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-1.5">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-gray-400 mb-1.5">Login email</label>
            <div className="flex gap-2">
              <input
                value={user?.email || ''}
                readOnly
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-400 cursor-default focus:outline-none"
              />
              <button
                onClick={() => setChangeEmailOpen(true)}
                className="flex items-center gap-1.5 text-sm text-gray-300 bg-gray-800 border border-gray-600 px-3 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap"
              >
                <Edit2 size={13} />
                Edit
              </button>
            </div>
          </div>
          {changeEmailOpen && <ChangeEmailModal onClose={() => setChangeEmailOpen(false)} currentEmail={user?.email} />}

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Password</label>
            <div className="flex gap-2">
              <input
                type="text"
                value="••••••••••"
                readOnly
                className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-400 tracking-widest cursor-default focus:outline-none"
              />
              <button className="flex items-center gap-1.5 text-sm text-gray-300 bg-gray-800 border border-gray-600 px-3 py-2 rounded hover:bg-gray-700 transition-colors whitespace-nowrap">
                <Edit2 size={13} />
                Edit
              </button>
            </div>
          </div>
        </section>

        {/* CRM connection */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-white mb-4">CRM connection</h2>
          <div className="flex items-center gap-5">
            <div className="grid grid-cols-2 gap-2">
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold">+</div>
              <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center text-white text-xs font-bold">HS</div>
              <div className="w-14 h-14 bg-green-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">PD</div>
              <div className="w-14 h-14 bg-sky-400 rounded-xl flex items-center justify-center text-white text-xs font-bold">SF</div>
            </div>
            <p className="text-sm text-gray-400">
              Your team has not connected a{' '}
              <button className="text-blue-400 hover:text-blue-300 underline transition-colors">CRM</button>
            </p>
          </div>
        </section>

        {/* Restrictions */}
        <section className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Restrictions</h2>
          <label className="block text-xs text-gray-400 mb-1.5">Credit Limit</label>
          <input
            type="number"
            className="w-48 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <p className="text-xs text-gray-500 mt-1.5">Leave this field blank if no limit is required</p>
        </section>

      </div>
    </div>
  )
}

// ─── Settings page ────────────────────────────────────────────────────────────

export default function Settings() {
  const { user } = useAuth()
  const [activeSection, setActiveSection] = useState('profile')
  const [banner, setBanner] = useState(true)

  return (
    <div className="flex flex-col h-screen bg-gray-950 overflow-hidden">
      {banner && (
        <div className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-4 py-2 shrink-0">
          <div className="flex-1 flex items-center justify-center gap-3 text-xs text-gray-300">
            <span>LIVE Webinar May 21: Turn Real-Time Website Traffic into Pipeline</span>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-3 py-1 rounded text-xs transition-colors">
              Register Now
            </button>
          </div>
          <button onClick={() => setBanner(false)} className="text-gray-500 hover:text-gray-300 transition-colors shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <SettingsSidebar active={activeSection} onSelect={setActiveSection} />
        <main className="flex-1 overflow-hidden flex flex-col bg-gray-950">
          {activeSection === 'profile' && <ProfileContent user={user} />}
          {activeSection.startsWith('imports__') && (
            <ImportsContent
              activeTab={activeSection.replace('imports__', '')}
              onTabChange={setActiveSection}
            />
          )}
          {activeSection !== 'profile' && !activeSection.startsWith('imports__') && (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-sm">Coming soon</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
