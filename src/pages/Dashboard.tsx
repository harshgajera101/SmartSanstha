import Card from '@/components/Card'

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card title="Progress">
          <div className="mt-2 h-2 bg-slate-100 rounded-full">
            <div className="h-2 bg-primary-600 rounded-full" style={{ width: '46%' }} />
          </div>
          <div className="mt-2 text-sm text-slate-600">46% course completion</div>
        </Card>
        <Card title="Badges">
          <div className="flex gap-2 mt-2">
            <span className="badge">Fundamentalist</span>
            <span className="badge">Case Cracker</span>
          </div>
        </Card>
        <Card title="Streak">
          <div className="text-2xl font-bold">7🔥</div>
          <div className="text-sm text-slate-600">Keep it up!</div>
        </Card>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Recommendations">
          <ul className="list-disc pl-5 text-sm text-slate-600">
            <li>Finish: Directive Principles (3 lessons)</li>
            <li>Try Game: Judicial Review</li>
          </ul>
        </Card>
        <Card title="Recent Activity">
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Completed quiz in Fundamental Rights</li>
            <li>Played Preamble Builder</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
