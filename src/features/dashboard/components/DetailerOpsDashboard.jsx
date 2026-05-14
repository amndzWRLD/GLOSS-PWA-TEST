const cards = [
  { label: 'Today bookings', value: '14', icon: '🗓' },
  { label: 'Request throughput', value: '38/hr', icon: '📶' },
  { label: 'Avg latency', value: '142ms', icon: '⏱' },
  { label: 'Rating summary', value: '4.92', icon: '⭐' },
]

export default function DetailerOpsDashboard() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-zinc-900/80 p-5"><div className="flex justify-between items-center"><div><p className="text-zinc-400 text-sm">Earnings summary</p><h2 className="text-3xl font-bold text-[#d9f80c]">$12,480</h2></div><div className="flex items-center gap-2 text-emerald-400">◉ Available</div></div></div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">{cards.map(({ label, value, icon }) => <div key={label} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"><p className="mb-2">{icon}</p><p className="text-xl font-semibold">{value}</p><p className="text-xs text-zinc-400">{label}</p></div>)}</div>
      <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-4"><p className="text-sm text-zinc-400 mb-2">Quick actions</p><div className="flex gap-2 flex-wrap"><button className="px-3 py-2 rounded-xl bg-[#d9f80c] text-black text-sm font-semibold">Manage services</button><button className="px-3 py-2 rounded-xl border border-zinc-700 text-sm">Accept requests</button><button className="px-3 py-2 rounded-xl border border-zinc-700 text-sm">View analytics</button></div></div>
    </div>
  )
}
