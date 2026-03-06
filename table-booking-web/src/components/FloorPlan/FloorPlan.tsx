import { useState, useCallback } from 'react'
import './FloorPlan.css'

// stub table shape
interface StubTable {
  id: string
  capacity: number
  zoneId: string
  x: number
  y: number
  width: number
  height: number
  state?: 'available' | 'occupied' | 'recommended'
}

interface FloorPlanProps {
  // when api is connected, tables from backend
  tables?: { id: string; capacity: number; zoneId: string; x: number; y: number }[]
  showRecommendations?: boolean
  onTableClick?: (tableId: string) => void
}

// static layout. available/occupied/recommended demo.
const STUB_TABLES: StubTable[] = [
  { id: 'T1', capacity: 4, zoneId: 'main', x: 90, y: 70, width: 50, height: 40, state: 'available' },
  { id: 'T2', capacity: 2, zoneId: 'private', x: 330, y: 55, width: 45, height: 35, state: 'occupied' },
  { id: 'T3', capacity: 6, zoneId: 'terrace', x: 110, y: 255, width: 55, height: 42, state: 'recommended' },
]

//zone rectangles and display names for tooltips
const ZONES = [
  { id: 'main', name: 'Indoors', x: 20, y: 20, width: 260, height: 180 },
  { id: 'private', name: 'Private room', x: 300, y: 20, width: 180, height: 100 },
  { id: 'terrace', name: 'Terrace', x: 20, y: 210, width: 460, height: 120 },
] as const

//wall segments [x1, y1, x2, y2] and thickness; drawn as thin rects
const WALLS = [
  { x: 19, y: 19, w: 262, h: 2 },
  { x: 19, y: 19, w: 2, h: 182 },
  { x: 279, y: 19, w: 2, h: 182 },
  { x: 298, y: 19, w: 2, h: 102 },
  { x: 298, y: 19, w: 184, h: 2 },
  { x: 481, y: 19, w: 2, h: 102 },
  { x: 19, y: 209, w: 462, h: 2 },
  { x: 19, y: 209, w: 2, h: 122 },
  { x: 481, y: 209, w: 2, h: 122 },
  { x: 19, y: 329, w: 464, h: 2 },
]

const VIEWBOX = { width: 500, height: 350 }

export default function FloorPlan(props: FloorPlanProps) {
  const { tables: _tables = [], showRecommendations = false, onTableClick } = props
  const displayTables = STUB_TABLES
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number } | null>(null)

  const handleTableClick = (tableId: string) => {
    onTableClick?.(tableId)
  }

  const handlePointerMove = useCallback((e: React.MouseEvent) => {
    setTooltip((prev) => (prev ? { ...prev, x: e.clientX, y: e.clientY } : null))
  }, [])

  return (
    <div
      className="floor-plan"
      data-show-recommendations={showRecommendations}
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setTooltip(null)}
    >
      <svg
        className="floor-plan__svg"
        viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
        aria-label="Restaurant floor plan"
      >
        {/* zone backgrounds with hover tooltips */}
        {ZONES.map((z) => (
          <rect
            key={z.id}
            className={`floor-plan__zone floor-plan__zone--${z.id}`}
            x={z.x}
            y={z.y}
            width={z.width}
            height={z.height}
            aria-hidden
            onMouseEnter={(e) => setTooltip({ text: z.name, x: e.clientX, y: e.clientY })}
            onMouseLeave={() => setTooltip(null)}
          >
            <title>{z.name}</title>
          </rect>
        ))}
        {/* walls */}
        {WALLS.map((w, i) => (
          <rect
            key={`wall-${i}`}
            className="floor-plan__wall"
            x={w.x}
            y={w.y}
            width={w.w}
            height={w.h}
            aria-hidden
          />
        ))}
        {/* tables with tooltips, state classes, and click */}
        {displayTables.map((t) => {
          const stateClass = t.state ? `floor-plan__table--${t.state}` : ''
          return (
            <rect
              key={t.id}
              className={`floor-plan__table ${stateClass}`}
              x={t.x}
              y={t.y}
              width={t.width}
              height={t.height}
              data-table-id={t.id}
              aria-label={`Table ${t.id}, ${t.capacity} seats`}
              onClick={() => handleTableClick(t.id)}
              role="button"
              tabIndex={0}
              onMouseEnter={(e) =>
                setTooltip({ text: `Table ${t.id} – ${t.capacity} seats`, x: e.clientX, y: e.clientY })
              }
              onMouseLeave={() => setTooltip(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTableClick(t.id)
                }
              }}
            >
              <title>{`Table ${t.id} – ${t.capacity} seats`}</title>
            </rect>
          )
        })}
      </svg>
      {tooltip && (
        <div
          className="floor-plan__tooltip"
          style={{ left: tooltip.x, top: tooltip.y }}
          role="tooltip"
        >
          {tooltip.text}
        </div>
      )}
    </div>
  )
}
