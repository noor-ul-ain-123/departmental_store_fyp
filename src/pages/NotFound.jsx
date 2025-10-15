import { Link } from 'react-router-dom'

export default function NotFound(){
  return (
    <div className="text-center space-y-4">
      <div className="text-7xl">🧐</div>
      <h1 className="text-2xl font-extrabold">Page not found</h1>
      <div className="text-gray-500">The page you requested doesn’t exist.</div>
      <Link to="/" className="btn-primary">Go Home</Link>
    </div>
  )
}


