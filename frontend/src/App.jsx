import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import People from './pages/People'
import AIAssistant from './pages/AIAssistant'
import Settings from './pages/Settings'
import Import from './pages/Import'
import ImportReview from './pages/ImportReview'
import SavedPeople from './pages/SavedPeople'
import Companies from './pages/Companies'

const Placeholder = ({ title }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <p className="text-gray-400 mt-2">Coming soon</p>
  </div>
)

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="people" element={<People />} />
          <Route path="companies" element={<Companies />} />
          <Route path="lists" element={<Placeholder title="Lists" />} />
          <Route path="data-enrichment" element={<Placeholder title="Data Enrichment" />} />
          <Route path="import" element={<Import />} />
          <Route path="import/review" element={<ImportReview />} />
          <Route path="sequences" element={<Placeholder title="Sequences" />} />
          <Route path="emails" element={<Placeholder title="Emails" />} />
          <Route path="calls" element={<Placeholder title="Calls" />} />
          <Route path="tasks" element={<Placeholder title="Tasks" />} />
          <Route path="meetings" element={<Placeholder title="Meetings" />} />
          <Route path="conversations" element={<Placeholder title="Conversations" />} />
          <Route path="deals" element={<Placeholder title="Deals" />} />
          <Route path="workflows" element={<Placeholder title="Workflows" />} />
          <Route path="analytics" element={<Placeholder title="Analytics" />} />
          <Route path="website-visitors" element={<Placeholder title="Website Visitors" />} />
          <Route path="forms" element={<Placeholder title="Forms" />} />
          <Route path="saved-people" element={<SavedPeople />} />
          <Route path="saved-companies" element={<Placeholder title="Saved Companies" />} />
          <Route path="admin-settings" element={<Placeholder title="Admin Settings" />} />
          <Route path="deliverability" element={<Placeholder title="Deliverability Suite" />} />
          <Route path="ai-assistant" element={<AIAssistant />} />
        </Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}
