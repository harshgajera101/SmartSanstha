import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="app-container py-24 text-center">
      <div className="text-7xl font-black text-primary-600">404</div>
      <p className="mt-2 text-slate-600">The page you\'re looking for doesn\'t exist.</p>
      <Link to="/" className="btn mt-6">Go home</Link>
    </div>
  )
}
