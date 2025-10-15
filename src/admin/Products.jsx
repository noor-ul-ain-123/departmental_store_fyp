import { useEffect, useState } from 'react'
import { listProducts, createProduct, deleteProduct, updateProduct, uploadImage } from '../services/api.js'

export default function AdminProducts(){
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [form, setForm] = useState({ title:'', price:'', category:'Grocery', rating:'', image:'', description:'' })
  const [editing, setEditing] = useState(null)

  async function load(){ const res = await listProducts({ q, page, page_size: 12 }); setItems(res.items); setTotal(res.total) }
  useEffect(()=>{ load() }, [page, q])

  function onChange(e){ setForm(f=> ({...f, [e.target.name]: e.target.value})) }

  async function onUpload(e){
    const file = e.target.files?.[0]; if(!file) return
    const { url } = await uploadImage(file)
    setForm(f=> ({...f, image: url}))
  }

  async function onCreate(e){
    e.preventDefault()
    await createProduct({ ...form, price:+form.price || 0, rating:+form.rating||0 })
    setForm({ title:'', price:'', category:'Grocery', rating:'', image:'', description:'' })
    load()
  }
  async function onDelete(id){ if(confirm('Delete?')){ await deleteProduct(id); load() } }
  async function onEditSave(e){
    e.preventDefault()
    await updateProduct(editing.id, { ...form, price:+form.price||0, rating:+form.rating||0 })
    setEditing(null); setForm({ title:'', price:'', category:'Grocery', rating:'', image:'', description:'' }); load()
  }
  function startEdit(p){ setEditing(p); setForm({ ...p, price:String(p.price), rating:String(p.rating) }) }

  const pages = Math.max(1, Math.ceil(total/12))

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Products (admin)</h1>
      <div className="card p-4 flex flex-wrap gap-2 items-center">
        <input className="input max-w-sm" placeholder="Search..." value={q} onChange={e=>{setQ(e.target.value); setPage(1)}}/>
        <div className="ml-auto text-sm text-gray-500">Total: {total}</div>
      </div>

      <form onSubmit={editing? onEditSave : onCreate} className="card p-4 grid md:grid-cols-2 gap-3">
        <input name="title" value={form.title} onChange={onChange} className="input" placeholder="Title" required/>
        <input name="price" value={form.price} onChange={onChange} className="input" placeholder="Price" required/>
        <input name="category" value={form.category} onChange={onChange} className="input" placeholder="Category" />
        <input name="rating" value={form.rating} onChange={onChange} className="input" placeholder="Rating" />
        <input name="image" value={form.image} onChange={onChange} className="input" placeholder="Image URL" />
        <input type="file" onChange={onUpload} className="input"/>
        <textarea name="description" value={form.description} onChange={onChange} className="input md:col-span-2" placeholder="Description"/>
        <div className="md:col-span-2 flex gap-2">
          <button className="btn-primary">{editing? 'Save Changes' : 'Create Product'}</button>
          {editing && <button type="button" className="btn-ghost" onClick={()=>{setEditing(null); setForm({ title:'', price:'', category:'Grocery', rating:'', image:'', description:'' })}}>Cancel</button>}
        </div>
      </form>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map(p => (
          <div key={p.id} className="card p-3">
            <img src={p.image} className="w-full h-40 object-cover rounded-xl"/>
            <div className="mt-2 font-semibold">{p.title}</div>
            <div className="text-sm text-gray-500">{p.price} PKR</div>
            <div className="mt-2 flex gap-2">
              <button className="btn-ghost" onClick={()=>startEdit(p)}>Edit</button>
              <button className="btn-ghost" onClick={()=>onDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 items-center">
        <button className="btn-ghost" disabled={page<=1} onClick={()=>setPage(p=>p-1)}>Prev</button>
        <div className="text-sm">Page {page} / {pages}</div>
        <button className="btn-ghost" disabled={page>=pages} onClick={()=>setPage(p=>p+1)}>Next</button>
      </div>
    </div>
  )
}
