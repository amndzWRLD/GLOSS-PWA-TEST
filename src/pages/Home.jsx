import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import MapShell from '../features/map/components/MapShell'
import DiscoveryBar from '../features/discovery/components/DiscoveryBar'
import { providers, categoryOptions, statusOptions, pricingOptions } from '../data/providers'
import ThemeToggle from '../components/ThemeToggle'
import LanguageSwitcher from '../components/LanguageSwitcher'

export default function Home() {
  const { t } = useTranslation('common')
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
    <div className="min-h-screen bg-gloss-lightBg text-gray-900 dark:bg-gloss-darkBg dark:text-white p-4 pb-24 transition-colors duration-300">
      <div className="relative">
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
        <DiscoveryBar filters={filters} setFilters={setFilters} categories={categoryOptions} statuses={statusOptions} pricing={pricingOptions} />
        <MapShell providers={filtered} selectedProvider={selectedProvider} onSelect={setSelectedProvider} onClose={() => setSelectedProvider(null)} />
        <div className="absolute bottom-4 left-4 right-4 z-20 rounded-2xl border border-gloss-lightBorder dark:border-gloss-darkBorder bg-gloss-lightCard/80 dark:bg-gloss-darkCard/80 backdrop-blur-md h-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] px-3 flex items-center justify-between">
          <span><span className="text-gray-500 dark:text-zinc-400 text-xs">{t('home.activeProviders')}</span> <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">{filtered.filter((p) => p.status === 'available').length}</span></span>
          <span><span className="text-gray-500 dark:text-zinc-400 text-xs">{t('home.throughput')}</span> <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">{t('home.throughputValue')}</span></span>
          <span className="flex items-center"><span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" /><span className="text-gray-500 dark:text-zinc-400 text-xs">{t('home.platformHealthy')}</span></span>
        </div>
      </div>
      <BottomNav />
    </div>
  )
}
