import { useEffect, useState } from 'react'
import { listProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'

export default function Deals(){
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    async function load(){
      try{ setLoading(true); setError(''); const res = await listProducts({ page:1, page_size: 12 });
        const sorted = [...res.items].sort((a,b)=> Number(b.rating)-Number(a.rating)).slice(0,12)
        setItems(sorted)
      }catch(e){ setError(e.message) } finally{ setLoading(false) }
    }
    load()
  },[])

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">Deals & Top-rated</h2>
      {loading ? <div className="card p-5 text-gray-500">Loading...</div> : error ? <div className="card p-5 text-red-600">{error}</div> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(p=> <ProductCard key={p.id} p={p}/>) }
        </div>
      )}
    </div>
  )
}

