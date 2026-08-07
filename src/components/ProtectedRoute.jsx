import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const { t } = useTranslation('common')

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gloss-lightBg dark:bg-gloss-darkBg">
      <p className="text-gray-500 dark:text-zinc-400 text-sm">{t('common.loading')}</p>
    </div>
  )

  if (!user) return <Navigate to="/login" />

  return children
}
