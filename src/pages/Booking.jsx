import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Button from '../components/Button'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation('common')
  const [selectedDate, setSelectedDate] = useState(6)
  const [selectedTime, setSelectedTime] = useState('10:00 AM')

  const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']
  const days = DAY_KEYS.map((key, i) => ({ day: t(`booking.days.${key}`), date: 3 + i }))

  const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']

  return (
    <div className="min-h-screen bg-gloss-lightBg p-4 dark:bg-gloss-darkBg">
      <button onClick={() => navigate(-1)} className="text-2xl mb-6">←</button>

      <h1 className="text-3xl font-bold mb-2">{t('booking.title')}</h1>
      <p className="text-gray-500 mb-6 dark:text-zinc-400">{t('booking.subtitle')}</p>

      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">{t('booking.date')}</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map(d => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[60px] transition-all ${
                selectedDate === d.date
                  ? 'bg-gloss-yellow text-black font-bold'
                  : 'bg-gloss-lightCard border border-gloss-lightBorder dark:bg-gloss-darkCard dark:border-gloss-darkBorder'
              }`}
            >
              <span className="text-xs mb-1">{d.day}</span>
              <span className="text-xl">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">{t('booking.time')}</h2>
        <div className="grid grid-cols-3 gap-2">
          {times.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-3 rounded-xl transition-all ${
                selectedTime === time
                  ? 'bg-gloss-yellow text-black font-bold'
                  : 'bg-gloss-lightCard border border-gloss-lightBorder dark:bg-gloss-darkCard dark:border-gloss-darkBorder'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-gloss-lightCard border border-gloss-lightBorder rounded-xl p-4 mb-6 dark:bg-gloss-darkCard dark:border-gloss-darkBorder">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <h3 className="font-bold mb-1">{t('booking.locationTitle')}</h3>
            <p className="text-sm text-gray-500 dark:text-zinc-400">{t('booking.locationSubtitle')}</p>
          </div>
        </div>
      </div>

      <Button onClick={() => navigate('/home')} className="w-full">
        {t('booking.confirm')}
      </Button>
    </div>
  )
}
