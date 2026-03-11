import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Button from '../components/Button'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await signUp(email, password)
      navigate('/home')
    } catch (error) {
      console.error('Signup error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-2">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-400 mb-8">Crea tu cuenta</p>

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
        <Button type="submit" className="w-full">
          REGISTRARSE
        </Button>
        <p className="text-center text-gray-400 text-sm">
          ¿Ya tienes cuenta?{' '}
          <button onClick={() => navigate('/login')} className="text-gloss-yellow">
            Inicia sesión
          </button>
        </p>
      </form>
    </div>
  )
}
