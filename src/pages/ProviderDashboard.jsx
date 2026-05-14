import BottomNav from '../components/BottomNav'
import DetailerOpsDashboard from '../features/dashboard/components/DetailerOpsDashboard'

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-4 pb-24">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Detailer Command Center</h1>
            <p className="text-zinc-400 text-sm">Operational insights, bookings, and marketplace controls.</p>
          </div>
          <div className="px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-400/10 text-emerald-300 text-xs">Live • 99.98% uptime</div>
        </div>
        <DetailerOpsDashboard />
      </div>
      <BottomNav />
    </div>
  )
}
