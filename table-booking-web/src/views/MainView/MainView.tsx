import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FiltersPanel from '../../components/FiltersPanel/FiltersPanel'
import FloorPlan from '../../components/FloorPlan/FloorPlan'
import { getFloorPlan } from '../../api/api'
import type { FloorPlanResponse } from '../../api/types'
import './MainView.css'

/**
 * date and time for floor plan, more filters for recommendations.
 */
function todayISO() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

const TIME_OPTIONS = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const STORAGE_KEY_PREFIX = 'booking_'

function getStored(key: string, fallback: string): string {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY_PREFIX + key)
    if (s != null && s !== '') return s
  } catch {}
  return fallback
}

function getStoredNumber(key: string, fallback: number, min: number, max: number): number {
  try {
    const n = Number(sessionStorage.getItem(STORAGE_KEY_PREFIX + key))
    if (Number.isInteger(n) && n >= min && n <= max) return n
  } catch {}
  return fallback
}

function setStored(key: string, value: string): void {
  try {
    sessionStorage.setItem(STORAGE_KEY_PREFIX + key, value)
  } catch {}
}

// the minimum date the user can select is today.
function minDateISO() {
  return todayISO()
}

function isPast(date: string, time: string): boolean {
  const [year, month, day] = date.split('-').map(Number)
  const hour = parseInt(time.replace(':00', ''), 10)
  const slot = new Date(year, month - 1, day, hour, 0, 0)
  return slot.getTime() <= Date.now()
}

function allowedTimes(date: string): string[] {
  if (date !== todayISO()) return TIME_OPTIONS
  return TIME_OPTIONS.filter((t) => !isPast(date, t))
}

const VALID_ZONES = ['main', 'private', 'terrace']

export default function MainView() {
  const navigate = useNavigate()
  const [date, setDate] = useState(() => getStored('date', todayISO()))
  const [time, setTime] = useState(() => {
    const t = getStored('time', '18:00')
    return TIME_OPTIONS.includes(t) ? t : '18:00'
  })
  const [viewMode, setViewMode] = useState<'floor-plan' | 'timetable'>('floor-plan')
  const [partySize, setPartySize] = useState(() => getStoredNumber('partySize', 2, 1, 8))
  const [zoneId, setZoneId] = useState(() =>
    VALID_ZONES.includes(getStored('zoneId', 'main')) ? getStored('zoneId', 'main') : 'main'
  )
  const [recommendationDate, setRecommendationDate] = useState(() =>
    getStored('recommendationDate', todayISO())
  )
  const [recommendationTime, setRecommendationTime] = useState(() => {
    const t = getStored('recommendationTime', '18:00')
    return TIME_OPTIONS.includes(t) ? t : '18:00'
  })
  const [floorPlan, setFloorPlan] = useState<FloorPlanResponse | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const times = allowedTimes(date)
  const effectiveTime = times.includes(time) ? time : times[0] ?? '18:00'
  const recommendationTimes = allowedTimes(recommendationDate)
  const effectiveRecommendationTime = recommendationTimes.includes(recommendationTime)
    ? recommendationTime
    : recommendationTimes[0] ?? '18:00'

  useEffect(() => {
    if (!times.includes(time)) setTime(times[0] ?? '18:00')
  }, [date])

  useEffect(() => {
    if (!recommendationTimes.includes(recommendationTime)) {
      setRecommendationTime(recommendationTimes[0] ?? '18:00')
    }
  }, [recommendationDate])

  // persist pickers so they survive navigation
  useEffect(() => {
    setStored('date', date)
    setStored('time', time)
    setStored('recommendationDate', recommendationDate)
    setStored('recommendationTime', recommendationTime)
    setStored('partySize', String(partySize))
    setStored('zoneId', zoneId)
  }, [date, time, recommendationDate, recommendationTime, partySize, zoneId])

  useEffect(() => {
    setError(null)
    setLoading(true)
    getFloorPlan({ date, time: effectiveTime })
      .then(setFloorPlan)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [date, effectiveTime])

  const handleTableClick = (tableId: string, capacity?: number) => {
    navigate('/reservation', { state: { tableId, date, time: effectiveTime, capacity } })
  }

  return (
    <main className="main-view">
      <header className="main-view__header">
        <h1 className="main-view__title">Table booking</h1>

        <div className="main-view__top-row">
          <label className="main-view__field">
            <span>Date</span>
            <input
              type="date"
              value={date}
              min={minDateISO()}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>

          <label className="main-view__field">
            <span>Time</span>
            <select value={effectiveTime} onChange={(e) => setTime(e.target.value)}>
              {times.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>

          <div className="main-view__view-toggle" aria-label="View mode">
            <button
              type="button"
              className="main-view__view-toggle-button"
              onClick={() => setViewMode(viewMode === 'floor-plan' ? 'timetable' : 'floor-plan')}
            >
              {viewMode === 'floor-plan' ? 'See timetable' : 'See floor plan'}
            </button>
            <button
              type="button"
              className="main-view__view-toggle-button"
              onClick={() => navigate('/my-reservations')}
            >
              View my reservations
            </button>
          </div>
        </div>
      </header>

      <section className="main-view__content">
        <div className="main-view__placeholder">
          <div className="main-view__view-slot">
            {viewMode === 'timetable' && (
              <p className="main-view__message">Timetable view placeholder.</p>
            )}
            {viewMode === 'floor-plan' && (
              <>
                {loading && <p className="main-view__message">Loading…</p>}
                {error && <p className="main-view__message main-view__message--error">{error}</p>}
                {!loading && !error && floorPlan && (
                  <FloorPlan
                    tables={floorPlan.tables}
                    showRecommendations={false}
                    onTableClick={handleTableClick}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <section className="main-view__filters">
        <FiltersPanel
          recommendationDate={recommendationDate}
          recommendationTime={effectiveRecommendationTime}
          recommendationTimeOptions={recommendationTimes}
          minDate={minDateISO()}
          partySize={partySize}
          zoneId={zoneId}
          onRecommendationDateChange={setRecommendationDate}
          onRecommendationTimeChange={setRecommendationTime}
          onPartySizeChange={setPartySize}
          onZoneChange={setZoneId}
          onSeeRecommendations={() =>
            navigate('/recommendations', {
              state: {
                date: recommendationDate,
                time: effectiveRecommendationTime,
                partySize,
                zoneId,
              },
            })
          }
        />
      </section>
    </main>
  )
}
