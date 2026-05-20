import { render, screen, act, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { AuthProvider, useAuth } from '../../frontend/src/context/AuthContext'

vi.mock('../../frontend/src/api/auth', () => ({
  getMe: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
  default: { interceptors: { request: { use: vi.fn() } } },
}))

import * as authApi from '../../frontend/src/api/auth'

const Consumer = () => {
  const { user, loading } = useAuth()
  if (loading) return <div>loading</div>
  return <div>{user ? `logged in as ${user.email}` : 'logged out'}</div>
}

describe('AuthContext', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('shows logged out when no token in storage', async () => {
    render(<AuthProvider><Consumer /></AuthProvider>)
    await waitFor(() => expect(screen.queryByText('loading')).not.toBeInTheDocument())
    expect(screen.getByText('logged out')).toBeInTheDocument()
  })

  it('loads user from token on mount', async () => {
    localStorage.setItem('token', 'valid-token')
    authApi.getMe.mockResolvedValue({ data: { email: 'stored@example.com' } })

    render(<AuthProvider><Consumer /></AuthProvider>)
    await waitFor(() => expect(screen.queryByText('loading')).not.toBeInTheDocument())
    expect(screen.getByText('logged in as stored@example.com')).toBeInTheDocument()
  })

  it('clears token when getMe fails on mount', async () => {
    localStorage.setItem('token', 'bad-token')
    authApi.getMe.mockRejectedValue(new Error('Unauthorized'))

    render(<AuthProvider><Consumer /></AuthProvider>)
    await waitFor(() => expect(screen.queryByText('loading')).not.toBeInTheDocument())
    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByText('logged out')).toBeInTheDocument()
  })

  it('signin stores token and sets user', async () => {
    authApi.getMe.mockResolvedValue(null)

    const SigninButton = () => {
      const { signin, user } = useAuth()
      return (
        <button onClick={() => signin('my-token', { email: 'new@example.com' })}>
          {user ? user.email : 'no user'}
        </button>
      )
    }

    render(<AuthProvider><SigninButton /></AuthProvider>)
    await waitFor(() => screen.getByRole('button'))

    act(() => screen.getByRole('button').click())
    expect(localStorage.getItem('token')).toBe('my-token')
    expect(screen.getByRole('button')).toHaveTextContent('new@example.com')
  })

  it('signout clears token and user', async () => {
    localStorage.setItem('token', 'tok')
    authApi.getMe.mockResolvedValue({ data: { email: 'me@example.com' } })

    const SignoutButton = () => {
      const { signout, user } = useAuth()
      return <button onClick={signout}>{user ? user.email : 'logged out'}</button>
    }

    render(<AuthProvider><SignoutButton /></AuthProvider>)
    await waitFor(() => screen.getByText('me@example.com'))

    act(() => screen.getByRole('button').click())
    expect(localStorage.getItem('token')).toBeNull()
    expect(screen.getByText('logged out')).toBeInTheDocument()
  })
})
