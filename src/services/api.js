import { useAuth } from '../contexts/auth-store.js'
const BASE = 'http://localhost:8080/api'

export async function listProducts({ q='', category='', page=1, page_size=12 }={}){
  const url = new URL(`${BASE}/products`)
  if(q) url.searchParams.set('q', q)
  if(category) url.searchParams.set('category', category)
  url.searchParams.set('page', page)
  url.searchParams.set('page_size', page_size)
  const res = await fetch(url)
  if(!res.ok) throw new Error('Failed to load products')
  return await res.json() // { items, total, page, page_size }
}

export async function getProduct(id){
  const res = await fetch(`${BASE}/products/${id}`)
  if(!res.ok) throw new Error('Not found')
  return await res.json()
}

export async function createProduct(payload){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/products`, {
    method:'POST', headers:{'Content-Type':'application/json', ...hdr}, body: JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Create failed')
  return await res.json()
}

export async function updateProduct(id, payload){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/products/${id}`, {
    method:'PATCH', headers:{'Content-Type':'application/json', ...hdr}, body: JSON.stringify(payload)
  })
  if(!res.ok) throw new Error('Update failed')
  return await res.json()
}

export async function deleteProduct(id){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/products/${id}`, { method:'DELETE', headers:{...hdr} })
  if(!res.ok) throw new Error('Delete failed')
  return await res.json()
}

export async function uploadImage(file){
  const hdr = useAuth.getState().authHeader()
  const fd = new FormData()
  fd.append('file', file)
  const res = await fetch(`${BASE}/uploads`, { method:'POST', headers:{...hdr}, body: fd })
  if(!res.ok) throw new Error('Upload failed')
  return await res.json() // { url }
}

export async function createOrder(payload){
  const hdr = useAuth.getState().authHeader()
  console.log('auth hdr ->', hdr) // should log { Authorization: 'Bearer <jwt>' }
  const res = await fetch(`${BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...hdr },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new Error(`Order failed (${res.status})`)
  return await res.json()
}

export async function listOrdersAdmin(){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/orders`, { headers: { ...hdr }})
  if(!res.ok) throw new Error('Failed to load orders')
  return await res.json()
}

export async function listMyOrders(){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/my/orders`, { headers: { ...hdr }})
  if(!res.ok) throw new Error('Failed to load my orders')
  return await res.json()
}

export async function getMyOrder(id){
  const hdr = useAuth.getState().authHeader()
  const res = await fetch(`${BASE}/my/orders/${id}`, { headers: { ...hdr }})
  if(!res.ok) throw new Error('Not found')
  return await res.json()
}
