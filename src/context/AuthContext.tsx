import { createContext, useContext, useEffect, useState } from 'react'
import type { User } from '@/types/models'
import { AuthAPI } from '@/lib/api'

interface AuthState {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthState | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const { data } = await AuthAPI.me()
        setUser(data.user || null)
      } catch {}
      finally { setLoading(false) }
    })()
  }, [])

  const login = async (email: string, password: string) => {
    const { data } = await AuthAPI.login(email, password)
    setUser(data.user)
  }

  const signup = async (name: string, email: string, password: string) => {
    const { data } = await AuthAPI.signup(name, email, password)
    setUser(data.user)
  }

  const logout = async () => {
    await AuthAPI.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
