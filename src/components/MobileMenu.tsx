import { Link, NavLink } from 'react-router-dom'

export default function MobileMenu({ open, onClose, nav }: { open: boolean, onClose: () => void, nav: { to: string, label: string }[] }) {
  return (
    <div className={`fixed inset-0 z-40 md:hidden ${open ? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/30 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <div className={`absolute left-0 top-0 h-full w-80 bg-white shadow-xl transform transition-transform ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" onClick={onClose}>
            <img src="/src/assets/logo.svg" className="h-8 w-8" />
            <span className="font-bold">SmartSanstha</span>
          </Link>
          <button onClick={onClose} className="p-2 rounded-xl border border-slate-200">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {nav.map(n => (
            <NavLink key={n.to} to={n.to} onClick={onClose} className={({ isActive }) => `block px-3 py-2 rounded-xl ${isActive ? 'bg-primary-50 text-primary-700' : 'hover:bg-slate-50'}`}>{n.label}</NavLink>
          ))}
          <NavLink to="/login" onClick={onClose} className="btn w-full mt-4 text-center">Login</NavLink>
        </nav>
      </div>
    </div>
  )
}
