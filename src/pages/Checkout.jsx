import { useCartStore } from '../contexts/cart-store.js'
import { useAuth } from '../contexts/auth-store.js'
import { Link } from 'react-router-dom'
import { money } from '../utils/money.js'
import { createOrder } from '../services/api.js'

export default function Checkout(){
  const items = useCartStore(s=>s.items)
  const totals = useCartStore(s=>s.totals)
  const clear = useCartStore(s=>s.clear)
  const { user } = useAuth()
  
  async function placeOrder(e){
    e.preventDefault()
    const state = useCartStore.getState()
    if(state.items.length===0 || state.totals.total<=0){ alert('Your cart is empty.'); return }
    try{ await createOrder({ items: state.items, total: state.totals.total }); alert('Order placed!'); clear() } catch(e){ alert('Order failed: '+e.message) }
  }
  if(!user){
    return (
      <div className="card p-6 space-y-3 max-w-md mx-auto">
        <div className="font-bold">Please sign in to checkout</div>
        <Link className="btn-primary" to="/signin" state={{ from: { pathname: '/checkout' } }}>Go to Sign In</Link>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <form onSubmit={placeOrder} className="card p-5 space-y-3">
        <h2 className="text-xl font-bold">Checkout</h2>
        <input className="input" placeholder="Full Name" required/>
        <input className="input" placeholder="Email" required type="email"/>
        <input className="input" placeholder="Phone" required/>
        <input className="input" placeholder="Address" required/>
        <button className="btn-primary" disabled={items.length===0 || totals.total<=0}>Pay {money(totals.total)}</button>
      </form>
      <div className="card p-5">
        <h3 className="font-bold">Order Summary</h3>
        <div className="text-sm text-gray-500 mt-2">This is a demo checkout.</div>
      </div>
    </div>
  )
}
