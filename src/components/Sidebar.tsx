import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Overview' },
  { to: '/learn', label: 'Courses' },
  { to: '/courtroom', label: 'Courtroom' },
  { to: '/games', label: 'Games' },
]

export default function Sidebar() {
  return (
    <aside className="w-64 hidden md:block bg-white h-screen sticky top-0 border-r border-slate-100 p-4">
      <div className="font-bold mb-4">My Dashboard</div>
      <nav className="space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({ isActive }) => `block px-3 py-2 rounded-xl text-sm ${isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'}`}>{l.label}</NavLink>
        ))}
      </nav>
    </aside>
  )
}
