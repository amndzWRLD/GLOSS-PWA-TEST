import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import RatingStars from './RatingStars'

export default function CardService({ detailer }) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(`/service/${detailer.id}`)}
      className="bg-gloss-lightCard border border-gloss-lightBorder rounded-2xl p-4 cursor-pointer hover:border-gloss-yellow transition-all dark:bg-gloss-darkCard dark:border-gloss-darkBorder"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs bg-gloss-yellow text-black px-2 py-1 rounded-full font-bold">
          {detailer.badge || t('cardService.top')}
        </span>
        <span className="text-xs text-gray-500 uppercase dark:text-zinc-400">{detailer.category}</span>
      </div>
      
      <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{detailer.name}</h3>
      <div className="flex items-center gap-2 mb-2">
        <RatingStars rating={detailer.rating} />
        <span className="text-gray-500 text-sm dark:text-zinc-400">• {detailer.location} • {detailer.distance}</span>
      </div>
      
      <p className="text-gloss-yellow font-bold font-mono">{detailer.priceFrom}</p>
    </div>
  )
}
