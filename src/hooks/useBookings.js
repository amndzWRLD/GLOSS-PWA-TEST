import { useState, useEffect } from 'react'

const KEY = 'gloss_bookings'

const seed = [
  { id: 'B-4021', status: 'upcoming',     customer: 'S. Parker', vehicle: 'Porsche Macan',  service: 'Full Detail + Ceramic', eta: '11:40', location: 'Brickell',  payment: 'paid',    notes: 'Garage access via valet.' },
  { id: 'B-4020', status: 'in_progress',  customer: 'A. Kim',    vehicle: 'Tesla Model X',  service: 'Interior Reset',        eta: 'Now',   location: 'Wynwood',   payment: 'pending', notes: 'Pet hair heavy rear seats.' },
  { id: 'B-4012', status: 'completed',    customer: 'J. Patel',  vehicle: 'BMW M4',         service: 'Paint Correction',      eta: '09:10', location: 'Edgewater', payment: 'paid',    notes: 'Customer requested low VOC products.' },
  { id: 'B-3999', status: 'canceled',     customer: 'M. Diaz',   vehicle: 'Range Rover',    service: 'Wash',                  eta: '--',    location: 'Coconut Grove', payment: 'refunded', notes: 'Canceled by customer, weather warning.' },
]

export function useBookings() {
  const [bookings, setBookings] = useState(() => {
    try { return JSON.parse(localStorage.getItem(KEY)) || seed }
    catch { return seed }
  })

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bookings))
  }, [bookings])

  const addBooking = (data) => {
    const id = `B-${Math.floor(1000 + Math.random() * 9000)}`
    setBookings(prev => [{ id, ...data }, ...prev])
    return id
  }

  return { bookings, addBooking }
}