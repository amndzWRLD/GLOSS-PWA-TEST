import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-2">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-400 mb-8">Inicia sesión para continuar</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow"
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'ENTRANDO...' : 'INICIAR SESIÓN'}
        </Button>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <p className="text-center text-gray-400 text-sm">
          ¿No tienes cuenta?{' '}
          <button onClick={() => navigate('/signup')} className="text-gloss-yellow">
            Regístrate
          </button>
        </p>
      </form>
    </div>
  )
}
