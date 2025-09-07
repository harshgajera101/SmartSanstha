const features = [
  { title: 'Learn', desc: 'Bite-sized modules on Indian Constitution with visuals and quizzes.', icon: '📘' },
  { title: 'Courtroom', desc: 'Role-play as Judge/Advocate/Citizen in guided simulations.', icon: '⚖️' },
  { title: 'Games', desc: 'Mini-games to reinforce core concepts and landmark cases.', icon: '🎮' },
  { title: 'Dashboard', desc: 'Track progress, badges, streaks, and recommendations.', icon: '📊' }
]

export default function FeatureCards() {
  return (
    <section className="app-container py-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map(f => (
        <div key={f.title} className="card p-5">
          <div className="text-3xl">{f.icon}</div>
          <h3 className="mt-2 font-semibold text-lg">{f.title}</h3>
          <p className="mt-1 text-sm text-slate-600">{f.desc}</p>
        </div>
      ))}
    </section>
  )
}
