import { useTranslation } from 'react-i18next'

export default function FinancePanel({ payoutSummary }) {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
      <h3 className="font-semibold mb-2">{t('finance.title')}</h3>
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-zinc-400">{t('finance.available')}</p>
          <p className="text-[#d9f80c] font-semibold">{payoutSummary.available}</p>
        </div>
        <div>
          <p className="text-zinc-400">{t('finance.pending')}</p>
          <p className="text-amber-300 font-semibold">{payoutSummary.pending}</p>
        </div>
        <div>
          <p className="text-zinc-400">{t('finance.nextPayout')}</p>
          <p className="text-zinc-100 font-semibold">{payoutSummary.nextPayout}</p>
        </div>
      </div>
      <div className="mt-3 h-24 rounded-xl bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/5 flex items-end gap-1 p-2">
        {[38, 52, 34, 71, 65, 80, 76].map((h, i) => <div key={i} className="flex-1 bg-[#d9f80c]/70 rounded-sm" style={{ height: `${h}%` }} />)}
      </div>
    </div>
  )
}
