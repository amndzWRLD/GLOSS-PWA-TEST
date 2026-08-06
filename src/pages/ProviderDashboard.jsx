import BottomNav from '../components/BottomNav'
import OperationsConsole from '../features/operations/components/OperationsConsole'
import { useBookings } from '../hooks/useBookings'

export default function ProviderDashboard() {
  const { bookings } = useBookings()

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-7xl mx-auto space-y-5">

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h1 className="text-3xl font-semibold">Provider Operations Platform</h1>
            <p className="text-zinc-400 text-sm">
              Bookings, trust, availability, payouts, and marketplace observability in one control surface.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-400/10 text-emerald-300 text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
            Live · System nominal
          </div>
        </div>

        <OperationsConsole bookings={bookings} />

      </div>
      <BottomNav />
    </div>
  )
}