import { Link } from 'react-router-dom'
import { money } from '../utils/money.js'
import { useCartStore } from '../contexts/cart-store.js'
import { useWishlist } from '../contexts/wishlist-store.js'

export default function ProductCard({ p }){
  const add = useCartStore(s=>s.add)
  const openDrawer = useCartStore(s=>s.openDrawer)
  const { add: addWish, remove: removeWish, has } = useWishlist()
  return (
    <div className="card p-3 hover:shadow-xl hover:shadow-brand-500/10 transition">
      <Link to={`/products/${p.id}`}><img src={p.image} alt={p.title} className="w-full h-44 object-cover rounded-xl"/></Link>
      <div className="mt-2 flex items-start justify-between gap-2">
        <div>
          <div className="font-semibold leading-tight">{p.title}</div>
          <div className="text-sm text-gray-500">{p.category}</div>
        </div>
        <div className="text-right">
          <div className="font-extrabold">{money(p.price)}</div>
          <button className="text-xs link" onClick={()=> (has(p.id) ? removeWish(p.id) : addWish(p))}>{has(p.id)?'♥ In Wishlist':'♡ Wishlist'}</button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <span className="badge">⭐ {p.rating}</span>
        <button className="btn-primary" onClick={()=>{ add(p,1); openDrawer(); }}>Add</button>
      </div>
    </div>
  )
}
