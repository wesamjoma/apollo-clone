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
import Register from '../../frontend/src/pages/Register'

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, useNavigate: () => mockNavigate }
})

const renderRegister = () =>
  render(
    <MemoryRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </MemoryRouter>
  )

describe('Register Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    authApi.getMe.mockResolvedValue({ data: null })
  })

  it('renders all three fields and submit button', () => {
    renderRegister()
    expect(screen.getByPlaceholderText('John Doe')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('you@company.com')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Min. 6 characters')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument()
  })

  it('renders link to login page', () => {
    renderRegister()
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('shows loading state while submitting', async () => {
    authApi.register.mockReturnValue(new Promise(() => {}))
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Min. 6 characters'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(screen.getByRole('button', { name: /creating account/i })).toBeDisabled()
    )
  })

  it('displays error when email already registered', async () => {
    authApi.register.mockRejectedValue({
      response: { data: { detail: 'Email already registered' } },
    })
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'dup@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Min. 6 characters'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(screen.getByText('Email already registered')).toBeInTheDocument()
    )
  })

  it('shows fallback error on generic failure', async () => {
    authApi.register.mockRejectedValue({ response: {} })
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'X' } })
    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'x@x.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Min. 6 characters'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() =>
      expect(screen.getByText('Registration failed. Please try again.')).toBeInTheDocument()
    )
  })

  it('navigates to /people on successful registration', async () => {
    authApi.register.mockResolvedValue({
      data: {
        access_token: 'tok123',
        user: { id: 1, email: 'new@example.com', full_name: 'New', is_active: true, created_at: '' },
      },
    })
    renderRegister()

    fireEvent.change(screen.getByPlaceholderText('John Doe'), { target: { value: 'New User' } })
    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'new@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Min. 6 characters'), {
      target: { value: 'pass123' },
    })
    fireEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith('/people'))
  })
})
