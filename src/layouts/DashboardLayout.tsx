import { Outlet } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 space-y-6">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
