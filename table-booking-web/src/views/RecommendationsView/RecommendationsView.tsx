import { useNavigate } from 'react-router-dom'
import FloorPlan from '../../components/FloorPlan/FloorPlan'
import type { TableDto } from '../../api/types'
import './RecommendationsView.css'

/**
 * floor plan for selected filters with recommended tables highlighted
 */
export default function RecommendationsView() {
  const navigate = useNavigate()

  // placeholder tables until backend is wired in
  const placeholderTables: TableDto[] = []

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

      <div className="recommendations-view__content">
        <FloorPlan tables={placeholderTables} showRecommendations />
      </div>
    </section>
  )
}

