import { useNavigate } from 'react-router-dom'
import { getMyReservations } from '../../store/myReservations'
import './MyReservationsView.css'

/**
 * lists all reservations made by the user
 */
export default function MyReservationsView() {
  const navigate = useNavigate()
  const reservations = getMyReservations()

  return (
    <section className="my-reservations-view">
      <header className="my-reservations-view__header">
        <h1 className="my-reservations-view__title">My reservations</h1>
        <button
          type="button"
          className="my-reservations-view__back-button"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </header>

      <ul className="my-reservations-view__list">
        {reservations.length === 0 ? (
          <li className="my-reservations-view__list-item my-reservations-view__list-item--empty">
            No reservations yet.
          </li>
        ) : (
          reservations.map((r) => (
            <li key={r.id} className="my-reservations-view__list-item">
              Table <strong>{r.tableId}</strong> on {r.date} at {r.startTime} for {r.partySize}{' '}
              {r.partySize === 1 ? 'guest' : 'guests'}
            </li>
          ))
        )}
      </ul>
    </section>
  )
}
