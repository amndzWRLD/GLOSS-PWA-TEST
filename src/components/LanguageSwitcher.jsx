import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-gloss-lightBorder bg-gloss-lightCard/80 px-1.5 py-1 text-xs shadow-sm dark:border-gloss-darkBorder dark:bg-gloss-darkCard/80">
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`rounded-full px-2 py-1 transition-colors ${i18n.language?.startsWith('en') ? 'bg-gloss-yellow text-black' : 'text-gray-700 dark:text-zinc-300'}`}
      >
        🇺🇸 {t('language.english')}
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('es')}
        className={`rounded-full px-2 py-1 transition-colors ${i18n.language?.startsWith('es') ? 'bg-gloss-yellow text-black' : 'text-gray-700 dark:text-zinc-300'}`}
      >
        🇪🇸 {t('language.spanish')}
      </button>
    </div>
  )
}
