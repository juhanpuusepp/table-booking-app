import { useNavigate } from 'react-router-dom'
import './FiltersPanel.css'

export default function FiltersPanel() {
  const navigate = useNavigate()

  const handleSeeRecommendations = () => {
    // later the selected values will be sent to the recommendations view
    navigate('/recommendations')
  }

  return (
    <section className="filters-panel" aria-label="Filters for table recommendations">
      <h2 className="filters-panel__title">Find a table</h2>

      <div className="filters-panel__grid">
        <label className="filters-panel__field">
          <span>Date</span>
          <input type="date" />
        </label>

        <label className="filters-panel__field">
          <span>Time</span>
          <select defaultValue="18:00">
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="12:00">12:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
            <option value="16:00">16:00</option>
            <option value="17:00">17:00</option>
            <option value="18:00">18:00</option>
            <option value="19:00">19:00</option>
            <option value="20:00">20:00</option>
            <option value="21:00">21:00</option>
          </select>
        </label>

        <label className="filters-panel__field">
          <span>Number of guests</span>
          <select defaultValue="2">
            {Array.from({ length: 8 }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

        <label className="filters-panel__field">
          <span>Zone</span>
          <select defaultValue="indoors">
            <option value="indoors">Indoors</option>
            <option value="terrace">Terrace</option>
            <option value="private">Private room</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={handleSeeRecommendations}
        className="filters-panel__submit"
      >
        See recommendations
      </button>
    </section>
  )
}

