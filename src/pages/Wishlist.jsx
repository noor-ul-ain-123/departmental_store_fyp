import { useWishlist } from '../contexts/wishlist-store.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Wishlist(){
  const { items, clear } = useWishlist()
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Wishlist</h2>
        {items.length>0 && <button className="btn-ghost" onClick={clear}>Clear</button>}
      </div>
      {items.length===0 ? (
        <div className="card p-5 text-gray-500">No items saved yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} p={p}/>) }
        </div>
      )}
    </div>
  )
}

