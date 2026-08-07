import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { t } = useTranslation('common')

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gloss-lightBg pb-20 dark:bg-gloss-darkBg">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">{t('profile.title')}</h1>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-gloss-yellow rounded-full flex items-center justify-center text-black text-2xl font-bold">
            {user?.email?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold">Carlos Méndez</h2>
            <p className="text-gray-500 text-sm dark:text-zinc-400">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <button className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl p-4 text-left dark:bg-gloss-darkCard dark:border-gloss-darkBorder">
            {t('profile.bookings')}
          </button>
          <button className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl p-4 text-left dark:bg-gloss-darkCard dark:border-gloss-darkBorder">
            {t('profile.paymentMethods')}
          </button>
          <button className="w-full bg-gloss-lightCard border border-gloss-lightBorder rounded-xl p-4 text-left dark:bg-gloss-darkCard dark:border-gloss-darkBorder">
            {t('profile.settings')}
          </button>
        </div>

        <Button onClick={handleSignOut} variant="secondary" className="w-full">
          {t('profile.signOut')}
        </Button>
      </div>

      <BottomNav />
    </div>
  )
}
