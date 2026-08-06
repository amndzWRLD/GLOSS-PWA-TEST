export default function DiscoveryBar({ filters, setFilters, categories, statuses, pricing }) {
  const toggle = (key, value, allValue = null) => {
    if (allValue && value === allValue) return setFilters((prev) => ({ ...prev, [key]: [] }))
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }))
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-20 rounded-2xl border border-gray-300
dark:border-white/[0.08] bg-gray-100/90
dark:bg-black/70 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] p-4 space-y-3">
      
      {/* Top row: logo + search */}
      <div className="flex items-center gap-3">
        <span className="font-black tracking-tighter text-xl leading-none flex-shrink-0"
          style={{ color: '#d9f80c', fontFamily: 'system-ui, sans-serif', letterSpacing: '-0.04em' }}>
          GLOSS
        </span>
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            className="w-full bg-white
dark:bg-zinc-900/80 rounded-xl border border-zinc-700/60 pl-9 pr-3 py-2 text-sm text-gray-900
dark:text-white placeholder-gray-500
dark:placeholder-zinc-500 focus:outline-none focus:border-zinc-500 transition-colors"
            placeholder="Buscar negocios, categorías o zonas"
            value={filters.query}
            onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))}
          />
        </div>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} onClick={() => toggle('categories', cat, 'All')}
            className={`h-7 px-3 rounded-full text-xs border transition-colors duration-150 ${
              filters.categories.includes(cat)
                ? 'bg-[#d9f80c] text-black border-[#d9f80c]'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700/60 hover:border-zinc-500'
            }`}>
            {cat}
          </button>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        {statuses.map((s) => (
          <button key={s} onClick={() => toggle('statuses', s)}
            className={`h-7 px-3 rounded-full text-xs border capitalize transition-colors duration-150 ${
              filters.statuses.includes(s)
                ? 'bg-white text-black border-white'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700/60 hover:border-zinc-500'
            }`}>
            {s}
          </button>
        ))}
        {pricing.map((p) => (
          <button key={p} onClick={() => toggle('pricingTiers', p)}
            className={`h-7 px-3 rounded-full text-xs border transition-colors duration-150 ${
              filters.pricingTiers.includes(p)
                ? 'bg-orange-500 text-black border-orange-400'
                : 'bg-zinc-900 text-zinc-300 border-zinc-700/60 hover:border-zinc-500'
            }`}>
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}