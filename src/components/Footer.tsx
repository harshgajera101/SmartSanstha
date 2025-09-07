export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="app-container py-8 grid md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2">
            <img src="/src/assets/logo.svg" className="h-8 w-8" />
            <span className="font-bold">SmartSanstha</span>
          </div>
          <p className="mt-3 text-sm text-slate-600">Constitutional literacy made simple, gamified, and AI-powered.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-1 text-sm">
            <li><a className="link" href="/learn">Learn</a></li>
            <li><a className="link" href="/courtroom">Courtroom</a></li>
            <li><a className="link" href="/games">Games</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Contact</h4>
          <p className="text-sm">hello@smartsanstha.app</p>
        </div>
      </div>
      <div className="border-t border-slate-100 text-center py-4 text-xs text-slate-500">© {new Date().getFullYear()} SmartSanstha. All rights reserved.</div>
    </footer>
  )
}
