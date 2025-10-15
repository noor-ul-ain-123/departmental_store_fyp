import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-brand-100 to-white p-8 md:p-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Daily Essentials, Delivered Fast</h1>
          <p className="mt-3 text-gray-600">Shop groceries, personal care, and household items with a sleek, modern experience.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/products" className="btn-primary">Start Shopping</Link>
            <a href="#features" className="btn-ghost">See Features</a>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-72 h-72 rounded-full bg-brand-300/30 blur-3xl"></div>
      </section>

      <section id="features" className="grid md:grid-cols-3 gap-4">
        {[
          ['⏱️','Fast delivery','Instant Delivery providers'],
          ['🔐','Secure checkout','Your data stays safe'],
          ['⭐','Top-rated items','Curated by customers']
        ].map(([icon,title,desc])=> (
          <div key={title} className="card p-5">
            <div className="text-2xl">{icon}</div>
            <div className="mt-2 font-bold">{title}</div>
            <div className="text-gray-500">{desc}</div>
          </div>
        ))}
      </section>

      <section className="card p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Popular Categories</h2>
          <Link to="/products" className="link">View all</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-3">
          {['Grocery','Bakery','Snacks','Personal Care','Household','Electronics'].map(c=>(
            <Link key={c} to={`/products?category=${encodeURIComponent(c)}`} className="card p-4 text-center hover:border-brand-500/40">
              {c}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
