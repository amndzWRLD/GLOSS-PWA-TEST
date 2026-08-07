import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BottomNav from '../components/BottomNav'
import { useBookings } from '../hooks/useBookings'

const SERVICES = ['Full Detail + Ceramic', 'Interior Reset', 'Paint Correction', 'Wash', 'PPF', 'Polish']
const STATUSES = ['upcoming', 'in_progress', 'completed', 'canceled']
const PAYMENTS = ['paid', 'pending', 'refunded']

const statusStyle = {
  upcoming:    'bg-blue-500/20 text-blue-300 border-blue-500/30',
  in_progress: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  completed:   'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  canceled:    'bg-red-500/20 text-red-400 border-red-500/30',
}
const paymentStyle = {
  paid:     'text-emerald-400',
  pending:  'text-amber-400',
  refunded: 'text-red-400',
}

const empty = { status: 'upcoming', customer: '', vehicle: '', service: SERVICES[0], eta: '', location: '', payment: 'pending', notes: '' }

export default function Bookings() {
  const { t } = useTranslation('common')
  const { bookings, addBooking } = useBookings()
  const [form, setForm] = useState(empty)
  const [lastId, setLastId] = useState(null)
  const [open, setOpen] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  const handleSubmit = () => {
    if (!form.customer || !form.vehicle || !form.eta || !form.location) return
    const id = addBooking(form)
    setLastId(id)
    setForm(empty)
    setOpen(false)
  }

  const TABLE_KEYS = ['booking', 'customer', 'vehicle', 'service', 'eta', 'location', 'payment', 'notes']

  return (
    <div className="min-h-screen bg-gloss-lightBg text-gray-900 pb-24 dark:bg-gloss-darkBg dark:text-white">

      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-gloss-lightBorder flex items-center justify-between dark:border-gloss-darkBorder">
        <div>
          <span className="font-black text-lg tracking-tighter" style={{ color: '#d9f80c' }}>GLOSS</span>
          <p className="text-gray-500 text-xs font-mono mt-0.5 dark:text-zinc-400">{t('bookings.headerSubtitle')}</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-black text-xs font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: '#d9f80c' }}
        >
          {t('bookings.newBooking')}
        </button>
      </div>

      {/* Success toast */}
      {lastId && (
        <div className="mx-4 mt-4 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
          <span className="text-emerald-400 text-sm font-mono">{t('bookings.toastCreated', { id: lastId })}</span>
          <button onClick={() => setLastId(null)} className="text-gray-500 text-xs dark:text-zinc-400">✕</button>
        </div>
      )}

      {/* Bookings table */}
      <div className="px-4 mt-4 overflow-x-auto">
        <table className="w-full text-xs font-mono min-w-[700px]">
          <thead>
            <tr className="text-gray-500 border-b border-gloss-lightBorder dark:border-gloss-darkBorder dark:text-zinc-400">
              {TABLE_KEYS.map(k => (
                <th key={k} className="text-left py-2 pr-4 font-medium text-gray-500 dark:text-zinc-400">
                  {t(`bookings.table.${k}`)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-gloss-lightBorder/70 transition-colors hover:bg-gloss-lightCard/80 dark:border-gloss-darkBorder dark:hover:bg-gloss-darkCard/80">
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-md border text-[10px] whitespace-nowrap ${statusStyle[b.status] ?? statusStyle.upcoming}`}>
                    {b.id} · {t(`bookings.status.${b.status === 'in_progress' ? 'inProgress' : b.status}`)}
                  </span>
                </td>
                <td className="py-3 pr-4 text-gray-900 dark:text-white">{b.customer}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-zinc-300">{b.vehicle}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-zinc-300">{b.service}</td>
                <td className="py-3 pr-4 text-gray-900 dark:text-white">{b.eta}</td>
                <td className="py-3 pr-4 text-gray-700 dark:text-zinc-300">{b.location}</td>
                <td className={`py-3 pr-4 font-semibold ${paymentStyle[b.payment] ?? 'text-gray-500 dark:text-zinc-400'}`}>
                  {t(`bookings.payment.${b.payment}`) ?? b.payment}
                </td>
                <td className="py-3 pr-4 text-gray-500 max-w-[180px] truncate dark:text-zinc-400">{b.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center text-gray-500 font-mono text-xs py-12 dark:text-zinc-500">{t('bookings.emptyState')}</p>
        )}
      </div>

      {/* Form modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-gloss-lightBg/70 backdrop-blur-sm px-4 pb-4 dark:bg-gloss-darkBg/70">
          <div className="w-full max-w-lg rounded-2xl border border-gloss-lightBorder bg-gloss-lightCard shadow-2xl p-6 space-y-4 dark:border-gloss-darkBorder dark:bg-gloss-darkCard">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-gray-900 text-sm tracking-tight dark:text-white">{t('bookings.modal.title')}</h2>
              <button onClick={() => setOpen(false)} className="text-gray-500 text-sm hover:text-gray-900 dark:text-zinc-400 dark:hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label={t('bookings.modal.fields.customer')} value={form.customer} onChange={v => set('customer', v)} placeholder={t('bookings.modal.placeholders.customer')} />
              <Field label={t('bookings.modal.fields.vehicle')} value={form.vehicle} onChange={v => set('vehicle', v)} placeholder={t('bookings.modal.placeholders.vehicle')} />
              <div>
                <label className="text-gray-500 text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400">{t('bookings.modal.fields.service')}</label>
                <select value={form.service} onChange={e => set('service', e.target.value)}
                  className="w-full mt-1 bg-gloss-lightCard border border-gloss-lightBorder rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white">
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <Field label={t('bookings.modal.fields.eta')} value={form.eta} onChange={v => set('eta', v)} placeholder={t('bookings.modal.placeholders.eta')} />
              <Field label={t('bookings.modal.fields.location')} value={form.location} onChange={v => set('location', v)} placeholder={t('bookings.modal.placeholders.location')} />
              <div>
                <label className="text-gray-500 text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400">{t('bookings.modal.fields.payment')}</label>
                <select value={form.payment} onChange={e => set('payment', e.target.value)}
                  className="w-full mt-1 bg-gloss-lightCard border border-gloss-lightBorder rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white">
                  {PAYMENTS.map(p => <option key={p} value={p}>{t(`bookings.payment.${p}`)}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-500 text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400">{t('bookings.modal.fields.status')}</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="w-full mt-1 bg-gloss-lightCard border border-gloss-lightBorder rounded-lg px-3 py-2 text-sm text-gray-900 focus:outline-none dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white">
                  {STATUSES.map(s => <option key={s} value={s}>{t(`bookings.status.${s === 'in_progress' ? 'inProgress' : s}`)}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-gray-500 text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400">{t('bookings.modal.fields.notes')}</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder={t('bookings.modal.placeholders.notes')}
                rows={2}
                className="w-full mt-1 bg-gloss-lightCard border border-gloss-lightBorder rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none resize-none dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white dark:placeholder-zinc-500" />
            </div>

            <button onClick={handleSubmit}
              className="w-full py-2.5 rounded-xl text-black text-sm font-bold transition-opacity hover:opacity-80"
              style={{ background: '#d9f80c' }}>
              {t('bookings.modal.createButton')}
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  )
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="text-gray-500 text-[10px] font-mono uppercase tracking-wider dark:text-zinc-400">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full mt-1 bg-gloss-lightCard border border-gloss-lightBorder rounded-lg px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none dark:bg-gloss-darkCard dark:border-gloss-darkBorder dark:text-white dark:placeholder-zinc-500" />
    </div>
  )
}
