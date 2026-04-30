import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icono default de Leaflet con Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Pin personalizado GLOSS (negro con acento amarillo)
const glossPin = (featured = false) => L.divIcon({
  className: '',
  html: `
    <div style="
      width:38px;height:38px;border-radius:50%;
      background:${featured ? '#C8F135' : '#0a0a0a'};
      border:3px solid ${featured ? '#0a0a0a' : '#C8F135'};
      display:flex;align-items:center;justify-content:center;
      font-size:16px;box-shadow:0 4px 12px rgba(0,0,0,0.4);
      cursor:pointer;
    ">🚗</div>
  `,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -42],
})

export default function MapView({ detailers = [], onSelect }) {
  const [userPos, setUserPos] = useState(null)
  const defaultCenter = [9.9281, -84.0907]

  useEffect(() => {
    // Intentar obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserPos([position.coords.latitude, position.coords.longitude])
        },
        () => {
          // En caso de error, usar valor por defecto (San José)
          console.log('Geolocation not available, using default center')
        }
      )
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', borderRadius: '12px', overflow: 'hidden' }}>
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ width: '100%', height: '100%' }}
        zoomControl={false}
      >
        {/* Tile oscuro, acorde al branding GLOSS */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Pin del usuario */}
        {userPos && (
          <Marker
            position={userPos}
            icon={L.divIcon({
              className: '',
              html: `<div style="width:14px;height:14px;border-radius:50%;background:#C8F135;border:3px solid #fff;box-shadow:0 0 0 4px rgba(200,241,53,0.3)"></div>`,
              iconSize: [14, 14],
              iconAnchor: [7, 7],
            })}
          />
        )}

        {/* Pines de detailers */}
        {detailers.map((d, i) => (
          <Marker
            key={d.id || i}
            position={[d.lat, d.lng]}
            icon={glossPin(i === 0)}
            eventHandlers={{ click: () => onSelect?.(d) }}
          >
            <Popup className="gloss-popup">
              <div style={{ fontFamily: 'sans-serif', minWidth: '160px' }}>
                <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>{d.name}</div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>{d.type}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#f5a623' }}>★</span>
                  <strong>{d.rating}</strong>
                  <span style={{ color: '#999', fontSize: '11px' }}>({d.reviews})</span>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
