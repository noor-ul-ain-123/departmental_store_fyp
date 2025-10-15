import { useEffect, useState } from 'react'

function load(){ try{ return JSON.parse(localStorage.getItem('addresses')||'[]') } catch{ return [] } }
function save(items){ localStorage.setItem('addresses', JSON.stringify(items)) }

export default function Addresses(){
  const [items, setItems] = useState(load())
  const [form, setForm] = useState({ name:'', line1:'', city:'', region:'', zip:'' })

  useEffect(()=>{ save(items) }, [items])

  function onChange(e){ setForm(f=> ({...f, [e.target.name]: e.target.value})) }
  function add(e){ e.preventDefault(); if(!form.name || !form.line1) return; setItems(arr=> [...arr, form]); setForm({ name:'', line1:'', city:'', region:'', zip:'' }) }
  function remove(i){ setItems(arr=> arr.filter((_,idx)=> idx!==i)) }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold">My Addresses</h2>
      <form onSubmit={add} className="card p-4 grid md:grid-cols-2 gap-3">
        <input name="name" value={form.name} onChange={onChange} className="input" placeholder="Full Name" required/>
        <input name="line1" value={form.line1} onChange={onChange} className="input" placeholder="Address Line" required/>
        <input name="city" value={form.city} onChange={onChange} className="input" placeholder="City"/>
        <input name="region" value={form.region} onChange={onChange} className="input" placeholder="State/Region"/>
        <input name="zip" value={form.zip} onChange={onChange} className="input" placeholder="ZIP"/>
        <div className="md:col-span-2"><button className="btn-primary">Add Address</button></div>
      </form>

      <div className="grid gap-3">
        {items.map((a,idx)=> (
          <div key={idx} className="card p-4 flex items-center justify-between">
            <div>
              <div className="font-semibold">{a.name}</div>
              <div className="text-sm text-gray-500">{a.line1}, {a.city} {a.region} {a.zip}</div>
            </div>
            <button className="btn-ghost" onClick={()=>remove(idx)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}

