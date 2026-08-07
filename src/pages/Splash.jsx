import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'

export default function Splash() {
  const navigate = useNavigate()
  const { user, loading } = useAuth()
  const { t } = useTranslation('common')

  useEffect(() => {
    // Check for recovery flow in hash
    const hash = window.location.hash
    if (hash.includes('type=recovery')) {
      navigate('/reset-password', { replace: true })
      return
    }

    if (loading) return

    if (user) {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }, [user, loading, navigate])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gloss-lightBg dark:bg-gloss-darkBg">
      <h1 className="text-6xl font-bold mb-4">
        GL<span className="text-gloss-yellow">O</span>SS
      </h1>
      <p className="text-gray-500 uppercase tracking-wider font-body dark:text-zinc-400">{t('splash.tagline')}</p>
      <div className="mt-8 w-2 h-2 bg-gloss-yellow rounded-full animate-pulse" />
    </div>
  )
}
