import { useAuth } from '../contexts/auth-store.js'

export default function Profile(){
  const { user, logout } = useAuth()
  return (
    <div className="card p-5 space-y-3 max-w-lg">
      <h2 className="text-xl font-bold">My Profile</h2>
      {user ? (
        <>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-gray-500">Name</div><div className="font-semibold">{user.name}</div>
            <div className="text-gray-500">Email</div><div className="font-semibold">{user.email}</div>
            <div className="text-gray-500">Role</div><div className="font-semibold">{user.role}</div>
          </div>
          <div className="pt-2"><button className="btn-ghost" onClick={()=>logout()}>Logout</button></div>
        </>
      ) : (
        <div className="text-gray-500">You are not signed in.</div>
      )}
    </div>
  )
}

