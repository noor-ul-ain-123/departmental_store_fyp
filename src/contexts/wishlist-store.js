import { create } from 'zustand'

function load(){ try{ return JSON.parse(localStorage.getItem('wishlist-items')||'[]') } catch{ return [] } }
function save(items){ localStorage.setItem('wishlist-items', JSON.stringify(items)) }

export const useWishlist = create((set,get)=> ({
  items: load(),
  add: (item)=> set(state=>{ if(state.items.find(i=>i.id===item.id)) return {};
    const items=[...state.items, item]; save(items); return { items } }),
  remove: (id)=> set(state=>{ const items=state.items.filter(i=>i.id!==id); save(items); return { items } }),
  clear: ()=> set(()=>{ save([]); return { items:[] } }),
  has: (id)=> !!get().items.find(i=>i.id===id),
}))


