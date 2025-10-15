export default function AdminDashboard(){
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-extrabold">Overview</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[['Revenue','12,430 PKR'],['Orders','213'],['Customers','128'],['Items','254']].map(([label,val])=> (
          <div key={label} className="card p-5">
            <div className="text-sm text-gray-500">{label}</div>
            <div className="text-2xl font-extrabold">{val}</div>
          </div>
        ))}
      </div>
      <div className="card p-5">
        <div className="font-bold">Recent Activity</div>
        <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
          <li>New order #1024 created</li>
          <li>Inventory low for "Premium Basmati Rice"</li>
          <li>User john@example.com signed up</li>
        </ul>
      </div>
    </div>
  )
}
