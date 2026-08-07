import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import OperationsConsole from '../features/operations/components/OperationsConsole'
import { useBookings } from '../hooks/useBookings'

export default function ProviderDashboard() {
  const { bookings } = useBookings()
  const { t } = useTranslation('common')

  return (
    <div className="min-h-screen bg-gloss-lightBg text-gray-900 p-4 pb-24 dark:bg-gloss-darkBg dark:text-white">
      <div className="max-w-7xl mx-auto space-y-5">

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-3xl font-semibold">{t('providerDashboard.title')}</h1>
            <p className="text-gray-500 text-sm dark:text-zinc-400">
              {t('providerDashboard.subtitle')}
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-400/10 text-emerald-300 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            {t('providerDashboard.liveBadge')}
          </div>
        </div>

        <OperationsConsole bookings={bookings} />

      </div>
      <BottomNav />
    </div>
  )
}