import { useTranslation } from 'react-i18next'

const statusDotColor = {
  available: 'bg-emerald-400',
  busy: 'bg-orange-400',
  offline: 'bg-red-500',
}

export function getPopupStyle(x, y) {
  const leftRaw = x + 2
  const topRaw  = y - 5
  const left = Math.min(Math.max(leftRaw, 1), 68)
  const top  = Math.min(Math.max(topRaw, 1), 52)
  return { left: `${left}%`, top: `${top}%` }
}

export default function ProviderPopup({ provider, onClose }) {
  const { t } = useTranslation('common')

  if (!provider) return null
  return (
    <div
      key={provider.id}
      className="absolute z-30 w-72 rounded-2xl border border-gloss-lightBorder bg-gloss-lightCard/95 backdrop-blur-lg p-4 shadow-[0_8px_32px_rgba(0,0,0,0.6)] scale-100 opacity-100 transition-all duration-200 ease-out dark:border-gloss-darkBorder dark:bg-gloss-darkCard/95"
      style={getPopupStyle(provider.x, provider.y)}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold flex items-center text-gray-900 dark:text-white">
            <span className={`inline-block w-2 h-2 rounded-full mr-1.5 ${statusDotColor[provider.status]}`} />
            {provider.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-zinc-400">{provider.description}</p>
        </div>
        <button onClick={onClose} className="text-gray-500 dark:text-zinc-400">✕</button>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
        <div><p className="text-xs text-gray-500 dark:text-zinc-400">{t('providerPopup.rating')}</p><p className="text-sm font-medium text-gray-900 dark:text-white">{provider.rating} ({provider.reviews})</p></div>
        <div><p className="text-xs text-gray-500 dark:text-zinc-400">{t('providerPopup.completed')}</p><p className="text-sm font-medium text-gray-900 dark:text-white">{provider.completedServices}</p></div>
        <div><p className="text-xs text-gray-500 dark:text-zinc-400">{t('providerPopup.tier')}</p><p className="text-sm font-medium text-gray-900 dark:text-white">{provider.pricingTier}</p></div>
        <div><p className="text-xs text-gray-500 dark:text-zinc-400">{t('providerPopup.eta')}</p><p className="text-sm font-medium text-gray-900 dark:text-white">{provider.etaMinutes || '--'}m</p></div>
      </div>
      <div className="flex gap-2">
        <button className="h-9 flex-1 rounded-xl bg-[#d9f80c] text-black font-semibold text-sm">{t('providerPopup.bookNow')}</button>
        <button className="h-9 flex-1 rounded-xl border border-gloss-lightBorder text-sm dark:border-gloss-darkBorder">{t('providerPopup.viewProfile')}</button>
      </div>
    </div>
  )
}
