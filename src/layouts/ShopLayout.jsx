import { Link, Outlet, useNavigate } from 'react-router-dom'
import { useCartStore } from '../contexts/cart-store.js'
import { useAuth } from '../contexts/auth-store.js'
import CartDrawer from '../components/CartDrawer.jsx'
import { useState } from 'react'

export default function ShopLayout(){
  const count = useCartStore(s => s.count)
  const drawerOpen = useCartStore(s => s.drawerOpen)
  const openDrawer = useCartStore(s => s.openDrawer)
  const closeDrawer = useCartStore(s => s.closeDrawer)
  const { user, isAdmin, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  function onSearch(e){
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')
    navigate(`/products?q=${encodeURIComponent(q||'')}`)
  }

  return (
    <div>
      <nav className="navglass">
        <div className="container-pro flex items-center gap-3 py-3">
          <Link to="/" className="text-lg font-extrabold tracking-tight">🛍️ Dept.Store <span className="text-brand-400">Pro</span></Link>
          <button className="sm:hidden btn-ghost" onClick={()=>setMenuOpen(o=>!o)} aria-label="Toggle menu">☰</button>
          <form onSubmit={onSearch} className="flex-1 max-w-xl ml-2">
            <input name="q" className="input" placeholder="Search for milk, shampoo, rice..." />
          </form>
          <div className="flex items-center gap-2">
            <Link className="btn-ghost" to="/deals">Deals</Link>
            <Link className="btn-ghost hidden sm:inline-flex" to="/help">Help</Link>
            <Link className="btn-ghost hidden sm:inline-flex" to="/contact">Contact</Link>
            {user ? (
              <>
                {isAdmin && <Link className="btn-ghost" to="/admin">Admin</Link>}
                <Link className="btn-ghost" to="/account">Account</Link>
                <button className="btn-ghost" onClick={()=>logout()}>Logout</button>
              </>
            ) : (
              <Link className="btn-ghost" to="/signin">Account</Link>
            )}
            <button className="btn-primary" onClick={openDrawer}>Cart ({count})</button>
          </div>
        </div>
        {menuOpen && (
          <div className="sm:hidden border-t border-gray-200">
            <div className="container-pro py-3 flex flex-col gap-2 text-sm">
              <Link className="link" to="/products" onClick={()=>setMenuOpen(false)}>Shop</Link>
              <Link className="link" to="/deals" onClick={()=>setMenuOpen(false)}>Deals</Link>
              <Link className="link" to="/wishlist" onClick={()=>setMenuOpen(false)}>Wishlist</Link>
              {user && <Link className="link" to="/orders" onClick={()=>setMenuOpen(false)}>My Orders</Link>}
              <Link className="link" to="/help" onClick={()=>setMenuOpen(false)}>Help</Link>
              <Link className="link" to="/contact" onClick={()=>setMenuOpen(false)}>Contact</Link>
            </div>
          </div>
        )}
      </nav>
      <main className="container-pro py-6">
        <Outlet/>
      </main>
      <footer className="border-t border-gray-200">
        <div className="container-pro py-10 text-sm text-gray-500 grid gap-4 sm:grid-cols-3">
          <div>© {new Date().getFullYear()} Dept.Store Pro</div>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="link">Shop</Link>
            <Link to="/deals" className="link">Deals</Link>
            <Link to="/help" className="link">Help</Link>
            <Link to="/contact" className="link">Contact</Link>
            <Link to="/about" className="link">About</Link>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link to="/returns" className="link">Returns</Link>
            <Link to="/shipping" className="link">Shipping</Link>
            <Link to="/privacy" className="link">Privacy</Link>
            <Link to="/terms" className="link">Terms</Link>
            {user ? <Link to="/orders" className="link">My Orders</Link> : <Link to="/signin" className="link">Sign In</Link>}
          </div>
        </div>
      </footer>
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </div>
  )
}
