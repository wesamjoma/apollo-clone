import { useState, useEffect, useRef } from 'react'
import {
  Search, ChevronDown, Lock, Sparkles, SlidersHorizontal,
  ArrowUpDown, Settings2, Upload, X, Users, Building2,
  GraduationCap, MapPin, Users2, Factory, TrendingUp,
  BarChart3, Cpu, DollarSign, Briefcase, Bell, Monitor,
  UserMinus, Zap, Brain, Mail, List, Filter, Star,
  ChevronRight, Globe, Plus, PenLine, Settings, ArrowDownUp,
  MailCheck, MailWarning, MailX, UserCog, CheckCircle2
} from 'lucide-react'

// ─── Tour ─────────────────────────────────────────────────────────────────────

const TOUR_KEY = 'apollo_people_tour_done'

const tourSteps = [
  {
    title: 'Apply filters',
    body: 'Use 40+ Smart Filters to build a targeted list of the best prospects.',
    target: 'filters',
  },
  {
    title: 'Saved Contacts',
    body: "Use the Saved tab to take actions on contacts that you've already saved, and the Net New tab to find people that you have not added yet.",
    target: 'tabs',
  },
  {
    title: 'Import Contacts',
    body: 'Add or import contacts and accounts to prevent yourself from prospecting your existing customers. We also have CRM Integrations to help with this.',
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
          People Finder Views
        </span>
        <button onClick={onSkip} className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
          Skip tour
        </button>
      </div>
      <p className="text-white font-semibold text-sm mb-1">{step.title}</p>
      {step.richBody ? (
        <p className="text-gray-400 text-xs leading-relaxed">
          Add or import contacts and accounts to prevent yourself from prospecting your existing customers. We also have{' '}
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
  const [listsTab, setListsTab] = useState('people')
  const [advancedOpen, setAdvancedOpen] = useState(false)

  return (
    <div className="pb-3 pt-1">
      {/* People / Companies tabs */}
      <div className="flex border-b border-gray-700 mb-3 px-3">
        {['People', 'Companies'].map((t) => (
          <button
            key={t}
            onClick={() => setListsTab(t.toLowerCase())}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
              listsTab === t.toLowerCase()
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-500 hover:text-gray-300'
            }`}
          >
            {t === 'People' ? <Users size={11} /> : <Building2 size={11} />}
            {t}
          </button>
        ))}
      </div>

      <div className="px-3 space-y-2">
        {/* Include lists row */}
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

        {/* Select lists dropdown */}
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Select lists...</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Advanced settings toggle */}
        <button
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
        >
          {advancedOpen ? 'Hide advanced settings' : 'Show advanced settings'}
          <ChevronDown size={11} className={`transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} />
        </button>

        {/* Advanced settings body */}
        <div className={`grid transition-all duration-300 ease-in-out ${advancedOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden space-y-2">
            {/* Include ALL */}
            <div className="pt-1">
              <p className="text-[10px] text-gray-500 mb-1">Include ALL</p>
              <div className="relative">
                <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                  <option value="">Include ALL lists...</option>
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Exclude */}
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

// ─── Accordion content: Persona ───────────────────────────────────────────────

function PersonaContent() {
  return (
    <div className="px-3 pb-3 pt-1">
      <p className="text-sm font-bold text-white mb-3">Prospect Faster with Personas</p>
      <button className="w-full flex items-center justify-center gap-2 text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white px-3 py-2.5 rounded mb-2 transition-colors text-center leading-snug">
        <Sparkles size={13} className="shrink-0" />
        <span>Create a Persona with AI</span>
      </button>
      <button className="w-full flex items-center justify-center gap-2 text-xs font-medium bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 py-2.5 rounded transition-colors">
        <PenLine size={13} className="shrink-0" />
        <span>Create a Persona manually</span>
      </button>
    </div>
  )
}

// ─── Accordion content: Email Status ─────────────────────────────────────────

function Toggle({ on, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-4 w-7 shrink-0 items-center rounded-full transition-colors duration-200 ${
        on ? 'bg-blue-500' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-3 w-3 rounded-full bg-white shadow transition-transform duration-200 ${
          on ? 'translate-x-3.5' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function StatusRow({ icon: Icon, iconClass, label, badgeClass, checked, onCheck }) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group py-0.5">
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className="w-3.5 h-3.5 rounded border border-gray-600 bg-gray-800 accent-blue-500 shrink-0 cursor-pointer"
      />
      <Icon size={14} className={`shrink-0 ${iconClass}`} />
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>{label}</span>
    </label>
  )
}

function EmailStatusContent() {
  const [checked, setChecked] = useState({})
  const [advOpen, setAdvOpen] = useState(false)
  const [catchAll, setCatchAll] = useState(true)

  const toggle = (key) => setChecked((p) => ({ ...p, [key]: !p[key] }))

  return (
    <div className="px-3 pb-3 pt-2 space-y-3">
      {/* Safe to send */}
      <div>
        <p className="text-[10px] text-gray-500 mb-1.5">Safe to send</p>
        <StatusRow
          icon={CheckCircle2} iconClass="text-green-500"
          label="Verified" badgeClass="bg-green-600/30 text-green-400 border border-green-600/40"
          checked={!!checked.verified} onCheck={() => toggle('verified')}
        />
      </div>

      {/* Send with caution */}
      <div>
        <p className="text-[10px] text-gray-500 mb-1.5">Send with caution</p>
        <div className="space-y-1">
          <StatusRow
            icon={MailWarning} iconClass="text-gray-400"
            label="Unverified" badgeClass="bg-gray-700 text-gray-300 border border-gray-600"
            checked={!!checked.unverified} onCheck={() => toggle('unverified')}
          />
          <StatusRow
            icon={UserCog} iconClass="text-gray-400"
            label="User managed" badgeClass="bg-gray-700 text-gray-300 border border-gray-600"
            checked={!!checked.user_managed} onCheck={() => toggle('user_managed')}
          />
        </div>
      </div>

      {/* Do not send */}
      <div>
        <p className="text-[10px] text-gray-500 mb-1.5">Do not send</p>
        <div className="space-y-1">
          <StatusRow
            icon={MailX} iconClass="text-orange-400"
            label="Update required" badgeClass="bg-orange-600/30 text-orange-400 border border-orange-600/40"
            checked={!!checked.update_required} onCheck={() => toggle('update_required')}
          />
          <StatusRow
            icon={MailX} iconClass="text-red-400"
            label="Unavailable" badgeClass="bg-red-900/50 text-red-400 border border-red-800/50"
            checked={!!checked.unavailable} onCheck={() => toggle('unavailable')}
          />
        </div>
      </div>

      {/* Advanced toggle */}
      <button
        onClick={() => setAdvOpen(!advOpen)}
        className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
      >
        Advanced
        <ChevronDown size={11} className={`transition-transform duration-200 ${advOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Advanced body */}
      <div className={`grid transition-all duration-300 ease-in-out ${advOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="pt-1 space-y-1">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <MailCheck size={13} className="text-gray-400 shrink-0" />
                <span className="text-xs text-gray-300 font-medium">Include catch-all emails</span>
              </div>
              <Toggle on={catchAll} onToggle={() => setCatchAll(!catchAll)} />
            </div>
            <p className="text-[10px] text-gray-500 leading-relaxed pl-5">
              Use Apollo intelligence to identify verified emails from catch-all domains.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Accordion content: Job Titles ───────────────────────────────────────────

function JobTitlesContent() {
  const [mode, setMode] = useState('simple')
  const [similarTitles, setSimilarTitles] = useState(true)
  const [pastOpen, setPastOpen] = useState(false)

  return (
    <div className="pb-3 pt-1">
      {/* Simple / Advanced tabs */}
      <div className="flex mx-3 mb-3 bg-gray-800 rounded p-0.5">
        {['Simple', 'Advanced'].map((t) => (
          <button
            key={t}
            onClick={() => setMode(t.toLowerCase())}
            className={`flex-1 py-1 text-xs font-medium rounded transition-colors ${
              mode === t.toLowerCase()
                ? 'bg-white text-gray-900'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="px-3 space-y-2">

        {/* ── Simple mode ── */}
        {mode === 'simple' && <>
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Include</p>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                <option value="">Search for a job title</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
            <p className="text-[10px] text-gray-500 mt-1">
              Use <span className="text-gray-400">"quotation marks"</span> to return exact matches
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={similarTitles} onChange={() => setSimilarTitles(!similarTitles)}
              className="w-3.5 h-3.5 rounded border border-gray-600 accent-blue-500 shrink-0 cursor-pointer" />
            <span className="text-xs text-gray-300">Include people with similar titles</span>
            <span className="text-gray-500 text-xs cursor-help" title="Apollo will include people with semantically similar job titles">ⓘ</span>
          </label>
          <div>
            <p className="text-[10px] text-gray-500 mb-1">Exclude</p>
            <div className="relative">
              <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                <option value="">Enter titles to exclude</option>
              </select>
              <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
          <button onClick={() => setPastOpen(!pastOpen)}
            className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            Past job titles
            <ChevronDown size={11} className={`transition-transform duration-200 ${pastOpen ? 'rotate-180' : ''}`} />
          </button>
          <div className={`grid transition-all duration-300 ease-in-out ${pastOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
            <div className="overflow-hidden">
              <div className="relative pt-1">
                <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
                  <option value="">Search past job titles...</option>
                </select>
                <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>
        </>}

        {/* ── Advanced mode ── */}
        {mode === 'advanced' && <>
          {['Is known', 'Is unknown'].map((opt) => (
            <label key={opt} className="flex items-center gap-2.5 border border-gray-700 rounded px-3 py-2 cursor-pointer hover:border-gray-500 transition-colors">
              <input type="radio" name="job_title_known"
                className="w-3.5 h-3.5 accent-blue-500 shrink-0 cursor-pointer" />
              <span className="text-xs text-gray-300">{opt}</span>
            </label>
          ))}
        </>}

        {/* Management Level */}
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Management Level</option>
            <option>C-Suite</option>
            <option>VP</option>
            <option>Director</option>
            <option>Manager</option>
            <option>Individual Contributor</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Departments & Job Function */}
        <div className="relative">
          <select className="w-full appearance-none bg-gray-900 border border-gray-700 rounded px-2.5 py-1.5 text-xs text-gray-400 focus:outline-none focus:border-blue-500 transition-colors pr-7">
            <option value="">Departments & Job Function</option>
            <option>Engineering</option>
            <option>Sales</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>HR</option>
          </select>
          <ChevronDown size={11} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>

        {/* Create New Persona */}
        <button className="w-full flex items-center justify-center gap-2 text-xs font-medium bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-300 px-3 py-2 rounded transition-colors">
          <Users size={13} className="shrink-0" />
          Create New Persona
        </button>

        {/* What's a Persona? */}
        <div className="text-center">
          <button className="text-xs text-blue-400 hover:text-blue-300 underline transition-colors">
            What's a Persona?
          </button>
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
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>

        {/* Illustration */}
        <div className="bg-[#1a2744] h-52 flex items-center justify-center relative overflow-hidden">
          <div className="relative flex items-center justify-center w-48 h-36">
            {/* Person icon - upper left */}
            <div className="absolute left-4 top-2 w-11 h-11 bg-gray-500/40 rounded-full flex items-center justify-center border border-gray-400/20">
              <Users size={20} className="text-gray-300" />
            </div>
            {/* Funnel shape */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 flex flex-col items-center">
              <div
                className="w-24 h-9 bg-[#c8aa82]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 78% 100%, 22% 100%)' }}
              />
              <div
                className="w-12 h-16 bg-[#c8aa82]"
                style={{ clipPath: 'polygon(0 0, 100% 0, 62% 100%, 38% 100%)' }}
              />
            </div>
            {/* Email icon - right */}
            <div className="absolute right-2 top-6 w-11 h-11 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/30">
              <Mail size={20} className="text-blue-300" />
            </div>
          </div>
        </div>

        {/* Content */}
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

// ─── Accordion item ───────────────────────────────────────────────────────────

const FILTER_ITEMS = [
  { key: 'lists',             label: 'Lists',              icon: List,        content: 'lists' },
  { key: 'persona',           label: 'Persona',            icon: Users,       content: 'persona' },
  { key: 'email_status',      label: 'Email Status',       icon: Mail,        content: 'email_status' },
  { key: 'job_titles',        label: 'Job Titles',         icon: Briefcase,   content: 'job_titles' },
  { key: 'people_lookalikes', label: 'People Lookalikes',  icon: Users2,      locked: true },
  { key: 'company',           label: 'Company',            icon: Building2 },
  { key: 'company_lookalikes',label: 'Company Lookalikes', icon: Building2,   locked: true },
  { key: 'education',         label: 'Education',          icon: GraduationCap, badge: 'Beta' },
  { key: 'location',          label: 'Location',           icon: MapPin },
  { key: 'employees',         label: '# Employees',        icon: Users2 },
  { key: 'industry',          label: 'Industry & Keywords',icon: Factory },
  { key: 'market_segments',   label: 'Market Segments',    icon: TrendingUp },
  { key: 'sic_naics',         label: 'SIC and NAICS',      icon: BarChart3 },
  { key: 'ai_filters',        label: 'AI Filters',         icon: Brain },
  { key: 'buying_intent',     label: 'Buying Intent',      icon: Zap },
  { key: 'scores',            label: 'Scores',             icon: Star,        locked: true },
  { key: 'owner',             label: 'Owner',              icon: Users },
  { key: 'technologies',      label: 'Technologies',       icon: Cpu,         locked: true },
  { key: 'revenue',           label: 'Revenue',            icon: DollarSign,  locked: true },
  { key: 'funding',           label: 'Funding',            icon: TrendingUp,  locked: true },
  { key: 'job_postings',      label: 'Job Postings',       icon: Briefcase,   locked: true },
  { key: 'signals',           label: 'Signals',            icon: Bell },
  { key: 'website_visitors',  label: 'Website Visitors',   icon: Monitor },
  { key: 'email_opened',      label: 'Email Opened',       icon: Mail },
  { key: 'person_deleted',    label: 'Person Deleted',     icon: UserMinus },
]

function AccordionItem({ item, open, onToggle, onUpgrade }) {
  const { label, icon: Icon, locked, badge, content } = item
  return (
    <div className="border-b border-gray-800/60">
      {/* Header row */}
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

      {/* Expandable body — grid trick for smooth height animation */}
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          {content === 'lists'        && <ListsContent />}
          {content === 'persona'      && <PersonaContent />}
          {content === 'email_status' && <EmailStatusContent />}
          {content === 'job_titles'   && <JobTitlesContent />}
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

export default function People() {
  const [activeTab, setActiveTab] = useState('total')
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [openSections, setOpenSections] = useState({ lists: true })   // Lists open by default
  const [tourStep, setTourStep] = useState(null)
  const [showBanner, setShowBanner] = useState(true)
  const [aiQuery, setAiQuery] = useState('')
  const [upgradeModalOpen, setUpgradeModalOpen] = useState(false)

  const filtersRef = useRef(null)
  const tabsRef = useRef(null)
  const importRef = useRef(null)
  const refs = { filters: filtersRef, tabs: tabsRef, import: importRef }

  useEffect(() => {
    if (!localStorage.getItem(TOUR_KEY)) setTourStep(1)
  }, [])

  const finishTour = () => {
    setTourStep(null)
    localStorage.setItem(TOUR_KEY, 'true')
  }
  const nextStep = () => tourStep < tourSteps.length ? setTourStep(tourStep + 1) : finishTour()
  const prevStep = () => tourStep > 1 && setTourStep(tourStep - 1)
  const currentStep = tourStep ? tourSteps[tourStep - 1] : null

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))

  const getTooltipPosition = (target) => {
    const ref = refs[target]?.current
    if (!ref) return {}
    const rect = ref.getBoundingClientRect()
    if (target === 'filters') return { top: rect.top + 80,   left: rect.right + 12 }
    if (target === 'tabs')    return { top: rect.bottom + 8,  left: rect.left }
    if (target === 'import')  return { top: rect.bottom + 8,  right: window.innerWidth - rect.right }
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
              { key: 'total',   label: 'Total',   count: '242.9M' },
              { key: 'net_new', label: 'Net New',  count: '242.9M' },
              { key: 'saved',   label: 'Saved',    count: '0' },
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

          {/* Accordion filter list — independently scrollable */}
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
            <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">Clear all</button>
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
            <h1 className="text-lg font-bold text-white">Find people</h1>
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
                placeholder="Search people"
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

          {/* AI search area — independently scrollable */}
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
                placeholder="Example: Look for Chicago's top Account Executives"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-9 pr-4 py-2.5 text-sm text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            {/* Quick filters */}
            <div className="w-full max-w-2xl bg-gray-800 border border-gray-700 rounded-lg p-5">
              <p className="text-xs font-semibold text-gray-400 mb-3">Quick filters</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[
                  { label: 'Locations',    chips: ['United States', 'Canada'] },
                  { label: 'Email Status', chips: ['Verified', 'Unverified', 'Unavailable'] },
                  { label: 'Job Titles',   chips: ['founder', 'sales manager', 'marketing director'] },
                  { label: 'Industry',     chips: ['Information Technology & Services', 'Marketing & Advertising', 'Retail'] },
                ].map(({ label, chips }) => (
                  <div key={label}>
                    <p className="text-xs text-gray-500 mb-1.5">{label}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {chips.map((c) => (
                        <button key={c} className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2.5 py-1 rounded transition-colors">
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
