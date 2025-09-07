import { Link } from 'react-router-dom'
export default function Breadcrumbs({ items }: { items: { label: string, to?: string }[] }) {
  return (
    <div className="text-sm text-slate-500">{
      items.map((it, idx) => (
        <span key={idx}>
          {it.to ? <Link to={it.to} className="link">{it.label}</Link> : <span>{it.label}</span>}
          {idx < items.length - 1 && <span className="mx-2">/</span>}
        </span>
      ))
    }</div>
  )
}
