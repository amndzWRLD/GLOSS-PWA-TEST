import { useNavigate } from 'react-router-dom'
import RatingStars from './RatingStars'

export default function CardService({ detailer }) {
  const navigate = useNavigate()

  return (
    <div 
      onClick={() => navigate(`/detailer/${detailer.id}`)}
      className="bg-dark-card border border-dark-border rounded-2xl p-4 cursor-pointer hover:border-gloss-yellow transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs bg-gloss-yellow text-black px-2 py-1 rounded-full font-bold">
          {detailer.badge || 'TOP'}
        </span>
        <span className="text-xs text-gray-400 uppercase">{detailer.category}</span>
      </div>
      
      <h3 className="text-lg font-bold mb-1">{detailer.name}</h3>
      <div className="flex items-center gap-2 mb-2">
        <RatingStars rating={detailer.rating} />
        <span className="text-gray-400 text-sm">• {detailer.location} • {detailer.distance}</span>
      </div>
      
      <p className="text-gloss-yellow font-bold">Desde {detailer.priceFrom}</p>
    </div>
  )
}
