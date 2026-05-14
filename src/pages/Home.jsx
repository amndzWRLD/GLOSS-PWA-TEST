import { useMemo, useState } from 'react'
import BottomNav from '../components/BottomNav'
import MapShell from '../features/map/components/MapShell'
import DiscoveryBar from '../features/discovery/components/DiscoveryBar'
import { providers, categoryOptions, statusOptions, pricingOptions } from '../data/providers'

export default function Home() {
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [filters, setFilters] = useState({ query: '', categories: [], statuses: [], pricingTiers: [] })

  const filtered = useMemo(() => providers.filter((p) => {
    const queryOk = !filters.query || p.name.toLowerCase().includes(filters.query.toLowerCase()) || p.serviceCategories.join(' ').toLowerCase().includes(filters.query.toLowerCase())
    const catOk = filters.categories.length === 0 || filters.categories.includes('All') || filters.categories.some((c) => p.serviceCategories.includes(c))
    const statusOk = filters.statuses.length === 0 || filters.statuses.includes(p.status)
    const priceOk = filters.pricingTiers.length === 0 || filters.pricingTiers.includes(p.pricingTier)
    return queryOk && catOk && statusOk && priceOk
  }), [filters])

  return (
    <div className="min-h-screen bg-black text-white p-3 pb-24">
      <div className="relative">
        <DiscoveryBar filters={filters} setFilters={setFilters} categories={categoryOptions} statuses={statusOptions} pricing={pricingOptions} />
        <MapShell providers={filtered} selectedProvider={selectedProvider} onSelect={setSelectedProvider} onClose={() => setSelectedProvider(null)} />
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-white/10 bg-zinc-950/75 backdrop-blur p-3 text-xs text-zinc-300 flex justify-between">
          <span>Active providers: <strong className="text-white">{filtered.filter((p) => p.status === 'available').length}</strong></span>
          <span>Throughput: <strong className="text-white">41 req/hr</strong></span>
          <span className="text-emerald-400">● Platform Healthy</span>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
