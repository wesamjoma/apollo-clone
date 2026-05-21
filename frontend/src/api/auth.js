import axios from 'axios'

// In production VITE_API_URL points to the deployed backend (e.g. https://your-app.onrender.com/api).
// In dev the Vite proxy rewrites /api → http://localhost:8000, so we use '/api'.
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const register = (data) => api.post('/auth/register', data)
export const login = (data) => api.post('/auth/login', data)
export const getMe = () => api.get('/auth/me')
export const changeEmail = (data) => api.put('/auth/change-email', data)

export const importContacts = (data) => api.post('/contacts/import', data)
export const getContacts = () => api.get('/contacts/')
export const getImportHistory = () => api.get('/contacts/imports')

export default api
