import { useState } from 'react'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'
import QuizCard from '@/components/QuizCard'
import { CourtroomAPI } from '@/lib/api'

export default function Courtroom() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<string>('')

  const handleRecommend = async () => {
    try {
      const { data } = await CourtroomAPI.getRecommendation(input)
      setResult(data.recommendation || 'No recommendation received.')
    } catch { setResult('Could not fetch recommendation (check Python service).') }
  }

  return (
    <div className="app-container py-10 space-y-6">
      <PageHeader title="Courtroom Simulation" subtitle="Assume roles, study case files, and argue with evidence." />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card title="Case Brief: Right to Privacy">
          <p className="text-sm text-slate-600">Read a summary and choose your role to proceed.</p>
          <ul className="mt-3 list-disc pl-5 text-sm text-slate-600">
            <li>Facts: Aadhar & privacy concerns</li>
            <li>Issue: Is privacy a fundamental right?</li>
            <li>Held: Recognized as intrinsic to life & liberty</li>
          </ul>
        </Card>
        <Card title="Your Role & Arguments">
          <textarea className="input h-32" placeholder="Type your argument points..." value={input} onChange={(e)=>setInput(e.target.value)} />
          <button className="btn mt-3" onClick={handleRecommend}>AI Assist (Python)</button>
          {result && <p className="mt-3 text-sm text-slate-700">{result}</p>}
        </Card>
        <Card title="Quick Check">
          <QuizCard q={{ id:'1', question:'Which Article ensures Right to Life?', options:['Art. 19','Art. 21','Art. 14','Art. 32'], answer:1 }} onAnswer={(ok)=>alert(ok? 'Correct!':'Try again')} />
        </Card>
      </div>
    </div>
  )
}
