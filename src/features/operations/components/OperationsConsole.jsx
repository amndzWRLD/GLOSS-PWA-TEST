import { opsKpis, activityFeed, payoutSummary } from '../data/operationsMock'  // ← quita bookings del import
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
    { day: 'Mon-Fri',  start: '08:00',     end: '19:00'     },
    { day: 'Saturday', start: '09:00',     end: '16:00'     },
    { day: 'Sunday',   start: 'On-demand', end: 'On-demand' },
  ],
}

export default function OperationsConsole({ bookings }) {  // ← recibe prop
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-3">
        {opsKpis.map((k) => (
          <div key={k.label} className="rounded-2xl border border-white/10 bg-zinc-950/70 p-3">
            <p className="text-xs text-zinc-400">{k.label}</p>
            <p className="text-xl font-semibold">{k.value}</p>
            <p className="text-xs text-emerald-300">{k.change}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <BookingsTable bookings={bookings} />  {/* ← usa el prop */}
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
          <h3 className="font-semibold mb-2">Operational Pulse</h3>
          <div className="space-y-2">
            {activityFeed.map((item) => (
              <p key={item} className="text-xs text-zinc-400 border-l-2 border-[#d9f80c]/70 pl-2">{item}</p>
            ))}
          </div>
          <div className="mt-3 text-xs text-emerald-300">● Marketplace healthy · 42 req/hr</div>
        </div>
      </div>
    </div>
  )
}