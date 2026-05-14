import ProviderPopup from './ProviderPopup'

const statusColor = { available: 'fill-emerald-400', busy: 'fill-orange-400', offline: 'fill-red-500' }

export default function MapShell({ providers, selectedProvider, onSelect, onClose }) {
  return (
    <div className="relative h-[72vh] md:h-[calc(100vh-2rem)] rounded-3xl border border-white/10 bg-zinc-900 overflow-hidden">
      <svg viewBox="0 0 100 100" className="w-full h-full bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800">
        <path d="M5 15 L30 12 L44 30 L70 22 L95 40" stroke="#262626" strokeWidth="1" fill="none" />
        <path d="M10 60 L27 48 L46 64 L72 58 L90 72" stroke="#262626" strokeWidth="1" fill="none" />
        {providers.map((provider) => (
          <g key={provider.id} onClick={() => onSelect(provider)} className="cursor-pointer hover:opacity-80 transition">
            <circle cx={provider.x} cy={provider.y} r="2.9" className={statusColor[provider.status]} />
            <circle cx={provider.x} cy={provider.y} r={selectedProvider?.id === provider.id ? '4.5' : '3.7'} className="fill-transparent stroke-white/70" strokeWidth="0.25" />
          </g>
        ))}
      </svg>
      <ProviderPopup provider={selectedProvider} onClose={onClose} />
    </div>
  )
}
