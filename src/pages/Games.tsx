import GameCard from '@/components/GameCard'
import PageHeader from '@/components/PageHeader'

export default function Games() {
  const games = [
    { title: 'Rights Rush', subtitle: 'Match articles to scenarios', difficulty: 'easy', estMinutes: 5 },
    { title: 'Preamble Builder', subtitle: 'Arrange keywords to form the Preamble', difficulty: 'medium', estMinutes: 7 },
    { title: 'Judicial Review', subtitle: 'Strike down unconstitutional laws', difficulty: 'hard', estMinutes: 10 },
  ] as const
  return (
    <div className="app-container py-10 space-y-6">
      <PageHeader title="Explore Games" subtitle="Play to retain better — each game targets a core concept." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {games.map((g, i) => <GameCard key={i} game={g as any} />)}
      </div>
    </div>
  )
}
