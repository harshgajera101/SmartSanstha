export default function PageHeader({ title, subtitle }: { title: string, subtitle?: string }) {
  return (
    <div className="app-container py-10">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      {subtitle && <p className="text-slate-600 mt-2 max-w-2xl">{subtitle}</p>}
    </div>
  )
}