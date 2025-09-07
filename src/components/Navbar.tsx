import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import MobileMenu from './MobileMenu'

const nav = [
  { to: '/learn', label: 'Learn' },
  { to: '/courtroom', label: 'Courtroom' },
  { to: '/games', label: 'Explore Games' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="app-container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.svg" alt="SmartSanstha" className="h-8 w-8" />
          <span className="font-bold">SmartSanstha</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {nav.map(n => (
            <NavLink 
                key={n.to}
                to={n.to}
                className={({ isActive }) => `text-sm ${isActive ? 'text-primary-700 font-semibold' : 'text-slate-700 hover:text-primary-700' }`}>
                    {n.label}
            </NavLink>
          ))}
          <NavLink to="/login" className="btn">Login</NavLink>
        </nav>
        <button aria-label="Open Menu" onClick={() => setOpen(true)} className="md:hidden inline-flex items-center p-2 rounded-xl border border-slate-200">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
      <MobileMenu open={open} onClose={() => setOpen(false)} nav={nav} />
    </header>
  )
}
