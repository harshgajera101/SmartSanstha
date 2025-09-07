import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()
  const loc = useLocation() as any

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(email, password)
      nav(loc.state?.from?.pathname || '/dashboard')
    } catch { setError('Invalid credentials or server error') }
  }

  return (
    <div className="app-container py-10 grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-3xl font-extrabold">Welcome back</h1>
        <p className="text-slate-600 mt-2">Log in to continue your learning journey.</p>
        <img className="mt-6 rounded-2xl" src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1200&auto=format&fit=crop" />
      </div>
      <form onSubmit={onSubmit} className="card p-6 space-y-3">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn w-full">Login</button>
        <p className="text-sm text-slate-600">No account? <Link to="/signup" className="link">Create one</Link></p>
      </form>
    </div>
  )
}
