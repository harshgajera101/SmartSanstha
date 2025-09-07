import Hero from '@/components/Hero'
import FeatureCards from '@/components/FeatureCards'
import StatStrip from '@/components/StatStrip'
import PageHeader from '@/components/PageHeader'
import Card from '@/components/Card'

export default function Home() {
  return (
    <>
      <Hero />
      <FeatureCards />
      <StatStrip />
      <section className="app-container py-12 grid md:grid-cols-2 gap-6">
        <Card title="Courtroom Simulation">
          <p className="text-slate-600">Guided, step-by-step simulations where you can assume roles and debate landmark cases.</p>
        </Card>
        <Card title="Explore Games">
          <p className="text-slate-600">Quick games that reinforce topics like Fundamental Rights, DPSP, and Federalism.</p>
        </Card>
      </section>
      <section className="app-container pb-16">
        <PageHeader title="What you’ll master" subtitle="Legislature, Executive, Judiciary — with current affairs context." />
        <div className="grid md:grid-cols-3 gap-4">
          {["Legislature", "Executive", "Judiciary"].map((t) => (
            <Card key={t} title={t}>
              <p className="text-slate-600">Structured modules, flashcards, and quick quizzes.</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}
