import { useState, Suspense, lazy } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import BottomNav from '../components/BottomNav'
import CardService from '../components/CardService'

const MapView = lazy(() => import('../components/MapView'))

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const { user } = useAuth()
  const navigate = useNavigate()
  const displayName = user?.email?.split('@')[0] || 'Carlos'
  const categories = ['Todos', 'Lavado', 'Full Detail', 'Pulido', 'Ceramic']

  // Mock data
  const DETAILERS_MOCK = [
    { id: 1, name: 'DetailPro CR', type: 'Ceramic · PPF', rating: 4.9, reviews: 128, lat: 9.9320, lng: -84.0800 },
    { id: 2, name: 'Shine Masters', type: 'Pulido · Corrección', rating: 4.7, reviews: 84, lat: 9.9250, lng: -84.0950 },
    { id: 3, name: 'Auto Glow', type: 'Tintado · Ceramic', rating: 4.8, reviews: 97, lat: 9.9180, lng: -84.0850 },
    { id: 4, name: 'DetailZone', type: 'Lavado · PPF', rating: 4.6, reviews: 52, lat: 9.9350, lng: -84.1000 },
  ]

  const detailers = DETAILERS_MOCK

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-gray-400 text-sm">SAN JOSÉ, CR</p>
            <h1 className="text-2xl font-bold">
              Hola, <span className="text-gloss-yellow">{displayName}</span> 👋
            </h1>
          </div>
          <div className="w-10 h-10 bg-gloss-yellow rounded-full flex items-center justify-center text-black font-bold">
            CR
          </div>
        </div>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Buscar detailers o servicios..."
            className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 pl-10 focus:outline-none focus:border-gloss-yellow"
          />
          <span className="absolute left-3 top-3 text-xl">🔍</span>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Categorías</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-gloss-yellow text-black font-bold'
                    : 'bg-dark-card border border-dark-border text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* MAPA */}
        <div style={{ height: '320px', margin: '16px 0', borderRadius: '12px', overflow: 'hidden', border: '1px solid #222' }}>
          <Suspense fallback={<div style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666' }}>Cargando mapa...</div>}>
            <MapView
              detailers={DETAILERS_MOCK}
              onSelect={(detailer) => {
                console.log('Detailer seleccionado:', detailer)
                navigate(`/service/${detailer.id}`)
              }}
            />
          </Suspense>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Cerca de ti</h2>
          <div className="space-y-3">
            {detailers.map(detailer => (
              <CardService key={detailer.id} detailer={detailer} />
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
