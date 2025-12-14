import { create } from 'zustand'
import { useCartStore } from './cart-store.js'

const API = 'http://localhost:8080/api'
const saved = JSON.parse(localStorage.getItem('auth') || 'null')

export const useAuth = create((set, get) => ({
  user: saved?.user || null,
  token: saved?.token || null,
  isAdmin: saved?.user?.role === 'admin' || false,

  async login(email, password) {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data?.error || 'Login failed')

    set({ user: data.user, token: data.token, isAdmin: data.user?.role === 'admin' })
    localStorage.setItem('auth', JSON.stringify({ user: data.user, token: data.token }))
  },

  // ✅ UPDATED: accept payload object (name, city, contact_number, email, password)
  async register(payload) {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data?.error || 'Register failed')

    return data
  },

  logout() {
    set({ user: null, token: null, isAdmin: false })
    localStorage.removeItem('auth')
    try { useCartStore.getState().clear() } catch {}
  },

  authHeader() {
    const t = get().token
    return t ? { Authorization: `Bearer ${t}` } : {}
  }
}))