import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'

export default function Blog() {
  return (
    <div className="app-container py-10 space-y-6">
      <PageHeader title="Blog" subtitle="Perspectives on civics, courts, and current affairs." />
      <div className="grid md:grid-cols-3 gap-4">
        {[1,2,3].map((i) => (
          <Card key={i} title={`Post ${i}`}>
            <p className="text-sm text-slate-600">Short excerpt from the article goes here...</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
