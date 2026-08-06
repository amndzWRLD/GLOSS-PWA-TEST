import { useEffect } from 'react'
import { MapContainer, TileLayer, CircleMarker, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import ProviderPopup from './ProviderPopup'

const GAM_CENTER = [9.9281, -84.0907]
const STATUS_COLORS = { available: '#34d399', busy: '#fb923c', offline: '#ef4444' }

function MapInvalidator() {
  const map = useMap()
  useEffect(() => {
    const t = setTimeout(() => map.invalidateSize(), 150)
    return () => clearTimeout(t)
  }, [map])
  return null
}

export default function MapShell({ providers, selectedProvider, onSelect, onClose }) {
  return (
    <div className="relative h-[75vh] md:h-[calc(100vh-2rem)] rounded-3xl border border-white/10">
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <MapContainer
          center={GAM_CENTER}
          zoom={11}
          style={{ height: '100%', width: '100%', background: '#09090b' }}
          zoomControl={false}
          attributionControl={false}
        >
          <MapInvalidator />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="© OpenStreetMap contributors © CARTO"
            subdomains="abcd"
            maxZoom={19}
          />
          {providers.map((p) => (
            <CircleMarker
              key={p.id}
              center={[p.lat ?? GAM_CENTER[0], p.lng ?? GAM_CENTER[1]]}
              radius={selectedProvider?.id === p.id ? 10 : 7}
              pathOptions={{
                fillColor: STATUS_COLORS[p.status] ?? '#fff',
                fillOpacity: 1,
                color: selectedProvider?.id === p.id ? '#d9f80c' : 'rgba(255,255,255,0.35)',
                weight: selectedProvider?.id === p.id ? 2 : 1,
              }}
              eventHandlers={{ click: () => onSelect(p) }}
            />
          ))}
        </MapContainer>
      </div>

      <div className="absolute inset-0 z-[1001] pointer-events-none">
        <div className="pointer-events-auto">
          <ProviderPopup provider={selectedProvider} onClose={onClose} />
        </div>
      </div>
    </div>
  )
}