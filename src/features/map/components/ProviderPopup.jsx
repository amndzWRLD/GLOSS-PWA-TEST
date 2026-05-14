export default function ProviderPopup({ provider, onClose }) {
  if (!provider) return null
  return (
    <div className="absolute z-30 w-72 rounded-2xl border border-white/20 bg-zinc-950/95 backdrop-blur-lg p-4 shadow-2xl transition-all duration-300" style={{ left: `calc(${provider.x}% + 14px)`, top: `calc(${provider.y}% - 36px)` }}>
      <div className="flex items-center justify-between mb-3">
        <div><p className="font-semibold">{provider.name}</p><p className="text-xs text-zinc-400">{provider.description}</p></div>
        <button onClick={onClose} className="text-zinc-400">✕</button>
      </div>
      <div className="grid grid-cols-2 text-xs gap-2 text-zinc-300 mb-3">
        <p>⭐ {provider.rating} ({provider.reviews})</p><p>✅ {provider.completedServices}</p><p>Tier {provider.pricingTier}</p><p>ETA {provider.etaMinutes || '--'}m</p>
      </div>
      <div className="flex gap-2"><button className="flex-1 rounded-xl bg-[#d9f80c] text-black font-semibold py-2 text-sm">Book now</button><button className="flex-1 rounded-xl border border-zinc-600 py-2 text-sm">Profile</button></div>
    </div>
  )
}
