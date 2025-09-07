import { RouteObject, Navigate } from 'react-router-dom'
import SiteLayout from '@/layouts/SiteLayout'
import DashboardLayout from '@/layouts/DashboardLayout'
import Home from '@/pages/Home'
import Learn from '@/pages/Learn'
import Courtroom from '@/pages/Courtroom'
import Games from '@/pages/Games'
import Blog from '@/pages/Blog'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Dashboard from '@/pages/Dashboard'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import NotFound from '@/pages/NotFound'
import ProtectedRoute from '@/components/ProtectedRoute'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'learn', element: <Learn /> },
      { path: 'courtroom', element: <Courtroom /> },
      { path: 'games', element: <Games /> },
      { path: 'blog', element: <Blog /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ]
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: '*', element: <Navigate to="/dashboard" /> }
    ]
  },
  { path: '*', element: <NotFound /> }
]

export default routes

