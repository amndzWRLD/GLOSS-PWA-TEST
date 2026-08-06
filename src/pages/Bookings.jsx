import { useState } from 'react'
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

  return (
    <div className="min-h-screen bg-black text-white pb-24">

      {/* Header */}
      <div className="px-4 pt-6 pb-4 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <span className="font-black text-lg tracking-tighter" style={{ color: '#d9f80c' }}>GLOSS</span>
          <p className="text-zinc-400 text-xs font-mono mt-0.5">Bookings Operations</p>
        </div>
        <button
          onClick={() => setOpen(true)}
          className="text-black text-xs font-semibold px-4 py-2 rounded-xl transition-opacity hover:opacity-80"
          style={{ background: '#d9f80c' }}
        >
          + New booking
        </button>
      </div>

      {/* Success toast */}
      {lastId && (
        <div className="mx-4 mt-4 px-4 py-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-between">
          <span className="text-emerald-400 text-sm font-mono">Booking <strong>{lastId}</strong> created → visible en Dashboard</span>
          <button onClick={() => setLastId(null)} className="text-zinc-500 text-xs">✕</button>
        </div>
      )}

      {/* Bookings table */}
      <div className="px-4 mt-4 overflow-x-auto">
        <table className="w-full text-xs font-mono min-w-[700px]">
          <thead>
            <tr className="text-zinc-500 border-b border-white/[0.06]">
              {['Booking', 'Customer', 'Vehicle', 'Service', 'ETA', 'Location', 'Payment', 'Notes'].map(h => (
                <th key={h} className="text-left py-2 pr-4 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                <td className="py-3 pr-4">
                  <span className={`px-2 py-1 rounded-md border text-[10px] whitespace-nowrap ${statusStyle[b.status] ?? statusStyle.upcoming}`}>
                    {b.id} · {b.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 pr-4 text-white">{b.customer}</td>
                <td className="py-3 pr-4 text-zinc-300">{b.vehicle}</td>
                <td className="py-3 pr-4 text-zinc-300">{b.service}</td>
                <td className="py-3 pr-4 text-white">{b.eta}</td>
                <td className="py-3 pr-4 text-zinc-300">{b.location}</td>
                <td className={`py-3 pr-4 font-semibold ${paymentStyle[b.payment] ?? 'text-zinc-400'}`}>{b.payment}</td>
                <td className="py-3 pr-4 text-zinc-500 max-w-[180px] truncate">{b.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {bookings.length === 0 && (
          <p className="text-center text-zinc-600 font-mono text-xs py-12">No bookings yet</p>
        )}
      </div>

      {/* Form modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm px-4 pb-4">
          <div className="w-full max-w-lg rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-white text-sm tracking-tight">New Booking</h2>
              <button onClick={() => setOpen(false)} className="text-zinc-500 text-sm hover:text-white">✕</button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field label="Customer" value={form.customer} onChange={v => set('customer', v)} placeholder="S. Parker" />
              <Field label="Vehicle" value={form.vehicle} onChange={v => set('vehicle', v)} placeholder="BMW M4" />
              <div>
                <label className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Service</label>
                <select value={form.service} onChange={e => set('service', e.target.value)}
                  className="w-full mt-1 bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  {SERVICES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <Field label="ETA" value={form.eta} onChange={v => set('eta', v)} placeholder="11:40" />
              <Field label="Location" value={form.location} onChange={v => set('location', v)} placeholder="Brickell" />
              <div>
                <label className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Payment</label>
                <select value={form.payment} onChange={e => set('payment', e.target.value)}
                  className="w-full mt-1 bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  {PAYMENTS.map(p => <option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Status</label>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="w-full mt-1 bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">Notes</label>
              <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                placeholder="Customer notes, access instructions..."
                rows={2}
                className="w-full mt-1 bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none resize-none" />
            </div>

            <button onClick={handleSubmit}
              className="w-full py-2.5 rounded-xl text-black text-sm font-bold transition-opacity hover:opacity-80"
              style={{ background: '#d9f80c' }}>
              Create booking
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
      <label className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider">{label}</label>
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full mt-1 bg-zinc-900 border border-zinc-700/60 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none" />
    </div>
  )
}