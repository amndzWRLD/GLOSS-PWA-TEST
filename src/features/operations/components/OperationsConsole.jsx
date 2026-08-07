import { useTranslation } from 'react-i18next'
import { opsKpis, activityFeed, payoutSummary } from '../data/operationsMock'
import BookingsTable from '../../bookings/components/BookingsTable'
import AvailabilityControl from '../../availability/components/AvailabilityControl'
import FinancePanel from '../../finance/components/FinancePanel'
import TrustPanel from '../../trust/components/TrustPanel'

const availability = {
  isOnline: true,
  paused: false,
  serviceRadiusKm: 18,
  capacity: 8,
  activeSlots: 5,
  workingHours: [
    { day: 'Mon-Fri', start: '08:00', end: '19:00' },
    { day: 'Saturday', start: '09:00', end: '16:00' },
    { day: 'Sunday', start: 'On-demand', end: 'On-demand' },
  ],
}

export default function OperationsConsole({ bookings }) {
  const { t } = useTranslation()

  const labelMap = {
    'Active jobs': t('operations.kpis.activeJobs'),
    'Completed': t('operations.kpis.completed'),
    'Earnings': t('operations.kpis.earnings'),
    'Response rate': t('operations.kpis.responseRate'),
    'Trust score': t('operations.kpis.trustScore'),
    'Performance': t('operations.kpis.performance'),
  }

  const changeMap = {
    'Active jobs': t('operations.kpis.activeJobsChange'),
    'Completed': t('operations.kpis.completedChange'),
    'Earnings': t('operations.kpis.earningsChange'),
    'Response rate': t('operations.kpis.responseRateChange'),
    'Trust score': t('operations.kpis.trustScoreChange'),
    'Performance': t('operations.kpis.performanceChange'),
  }

  const activityMap = {
    'New callback request from luxury fleet client': t('operations.activity.newCallback'),
    'Priority reassign requested for a high-value detail package': t('operations.activity.priorityReassign'),
    'Same-day booking surge near Brickell corridor': t('operations.activity.bookingSurge'),
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {opsKpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
            <p className="text-xs text-zinc-400">{labelMap[k.label] ?? k.label}</p>
            <p className="text-xl font-semibold">{k.value}</p>
            <p className="text-xs text-emerald-300">{changeMap[k.label] ?? k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BookingsTable bookings={bookings} />
        </div>
        <div className="space-y-4">
          <AvailabilityControl availability={availability} />
          <TrustPanel />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <FinancePanel payoutSummary={payoutSummary} />
        </div>
        <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
          <h3 className="font-semibold mb-2">{t('operations.pulseTitle')}</h3>
          <div className="space-y-2">
            {activityFeed.map((item) => (
              <p key={item} className="text-xs text-zinc-400 border-l-2 border-[#d9f80c]/70 pl-2">{activityMap[item] ?? item}</p>
            ))}
          </div>
          <div className="mt-3 text-xs text-emerald-300">{t('operations.marketplaceHealthy')}</div>
        </div>
      </div>
    </div>
  )
}