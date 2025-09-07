export default function Card({ title, children, footer }: { title?: string; children?: React.ReactNode; footer?: React.ReactNode }) {
  return (
    <div className="card p-5">
      {title && <h3 className="font-semibold mb-2">{title}</h3>}
      <div>{children}</div>
      {footer && <div className="mt-4 pt-3 border-t border-slate-100">{footer}</div>}
    </div>
  )
}
