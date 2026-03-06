import type { TableDto } from '../../api/types'
import './FloorPlan.css'

interface FloorPlanProps {
  tables: TableDto[]
  // when true, show recommended tables highlighted
  showRecommendations?: boolean
}

export default function FloorPlan({ tables, showRecommendations = false }: FloorPlanProps) {
  return (
    <div className="floor-plan">
      <p>
        {tables.length} table(s). showRecommendations=
        {String(showRecommendations)}
      </p>
    </div>
  )
}

