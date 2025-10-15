import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../contexts/auth-store.js'

export default function RequireAuth({ children }){
  const { user } = useAuth()
  const location = useLocation()
  if(!user){
    return <Navigate to="/signin" replace state={{ from: location }} />
  }
  return children
}


