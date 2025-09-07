import PageHeader from '@/components/PageHeader'
export default function Contact() {
  return (
    <div className="app-container py-10 space-y-4">
      <PageHeader title="Contact" />
      <form className="max-w-lg space-y-3">
        <div>
          <label className="label">Name</label>
          <input className="input" placeholder="Your name" />
        </div>
        <div>
          <label className="label">Email</label>
          <input className="input" placeholder="you@example.com" />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea className="input h-32" placeholder="How can we help?" />
        </div>
        <button className="btn">Send</button>
      </form>
    </div>
  )
}
