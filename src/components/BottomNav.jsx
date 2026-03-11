import { useNavigate, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { icon: '📊', path: '/home', label: 'Inicio' },
    { icon: '📅', path: '/bookings', label: 'Citas' },
    { icon: '🔧', path: '/dashboard', label: 'Panel' },
    { icon: '👤', path: '/profile', label: 'Perfil' }
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-dark-card border-t border-dark-border">
      <div className="flex justify-around items-center py-3">
        {navItems.map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-gloss-yellow' : 'text-gray-400'
            }`}
          >
            <span className="text-2xl">{item.icon}</span>
          </button>
        ))}
      </div>
    </nav>
  )
}
