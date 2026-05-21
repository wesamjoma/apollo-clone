import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Users, Building2, ArrowUp, Download, Info, ChevronDown, Link, ExternalLink
} from 'lucide-react'

// ─── CSV parser ───────────────────────────────────────────────────────────────

function parseCSVLine(line) {
  const result = []
  let current = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '"') {
      inQuotes = !inQuotes
    } else if (line[i] === ',' && !inQuotes) {
      result.push(current.trim())
      current = ''
    } else {
      current += line[i]
    }
  }
  result.push(current.trim())
  return result
}

function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/)
  const headers = parseCSVLine(lines[0])
  const rows = lines.slice(1).filter(Boolean).map(parseCSVLine)
  return { headers, rows }
}

// ─── CSV templates ────────────────────────────────────────────────────────────

const ACCOUNTS_CSV = `Account Name,Account Stage,Account Website\nGoogle,Cold,www.google.com\nSPI Technologies Inc,Current Client,www.domain.com`

const CONTACTS_CSV = `First Name,Last Name,Title,Company Name,Email,Phone,Stage,Person Linkedin Url\nNazma,Qurban,Head Of Sales,Cognism,nazma@cognism.com,+44 20 3858 0822,Cold,http://www.linkedin.com/in/nazmaqurban\nSudeep,Goswami,"Vice President, Sales",Tempo Automation,sgoswami@tempoautomation.com,650-417-5439,Nurture,http://www.linkedin.com/in/sudeepgoswami\nBranden,Baldwin,Sales and Marketing Operations Manager,Degreed,branden@degreed.com,801-425-1346,Meeting Set,http://www.linkedin.com/in/brandenbaldwin\nOri,Yankelev,Vice President Sales,OwnBackup,ori@ownbackup.com,(646) 503-5100,Unresponsive,http://www.linkedin.com/in/oriyankelev`

const downloadCSV = (content, filename) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  'Can I filter my uploaded CSV in the searcher?',
  'How do I upload my CSV to Apollo to find relevant contacts with minimal manual work?',
  'How do I map custom fields with CSV data?',
  'Can I enrich all the contacts/companies of a CSV after I upload it? How can I upload and enrich a CSV file?',
  'How do I properly format CSV files for import?',
  'Can I import multiple CSV rows?',
  'How do I convert a file to CSV format in Excel/Numbers on Mac and Windows?',
]

const LEARN_MORE = [
  { label: 'Upload a CSV of Contacts to Apollo',   external: false },
  { label: 'Upload a CSV of Accounts to Apollo',   external: false },
  { label: 'Improve your data with data enrichment', external: false },
  { label: 'View more at our help center',          external: true  },
]

function FaqItem({ question }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-gray-700 last:border-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-3.5 text-left text-sm text-gray-200 hover:text-white transition-colors gap-3"
      >
        <span>{question}</span>
        <ChevronDown
          size={15}
          className={`shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="text-xs text-gray-400 pb-3 leading-relaxed">
          No content available yet.
        </p>
      )}
    </div>
  )
}

// ─── Import card ──────────────────────────────────────────────────────────────

function ImportCard({ type, onDownload }) {
  const isContacts = type === 'contacts'
  const title = isContacts ? 'Import contacts' : 'Import accounts'
  const fieldNote = isContacts
    ? 'Company Name, Company Website, LinkedIn URL, and/or Contact Email'
    : 'Company Name and/or Company Website'
  const dataType = isContacts ? 'contacts' : 'accounts'

  const fileInputRef = useRef(null)
  const navigate = useNavigate()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const { headers, rows } = parseCSV(ev.target.result)
      navigate('/import/review', {
        state: { headers, rows, filename: file.name, importType: type },
      })
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  return (
    <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl p-6 flex flex-col">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
            {isContacts
              ? <Users size={28} className="text-gray-900" />
              : <Building2 size={28} className="text-gray-900" />
            }
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-gray-800">
            <ArrowUp size={12} className="text-white" />
          </div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base text-center mb-2">{title}</h3>
      <p className="text-gray-300 text-sm text-center mb-4">
        You can import up to 100,000 rows at a time.
      </p>

      {/* Info box */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 mb-4 text-xs text-gray-400 leading-relaxed space-y-2">
        <p>
          <Info size={12} className="inline mr-1.5 text-gray-500 shrink-0" />
          <span>
            For accurate mapping, please include at least one of these fields:{' '}
            <span className="font-semibold text-gray-300">{fieldNote}</span>.{' '}
            For more information, please visit our{' '}
            <span className="text-blue-400 underline cursor-pointer hover:text-blue-300">help center</span>.
          </span>
        </p>
        <p>
          By clicking "Select CSV File" below, I acknowledge that business {dataType} data submitted from my CSV file to Apollo may be used to provide and improve Apollo's services as further described in our{' '}
          <span className="text-blue-400 underline cursor-pointer hover:text-blue-300">Terms of Service</span>.{' '}
          <span className="text-blue-400 underline cursor-pointer hover:text-blue-300">Learn more</span> about data sharing.
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* CSV button */}
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`w-full py-2.5 rounded font-semibold text-sm transition-colors mb-4 ${
          isContacts
            ? 'bg-yellow-400 hover:bg-yellow-300 text-gray-900'
            : 'bg-gray-700 hover:bg-gray-600 border border-gray-600 text-gray-200'
        }`}
      >
        Select CSV File
      </button>

      {/* Download template */}
      <button
        onClick={onDownload}
        className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <Download size={14} />
        Download sample template
      </button>
    </div>
  )
}

// ─── Import page ──────────────────────────────────────────────────────────────

export default function Import() {
  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Import cards */}
      <div className="flex gap-5 mb-6">
        <ImportCard
          type="contacts"
          onDownload={() => downloadCSV(CONTACTS_CSV, 'sample_csv_contacts.csv')}
        />
        <ImportCard
          type="accounts"
          onDownload={() => downloadCSV(ACCOUNTS_CSV, 'sample_csv_accounts.csv')}
        />
      </div>

      {/* Bottom two-column section */}
      <div className="flex gap-5">

        {/* FAQ */}
        <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4">
          <h3 className="text-white font-semibold text-sm mb-3">Frequently asked questions</h3>
          {FAQ_ITEMS.map((q) => <FaqItem key={q} question={q} />)}
        </div>

        {/* Learn more */}
        <div className="w-56 shrink-0 bg-gray-800 border border-gray-700 rounded-xl px-5 py-4">
          <h3 className="text-white font-semibold text-sm mb-4">Learn more</h3>
          <div className="space-y-3">
            {LEARN_MORE.map(({ label, external }) => (
              <button
                key={label}
                className="flex items-start gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors text-left"
              >
                {external
                  ? <ExternalLink size={13} className="shrink-0 mt-0.5" />
                  : <Link size={13} className="shrink-0 mt-0.5" />
                }
                <span className="underline">{label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
