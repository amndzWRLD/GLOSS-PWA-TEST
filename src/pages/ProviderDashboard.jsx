import BottomNav from '../components/BottomNav'

export default function ProviderDashboard() {
  const appointments = [
    { time: '10:00', client: 'Carlos Méndez', service: 'Full Detail', location: 'Escazú', status: 'CONF.' },
    { time: '2:00', client: 'Ana Rojas', service: 'Pulido', location: 'Curridabat', status: 'PEND.' }
  ]

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <div className="p-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Panel detailer</h1>
            <p className="text-gray-400 text-sm">Jueves, 6 de marzo</p>
          </div>
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">
            • ACTIVO
          </span>
        </div>

        <div className="bg-gradient-to-br from-green-900/30 to-green-700/20 border border-green-700/50 rounded-2xl p-6 mb-6">
          <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Ingresos este mes</p>
          <h2 className="text-4xl font-bold text-gloss-yellow mb-2">₡248,000</h2>
          <p className="text-sm text-green-400">↑ 18% vs mes anterior</p>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-gray-400">Servicios completados</p>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">4.9</p>
            <p className="text-xs text-gray-400">Rating promedio</p>
          </div>
          <div className="bg-dark-card border border-dark-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold">3</p>
            <p className="text-xs text-gray-400">Pendientes</p>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Próximas citas</h2>
          <div className="space-y-3">
            {appointments.map((apt, idx) => (
              <div key={idx} className="bg-dark-card border border-dark-border rounded-xl p-4">
                <div className="flex items-center gap-4">
                  <div className="bg-gloss-yellow text-black px-3 py-2 rounded-lg font-bold text-center min-w-[60px]">
                    <p className="text-xs">HOY</p>
                    <p className="text-lg">{apt.time}</p>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">{apt.client}</h3>
                    <p className="text-sm text-gray-400">{apt.service} • {apt.location}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    apt.status === 'CONF.' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
