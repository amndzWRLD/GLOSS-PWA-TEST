import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../utils/supabase'
import Button from '../components/Button'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!password || !confirmPassword) {
      setError('Por favor completa ambos campos')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      setLoading(false)

      if (error) {
        setError(error.message)
      } else {
        setSuccess(true)
        setPassword('')
        setConfirmPassword('')
        // Redirect to login after 2 seconds
        setTimeout(() => {
          navigate('/login', { replace: true })
        }, 2000)
      }
    } catch (err) {
      setLoading(false)
      setError('Error al actualizar la contraseña. Intenta de nuevo.')
      console.error('Reset password error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold mb-2">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-400 mb-8">Actualiza tu contraseña</p>

      {success ? (
        <div className="w-full max-w-sm text-center">
          <div className="bg-green-900 border border-green-700 rounded-xl p-4 mb-4">
            <p className="text-green-200">✓ Contraseña actualizada exitosamente</p>
          </div>
          <p className="text-gray-400 text-sm">Redirigiendo al login...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow disabled:opacity-50"
          />
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="w-full bg-dark-card border border-dark-border rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow disabled:opacity-50"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'ACTUALIZANDO...' : 'ACTUALIZAR CONTRASEÑA'}
          </Button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <p className="text-center text-gray-400 text-sm">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-gloss-yellow"
            >
              Volver a login
            </button>
          </p>
        </form>
      )}
    </div>
  )
}
