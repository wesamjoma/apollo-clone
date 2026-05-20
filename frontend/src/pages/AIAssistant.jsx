import { useState } from 'react'
import { Sparkles, Mic, X, Plus, Settings, Search, BarChart2, ChevronRight, MoreHorizontal } from 'lucide-react'

const presets = [
  { label: 'Prospecting', icon: Search },
  { label: 'Research', icon: BarChart2 },
  { label: 'Sequencing', icon: ChevronRight },
  { label: 'Analytics', icon: BarChart2 },
  { label: 'More', icon: MoreHorizontal },
]

export default function AIAssistant() {
  const [inputValue, setInputValue] = useState('')
  const [panelVisible, setPanelVisible] = useState(true)

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800">
        <button className="flex items-center gap-1.5 text-sm font-medium text-white hover:text-gray-300 transition-colors">
          New chat
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
            <Plus size={16} />
          </button>
          <button className="p-1.5 text-gray-500 hover:text-white hover:bg-gray-800 rounded-md transition-colors">
            <Settings size={16} />
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo + greeting */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-full border-2 border-gray-600 flex items-center justify-center mb-5 bg-gray-800">
            <Sparkles size={22} className="text-blue-400" />
          </div>
          <h1 className="text-xl font-semibold text-white mb-1">I'm your AI Assistant.</h1>
          <p className="text-gray-400 text-sm">Had a feeling I'd be seeing you today.</p>
        </div>

        {/* Input panel */}
        {panelVisible && (
          <div className="w-full max-w-xl bg-gray-800 border border-gray-700 rounded-xl mb-6 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
              <span className="text-sm font-medium text-gray-300">Personalize your experience</span>
              <button
                onClick={() => setPanelVisible(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
            <div className="px-4 pt-3 pb-2">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="What can I help you do?"
                rows={3}
                className="w-full bg-transparent text-sm text-gray-300 placeholder-gray-600 resize-none focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between px-4 py-2 border-t border-gray-700">
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white bg-gray-700 hover:bg-gray-600 px-2.5 py-1 rounded-md transition-colors">
                  <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" />
                  Context
                </button>
                <span className="text-xs text-gray-500 bg-gray-700 px-2.5 py-1 rounded-md font-medium">
                  5 CHATS LEFT
                </span>
              </div>
              <button className="p-1.5 text-gray-500 hover:text-white transition-colors">
                <Mic size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Preset buttons */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-gray-500">Start with a preset</p>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            {presets.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-md transition-colors"
              >
                <Icon size={13} />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
