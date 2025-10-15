import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProduct } from '../services/api.js'
import { money } from '../utils/money.js'
import { useCartStore } from '../contexts/cart-store.js'

export default function Product(){
  const { id } = useParams()
  const [p, setP] = useState(null)
  const add = useCartStore(s=>s.add)

  useEffect(()=>{ getProduct(id).then(setP) },[id])
  if(!p) return <div>Loading...</div>

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="card p-3">
        <img src={p.image} alt={p.title} className="w-full h-[380px] object-cover rounded-xl"/>
      </div>
      <div className="card p-5">
        <h1 className="text-2xl font-extrabold">{p.title}</h1>
        <div className="text-gray-500">{p.category} • ⭐ {p.rating}</div>
        <div className="text-3xl font-extrabold mt-3">{money(p.price)}</div>
        <p className="text-gray-600 mt-3">{p.description}</p>
        <div className="mt-5 flex gap-3">
          <button onClick={()=>add(p,1)} className="btn-primary">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}
