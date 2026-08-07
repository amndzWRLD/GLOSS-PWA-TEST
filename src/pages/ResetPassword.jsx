import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { supabase } from '../utils/supabase'
import Button from '../components/Button'

export default function ResetPassword() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!password || !confirmPassword) {
      setError(t('auth.reset.requiredFields'))
      return
    }

    if (password !== confirmPassword) {
      setError(t('auth.reset.passwordMismatch'))
      return
    }

    if (password.length < 6) {
      setError(t('auth.reset.passwordLength'))
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
      setError(t('auth.reset.updateError'))
      console.error('Reset password error:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gloss-lightBg flex flex-col items-center justify-center p-4 dark:bg-gloss-darkBg">
      <h1 className="text-5xl font-bold mb-2">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-500 mb-8 dark:text-zinc-400">{t('auth.reset.title')}</p>

      {success ? (
        <div className="w-full max-w-sm text-center">
          <div className="bg-green-50 border border-green-300 rounded-xl p-4 mb-4 dark:bg-green-900 dark:border-green-700">
            <p className="text-green-700 dark:text-green-200">✓ {t('auth.reset.success')}</p>
          </div>
          <p className="text-gray-500 text-sm dark:text-zinc-400">{t('auth.reset.redirecting')}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
          <input
            type="password"
            placeholder={t('auth.reset.newPassword')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow disabled:opacity-50 dark:bg-gloss-darkCard dark:border-gloss-darkBorder"
          />
          <input
            type="password"
            placeholder={t('auth.reset.confirmPassword')}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={loading}
            className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow disabled:opacity-50 dark:bg-gloss-darkCard dark:border-gloss-darkBorder"
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('auth.reset.updating') : t('auth.reset.submit')}
          </Button>
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <p className="text-center text-gray-500 text-sm dark:text-zinc-400">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-gloss-yellow"
            >
              {t('auth.reset.backToLogin')}
            </button>
          </p>
        </form>
      )}
    </div>
  )
}
