import { useEffect, useState } from 'react'
import { listOrdersAdmin } from '../services/api.js'

export default function AdminOrders(){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{ setLoading(true); setError(''); setRows(await listOrdersAdmin()) }
      catch(e){ setError(e.message) }
      finally{ setLoading(false) }
    }
    load()
  },[])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Orders</h1>
      <div className="card overflow-auto">
        {loading ? <div className="p-4 text-gray-500">Loading...</div> : error ? <div className="p-4 text-red-600">{error}</div> : (
          <table className="min-w-full text-sm">
            <thead className="text-gray-500">
              <tr><th className="text-left p-3">Order</th><th className="text-left p-3">User</th><th className="text-left p-3">Total</th><th className="text-left p-3">Status</th><th className="text-left p-3">Created</th></tr>
            </thead>
            <tbody>
              {rows.map(o=> (
                <tr key={o.id} className="border-t border-gray-200">
                  <td className="p-3">#{o.id}</td>
                  <td className="p-3">{o.user_id}</td>
                  <td className="p-3">{Number(o.total).toFixed(2)} PKR</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">{o.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
