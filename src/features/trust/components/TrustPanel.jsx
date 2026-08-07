import { useTranslation } from 'react-i18next'

export default function TrustPanel() {
  const { t } = useTranslation()

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4">
      <h3 className="font-semibold mb-2">{t('trust.title')}</h3>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <p><span className="text-zinc-400">{t('trust.completionRate')}</span><br />98.4%</p>
        <p><span className="text-zinc-400">{t('trust.cancellationRate')}</span><br />1.6%</p>
        <p><span className="text-zinc-400">{t('trust.providerLevel')}</span><br />{t('trust.goldOperator')}</p>
        <p><span className="text-zinc-400">{t('trust.marketplaceReputation')}</span><br />{t('trust.highTrust')}</p>
      </div>
      <div className="mt-3 space-y-1 text-xs text-zinc-400">
        <p>“{t('trust.quoteOne')}”</p>
        <p>“{t('trust.quoteTwo')}”</p>
      </div>
    </div>
  )
}
