import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import RatingStars from '../components/RatingStars'
import BottomNav from '../components/BottomNav'

export default function ServiceDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

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
    <div className="min-h-screen bg-dark-bg pb-20">
      <div className="p-4">
        <button onClick={() => navigate(-1)} className="text-2xl mb-4">←</button>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-16 h-16 bg-dark-card border-2 border-gloss-yellow rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-gloss-yellow">DP</span>
          </div>
          <div className="flex-1">
            {detailer.verified && (
              <span className="inline-block text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full mb-2">
                ✓ VERIFICADO
              </span>
            )}
            <h1 className="text-2xl font-bold mb-1">{detailer.name}</h1>
            <p className="text-gray-400 text-sm">{detailer.location}</p>
          </div>
        </div>

        <div className="flex gap-6 mb-6">
          <div>
            <p className="text-2xl font-bold text-gloss-yellow">{detailer.rating}</p>
            <p className="text-xs text-gray-400">Rating</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{detailer.services}</p>
            <p className="text-xs text-gray-400">Servicios</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{detailer.experience}</p>
            <p className="text-xs text-gray-400">Experiencia</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Servicios</h2>
          <div className="space-y-3">
            {detailer.services_list.map((service, idx) => (
              <div key={idx} className="bg-dark-card border border-dark-border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{service.name}</h3>
                  <span className="text-gloss-yellow font-bold">{service.price}</span>
                </div>
                <p className="text-sm text-gray-400">⏱ {service.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Button onClick={() => navigate(`/booking/${id}`)} className="w-full">
            AGENDAR CITA
          </Button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
