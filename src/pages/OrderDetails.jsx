import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMyOrder } from '../services/api.js'
import { money } from '../utils/money.js'

export default function OrderDetails(){
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{ setError(''); setOrder(await getMyOrder(id)) }
      catch(e){ setError(e.message) }
    }
    load()
  },[id])

  if(error) return <div className="card p-5 text-red-600">{error}</div>
  if(!order) return <div className="card p-5 text-gray-500">Loading...</div>

  return (
    <div className="space-y-4">
      <div className="card p-5">
        <h2 className="text-xl font-bold">Order #{order.id}</h2>
        <div className="text-sm text-gray-500">Status: {order.status} • Placed: {order.created_at}</div>
      </div>
      <div className="card overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-gray-500"><tr><th className="text-left p-3">Item</th><th className="text-left p-3">Qty</th><th className="text-left p-3">Price</th><th className="text-left p-3">Subtotal</th></tr></thead>
          <tbody>
            {(order.items||[]).map(it=> (
              <tr key={it.id} className="border-t border-gray-200">
                <td className="p-3">{it.title}</td>
                <td className="p-3">{it.qty}</td>
                <td className="p-3">{money(it.price)}</td>
                <td className="p-3">{money(Number(it.price)*Number(it.qty))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-5 flex justify-end text-lg font-extrabold">Total: {money(order.total)}</div>
    </div>
  )
}

