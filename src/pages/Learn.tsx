import { useEffect, useState } from 'react'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import { LearnAPI } from '@/lib/api'
import type { Course } from '@/types/models'

export default function Learn() {
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => { (async () => {
    try { const { data } = await LearnAPI.listCourses(); setCourses(data.courses ?? []) } catch {}
  })() }, [])

  return (
    <div className="app-container py-10 space-y-6">
      <PageHeader title="Learn" subtitle="Bite-sized, visual-first modules with quizzes." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {(courses.length ? courses : [
          { title: 'Fundamental Rights', description: 'Art. 12-35 essentials', lessons: 12, progress: 40 },
          { title: 'Directive Principles', description: 'DPSP made easy', lessons: 9, progress: 20 },
          { title: 'Separation of Powers', description: 'Checks & balances', lessons: 7, progress: 0 },
        ]).map((c:any, i:number) => (
          <Card key={i} title={c.title}>
            <p className="text-sm text-slate-600">{c.description}</p>
            <div className="mt-3 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary-500" style={{ width: `${c.progress ?? 0}%` }} />
            </div>
            <div className="mt-3 text-xs text-slate-500">{c.lessons ?? 8} lessons • {c.progress ?? 0}% complete</div>
          </Card>
        ))}
      </div>
    </div>
  )
}
