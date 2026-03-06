import { useNavigate, useLocation } from 'react-router-dom'
import './ReservationView.css'

/**
 * confirmation view after user clicks a table on the floor plan
 */
export default function ReservationView() {
  const navigate = useNavigate()
  const location = useLocation()
  const tableId = (location.state as { tableId?: string } | null)?.tableId ?? '—'

  return (
    <section className="reservation-view">
      <h1 className="reservation-view__title">Confirm reservation</h1>
      <p className="reservation-view__summary">
        Table <strong>{tableId}</strong>
      </p>
      <p className="reservation-view__hint">Date, time and party size will be shown here once filters are wired.</p>
      <div className="reservation-view__actions">
        <button type="button" className="reservation-view__button" onClick={() => navigate(-1)}>
          Back
        </button>
        <button type="button" className="reservation-view__button reservation-view__button--primary" onClick={() => navigate('/')}>
          Confirm (placeholder)
        </button>
      </div>
    </section>
  )
}
