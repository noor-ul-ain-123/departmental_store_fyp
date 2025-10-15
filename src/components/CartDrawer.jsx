import { Link } from 'react-router-dom'
import { useCartStore } from '../contexts/cart-store.js'
import { money } from '../utils/money.js'

export default function CartDrawer({ open, onClose }){
  const items = useCartStore(s=>s.items)
  const remove = useCartStore(s=>s.remove)
  const setQty = useCartStore(s=>s.setQty)
  const totals = useCartStore(s=>s.totals)
  return (
    <div className={`fixed inset-0 z-50 ${open? '' : 'pointer-events-none'}`}>
      <div className={`absolute inset-0 bg-black/50 transition-opacity ${open?'opacity-100':'opacity-0'}`} onClick={onClose}></div>
      <aside className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white border-l border-gray-200 p-4 transition-transform ${open? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Your Cart</h3>
          <button className="btn-ghost" onClick={onClose}>Close</button>
        </div>
        <div className="mt-4 space-y-3 max-h-[65vh] overflow-auto pr-1">
          {items.length===0 && <div className="text-gray-500">Your cart is empty.</div>}
          {items.map(i => (
            <div key={i.id} className="flex gap-3 items-center border border-gray-200 rounded-xl p-2">
              <img src={i.image} alt={i.title} className="w-16 h-16 rounded-lg object-cover"/>
              <div className="flex-1">
                <div className="font-semibold">{i.title}</div>
                <div className="text-sm text-gray-500">{money(i.price)} • {i.category}</div>
                <div className="flex gap-2 items-center mt-1">
                  <input type="number" min="1" value={i.qty} onChange={e=>setQty(i.id, Math.max(1, parseInt(e.target.value||'1',10)))} className="input w-20"/>
                  <button className="btn-ghost" onClick={()=>remove(i.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
          <div className="flex justify-between text-sm"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
          <div className="flex justify-between text-sm"><span>Tax</span><strong>{money(totals.tax)}</strong></div>
          <div className="flex justify-between text-sm"><span>Shipping</span><strong>{money(totals.shipping)}</strong></div>
          <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(totals.total)}</span></div>
          <Link to="/checkout" className="btn-primary w-full text-center" onClick={onClose}>Checkout</Link>
        </div>
      </aside>
    </div>
  )
}
