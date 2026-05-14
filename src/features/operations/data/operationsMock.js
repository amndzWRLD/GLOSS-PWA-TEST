export const opsKpis = [
  { label: 'Active jobs', value: '6', change: '+2 today' },
  { label: 'Completed', value: '29', change: '+11%' },
  { label: 'Earnings', value: '$2,840', change: '+8.4%' },
  { label: 'Response rate', value: '97%', change: 'SLA healthy' },
  { label: 'Trust score', value: '92/100', change: 'Gold tier' },
  { label: 'Performance', value: '4.9', change: 'Top 8%' }
]

export const bookings = [
  { id: 'B-4021', customer: 'S. Parker', vehicle: 'Porsche Macan', service: 'Full Detail + Ceramic', eta: '11:40', location: 'Brickell', paymentStatus: 'paid', providerNotes: 'Garage access via valet.', status: 'upcoming' },
  { id: 'B-4020', customer: 'A. Kim', vehicle: 'Tesla Model X', service: 'Interior Reset', eta: 'Now', location: 'Wynwood', paymentStatus: 'pending', providerNotes: 'Pet hair heavy rear seats.', status: 'in_progress' },
  { id: 'B-4012', customer: 'J. Patel', vehicle: 'BMW M4', service: 'Paint Correction', eta: '09:10', location: 'Edgewater', paymentStatus: 'paid', providerNotes: 'Customer requested low VOC products.', status: 'completed' },
  { id: 'B-3999', customer: 'M. Diaz', vehicle: 'Range Rover', service: 'Wash', eta: '--', location: 'Coconut Grove', paymentStatus: 'refunded', providerNotes: 'Canceled by customer, weather warning.', status: 'canceled' }
]

export const activityFeed = [
  'New premium booking accepted · 2m ago',
  'Payment settled for B-4012 · 8m ago',
  'Trust badge upgraded to Gold · 1h ago',
  'Service radius changed to 18km · 2h ago'
]

export const payoutSummary = { available: '$1,180', pending: '$420', nextPayout: 'Friday 09:00' }
