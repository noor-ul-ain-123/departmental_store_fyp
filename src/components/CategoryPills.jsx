import clsx from 'clsx'

export default function CategoryPills({ categories, active, onChange }){
  return (
    <div className="flex flex-wrap gap-2">
      {['All', ...categories].map(c => (
        <button key={c} className={clsx('badge', active===c && 'bg-brand-500/20 border-brand-500/40 text-brand-200')} onClick={()=>onChange(c)}>{c}</button>
      ))}
    </div>
  )
}
