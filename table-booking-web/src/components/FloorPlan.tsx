import type { TableDto } from '../api/types'

interface FloorPlanProps {
  tables: TableDto[]
  /** when true, show recommended tables highlighted */
  showRecommendations?: boolean
}

export default function FloorPlan({ tables, showRecommendations = false }: FloorPlanProps) {
  return (
    <div>
      <p>Floor plan – {tables.length} table(s). showRecommendations={String(showRecommendations)}</p>
    </div>
  )
}
