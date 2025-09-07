export default function StatStrip() {
  const stats = [
    { label: 'Learners', value: '12k+' },
    { label: 'Modules', value: '120+' },
    { label: 'Mock Cases', value: '75+' },
    { label: 'Avg. Rating', value: '4.8/5' },
  ]
  return (
    <section className="bg-white border-y border-slate-100">
      <div className="app-container py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(s => (
          <div key={s.label} className="text-center">
            <div className="text-2xl font-bold text-primary-700">{s.value}</div>
            <div className="text-xs text-slate-600">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
