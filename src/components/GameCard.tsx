import { Link } from 'react-router-dom'
import type { Game } from '@/types/models'

export default function GameCard({ game }: { game: Game }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold">{game.title}</h3>
        <span className="badge">{game.difficulty}</span>
      </div>
      {game.subtitle && <p className="text-sm text-slate-600 mt-1">{game.subtitle}</p>}
      <div className="mt-4 flex justify-between items-center text-sm text-slate-600">
        <span>{game.estMinutes ?? 10} mins</span>
        <Link to="#" className="btn">Play</Link>
      </div>
    </div>
  )
}
