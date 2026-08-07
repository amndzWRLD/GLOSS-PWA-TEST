import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('common')

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
      setTimeout(() => resolve({ error: { message: t('auth.timeout') } }), 12000)
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
    <div className="min-h-screen bg-gloss-lightBg flex flex-col items-center justify-center p-4 dark:bg-gloss-darkBg">
      <h1 className="text-5xl font-bold mb-2">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-500 mb-8 dark:text-zinc-400">{t('auth.loginSubtitle')}</p>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="email"
          placeholder={t('auth.email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl px-4 py-3 focus:outline-none focus:border-gloss-yellow dark:bg-gloss-darkCard dark:border-gloss-darkBorder"
        />
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder={t('auth.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl px-4 py-3 pr-20 focus:outline-none focus:border-gloss-yellow dark:bg-gloss-darkCard dark:border-gloss-darkBorder"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-700 dark:text-zinc-300"
          >
            {showPassword ? t('auth.hidePassword') : t('auth.showPassword')}
          </button>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? t('auth.loggingIn') : t('auth.login')}
        </Button>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <p className="text-center text-gray-500 text-sm dark:text-zinc-400">
          {t('auth.noAccount')}{' '}
          <button onClick={() => navigate('/signup')} className="text-gloss-yellow">
            {t('auth.signUp')}
          </button>
        </p>
      </form>
    </div>
  )
}
