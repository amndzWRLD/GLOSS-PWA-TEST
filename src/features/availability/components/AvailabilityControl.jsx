import { useTranslation } from 'react-i18next'

export default function AvailabilityControl({ availability }) {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 space-y-3">
      <h3 className="font-semibold">{t('availability.title')}</h3>
      <div className="flex items-center justify-between">
        <span className="text-zinc-400">{t('availability.providerStatus')}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${availability.isOnline ? 'bg-emerald-500/20 text-emerald-300' : 'bg-zinc-700 text-zinc-200'}`}>
          {availability.isOnline ? t('availability.online') : t('availability.offline')}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-zinc-400">{t('availability.incomingRequests')}</span>
        <span className={`px-2 py-1 rounded-full text-xs ${availability.paused ? 'bg-red-500/20 text-red-300' : 'bg-emerald-500/20 text-emerald-300'}`}>
          {availability.paused ? t('availability.paused') : t('availability.active')}
        </span>
      </div>
      <div className="text-sm text-zinc-300">
        {t('availability.serviceRadius')} <strong>{availability.serviceRadiusKm}km</strong> · {t('availability.capacity')} <strong>{availability.activeSlots}/{availability.capacity}</strong>
      </div>
      <div className="space-y-1">
        {availability.workingHours.map((s) => (
          <p key={s.day} className="text-xs text-zinc-400">{t('availability.workingHours', { day: s.day, start: s.start, end: s.end })}</p>
        ))}
      </div>
    </div>
  )
}
