import { useState } from 'react'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel'
import './MainView.css'

type ViewMode = 'floor' | 'timetable'

/**
 * floor plan / timetable toggle, filters panel, recommendations button.
 */
export default function MainView() {
  const [viewMode, setViewMode] = useState<ViewMode>('floor')

  return (
    <main className="main-view">
      <header className="main-view__header">
        <h1 className="main-view__title">Table booking</h1>

        <div className="main-view__top-row">
          <label className="main-view__field">
            <span>Date</span>
            <input type="date" />
          </label>

          <label className="main-view__field">
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

          <div className="main-view__view-toggle">
            <button
              type="button"
              className="main-view__view-toggle-button"
              onClick={() =>
                setViewMode((current) => (current === 'floor' ? 'timetable' : 'floor'))
              }
            >
              {viewMode === 'floor' ? 'Show timetable' : 'Show floor plan'}
            </button>
          </div>
        </div>
      </header>

      <section className="main-view__content">
        {viewMode === 'floor' ? (
          <div className="main-view__placeholder">
            <span>Floor plan view placeholder</span>
          </div>
        ) : (
          <div className="main-view__placeholder">
            <span>Timetable view placeholder</span>
          </div>
        )}
      </section>

      <section className="main-view__filters">
        <FiltersPanel />
      </section>
    </main>
  )
}

