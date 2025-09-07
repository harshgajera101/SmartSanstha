import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try { await signup(name, email, password); nav('/dashboard') } catch { setError('Signup failed') }
  }

  return (
    <div className="app-container py-10 grid md:grid-cols-2 gap-8 items-start">
      <div>
        <h1 className="text-3xl font-extrabold">Create account</h1>
        <p className="text-slate-600 mt-2">It\'s quick and free.</p>
      </div>
      <form onSubmit={onSubmit} className="card p-6 space-y-3">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <label className="label">Full name</label>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label className="label">Password</label>
          <input type="password" className="input" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn w-full">Create account</button>
        <p className="text-sm text-slate-600">Have an account? <Link to="/login" className="link">Log in</Link></p>
      </form>
    </div>
  )
}
