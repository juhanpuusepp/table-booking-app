import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { createReservation } from '../../api/api'
import './ReservationView.css'

type LocationState = { tableId?: string; date?: string; time?: string } | null

/**
 * confirmation view to show table id, date, time, and confirm party size.
 */
export default function ReservationView() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const tableId = state?.tableId ?? '—'
  const date = state?.date ?? ''
  const time = state?.time ?? ''

  const [partySize, setPartySize] = useState(2)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'conflict'>('idle')

  const handleConfirm = async () => {
    if (!state?.tableId || !state?.date || !state?.time) {
      setStatus('conflict')
      return
    }
    setStatus('loading')
    try {
      await createReservation({
        tableId: state.tableId,
        date: state.date,
        startTime: state.time,
        partySize,
      })
      setStatus('success')
    } catch (e) {
      const err = e as Error & { status?: number }
      setStatus(err.status === 409 ? 'conflict' : 'conflict')
    }
  }

  if (status === 'success') {
    return (
      <section className="reservation-view">
        <h1 className="reservation-view__title">Reservation confirmed</h1>
        <p className="reservation-view__summary">
          Table <strong>{tableId}</strong> on {date} at {time} for {partySize} guests.
        </p>
        <button
          type="button"
          className="reservation-view__button reservation-view__button--primary"
          onClick={() => navigate('/')}
        >
          Back to floor plan
        </button>
      </section>
    )
  }

  return (
    <section className="reservation-view">
      <h1 className="reservation-view__title">Confirm reservation</h1>
      <p className="reservation-view__summary">
        Table <strong>{tableId}</strong>, {date || '—'} at {time || '—'}
      </p>
      <label className="reservation-view__field">
        <span>Party size</span>
        <select value={partySize} onChange={(e) => setPartySize(Number(e.target.value))}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </label>
      {status === 'conflict' && (
        <p className="reservation-view__message reservation-view__message--error">
          Table not available for this time. Please go back and choose another table or time.
        </p>
      )}
      <div className="reservation-view__actions">
        <button type="button" className="reservation-view__button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button
          type="button"
          className="reservation-view__button reservation-view__button--primary"
          onClick={handleConfirm}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Confirming…' : 'Confirm'}
        </button>
      </div>
    </section>
  )
}
