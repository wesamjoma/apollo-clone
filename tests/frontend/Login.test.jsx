import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi } from 'vitest'
import { AuthProvider } from '../../frontend/src/context/AuthContext'

vi.mock('../../frontend/src/api/auth', () => ({
  login: vi.fn(),
  getMe: vi.fn(),
  register: vi.fn(),
  default: { interceptors: { request: { use: vi.fn() } } },
}))

import * as authApi from '../../frontend/src/api/auth'
import Login from '../../frontend/src/pages/Login'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderLogin = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </MemoryRouter>
  )

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    authApi.getMe.mockResolvedValue({ data: null })
  })

  it('renders email, password fields and submit button', () => {
    renderLogin()
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders link to register page', () => {
    renderLogin()
    expect(screen.getByRole('link', { name: /sign up/i })).toBeInTheDocument()
  })

  it('shows loading state while submitting', async () => {
    authApi.login.mockReturnValue(new Promise(() => {}))
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /signing in/i })).toBeDisabled()
    )
  })

  it('displays error message on failed login', async () => {
    authApi.login.mockRejectedValue({
      response: { data: { detail: 'Invalid email or password' } },
    })
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'wrong@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'badpass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
    )
  })

  it('shows fallback error when server has no detail', async () => {
    authApi.login.mockRejectedValue({ response: {} })
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'a@b.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'pass' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() =>
      expect(screen.getByText('Login failed. Please try again.')).toBeInTheDocument()
    )
  })

  it('navigates to /people on successful login', async () => {
    authApi.login.mockResolvedValue({
      data: {
        access_token: 'tok123',
        user: { id: 1, email: 'u@example.com', full_name: 'U', is_active: true, created_at: '' },
      },
    })
    renderLogin()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'u@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('••••••••'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/people'))
  })
})
