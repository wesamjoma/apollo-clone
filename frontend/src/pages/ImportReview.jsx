import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Info, ChevronDown, Settings2, X, FileText, Trash2, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

// ─── Apollo field options ─────────────────────────────────────────────────────

const APOLLO_FIELDS = [
  '-- Do not import --',
  'contact first name',
  'contact last name',
  'contact title',
  'account name',
  'contact email',
  'corporate phone',
  'contact mobile phone',
  'contact place state',
  'contact linkedin url',
  'contact twitter url',
  'account website',
  'contact city',
  'contact country',
  'contact department',
]

const FIELD_AUTO_MAP = {
  'first name':          'contact first name',
  'last name':           'contact last name',
  'title':               'contact title',
  'company name':        'account name',
  'email':               'contact email',
  'phone':               'corporate phone',
  'stage':               'contact place state',
  'person linkedin url': 'contact linkedin url',
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ImportReview() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()

  if (!state?.headers || !state?.rows) {
    navigate('/import', { replace: true })
    return null
  }

  const { headers, rows, filename } = state

  const [mappings, setMappings] = useState(() =>
    Object.fromEntries(
      headers.map((h) => [h, FIELD_AUTO_MAP[h.toLowerCase().trim()] || '-- Do not import --'])
    )
  )
  const [settingsTab, setSettingsTab] = useState('settings')
  const [hideRecognised, setHideRecognised] = useState(false)
  const [importing, setImporting] = useState(false)

  const handleImport = () => {
    setImporting(true)
    const contacts = rows.map((row) => {
      const contact = {}
      headers.forEach((h, i) => {
        const apolloField = mappings[h]
        if (apolloField && apolloField !== '-- Do not import --') {
          contact[apolloField] = row[i]
        }
      })
      return {
        id: Math.random().toString(36).slice(2),
        firstName: contact['contact first name'] || '',
        lastName: contact['contact last name'] || '',
        title: contact['contact title'] || '',
        company: contact['account name'] || '',
        email: contact['contact email'] || '',
        phone: contact['corporate phone'] || '',
        stage: contact['contact place state'] || '',
        linkedin: contact['contact linkedin url'] || '',
        twitter: contact['contact twitter url'] || '',
        website: contact['account website'] || '',
        city: contact['contact city'] || '',
        country: contact['contact country'] || '',
        department: contact['contact department'] || '',
        mobile: contact['contact mobile phone'] || '',
      }
    })
    const uid = user?.id
    const peopleKey = `apollo_saved_people_${uid}`
    const historyKey = `apollo_import_history_${uid}`

    const existing = JSON.parse(localStorage.getItem(peopleKey) || '[]')
    localStorage.setItem(peopleKey, JSON.stringify([...existing, ...contacts]))

    const importRecord = {
      id: Math.random().toString(36).slice(2),
      type: 'contact',
      filename: filename || 'file.csv',
      createdAt: new Date().toISOString(),
      totalRecords: rows.length,
      skipped: 0,
      uploadedBy: user?.full_name || user?.email || 'Unknown',
    }
    const history = JSON.parse(localStorage.getItem(historyKey) || '[]')
    localStorage.setItem(historyKey, JSON.stringify([importRecord, ...history]))

    setTimeout(() => navigate('/saved-people'), 600)
  }

  const recognisedCount = headers.filter(
    (h) => !!FIELD_AUTO_MAP[h.toLowerCase().trim()]
  ).length

  const visibleHeaders = hideRecognised
    ? headers.filter((h) => !FIELD_AUTO_MAP[h.toLowerCase().trim()])
    : headers

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 shrink-0">
        <h1 className="text-base font-bold text-white">Import contacts</h1>
        <span className="text-xs text-gray-400">{rows.length} rows found</span>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

        {/* Column Mappings */}
        <div>
          <h2 className="text-sm font-semibold text-white mb-2">Column Mappings</h2>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            Each column below must be mapped to the related field in Apollo. When possible, we will automatically detect and map related fields for you. For any that we're unable to map, please select the Apollo field that most accurately describes the type of data you're importing. This will ensure the information in your records is updated accurately.
          </p>

          {/* Info notice */}
          <div className="flex items-start gap-2 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 mb-3 text-xs text-gray-400">
            <Info size={13} className="text-gray-500 shrink-0 mt-0.5" />
            <span>
              Don't see the field you want to map to in the drop-down menu? Create a custom field in Apollo{' '}
              <button className="text-blue-400 underline hover:text-blue-300 transition-colors">here</button>
            </span>
          </div>

          {/* Detection summary */}
          <div className="flex items-center gap-3 mb-3 text-xs">
            <span className="text-gray-400">{headers.length} columns detected</span>
            <span className="bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold text-[10px]">
              {recognisedCount} recognised
            </span>
            <button
              onClick={() => setHideRecognised((v) => !v)}
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              {hideRecognised ? 'Show' : 'Hide'} Recognised Columns
            </button>
          </div>

          {/* Mapping table */}
          <div className="overflow-x-auto border border-gray-700 rounded-lg">
            <table className="border-collapse" style={{ minWidth: `${visibleHeaders.length * 170}px` }}>
              {/* CSV column headers */}
              <thead>
                <tr className="bg-gray-800 border-b border-gray-700">
                  {visibleHeaders.map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2.5 text-left border-r border-gray-700 last:border-r-0 w-44"
                    >
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-200 truncate">{h}</span>
                        <Info size={11} className="text-gray-500 shrink-0" />
                      </div>
                    </th>
                  ))}
                </tr>

                {/* Field mapping dropdowns */}
                <tr className="bg-gray-900 border-b border-gray-700">
                  {visibleHeaders.map((h) => (
                    <td key={h} className="px-2 py-2 border-r border-gray-700 last:border-r-0">
                      <div className="relative flex items-center">
                        <select
                          value={mappings[h]}
                          onChange={(e) =>
                            setMappings((prev) => ({ ...prev, [h]: e.target.value }))
                          }
                          className="w-full appearance-none bg-gray-800 border border-gray-600 rounded px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-blue-500 pr-10 truncate"
                        >
                          {APOLLO_FIELDS.map((f) => (
                            <option key={f} value={f}>{f}</option>
                          ))}
                        </select>
                        <div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-0.5 pointer-events-none">
                          <Settings2 size={10} className="text-gray-500" />
                          <X size={10} className="text-gray-500" />
                        </div>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>

              {/* Data rows */}
              <tbody>
                {rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className="border-b border-gray-700/60 last:border-0 hover:bg-gray-800/30 transition-colors"
                  >
                    {visibleHeaders.map((h) => {
                      const ci = headers.indexOf(h)
                      return (
                        <td
                          key={h}
                          className="px-3 py-2 border-r border-gray-700 last:border-r-0 text-xs text-gray-400 max-w-[170px] truncate"
                          title={row[ci]}
                        >
                          {row[ci] || '—'}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Settings / Data enrichment ── */}
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <div className="flex border-b border-gray-700 bg-gray-900">
            {['Settings', 'Data enrichment'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSettingsTab(tab.toLowerCase())}
                className={`px-4 py-2.5 text-sm border-b-2 -mb-px transition-colors ${
                  settingsTab === tab.toLowerCase()
                    ? 'border-blue-500 text-white font-medium'
                    : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {settingsTab === 'settings' && (
            <div className="p-4 space-y-4 bg-gray-900">
              {/* Three dropdowns */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    label: 'Use stage from CSV',
                    options: ['Use stage from CSV', 'Ignore stage'],
                  },
                  {
                    label: 'If contacts already exist in Apollo:',
                    options: [
                      'Update the existing record with information from CSV',
                      'Do not update existing records',
                    ],
                  },
                  {
                    label: 'Auto-assign accounts?',
                    options: [
                      'Assign/create account based on Website/Email Domain in the CSV',
                      'Do not auto-assign accounts',
                    ],
                  },
                ].map(({ label, options }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-400 mb-1.5">{label}</p>
                    <div className="relative">
                      <select className="w-full appearance-none bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-gray-300 focus:outline-none focus:border-blue-500 pr-7">
                        {options.map((o) => <option key={o}>{o}</option>)}
                      </select>
                      <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Add to list */}
              <div>
                <p className="text-xs text-gray-400 mb-1.5">Add to a List?</p>
                <input
                  type="text"
                  placeholder="Enter or create lists..."
                  className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-xs text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {/* Enrichment info */}
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-3 text-xs text-gray-400">
                <div className="flex items-start gap-2 mb-2">
                  <Info size={13} className="text-gray-500 shrink-0 mt-0.5" />
                  <span className="font-medium text-gray-300">You can enrich your records two ways:</span>
                </div>
                <ul className="list-disc list-inside space-y-1.5 pl-1 text-gray-500 leading-relaxed">
                  <li>
                    Click on "Data Enrichment" tab above, select which fields (email and phone) you want to enrich for the contacts which are being imported.
                  </li>
                  <li>
                    Post uploading CSV, visit "Search page", Apply "Contact CSV Import"{' '}
                    <button className="text-blue-400 underline hover:text-blue-300 transition-colors">
                      filter for your CSV file
                    </button>
                    , select your records, and then click "Enrich".
                  </li>
                </ul>
              </div>
            </div>
          )}

          {settingsTab === 'data enrichment' && (
            <div className="p-6 flex items-center justify-center bg-gray-900">
              <p className="text-xs text-gray-500">Data enrichment options — coming soon</p>
            </div>
          )}
        </div>

      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-800 px-6 py-3 flex items-center justify-between shrink-0 bg-gray-900">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <FileText size={13} className="text-gray-500" />
          <span>{filename || 'file.csv'}</span>
          <button
            onClick={() => navigate('/import')}
            className="text-gray-600 hover:text-red-400 transition-colors ml-1"
          >
            <Trash2 size={12} />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/import')}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={importing}
            className="flex items-center gap-1.5 bg-yellow-400 hover:bg-yellow-300 disabled:opacity-70 text-gray-900 font-semibold text-sm px-4 py-1.5 rounded transition-colors"
          >
            {importing && <Loader2 size={13} className="animate-spin" />}
            {importing ? 'Importing…' : 'Import'}
          </button>
        </div>
      </div>

    </div>
  )
}
