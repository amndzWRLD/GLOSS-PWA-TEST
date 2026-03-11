import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-20">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Perfil</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gloss-yellow rounded-full flex items-center justify-center text-black text-2xl font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">Carlos Méndez</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full bg-dark-card border border-dark-border rounded-xl p-4 text-left">
            Mis reservas
          </button>
          <button className="w-full bg-dark-card border border-dark-border rounded-xl p-4 text-left">
            Métodos de pago
          </button>
          <button className="w-full bg-dark-card border border-dark-border rounded-xl p-4 text-left">
            Configuración
          </button>
        </div>

        <Button onClick={handleSignOut} variant="secondary" className="w-full">
          Cerrar sesión
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
