import { useEffect, useMemo, useState } from 'react'
import useQuery from '../hooks/useQuery.js'
import { listProducts } from '../services/api.js'
import ProductCard from '../components/ProductCard.jsx'
import CategoryPills from '../components/CategoryPills.jsx'

export default function Products(){
  const q = useQuery()

  const term = (q.get('q') || '')
  const catParam = q.get('category') || ''

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)

  // ✅ Start with URL category if present
  const [active, setActive] = useState(catParam || 'All')

  // ✅ master list of categories that should NOT change on filtering
  const [allCategories, setAllCategories] = useState([])

  // ✅ Load products (filtered)
  async function load(){
    const res = await listProducts({
      q: term,
      category: active === 'All' ? '' : active,
      page,
      page_size: 12
    })
    setItems(res.items)
    setTotal(res.total)
  }

  // ✅ Load categories ONCE from unfiltered products (not affected by active filter)
  async function loadCategoriesOnce(){
    try{
      const res = await listProducts({ q: '', category: '', page: 1, page_size: 200 })
      const cats = Array.from(new Set((res.items || []).map(i => i.category).filter(Boolean)))
      setAllCategories(cats)
    }catch(e){
      console.log('Failed to load categories:', e)
    }
  }

  // run once when page opens
  useEffect(()=>{ loadCategoriesOnce() }, [])

  // when URL category changes (from Home clicks), update active + reset page
  useEffect(() => {
    if (catParam && catParam !== active) {
      setActive(catParam)
      setPage(1)
    }
    if (!catParam && active !== 'All') {
      // if URL has no category, go back to All
      setActive('All')
      setPage(1)
    }
  }, [catParam])

  // load products when filters/search/page changes
  useEffect(()=>{ load() }, [term, active, page])

  // ✅ Categories shown in UI never disappear
  const categories = useMemo(() => [...allCategories], [allCategories])

  const pages = Math.max(1, Math.ceil(total/12))

  return (
    <div className="grid md:grid-cols-[220px,1fr] gap-4">
      <aside className="card p-4 h-max">
        <h3 className="font-bold">Filters</h3>
        <div className="mt-3">
          <CategoryPills
            categories={categories}
            active={active}
            onChange={(c)=>{ setActive(c); setPage(1) }}
          />
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
