import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Search, ChevronDown, Upload, Plus, Filter, Phone, Mail,
  MoreHorizontal, Linkedin, ArrowUpDown, Settings2, Zap,
  Sparkles, X, MapPin
} from 'lucide-react'

const STAGE_COLORS = {
  cold:        'bg-gray-600 text-gray-200',
  nurture:     'bg-blue-700 text-blue-100',
  'meeting set': 'bg-purple-700 text-purple-100',
  unresponsive:'bg-orange-700 text-orange-100',
}

function stageBadge(stage) {
  if (!stage) return null
  const key = stage.toLowerCase()
  const cls = STAGE_COLORS[key] || 'bg-gray-700 text-gray-300'
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold ${cls}`}>
      {stage}
    </span>
  )
}

function initials(first, last) {
  return `${first?.[0] || ''}${last?.[0] || ''}`.toUpperCase() || '?'
}

function avatarColor(name) {
  const colors = [
    'bg-blue-600', 'bg-purple-600', 'bg-green-600',
    'bg-pink-600', 'bg-yellow-600', 'bg-teal-600',
  ]
  const idx = (name?.charCodeAt(0) || 0) % colors.length
  return colors[idx]
}

export default function SavedPeople() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())

  useEffect(() => {
    if (!user?.id) return
    const key = `apollo_saved_people_${user.id}`
    const oldKey = 'apollo_saved_people'
    // Migrate data saved before per-user scoping was added
    const legacy = localStorage.getItem(oldKey)
    if (legacy && !localStorage.getItem(key)) {
      localStorage.setItem(key, legacy)
      localStorage.removeItem(oldKey)
    }
    const stored = JSON.parse(localStorage.getItem(key) || '[]')
    setContacts(stored)
  }, [user?.id])

  const filtered = contacts.filter((c) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.company?.toLowerCase().includes(q) ||
      c.title?.toLowerCase().includes(q)
    )
  })

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(filtered.map((c) => c.id)))
    }
  }

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Page header ── */}
      <div className="px-6 pt-4 pb-3 border-b border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-white">People</h1>
          <span className="text-xs text-gray-500">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/import"
            className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded transition-colors"
          >
            <Upload size={13} />
            Import
          </Link>
          <button className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-xs px-3 py-1.5 rounded transition-colors">
            <Plus size={13} />
            Create person
          </button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="px-6 py-2 border-b border-gray-800 flex items-center gap-2 shrink-0 overflow-x-auto">
        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-200 bg-gray-700 border border-gray-600 px-3 py-1.5 rounded transition-colors whitespace-nowrap">
          My saved people
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap">
          <Filter size={12} />
          Show Filters
          {contacts.length > 0 && (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">1</span>
          )}
        </button>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search people"
            className="w-44 bg-gray-800 border border-gray-700 rounded pl-7 pr-3 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          <button className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap">
            <Sparkles size={12} className="text-blue-400" />
            Research with AI
            <ChevronDown size={11} />
          </button>
          <button className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap">
            <Zap size={12} />
            Create workflow
            <ChevronDown size={11} />
          </button>
          <button className="text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap">
            Save as new view
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors whitespace-nowrap">
            <ArrowUpDown size={12} />
            Sort
            <ChevronDown size={11} />
          </button>
          <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1.5 rounded transition-colors whitespace-nowrap">
            <Settings2 size={12} />
            View options
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="flex-1 overflow-auto">
        {contacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Upload size={28} className="text-gray-600" />
            </div>
            <p className="text-white font-semibold mb-2">No saved people yet</p>
            <p className="text-gray-500 text-sm mb-5">Import contacts to see them here.</p>
            <Link
              to="/import"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-sm px-4 py-2 rounded transition-colors"
            >
              Import contacts
            </Link>
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[1100px]">
            <thead className="sticky top-0 z-10">
              <tr className="bg-gray-800 border-b border-gray-700 text-left">
                <th className="w-8 px-3 py-2.5">
                  <input
                    type="checkbox"
                    checked={selected.size === filtered.length && filtered.length > 0}
                    onChange={toggleAll}
                    className="w-3.5 h-3.5 rounded border border-gray-600 accent-blue-500 cursor-pointer"
                  />
                </th>
                {[
                  'Name', 'Stage', 'Last activity date', 'Recommendations',
                  'Actions', 'Quality Contact', 'Company · Quality Account',
                  'Sequences', 'Job title', 'Company', 'Emails',
                  'Phone numbers', 'Location',
                ].map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2.5 text-[11px] font-semibold text-gray-400 whitespace-nowrap border-r border-gray-700/50 last:border-r-0"
                  >
                    {col}
                  </th>
                ))}
                <th className="px-3 py-2.5 text-[11px] text-blue-400 font-medium whitespace-nowrap cursor-pointer hover:text-blue-300">
                  + Add column
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const fullName = `${c.firstName} ${c.lastName}`.trim()
                const color = avatarColor(c.firstName)
                const isSelected = selected.has(c.id)
                const location = [c.city, c.country].filter(Boolean).join(', ')

                return (
                  <tr
                    key={c.id}
                    className={`border-b border-gray-700/50 hover:bg-gray-800/40 transition-colors ${
                      isSelected ? 'bg-blue-900/10' : ''
                    }`}
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(c.id)}
                        className="w-3.5 h-3.5 rounded border border-gray-600 accent-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      <div className="flex items-center gap-2 min-w-[140px]">
                        <div className={`w-7 h-7 rounded-full ${color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                          {initials(c.firstName, c.lastName)}
                        </div>
                        <span className="text-xs text-blue-400 hover:underline cursor-pointer whitespace-nowrap">
                          {fullName}
                        </span>
                      </div>
                    </td>

                    {/* Stage */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 whitespace-nowrap">
                      {stageBadge(c.stage) || <span className="text-gray-600 text-xs">—</span>}
                    </td>

                    {/* Last activity date */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-600">—</td>

                    {/* Recommendations */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-600">—</td>

                    {/* Actions */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <Phone size={12} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <Mail size={12} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <Zap size={12} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </td>

                    {/* Quality Contact */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-600">—</td>

                    {/* Company · Quality Account */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      {c.company
                        ? <span className="text-xs text-blue-400 hover:underline cursor-pointer whitespace-nowrap">{c.company}</span>
                        : <span className="text-gray-600 text-xs">—</span>
                      }
                    </td>

                    {/* Sequences */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-600">—</td>

                    {/* Job title */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 max-w-[160px] truncate whitespace-nowrap">
                      {c.title || <span className="text-gray-600">—</span>}
                    </td>

                    {/* Company (with dot icon) */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      {c.company ? (
                        <div className="flex items-center gap-1.5">
                          <div className="w-4 h-4 rounded-sm bg-blue-600/30 flex items-center justify-center shrink-0">
                            <span className="text-[8px] font-bold text-blue-300">{c.company[0]}</span>
                          </div>
                          <span className="text-xs text-gray-300 whitespace-nowrap">{c.company}</span>
                        </div>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>

                    {/* Emails */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      {c.email
                        ? (
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-gray-300 whitespace-nowrap">•</span>
                            <span className="text-xs text-gray-300 whitespace-nowrap truncate max-w-[160px]">{c.email}</span>
                          </div>
                        )
                        : <span className="text-gray-600 text-xs">—</span>
                      }
                    </td>

                    {/* Phone numbers */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      {c.phone ? (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-gray-300 whitespace-nowrap">•</span>
                          <span className="text-xs text-gray-300 whitespace-nowrap">{c.phone}</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-2 py-0.5 whitespace-nowrap transition-colors">
                          <Phone size={10} />
                          Request phone number
                        </button>
                      )}
                    </td>

                    {/* Location */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 whitespace-nowrap">
                      {location || <span className="text-gray-600">—</span>}
                    </td>

                    {/* Add column spacer */}
                    <td />
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
