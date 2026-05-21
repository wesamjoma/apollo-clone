import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getAccounts } from '../api/auth'
import {
  Search, ChevronDown, Upload, Plus, Filter, Phone,
  MoreHorizontal, ArrowUpDown, Settings2, Zap, Sparkles, Globe
} from 'lucide-react'

function avatarColor(name) {
  const colors = [
    'bg-blue-600', 'bg-purple-600', 'bg-green-600',
    'bg-pink-600', 'bg-orange-600', 'bg-teal-600',
  ]
  return colors[(name?.charCodeAt(0) || 0) % colors.length]
}

export default function SavedCompanies() {
  const { user } = useAuth()
  const [accounts, setAccounts] = useState([])
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(new Set())

  useEffect(() => {
    if (!user?.id) return
    getAccounts()
      .then((res) => setAccounts(res.data))
      .catch(() => setAccounts([]))
  }, [user?.id])

  const filtered = accounts.filter((a) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (
      a.name?.toLowerCase().includes(q) ||
      a.domain?.toLowerCase().includes(q) ||
      a.industry?.toLowerCase().includes(q) ||
      a.city?.toLowerCase().includes(q)
    )
  })

  const toggleAll = () =>
    setSelected(selected.size === filtered.length ? new Set() : new Set(filtered.map((a) => a.id)))

  const toggleOne = (id) =>
    setSelected((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Page header ── */}
      <div className="px-6 pt-4 pb-3 border-b border-gray-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold text-white">Companies</h1>
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
            Create company
          </button>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="px-6 py-2 border-b border-gray-800 flex items-center gap-2 shrink-0 overflow-x-auto">
        <button className="flex items-center gap-1.5 text-xs font-medium text-gray-200 bg-gray-700 border border-gray-600 px-3 py-1.5 rounded whitespace-nowrap">
          My saved companies
        </button>
        <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 px-2.5 py-1.5 rounded transition-colors whitespace-nowrap">
          <Filter size={12} />
          Show Filters
        </button>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies"
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
        {accounts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-8">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <Upload size={28} className="text-gray-600" />
            </div>
            <p className="text-white font-semibold mb-2">No saved companies yet</p>
            <p className="text-gray-500 text-sm mb-5">Import accounts to see them here.</p>
            <Link
              to="/import"
              className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-sm px-4 py-2 rounded transition-colors"
            >
              Import accounts
            </Link>
          </div>
        ) : (
          <table className="w-full border-collapse min-w-[900px]">
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
                {['Name', 'Industry', 'Employees', 'Location', 'Domain', 'Phone', 'Actions'].map((col) => (
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
              {filtered.map((a) => {
                const color = avatarColor(a.name)
                const isSelected = selected.has(a.id)
                const location = [a.city, a.country].filter(Boolean).join(', ')
                return (
                  <tr
                    key={a.id}
                    className={`border-b border-gray-700/50 hover:bg-gray-800/40 transition-colors ${isSelected ? 'bg-blue-900/10' : ''}`}
                  >
                    {/* Checkbox */}
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOne(a.id)}
                        className="w-3.5 h-3.5 rounded border border-gray-600 accent-blue-500 cursor-pointer"
                      />
                    </td>

                    {/* Name */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      <div className="flex items-center gap-2 min-w-[160px]">
                        <div className={`w-7 h-7 rounded ${color} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}>
                          {a.name?.[0]?.toUpperCase() || '?'}
                        </div>
                        <span className="text-xs text-blue-400 hover:underline cursor-pointer whitespace-nowrap">
                          {a.name || '—'}
                        </span>
                      </div>
                    </td>

                    {/* Industry */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 whitespace-nowrap max-w-[160px] truncate">
                      {a.industry || <span className="text-gray-600">—</span>}
                    </td>

                    {/* Employees */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 whitespace-nowrap">
                      {a.employee_count || <span className="text-gray-600">—</span>}
                    </td>

                    {/* Location */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 whitespace-nowrap">
                      {location || <span className="text-gray-600">—</span>}
                    </td>

                    {/* Domain */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      {a.domain ? (
                        <div className="flex items-center gap-1">
                          <Globe size={11} className="text-gray-500 shrink-0" />
                          <span className="text-xs text-blue-400 hover:underline cursor-pointer whitespace-nowrap truncate max-w-[140px]">
                            {a.domain}
                          </span>
                        </div>
                      ) : <span className="text-gray-600 text-xs">—</span>}
                    </td>

                    {/* Phone */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50 text-xs text-gray-300 whitespace-nowrap">
                      {a.phone ? (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-300">•</span>
                          <span>{a.phone}</span>
                        </div>
                      ) : (
                        <button className="flex items-center gap-1 text-[11px] text-gray-500 hover:text-gray-300 border border-gray-700 rounded px-2 py-0.5 whitespace-nowrap transition-colors">
                          <Phone size={10} />
                          Request phone
                        </button>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-3 py-2.5 border-r border-gray-700/50">
                      <div className="flex items-center gap-1.5">
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <Phone size={12} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <Zap size={12} />
                        </button>
                        <button className="p-1 text-gray-500 hover:text-white hover:bg-gray-700 rounded transition-colors">
                          <MoreHorizontal size={12} />
                        </button>
                      </div>
                    </td>

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
