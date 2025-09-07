import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import { LearnAPI } from '@/lib/api'
import type { Course } from '@/types/models'

import { HeroLearn, LegislativeImg, ExecutiveImg, JudiciaryImg } from '@/assets'; 

const constitutionalBodies = [
  {
    image: LegislativeImg,
    title: 'Legislative',
    description: 'This course simplifies the Indian Legislature, exploring its structure, functions, lawmaking processes, and challenges, covering both the Lok Sabha and Rajya Sabha.'
  },
  {
    image: ExecutiveImg,
    title: 'Executive',
    description: 'This course simplifies the Indian Executive system, exploring the roles, powers, and functions of the President, Prime Minister, Governors, and Council of Ministers at Union and State levels.'
  },
  {
    image: JudiciaryImg,
    title: 'Judiciary',
    description: 'This course simplifies the Indian Judiciary, covering its structure, powers, judicial process, fundamental rights protection, focusing on the Supreme Court, High Courts, and Subordinate Courts.'
  },
];

const learningPath = [
  { part: 'Part I', title: 'The Union and its Territory', articles: 'Articles 1–4' },
  { part: 'Part II', title: 'Citizenship', articles: 'Articles 5–11' },
  { part: 'Part III', title: 'Fundamental Rights', articles: 'Articles 12–35' },
  { part: 'Part IV', title: 'Directive Principles of State Policy', articles: 'Articles 36–51' },
];

export default function Learn() {
  const [courses, setCourses] = useState<Course[]>([])
  useEffect(() => { (async () => {
    try { const { data } = await LearnAPI.listCourses(); setCourses(data.courses ?? []) } catch {}
  })() }, [])

  return (
    <>
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        className="relative text-center text-white bg-cover bg-center h-[60vh] flex items-center justify-center"
        style={{ backgroundImage: `url(${HeroLearn})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold">Learn the Constitution</h1>
          <p className="text-lg md:text-xl mt-4 max-w-2xl text-gray-200">
            Read simplified articles at your pace, and test your knowledge instantly with quizzes.
          </p>
        </div>
      </section>

      {/* New Section: Three Bodies of Constitution */}
      <section className="py-16 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Learning paths</h2>
        <h2 className="text-3xl font-bold text-gray-800 mb-12">Explore the three bodies of our Constitution</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {constitutionalBodies.map((body, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <img src={body.image} alt={body.title} className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">{body.title}</h3>
              <p className="text-sm text-gray-600 mb-4 h-24 flex items-center justify-center">{body.description}</p>
              <button className="w-full py-3 bg-[#0A2240] text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors">
                Learn more
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended Learning Path Section */}
      <section className="py-16 px-6 md:px-20 text-center bg-gray-50">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">Recommended Learning Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {learningPath.map((item, index) => (
            <NavLink
              key={index}
              to={`/learn/${item.part.toLowerCase().replace(/ /g, '-')}`}
              className="bg-[#0A2240] text-white p-8 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:bg-opacity-95"
            >
              <h3 className="text-sm font-semibold text-gray-300">{item.part}</h3>
              <p className="text-xl md:text-2xl font-bold mt-2">{item.title}</p>
              <p className="text-sm mt-2 text-gray-400">{item.articles}</p>
            </NavLink>
          ))}
        </div>
      </section>
    </div>

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
    </>
  )
}