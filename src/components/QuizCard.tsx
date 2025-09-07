interface Q {
  id: string
  question: string
  options: string[]
  answer?: number
}

export default function QuizCard({ q, onAnswer }: { q: Q, onAnswer: (correct: boolean) => void }) {
  return (
    <div className="card p-5">
      <div className="font-medium">{q.question}</div>
      <div className="mt-3 grid gap-2">
        {q.options.map((opt, i) => (
          <button key={i} className="input text-left hover:bg-primary-50" onClick={() => onAnswer(i === q.answer)}>{opt}</button>
        ))}
      </div>
    </div>
  )
}
