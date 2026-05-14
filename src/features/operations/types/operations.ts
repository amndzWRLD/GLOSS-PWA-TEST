export type BookingStatus = 'upcoming' | 'in_progress' | 'completed' | 'canceled'
export type PaymentStatus = 'paid' | 'pending' | 'refunded'

export interface Booking {
  id: string
  customer: string
  vehicle: string
  service: string
  eta: string
  location: string
  paymentStatus: PaymentStatus
  providerNotes: string
  status: BookingStatus
}

export interface ProviderAvailability {
  isOnline: boolean
  paused: boolean
  serviceRadiusKm: number
  capacity: number
  activeSlots: number
  workingHours: { day: string; start: string; end: string }[]
}
