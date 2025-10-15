import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listMyOrders } from '../services/api.js'
import { money } from '../utils/money.js'

export default function Orders(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{ setLoading(true); setError(''); setRows(await listMyOrders()) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    }
    load()
  },[])

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">My Orders</h2>
      {loading ? <div className="card p-5 text-gray-500">Loading...</div> : error ? <div className="card p-5 text-red-600">{error}</div> : rows.length===0 ? (
        <div className="card p-5 text-gray-500">No orders yet.</div>
      ) : (
        <div className="card overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-gray-500"><tr><th className="text-left p-3">Order</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="text-left p-3">Created</th><th></th></tr></thead>
            <tbody>
              {rows.map(o=> (
                <tr key={o.id} className="border-t border-gray-200">
                  <td className="p-3">#{o.id}</td>
                  <td className="p-3">{money(o.total)}</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">{o.created_at}</td>
                  <td className="p-3"><Link className="link" to={`/orders/${o.id}`}>View</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

