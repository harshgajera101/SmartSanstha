import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* <Navbar /> */}
      <main className="flex-1">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  )
}
