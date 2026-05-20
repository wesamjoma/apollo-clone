import { useState, useEffect, useRef } from 'react'
import {
  Search, ChevronDown, Lock, Sparkles, SlidersHorizontal,
  ArrowUpDown, Settings2, Upload, X, Users, Building2,
  MapPin, Users2, Factory, TrendingUp, BarChart3, Cpu,
  DollarSign, Briefcase, Bell, Zap, Brain, List, Filter,
  Star, Globe, Settings, ArrowDownUp
} from 'lucide-react'

// ─── Tour ─────────────────────────────────────────────────────────────────────

const TOUR_KEY = 'apollo_companies_tour_done'

const tourSteps = [
  {
    title: 'Apply filters',
    body: 'Use 40+ Smart Filters to build a targeted list of the best companies.',
    target: 'filters',
  },
  {
    title: 'Saved Accounts',
    body: "Use the Saved tab to take actions on accounts that you've already saved, and the Net New tab to find companies that you have not added yet.",
    target: 'tabs',
  },
  {
    title: 'Import Companies',
    body: 'Add or import companies and accounts to prevent yourself from prospecting your existing customers. We also have CRM Integrations to help with this.',
    target: 'import',
    richBody: true,
  },
]

function TooltipCard({ step, stepIndex, total, onNext, onPrev, onSkip }) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-2xl w-72 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-900 bg-yellow-400 px-2 py-0.5 rounded-full">
          <Star size={10} fill="currentColor" />
          Company Finder Views
        </span>
        <button onClick={onSkip} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          Skip tour
        </button>
      </div>
      <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
      {step.richBody ? (
        <p className="text-gray-400 text-xs leading-relaxed">
          Add or import companies and accounts to prevent yourself from prospecting your existing customers. We also have{' '}
          <span className="text-blue-400 font-medium">CRM Integrations</span> to help with this.
        </p>
      ) : (
        <p className="text-gray-400 text-xs leading-relaxed">{step.body}</p>
      )}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === stepIndex - 1 ? 'w-4 h-1.5 bg-yellow-400' : 'w-1.5 h-1.5 bg-gray-600'
              }`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          {stepIndex > 1 && (
            <button onClick={onPrev} className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1">
              Previous
            </button>
          )}
          <button
            onClick={onNext}
            className="text-xs font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-3 py-1 rounded transition-colors"
          >
            {stepIndex === total ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Accordion content: Lists ─────────────────────────────────────────────────

function ListsContent() {
  const [advancedOpen, setAdvancedOpen] = useState(false)

  return (
    <div className="pb-3 pt-1">
      <div className="px-3 space-y-2">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <Settings size={10} />
            Include lists
          </span>
          <span className="flex items-center gap-1 text-[10px] text-gray-500">
            <ArrowDownUp size={10} />
            Most Recent
          </span>
        </div>

        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Select lists...</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          Advanced settings
          <ChevronDown size={11} className={`transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} />
        </button>

        <div className={`grid transition-all duration-300 ease-in-out ${advancedOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden space-y-2">
            <div className="pt-1">
              <p className="text-[10px] text-gray-500 mb-1">Include ALL</p>
              <div className="relative">
                <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                  <option value="">Include ALL lists...</option>
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-1">Exclude</p>
              <div className="relative">
                <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                  <option value="">Exclude lists...</option>
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Accordion content: Company ───────────────────────────────────────────────

function CompanyContent() {
  const [advOpen, setAdvOpen] = useState(false)

  return (
    <div className="px-3 pb-3 pt-1 space-y-2">
      <div>
        <p className="text-[10px] text-gray-500 mb-1">Include</p>
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Search for a company name or domain</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div>
        <p className="text-[10px] text-gray-500 mb-1">Exclude</p>
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Enter companies to exclude</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <button
        onClick={() => setAdvOpen(!advOpen)}
        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
      >
        Advanced settings
        <ChevronDown size={11} className={`transition-transform duration-200 ${advOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${advOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden pt-1 space-y-1">
          {['Is known', 'Is unknown'].map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 border border-gray-700 rounded px-3 py-2 cursor-pointer hover:border-gray-500 transition-colors">
              <input type="radio" name="company_known" className="w-3.5 h-3.5 accent-blue-500 shrink-0 cursor-pointer" />
              <span className="text-xs text-gray-300">{opt}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Accordion content: # Employees ──────────────────────────────────────────

function EmployeesContent() {
  const ranges = ['1-10', '11-20', '21-50', '51-100', '101-200', '201-500', '501-1000', '1001-5000', '5001-10000', '10001+']
  const [selected, setSelected] = useState([])

  const toggle = (r) => setSelected((p) => p.includes(r) ? p.filter((x) => x !== r) : [...p, r])

  return (
    <div className="px-3 pb-3 pt-1">
      <div className="flex flex-wrap gap-1.5">
        {ranges.map((r) => (
          <button
            key={r}
            onClick={() => toggle(r)}
            className={`text-xs px-2.5 py-1 rounded border transition-colors ${
              selected.includes(r)
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
            }`}
          >
            {r}
          </button>
        ))}
      </div>
      {selected.length > 0 && (
        <button
          onClick={() => setSelected([])}
          className="mt-2 text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          Clear
        </button>
      )}
    </div>
  )
}

// ─── Accordion content: Account Location ─────────────────────────────────────

function AccountLocationContent() {
  return (
    <div className="px-3 pb-3 pt-1 space-y-2">
      <div>
        <p className="text-[10px] text-gray-500 mb-1">Include</p>
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Search locations...</option>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Australia</option>
            <option>Germany</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
      <div>
        <p className="text-[10px] text-gray-500 mb-1">Exclude</p>
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Exclude locations...</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}

// ─── Upgrade modal ───────────────────────────────────────────────────────────

function UpgradeModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-800 rounded-xl w-96 overflow-hidden shadow-2xl border border-gray-700">
        <button onClick={onClose} className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white transition-colors">
          <X size={18} />
        </button>
        <div className="bg-[#1a2744] h-52 flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center w-48 h-36">
            <div className="absolute left-4 top-2 w-11 h-11 bg-gray-500/40 rounded-full flex items-center justify-center border border-gray-400/20">
              <Building2 size={20} className="text-gray-300" />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-2 flex flex-col items-center">
              <div className="w-24 h-9 bg-[#c8aa82]" style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%, 22% 100%)' }} />
              <div className="w-12 h-16 bg-[#c8aa82]" style={{ clipPath: 'polygon(0 0, 100% 0, 62% 100%, 38% 100%)' }} />
            </div>
            <div className="absolute right-2 top-6 w-11 h-11 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <TrendingUp size={20} className="text-blue-300" />
            </div>
          </div>
        </div>
        <div className="px-6 py-5">
          <h3 className="text-white font-semibold text-base mb-2">
            Advanced filters aren't included in your plan
          </h3>
          <p className="text-gray-400 text-sm mb-5">
            Upgrade now to unlock{' '}
            <span className="text-white font-medium">65+ filters</span> for smarter targeting.
          </p>
          <div className="flex justify-end">
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold text-sm px-4 py-2 rounded transition-colors">
              View pricing plans
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Filter items ─────────────────────────────────────────────────────────────

const FILTER_ITEMS = [
  { key: 'lists',            label: 'Lists',              icon: List,       content: 'lists' },
  { key: 'company',          label: 'Company',            icon: Building2,  content: 'company' },
  { key: 'lookalikes',       label: 'Lookalikes',         icon: Users2,     locked: true },
  { key: 'account_location', label: 'Account Location',   icon: MapPin,     content: 'account_location' },
  { key: 'employees',        label: '# Employees',        icon: Users2,     content: 'employees' },
  { key: 'industry',         label: 'Industry & Keywords',icon: Factory },
  { key: 'market_segments',  label: 'Market Segments',    icon: TrendingUp },
  { key: 'sic_naics',        label: 'SIC and NAICS',      icon: BarChart3 },
  { key: 'ai_filters',       label: 'AI Filters',         icon: Brain },
  { key: 'buying_intent',    label: 'Buying Intent',      icon: Zap },
  { key: 'technologies',     label: 'Technologies',       icon: Cpu,        locked: true },
  { key: 'revenue',          label: 'Revenue',            icon: DollarSign, locked: true },
  { key: 'funding',          label: 'Funding',            icon: TrendingUp, locked: true },
  { key: 'job_postings',     label: 'Job Postings',       icon: Briefcase,  locked: true },
  { key: 'signals',          label: 'Signals',            icon: Bell },
]

function AccordionItem({ item, open, onToggle, onUpgrade }) {
  const { label, icon: Icon, locked, badge, content } = item
  return (
    <div className="border-b border-gray-800/60">
      <button
        onClick={locked ? onUpgrade : onToggle}
        className="w-full flex items-center justify-between px-3 py-2.5 text-xs text-gray-400 hover:bg-gray-800 hover:text-white transition-colors group"
      >
        <div className="flex items-center gap-2 min-w-0">
          {Icon && <Icon size={13} className="shrink-0 text-gray-500 group-hover:text-gray-300" />}
          <span className="truncate">{label}</span>
          {badge && (
            <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-semibold shrink-0">
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-1">
          {locked && <Lock size={11} className="text-gray-600" />}
          <ChevronDown
            size={12}
            className={`text-gray-600 group-hover:text-gray-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          {content === 'lists'            && <ListsContent />}
          {content === 'company'          && <CompanyContent />}
          {content === 'account_location' && <AccountLocationContent />}
          {content === 'employees'        && <EmployeesContent />}
          {!content && !locked && (
            <div className="px-3 pb-3 pt-1">
              <input
                type="text"
                placeholder={`Search ${label.toLowerCase()}...`}
                className="w-full bg-gray-800 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          )}
          {locked && (
            <div className="px-3 pb-3 pt-1">
              <p className="text-xs text-gray-500 flex items-center gap-1.5">
                <Lock size={11} />
                Upgrade to use this filter
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Companies() {
  const [activeTab, setActiveTab]       = useState('total')
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [openSections, setOpenSections] = useState({ lists: true })
  const [tourStep, setTourStep]         = useState(null)
  const [showBanner, setShowBanner]     = useState(true)
  const [aiQuery, setAiQuery]           = useState('')
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)

  const filtersRef = useRef(null)
  const tabsRef    = useRef(null)
  const importRef  = useRef(null)
  const refs = { filters: filtersRef, tabs: tabsRef, import: importRef }

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) setTourStep(1)
  }, [])

  const finishTour = () => { setTourStep(null); localStorage.setItem(TOUR_KEY, 'true') }
  const nextStep   = () => tourStep < tourSteps.length ? setTourStep(tourStep + 1) : finishTour()
  const prevStep   = () => tourStep > 1 && setTourStep(tourStep - 1)
  const currentStep = tourStep ? tourSteps[tourStep - 1] : null

  const toggleSection = (key) => setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  const getTooltipPosition = (target) => {
    const ref = refs[target]?.current
    if (!ref) return {}
    const rect = ref.getBoundingClientRect()
    if (target === 'filters') return { top: rect.top + 80,  left: rect.right + 12 }
    if (target === 'tabs')    return { top: rect.bottom + 8, left: rect.left }
    if (target === 'import')  return { top: rect.bottom + 8, right: window.innerWidth - rect.right }
    return {}
  }

  const tooltipPos = currentStep ? getTooltipPosition(currentStep.target) : {}

  return (
    <div className="flex flex-col h-full relative">

      {/* ── Banner ── */}
      {showBanner && (
        <div className="flex items-center justify-between bg-gray-900 border-b border-gray-800 px-4 py-2 text-xs text-gray-300 shrink-0">
          <div className="flex items-center gap-2 mx-auto">
            <Globe size={13} className="text-blue-400" />
            <span>Turn your website's anonymous visitors into high-intent leads — instantly, for free.</span>
            <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold px-3 py-1 rounded text-xs transition-colors ml-2">
              Start tracking visitors
            </button>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-gray-500 hover:text-gray-300 ml-4 shrink-0">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">

        {/* ── Filter sidebar ── */}
        <div
          ref={filtersRef}
          className={`shrink-0 border-r border-gray-800 flex flex-col bg-gray-900 transition-all duration-300 overflow-hidden ${
            filtersVisible ? 'w-52 opacity-100' : 'w-0 opacity-0 border-r-0'
          }`}
        >
          {/* Total / Net New / Saved tabs */}
          <div ref={tabsRef} className="flex border-b border-gray-800 shrink-0">
            {[
              { key: 'total',   label: 'Total',   count: '32.4M' },
              { key: 'net_new', label: 'Net New',  count: '32.4M' },
              { key: 'saved',   label: 'Saved',    count: '4' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2 text-center transition-colors border-b-2 ${
                  activeTab === tab.key ? 'border-blue-500' : 'border-transparent hover:border-gray-600'
                }`}
              >
                <p className={`text-xs font-semibold ${activeTab === tab.key ? 'text-white' : 'text-gray-400'}`}>
                  {tab.count}
                </p>
                <p className={`text-xs ${activeTab === tab.key ? 'text-blue-400' : 'text-gray-500'}`}>
                  {tab.label}
                </p>
              </button>
            ))}
          </div>

          {/* Accordion filter list */}
          <div className="flex-1 overflow-y-auto">
            {FILTER_ITEMS.map((item) => (
              <AccordionItem
                key={item.key}
                item={item}
                open={!!openSections[item.key]}
                onToggle={() => toggleSection(item.key)}
                onUpgrade={() => setUpgradeModalOpen(true)}
              />
            ))}
          </div>

          {/* Bottom actions */}
          <div className="border-t border-gray-800 px-3 py-2 flex gap-2 shrink-0">
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Clear filters</button>
            <button className="flex-1 text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 py-1 rounded transition-colors flex items-center justify-center gap-1">
              <Filter size={11} />
              More Filters
            </button>
          </div>
        </div>

        {/* ── Main content ── */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Page header */}
          <div className="px-6 pt-4 pb-2 border-b border-gray-800 flex items-center justify-between shrink-0">
            <h1 className="text-lg font-bold text-white">Find companies</h1>
            <div ref={importRef}>
              <button className="flex items-center gap-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded transition-colors">
                <Upload size={13} />
                Import
                <ChevronDown size={12} />
              </button>
            </div>
          </div>

          {/* Toolbar */}
          <div className="px-6 py-2 border-b border-gray-800 flex items-center gap-2 shrink-0 overflow-x-auto">
            <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 px-2.5 py-1 rounded transition-colors whitespace-nowrap">
              <SlidersHorizontal size={12} />
              Default view
              <ChevronDown size={11} />
            </button>
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-2 py-1 rounded transition-colors whitespace-nowrap"
            >
              <Filter size={12} />
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search companies"
                className="w-40 bg-gray-800 border border-gray-700 rounded pl-7 pr-3 py-1 text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="flex items-center gap-1.5 ml-auto">
              <button className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-2.5 py-1 rounded transition-colors whitespace-nowrap">
                <Sparkles size={12} className="text-blue-400" />
                Research with AI
                <ChevronDown size={11} />
              </button>
              <button className="flex items-center gap-1.5 text-xs bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-2.5 py-1 rounded transition-colors whitespace-nowrap">
                <Zap size={12} />
                Create workflow
                <ChevronDown size={11} />
              </button>
              <button className="text-xs text-gray-400 hover:text-white bg-gray-800 border border-gray-700 px-2.5 py-1 rounded transition-colors whitespace-nowrap">
                Save as new search
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1 rounded transition-colors whitespace-nowrap">
                <ArrowUpDown size={12} />
                Sort
                <ChevronDown size={11} />
              </button>
              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white px-2 py-1 rounded transition-colors whitespace-nowrap">
                <Settings2 size={12} />
                Search settings
              </button>
            </div>
          </div>

          {/* AI search area */}
          <div className="flex-1 overflow-y-auto flex flex-col items-center justify-start pt-10 px-8">
            <h2 className="text-white font-semibold text-base mb-4">
              Use Apollo AI to find the right prospects
            </h2>

            <div className="w-full max-w-2xl relative mb-6">
              <Sparkles size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
              <input
                type="text"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                placeholder="Example: Browse management consulting businesses located in Chicago"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Quick filters */}
            <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-lg p-5">
              <p className="text-xs font-semibold text-gray-400 mb-3">Quick filters</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: 'Locations',      chips: ['United States', 'Canada'] },
                  { label: 'Employee Count', chips: ['1-10', '11-20', '21-50'] },
                  {
                    label: 'Industry',
                    chips: ['Information Technology & Services', 'Marketing & Advertising', 'Retail'],
                  },
                ].map(({ label, chips }) => (
                  <div key={label} className={label === 'Industry' ? 'col-span-2' : ''}>
                    <p className="text-xs text-gray-500 mb-1.5">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <button
                          key={c}
                          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2.5 py-1 rounded transition-colors"
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upgrade banner */}
            <div className="w-full max-w-2xl mt-4 bg-gray-800 border border-gray-700 rounded-lg px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Lock size={13} className="text-gray-500 shrink-0" />
                <span>Clone your best customers with Lookalikes, Technology, and Revenue filters</span>
              </div>
              <button className="text-xs font-semibold bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-3 py-1.5 rounded transition-colors ml-4 shrink-0">
                Upgrade to unlock
              </button>
            </div>

            <div className="h-8 shrink-0" />
          </div>
        </div>
      </div>

      {/* ── Upgrade modal ── */}
      {upgradeModalOpen && <UpgradeModal onClose={() => setUpgradeModalOpen(false)} />}

      {/* ── Tooltip tour ── */}
      {tourStep && currentStep && (
        <div className="fixed z-50" style={tooltipPos}>
          <TooltipCard
            step={currentStep}
            stepIndex={tourStep}
            total={tourSteps.length}
            onNext={nextStep}
            onPrev={prevStep}
            onSkip={finishTour}
          />
        </div>
      )}
    </div>
  )
}
