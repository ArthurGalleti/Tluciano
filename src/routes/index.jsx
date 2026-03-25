import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom'
import { DefaultLayout } from '../layouts/DefaultLayout'
import Landing from '../pages/Landing'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Account from '../pages/Account'
import Orders from '../pages/Orders'
import Product from '../pages/Product'
import Restaurant from '../pages/Restaurant'
import { useAuth } from '../contexts/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) return <Navigate to="/login" state={{ from: location.pathname }} replace />
  return children
}

const router = createBrowserRouter([
  {
    element: <DefaultLayout />,
    children: [
      { path: '/', element: <Landing /> },
      { path: '/home', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      {
        path: '/account',
        element: <ProtectedRoute><Account /></ProtectedRoute>,
      },
      {
        path: '/orders',
        element: <ProtectedRoute><Orders /></ProtectedRoute>,
      },
      { path: '/product/:id', element: <Product /> },
      { path: '/restaurant/:id', element: <Restaurant /> },
    ],
  },
])

export default router
