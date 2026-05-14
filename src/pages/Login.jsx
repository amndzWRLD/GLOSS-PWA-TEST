import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { user, signIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      navigate('/home', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const timeoutPromise = new Promise((resolve) => {
      setTimeout(() => resolve({ error: { message: 'Tiempo de espera agotado. Verifica tu conexión o el estado de Supabase.' } }), 12000)
    })

    try {
      const result = await Promise.race([signIn(email, password), timeoutPromise])
      if (result?.error) {
        setError(result.error.message)
      } else {
        navigate('/home')
      }
    } finally {
      setLoading(false)
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
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 pr-20 focus:outline-none focus:border-gloss-yellow"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-300"
          >
            {showPassword ? 'Ocultar' : 'Mostrar'}
          </button>
        </div>
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
