import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import FloorPlan from '../../components/FloorPlan/FloorPlan'
import { getRecommendations } from '../../api/api'
import type { RecommendationsResponse } from '../../api/types'
import '../MainView/MainView.css'
import './RecommendationsView.css'

type LocationState = { date?: string; time?: string; partySize?: number; zoneId?: string } | null

/**
 * floor plan for the chosen date/time with recommended tables highlighted
 * shows "no suitable tables" when none match
 */
export default function RecommendationsView() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as LocationState
  const [data, setData] = useState<RecommendationsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const date = state?.date ?? ''
  const time = state?.time ?? ''
  const partySize = state?.partySize ?? 2
  const zoneId = state?.zoneId ?? ''

  useEffect(() => {
    if (!date || !time) {
      setLoading(false)
      return
    }
    setLoading(true)
    setError(null)
    getRecommendations({
      date,
      time,
      partySize,
      zoneId: zoneId || undefined,
      preferences: [],
    })
      .then(setData)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load'))
      .finally(() => setLoading(false))
  }, [date, time, partySize, zoneId])

  const hasRecommendations =
    data?.floorPlan?.tables?.some((t) => t.recommended) ?? false

  const handleTableClick = (tableId: string, capacity?: number) => {
    navigate('/reservation', { state: { tableId, date, time, capacity } })
  }

  return (
    <section className="recommendations-view">
      <header className="recommendations-view__header">
        <h1 className="recommendations-view__title">Recommendations</h1>
        <button
          type="button"
          className="recommendations-view__back-button"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </header>

      {date && time && (
        <p className="recommendations-view__chosen">
          Your selection: <strong>{date}</strong> at <strong>{time}</strong>
        </p>
      )}

      <div className="main-view__placeholder">
        {(!date || !time) && (
          <p className="recommendations-view__message">
            Please go back and select date, time, number of guests and zone, then click See recommendations.
          </p>
        )}
        {date && time && loading && <p className="recommendations-view__message">Loading…</p>}
        {date && time && error && (
          <p className="recommendations-view__message recommendations-view__message--error">
            {error}
          </p>
        )}
        {date && time && !loading && !error && data?.floorPlan && (
          <FloorPlan
            tables={data.floorPlan.tables}
            showRecommendations
            onTableClick={handleTableClick}
          />
        )}
      </div>

      {!loading && !error && data?.floorPlan && !hasRecommendations && (
        <p className="recommendations-view__no-results">
          No suitable tables were found for your requirements. Please try another date or time.
        </p>
      )}
    </section>
  )
}

