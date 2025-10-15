// pages/SignIn.jsx
import { useState, useEffect } from 'react'
import { useAuth } from '../contexts/auth-store.js'
import { useNavigate, useLocation } from 'react-router-dom'

export default function SignIn(){
  const [email,setEmail] = useState('admin@example.com')
  const [password,setPassword] = useState('admin123')
  const [name,setName] = useState('')
  const [tab,setTab] = useState('login')
  const { user, isAdmin, login, register, logout } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname

  async function onLogin(e){
    e.preventDefault()
    try {
      await login(email, password)
      // Option A: immediate redirect based on current store values
      // (A useEffect below also handles this reliably after state update)
    } catch (e) {
      alert(e.message)
    }
  }

  async function onRegister(e){
    e.preventDefault()
    try{
      await register(name,email,password)
      alert('Registered! Now login.')
      setTab('login')
    }catch(e){ alert(e.message) }
  }

  useEffect(() => {
    if (!user) return
    // If we came from a protected page, go back there first
    if (from) {
      navigate(from, { replace: true })
    } else if (isAdmin) {
      navigate('/admin', { replace: true })
    } else {
      navigate('/', { replace: true })
    }
  }, [user, isAdmin, from, navigate])

  if(user){
    return (
      <div className="max-w-md mx-auto card p-6 space-y-2">
        <div className="font-bold">Signed in as {user.name} ({user.role})</div>
        <button className="btn-ghost" onClick={()=>logout()}>Logout</button>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto card p-6">
      <div className="flex gap-2 mb-4">
        <button className={`btn-ghost ${tab==='login'?'ring-2 ring-brand-500':''}`} onClick={()=>setTab('login')}>Login</button>
        <button className={`btn-ghost ${tab==='register'?'ring-2 ring-brand-500':''}`} onClick={()=>setTab('register')}>Register</button>
      </div>

      {tab==='login' ? (
        <form className="space-y-3" onSubmit={onLogin}>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/>
          <button className="btn-primary w-full">Continue</button>
        </form>
      ) : (
        <form className="space-y-3" onSubmit={onRegister}>
          <input className="input" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" required/>
          <input className="input" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" type="email" required/>
          <input className="input" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" required/>
          <button className="btn-primary w-full">Create account</button>
        </form>
      )}
    </div>
  )
}
