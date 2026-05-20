import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { X } from 'lucide-react'

export default function Dashboard() {
  const [banner, setBanner] = useState(true)

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar />
      <div className="flex-1 ml-60 flex flex-col overflow-hidden">
        {/* Notification banner */}
        {banner && (
          <div className="bg-gray-800 border-b border-gray-700 px-6 py-2 flex items-center justify-between shrink-0">
            <p className="text-sm text-gray-300">
              Turn your website's anonymous visitors into high-intent leads — instantly, for free.
            </p>
            <div className="flex items-center gap-3">
              <button className="text-sm bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold px-3 py-1 rounded-md transition-colors whitespace-nowrap">
                Start tracking visitors
              </button>
              <button onClick={() => setBanner(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Topbar */}
        <Topbar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
