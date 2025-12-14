import { Link, Outlet } from 'react-router-dom'

import { useAuth } from '../contexts/auth-store.js'
import { Navigate } from 'react-router-dom'
export default function AdminLayout() {
  const { isAdmin } = useAuth()
  console.log(isAdmin);

  if (!isAdmin) return <Navigate to="/signin" replace />

  return (
    <div className="min-h-screen grid md:grid-cols-[240px,1fr]">
      <aside className="bg-white border-r border-gray-200 p-4">
        <div className="font-extrabold text-lg">🛍️ Admin</div>
        <nav className="mt-4 flex flex-col gap-2 text-sm">
          <Link to="/admin" className="link">Dashboard</Link>
          <Link to="/admin/products" className="link">Products</Link>
          <Link to="/admin/orders" className="link">Orders</Link>
          <Link to="/" className="link">Back to Store</Link>
        </nav>
      </aside>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}
