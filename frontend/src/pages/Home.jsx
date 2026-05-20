import { useState } from 'react'
import { ChevronDown, Play, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const setupSteps = [
  {
    id: 'essentials',
    icon: '✦',
    iconBg: 'bg-gray-700',
    title: 'Essentials',
    description: 'Set up essentials to work smarter in Wapollo',
  },
  {
    id: 'outbound',
    icon: '↗',
    iconBg: 'bg-gray-700',
    title: 'Outbound',
    description: 'Set up targeting for outbound outreach',
  },
  {
    id: 'inbound',
    icon: 'A',
    iconBg: 'bg-gray-700',
    title: 'Inbound',
    description: 'Turn website traffic into leads',
  },
  {
    id: 'enrichment',
    icon: 'W',
    iconBg: 'bg-gray-700',
    title: 'Enrichment',
    description: 'Connect your CRM (or upload a CSV) to sync your records',
  },
]

const plays = [
  {
    title: 'Launch an AI-Powered Outbound Campaign',
    bg: 'bg-blue-700',
    emoji: '✈️',
  },
  {
    title: 'Find and Engage High-Potential Accounts',
    bg: 'bg-gray-800',
    emoji: '🔍',
  },
  {
    title: 'Reveal and Route Anonymous Website Visitors',
    bg: 'bg-amber-800',
    emoji: '🕵️',
  },
  {
    title: 'Get AI-Powered Insights Before Meetings',
    bg: 'bg-purple-800',
    emoji: '💡',
  },
]

const trainings = [
  {
    date: 'TODAY',
    time: '9:00 pm - 10:15 pm',
    title: 'Email Deliverability 101',
    note: '***No live Q&A',
    live: true,
    cta: 'Join now',
    ctaStyle: 'bg-yellow-500 hover:bg-yellow-400 text-gray-900',
  },
  {
    date: 'MAY 4, 2026',
    time: '5:00 pm - 6:00 pm',
    title: 'AI Assistant Best Practices',
    note: '+Live Q&A',
    live: false,
    cta: 'Save your spot',
    ctaStyle: 'border border-gray-600 text-gray-300 hover:bg-gray-700',
  },
  {
    date: 'MAY 4, 2026',
    time: '9:00 pm - 10:15 pm',
    title: 'Find Leads + Book Meetings using AI Assistant',
    note: '+Live Q&A',
    live: false,
    cta: 'Save your spot',
    ctaStyle: 'border border-gray-600 text-gray-300 hover:bg-gray-700',
  },
  {
    date: 'MAY 5, 2026',
    time: '5:00 pm - 6:15 pm',
    title: 'Email Deliverability 101',
    note: '+Live Q&A',
    live: false,
    cta: 'Save your spot',
    ctaStyle: 'border border-gray-600 text-gray-300 hover:bg-gray-700',
  },
]

export default function Home() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('setup')
  const firstName = user?.full_name?.split(' ')[0] || 'there'

  return (
    <div className="p-8 max-w-5xl">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">
            Welcome, {firstName} 👋
          </h1>
        </div>
        <button className="flex items-center gap-1.5 text-sm text-gray-400 border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-md transition-colors">
          Getting started
          <ChevronDown size={14} />
        </button>
      </div>

      {/* Next steps section */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-white mb-0.5">Next steps for you</h2>
        <p className="text-sm text-gray-400 mb-4">Follow the steps below to tailor Wapollo to your workflow</p>

        {/* Tabs */}
        <div className="flex items-center gap-1 border-b border-gray-800 mb-5">
          <button
            onClick={() => setActiveTab('setup')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'setup'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Setup
            <span className="ml-1.5 text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded-full">4</span>
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'recommendations'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Recommendations
          </button>
        </div>

        {/* Setup steps */}
        {activeTab === 'setup' && (
          <div className="space-y-3">
            {setupSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-center justify-between bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${step.iconBg} border border-gray-600 rounded-md flex items-center justify-center text-gray-300 text-sm font-bold`}>
                    {step.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-300">{step.title}</p>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="text-sm bg-gray-700 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md transition-colors font-medium">
                    Start
                  </button>
                  <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-700 rounded-md transition-colors">
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'recommendations' && (
          <p className="text-sm text-gray-400">Recommendations will appear here as you use Wapollo.</p>
        )}
      </div>

      {/* GTM Plays */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-white mb-1">
          Start strong with expert-built Plays and guided training
        </h2>
        <p className="text-sm text-gray-400 mb-4">Proven GTM Plays to get you started</p>

        <div className="grid grid-cols-4 gap-3">
          {plays.map((play) => (
            <div key={play.title} className={`${play.bg} rounded-xl p-4 flex flex-col justify-between min-h-[160px] border border-gray-700`}>
              <div className="text-4xl mb-3">{play.emoji}</div>
              <div>
                <p className="text-sm font-medium text-white mb-3 leading-snug">{play.title}</p>
                <div className="flex items-center justify-between">
                  <button className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors">
                    <Play size={11} />
                    Watch tutorial
                  </button>
                  <button className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                    Launch Play
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming live trainings */}
      <div>
        <h2 className="text-base font-semibold text-white mb-4">Upcoming free live trainings</h2>
        <div className="grid grid-cols-4 gap-3">
          {trainings.map((t, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{t.date}</span>
                  {t.live && (
                    <span className="flex items-center gap-1 text-xs text-red-400 font-medium">
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
                      Live
                    </span>
                  )}
                </div>
                <p className="text-sm font-semibold text-white mb-1">{t.time}</p>
                <p className="text-xs text-gray-400 leading-snug">
                  {t.title}{' '}
                  <span className="text-gray-500">[{t.note}]</span>
                </p>
              </div>
              <button className={`mt-4 w-full text-xs font-semibold py-2 rounded-md transition-colors ${t.ctaStyle}`}>
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
