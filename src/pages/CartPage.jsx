import { useCartStore } from '../contexts/cart-store.js'
import { money } from '../utils/money.js'
import { Link } from 'react-router-dom'

export default function CartPage(){
  const items = useCartStore(s=>s.items)
  const setQty = useCartStore(s=>s.setQty)
  const remove = useCartStore(s=>s.remove)
  const totals = useCartStore(s=>s.totals)
  return (
    <div className="card p-5">
      <h2 className="text-xl font-bold">Your Cart</h2>
      {items.length===0 ? (
        <div className="text-gray-500 mt-3">Cart is empty. <Link className="btn-primary ml-2" to="/products">Shop now</Link></div>
      ) : (
        <div className="mt-3 overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-500">
              <tr>
                <th className="text-left p-2">Item</th>
                <th className="text-left p-2">Qty</th>
                <th className="text-left p-2">Price</th>
                <th className="text-left p-2">Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map(i => (
                <tr key={i.id} className="border-t border-gray-200">
                  <td className="p-2">{i.title}</td>
                  <td className="p-2"><input type="number" min="1" value={i.qty} onChange={e=>setQty(i.id, Math.max(1, parseInt(e.target.value||'1',10)))} className="input w-20"/></td>
                  <td className="p-2">{money(i.price)}</td>
                  <td className="p-2">{money(i.price * i.qty)}</td>
                  <td className="p-2"><button className="btn-ghost" onClick={()=>remove(i.id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 ml-auto max-w-sm space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><strong>{money(totals.subtotal)}</strong></div>
            <div className="flex justify-between"><span>Tax</span><strong>{money(totals.tax)}</strong></div>
            <div className="flex justify-between"><span>Shipping</span><strong>{money(totals.shipping)}</strong></div>
            <div className="flex justify-between text-lg font-extrabold"><span>Total</span><span>{money(totals.total)}</span></div>
            <Link to="/checkout" className="btn-primary w-full text-center">Proceed to Checkout</Link>
          </div>
        </div>
      )}
    </div>
  )
}
