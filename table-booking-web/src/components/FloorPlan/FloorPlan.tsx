import { useState, useCallback } from 'react'
import type { TableDto } from '../../api/types'
import './FloorPlan.css'

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
  tables?: TableDto[]
  showRecommendations?: boolean
  onTableClick?: (tableId: string) => void
}

// static layout. available/occupied/recommended demo.
const STUB_TABLES: StubTable[] = [
  { id: 'T1', capacity: 4, zoneId: 'main', x: 45, y: 150, width: 50, height: 40, state: 'available' },
  { id: 'T2', capacity: 2, zoneId: 'private', x: 400, y: 42, width: 45, height: 35, state: 'available' },
  { id: 'T3', capacity: 6, zoneId: 'terrace', x: 45, y: 255, width: 55, height: 42, state: 'available' },
  { id: 'T4', capacity: 6, zoneId: 'terrace', x: 220, y: 255, width: 55, height: 42, state: 'available' },
  { id: 'T5', capacity: 6, zoneId: 'terrace', x: 330, y: 255, width: 55, height: 42, state: 'available' },
  { id: 'T7', capacity: 4, zoneId: 'main', x: 235, y: 150, width: 50, height: 40, state: 'available' },
  { id: 'T8', capacity: 4, zoneId: 'main', x: 235, y: 50, width: 50, height: 40, state: 'available' },
]

//zone rectangles and display names for tooltips
const ZONES = [
  { id: 'main', name: 'Indoors', x: 20, y: 20, width: 320, height: 190 },
  { id: 'private', name: 'Private room', x: 340, y: 20, width: 140, height: 80 },
  { id: 'terrace', name: 'Terrace', x: 20, y: 210, width: 412, height: 120 },
  { id: 'kitchen', name: 'Kitchen', x: 340, y: 101, width: 170, height: 110 }
] as const

//wall segments
const WALLS = [
  { x: 19, y: 19, w: 320, h: 2 }, // indoors top wall
  { x: 19, y: 19, w: 2, h: 50 }, // indoors left top wall
  { x: 19, y: 109, w: 2, h: 190 }, // indoors left bottom wall
  { x: 339, y: 180, w: 2, h: 30 }, // indoor kitchen bottom wall
  { x: 339, y: 101, w: 2, h: 30 }, // indoor kirchen top wall
  { x: 339, y: 209, w: 170, h: 2 }, // kitchen bottom wall
  { x: 339, y: 19, w: 2, h: 20 }, // indoors private room top wall
  { x: 339, y: 79, w: 2, h: 20 }, // indoors private room bottom wall
  { x: 339, y: 19, w: 142, h: 2 }, // private room top wall
  { x: 481, y: 19, w: 2, h: 82 }, // private room right wall
  { x: 339, y: 99, w: 170, h: 2 }, // private room bottom wall
  { x: 179, y: 209, w: 250, h: 2 }, // terrace top right wall
  { x: 19, y: 209, w: 100, h: 2 }, // terrace top left wall
  { x: 19, y: 209, w: 2, h: 122 }, // terrace left wall
  { x: 429, y: 209, w: 2, h: 122 }, // terrace right wall
  { x: 19, y: 329, w: 412, h: 2 }, // terrace bottom wall
]

const VIEWBOX = { width: 500, height: 350 }

export default function FloorPlan(props: FloorPlanProps) {
  const { tables = [], showRecommendations = false, onTableClick } = props
  const useApiTables = tables.length > 0 && tables.every((t) => 'occupied' in t && 'width' in t)
  const displayTables: Array<StubTable & { occupied?: boolean; recommended?: boolean }> = useApiTables
    ? (tables as TableDto[]).map((t) => ({
        id: t.id,
        capacity: t.capacity,
        zoneId: t.zoneId,
        x: t.x,
        y: t.y,
        width: t.width,
        height: t.height,
        state: t.occupied ? 'occupied' : t.recommended ? 'recommended' : 'available',
        occupied: t.occupied,
        recommended: t.recommended,
      }))
    : STUB_TABLES
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
        preserveAspectRatio="xMidYMid meet"
        aria-label="Restaurant floor plan"
      >
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
          />
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
        {displayTables.map((t) => {
          const stateClass = (t as StubTable).state ? `floor-plan__table--${(t as StubTable).state}` : ''
          return (
            <rect
              key={t.id}
              className={`floor-plan__table ${stateClass}`}
              x={t.x}
              y={t.y}
              width={t.width}
              height={t.height}
              data-table-id={t.id}
              aria-label={`Table ${t.id}, ${t.capacity} seats${t.occupied ? ' (occupied)' : ''}`}
              onClick={() => {
                if (t.occupied) return
                handleTableClick(t.id)
              }}
              role="button"
              tabIndex={t.occupied ? -1 : 0}
              onMouseEnter={(e) =>
                setTooltip({
                  text: `Table ${t.id} – ${t.capacity} seats${t.occupied ? ' (occupied)' : ''}`,
                  x: e.clientX,
                  y: e.clientY,
                })
              }
              onMouseLeave={() => setTooltip(null)}
              onKeyDown={(e) => {
                if (t.occupied) return
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleTableClick(t.id)
                }
              }}
            />
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
