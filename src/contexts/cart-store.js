import { create } from 'zustand'

function computeTotals(items){
  const subtotal = items.reduce((s,i)=> s + Number(i.price) * Number(i.qty), 0)
  const tax = +(subtotal * 0.08).toFixed(2)
  const shipping = subtotal>0 ? 8 : 0
  const total = +(subtotal + tax + shipping).toFixed(2)
  return { subtotal, tax, shipping, total }
}

export const useCartStore = create((set, get) => ({
  items: JSON.parse(localStorage.getItem('cart-items')||'[]'),
  drawerOpen: false,
  add: (item, qty=1)=> set(state => {
    const exist = state.items.find(i=>i.id===item.id)
    const items = exist ? state.items.map(i=> i.id===item.id ? {...i, qty: i.qty + qty} : i) : [...state.items, {...item, qty}]
    localStorage.setItem('cart-items', JSON.stringify(items))
    return { items }
  }),
  remove: (id)=> set(state=>{
    const items = state.items.filter(i=>i.id!==id)
    localStorage.setItem('cart-items', JSON.stringify(items))
    return { items }
  }),
  setQty: (id, qty)=> set(state=>{
    const items = state.items.map(i=> i.id===id ? {...i, qty: Math.max(1, qty)} : i)
    localStorage.setItem('cart-items', JSON.stringify(items))
    return { items }
  }),
  clear: ()=> set(()=>{ localStorage.setItem('cart-items','[]'); return {items:[]} }),
  openDrawer: ()=> set({ drawerOpen: true }),
  closeDrawer: ()=> set({ drawerOpen: false }),
  toggleDrawer: ()=> set(s=> ({ drawerOpen: !s.drawerOpen })),
  get totals(){ return computeTotals(get().items) },
  get count(){ return get().items.reduce((s,i)=> s+i.qty, 0) },
}))

export function CartProvider({ children }){ return children }
