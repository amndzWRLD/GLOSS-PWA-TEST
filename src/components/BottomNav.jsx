import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const MapIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" y1="3" x2="9" y2="18" />
    <line x1="15" y1="6" x2="15" y2="21" />
  </svg>
)

const BookingIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="8" y1="14" x2="8" y2="14" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="14" x2="12" y2="14" strokeWidth="2" strokeLinecap="round" />
    <line x1="16" y1="14" x2="16" y2="14" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const AnalyticsIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="2" y1="20" x2="22" y2="20" />
  </svg>
)

const ProfileIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
)

export default function BottomNav() {
  const { t } = useTranslation('common')
  const navigate  = useNavigate()
  const location  = useLocation()

  const navItems = [
    { icon: MapIcon,       path: '/home',      label: t('bottomNav.explore') },
    { icon: BookingIcon,   path: '/bookings',  label: t('bottomNav.bookings') },
    { icon: AnalyticsIcon, path: '/dashboard', label: t('bottomNav.panel') },
    { icon: ProfileIcon,   path: '/profile',   label: t('bottomNav.profile') },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white/90 border-gloss-lightBorder backdrop-blur-xl dark:bg-gloss-darkBg/90 dark:border-gloss-darkBorder">
      <div className="flex justify-around items-center py-3 px-2">
        {navItems.map(({ icon: Icon, path, label }) => {
          const active = location.pathname === path
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 group"
            >
              <span className={`transition-colors duration-200 ${active ? 'text-gloss-yellow' : 'text-gray-500 dark:text-zinc-500'}`}>
                <Icon size={22} />
              </span>
              <span className={`text-[10px] font-mono tracking-wide transition-colors duration-200 ${active ? 'text-gloss-yellow' : 'text-gray-500 dark:text-zinc-500'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}