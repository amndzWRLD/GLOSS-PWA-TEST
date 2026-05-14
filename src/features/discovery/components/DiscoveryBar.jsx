export default function DiscoveryBar({ filters, setFilters, categories, statuses, pricing }) {
  const toggle = (key, value, allValue = null) => {
    if (allValue && value === allValue) return setFilters((prev) => ({ ...prev, [key]: [] }))
    setFilters((prev) => ({ ...prev, [key]: prev[key].includes(value) ? prev[key].filter((v) => v !== value) : [...prev[key], value] }))
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-black/65 backdrop-blur-xl p-4 space-y-3">
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-zinc-400">⌕</span>
        <input className="w-full bg-zinc-900/80 rounded-xl border border-zinc-700 pl-9 pr-3 py-2 text-sm" placeholder="Search providers or services" value={filters.query} onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))} />
      </div>
      <div className="flex gap-2 flex-wrap">{categories.map((cat) => <button key={cat} onClick={() => toggle('categories', cat, 'All')} className={`px-3 py-1.5 rounded-full text-xs border ${filters.categories.includes(cat) ? 'bg-[#d9f80c] text-black border-[#d9f80c]' : 'bg-zinc-900 text-zinc-300 border-zinc-700'}`}>{cat}</button>)}</div>
      <div className="flex gap-2 flex-wrap">{statuses.map((s) => <button key={s} onClick={() => toggle('statuses', s)} className={`px-3 py-1.5 rounded-full text-xs border capitalize ${filters.statuses.includes(s) ? 'bg-white text-black border-white' : 'bg-zinc-900 text-zinc-300 border-zinc-700'}`}>{s}</button>)}</div>
      <div className="flex gap-2 flex-wrap">{pricing.map((p) => <button key={p} onClick={() => toggle('pricingTiers', p)} className={`px-3 py-1 rounded-full text-xs border ${filters.pricingTiers.includes(p) ? 'bg-orange-500 text-black border-orange-400' : 'bg-zinc-900 text-zinc-300 border-zinc-700'}`}>{p}</button>)}</div>
    </div>
  )
}
