import { useTranslation } from 'react-i18next'

const statusClass = { upcoming: 'bg-blue-500/20 text-blue-300', in_progress: 'bg-amber-500/20 text-amber-300', completed: 'bg-emerald-500/20 text-emerald-300', canceled: 'bg-red-500/20 text-red-300' }
const paymentClass = { paid: 'text-emerald-300', pending: 'text-amber-300', refunded: 'text-red-300' }

export default function BookingsTable({ bookings }) {
  const { t } = useTranslation()

  const statusLabels = {
    upcoming: t('bookings.status.upcoming'),
    in_progress: t('bookings.status.inProgress'),
    completed: t('bookings.status.completed'),
    canceled: t('bookings.status.canceled'),
  }

  const paymentLabels = {
    paid: t('bookings.payment.paid'),
    pending: t('bookings.payment.pending'),
    refunded: t('bookings.payment.refunded'),
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-4 overflow-auto">
      <h3 className="font-semibold mb-3">{t('bookings.operationsTitle')}</h3>
      <table className="w-full text-sm min-w-[860px]">
        <thead className="text-zinc-400">
          <tr>
            <th className="text-left pb-2">{t('bookings.table.booking')}</th>
            <th className="text-left">{t('bookings.table.customer')}</th>
            <th className="text-left">{t('bookings.table.vehicle')}</th>
            <th className="text-left">{t('bookings.table.service')}</th>
            <th className="text-left">{t('bookings.table.eta')}</th>
            <th className="text-left">{t('bookings.table.location')}</th>
            <th className="text-left">{t('bookings.table.payment')}</th>
            <th className="text-left">{t('bookings.table.notes')}</th>
            <th className="text-left">{t('bookings.table.actions')}</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-t border-white/5">
              <td className="py-3">
                <span className={`px-2 py-1 rounded-full text-xs ${statusClass[b.status]}`}>
                  {b.id} · {statusLabels[b.status] ?? b.status.replace('_', ' ')}
                </span>
              </td>
              <td>{b.customer}</td>
              <td>{b.vehicle}</td>
              <td>{b.service}</td>
              <td>{b.eta}</td>
              <td>{b.location}</td>
              <td className={paymentClass[b.paymentStatus]}>{paymentLabels[b.paymentStatus] ?? b.paymentStatus}</td>
              <td className="text-zinc-400">{b.providerNotes}</td>
              <td><button className="px-2 py-1 border border-zinc-700 rounded-lg text-xs">{t('bookings.table.open')}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
