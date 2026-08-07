import { useTranslation } from 'react-i18next'

const cards = [
  { labelKey: 'dashboard.todayBookings', value: '14', icon: '🗓' },
  { labelKey: 'dashboard.requestThroughput', value: '38/hr', icon: '📶' },
  { labelKey: 'dashboard.avgLatency', value: '142ms', icon: '⏱' },
  { labelKey: 'dashboard.ratingSummary', value: '4.92', icon: '⭐' },
]

export default function DetailerOpsDashboard() {
  const { t } = useTranslation()

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-zinc-400 text-sm">{t('dashboard.earningsSummary')}</p>
            <h2 className="text-3xl font-bold text-[#d9f80c]">$12,480</h2>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">◉ {t('dashboard.available')}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map(({ labelKey, value, icon }) => (
          <div key={labelKey} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
            <p className="mb-2">{icon}</p>
            <p className="text-xl font-semibold">{value}</p>
            <p className="text-xs text-zinc-400">{t(labelKey)}</p>
          </div>
        ))}
      </div>
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4">
        <p className="text-sm text-zinc-400 mb-2">{t('dashboard.quickActions')}</p>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-2 rounded-xl bg-[#d9f80c] text-black text-sm font-semibold">{t('dashboard.manageServices')}</button>
          <button className="px-3 py-2 rounded-xl border border-zinc-700 text-sm">{t('dashboard.acceptRequests')}</button>
          <button className="px-3 py-2 rounded-xl border border-zinc-700 text-sm">{t('dashboard.viewAnalytics')}</button>
        </div>
      </div>
    </div>
  )
}
