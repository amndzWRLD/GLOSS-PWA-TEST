import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Button from '../components/Button'

export default function Booking() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedDate, setSelectedDate] = useState(6)
  const [selectedTime, setSelectedTime] = useState('10:00 AM')

  const days = [
    { day: 'LU', date: 3 },
    { day: 'MA', date: 4 },
    { day: 'MI', date: 5 },
    { day: 'JU', date: 6 },
    { day: 'VI', date: 7 },
    { day: 'SA', date: 8 },
    { day: 'DO', date: 9 }
  ]

  const times = ['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '3:00 PM']

  return (
    <div className="min-h-screen bg-dark-bg p-4">
      <button onClick={() => navigate(-1)} className="text-2xl mb-6">←</button>

      <h1 className="text-3xl font-bold mb-2">Agendar cita</h1>
      <p className="text-gray-400 mb-6">DetailPro CR • Full Detail Interior</p>

      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Fecha</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {days.map(d => (
            <button
              key={d.date}
              onClick={() => setSelectedDate(d.date)}
              className={`flex flex-col items-center px-4 py-3 rounded-xl min-w-[60px] transition-all ${
                selectedDate === d.date
                  ? 'bg-gloss-yellow text-black font-bold'
                  : 'bg-dark-card border border-dark-border'
              }`}
            >
              <span className="text-xs mb-1">{d.day}</span>
              <span className="text-xl">{d.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-sm font-bold mb-3 uppercase tracking-wider">Hora</h2>
        <div className="grid grid-cols-3 gap-2">
          {times.map(time => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`py-3 rounded-xl transition-all ${
                selectedTime === time
                  ? 'bg-gloss-yellow text-black font-bold'
                  : 'bg-dark-card border border-dark-border'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-dark-card border border-dark-border rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <span className="text-2xl">📍</span>
          <div>
            <h3 className="font-bold mb-1">Domicilio del cliente</h3>
            <p className="text-sm text-gray-400">Escazú • Confirmar dirección</p>
          </div>
        </div>
      </div>

      <Button onClick={() => navigate('/home')} className="w-full">
        CONFIRMAR CITA
      </Button>
    </div>
  )
}
