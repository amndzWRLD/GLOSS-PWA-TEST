import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import RatingStars from '../components/RatingStars'
import BottomNav from '../components/BottomNav'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  // Mock data
  const detailer = {
    name: 'DetailPro CR',
    location: 'Detailer profesional • Escazú, San José',
    rating: 4.9,
    services: 127,
    experience: '3 años',
    verified: true,
    services_list: [
      { name: 'Full Detail Interior', duration: '3-4 horas', price: '₡35,000' },
      { name: 'Lavado Premium', duration: '1-2 horas', price: '₡15,000' },
      { name: 'Pulido + Ceramic', duration: '6-8 horas', price: '₡85,000' }
    ]
  }

  return (
    <div className="min-h-screen bg-gloss-lightBg pb-20 dark:bg-gloss-darkBg">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-4">←</button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-gloss-lightCard border-2 border-gloss-yellow rounded-full flex items-center justify-center dark:bg-gloss-darkCard">
            <span className="text-2xl font-bold text-gloss-yellow">DP</span>
          </div>
          <div className="flex-1">
            {detailer.verified && (
              <span className="inline-block text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full mb-2">
                ✓ {t('serviceDetail.verified')}
              </span>
            )}
            <h1 className="text-2xl font-bold mb-1">{detailer.name}</h1>
            <p className="text-gray-500 text-sm dark:text-zinc-400">{detailer.location}</p>
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          <div>
            <p className="text-2xl font-bold text-gloss-yellow">{detailer.rating}</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400">{t('serviceDetail.stats.rating')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{detailer.services}</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400">{t('serviceDetail.stats.services')}</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{detailer.experience}</p>
            <p className="text-xs text-gray-500 dark:text-zinc-400">{t('serviceDetail.stats.experience')}</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">{t('serviceDetail.servicesHeading')}</h2>
          <div className="space-y-3">
            {detailer.services_list.map((service, idx) => (
              <div key={idx} className="bg-gloss-lightCard border border-gloss-lightBorder rounded-xl p-4 dark:bg-gloss-darkCard dark:border-gloss-darkBorder">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{service.name}</h3>
                  <span className="text-gloss-yellow font-bold font-mono">{service.price}</span>
                </div>
                <p className="text-sm text-gray-500 font-mono dark:text-zinc-400">⏱ {service.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate(`/booking/${id}`)} className="w-full">
            {t('serviceDetail.bookButton')}
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
