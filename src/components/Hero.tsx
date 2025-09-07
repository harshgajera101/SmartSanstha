import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="app-container py-16 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <span className="badge">Gamified Civic Learning</span>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight">Understand the Constitution—
          <span className="text-primary-700"> the smart way</span>
        </h1>
        <p className="mt-4 text-slate-600 text-lg">Learn, simulate real courtrooms, and play interactive games to master the Legislature, Executive, and Judiciary.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/learn" className="btn">Start Learning</Link>
          <Link to="/courtroom" className="btn bg-white text-primary-700 border border-primary-200 hover:bg-primary-50">Try Simulation</Link>
        </div>
      </div>
      <div className="card p-6">
        <img alt="Illustration" src="https://images.unsplash.com/photo-1528747008803-1baa42e104e1?q=80&w=1200&auto=format&fit=crop" className="rounded-xl" />
      </div>
    </section>
  )
}
