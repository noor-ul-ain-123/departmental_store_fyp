import { useEffect, useMemo, useState } from 'react'
import useQuery from '../hooks/useQuery.js'
import { listProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'
import CategoryPills from '../components/CategoryPills.jsx'

export default function Products(){
  const q = useQuery()
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [active, setActive] = useState('All')

  const term = (q.get('q')||'')
  const catParam = q.get('category') || ''

  async function load(){
    const res = await listProducts({ q: term, category: active==='All'?'':active, page, page_size: 12 })
    setItems(res.items); setTotal(res.total)
  }
  useEffect(()=>{ load() }, [term, active, page])
  useEffect(()=>{ if(catParam) setActive(catParam); }, [catParam])

  const categories = useMemo(()=> Array.from(new Set(items.map(i=>i.category))), [items])
  const pages = Math.max(1, Math.ceil(total/12))

  return (
    <div className="grid md:grid-cols-[220px,1fr] gap-4">
      <aside className="card p-4 h-max">
        <h3 className="font-bold">Filters</h3>
        <div className="mt-3">
          <CategoryPills categories={categories} active={active} onChange={(c)=>{ setActive(c); setPage(1) }}/>
        </div>
      </aside>
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Products</h2>
          <div className="text-sm text-gray-500">{total} items</div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(p => <ProductCard key={p.id} p={p}/>)}
        </div>
        <div className="flex gap-2 items-center">
          <button className="btn-ghost" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
          <div className="text-sm">Page {page} / {pages}</div>
          <button className="btn-ghost" disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Next</button>
        </div>
      </section>
    </div>
  )
}
