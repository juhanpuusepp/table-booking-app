import type { TableDto } from '../../api/types'
import './Timetable.css'

export interface TimetableZone {
  id: string
  name: string
}

interface TimetableProps {
  tables: TableDto[]
  zones?: TimetableZone[]
  onSelectTable: (tableId: string, capacity: number) => void
}

/**
 * table view of floor plan data
 */
export default function Timetable({ tables, zones = [], onSelectTable }: TimetableProps) {
  const zoneName = (zoneId: string) => zones.find((z) => z.id === zoneId)?.name ?? zoneId

  return (
    <div className="timetable">
      <table className="timetable__table">
        <thead>
          <tr>
            <th className="timetable__th">Table</th>
            <th className="timetable__th">Nr of seats</th>
            <th className="timetable__th">Zone</th>
            <th className="timetable__th">Availability</th>
            <th className="timetable__th timetable__th--action" />
          </tr>
        </thead>
        <tbody>
          {tables.length === 0 ? (
            <tr>
              <td colSpan={5} className="timetable__td timetable__td--empty">
                No tables
              </td>
            </tr>
          ) : (
            tables.map((t) => (
              <tr key={t.id} className="timetable__tr">
                <td className="timetable__td">{t.id}</td>
                <td className="timetable__td">{t.capacity}</td>
                <td className="timetable__td">{zoneName(t.zoneId)}</td>
                <td className="timetable__td">{t.occupied ? 'Occupied' : 'Available'}</td>
                <td className="timetable__td timetable__td--action">
                  <button
                    type="button"
                    className="timetable__select"
                    disabled={t.occupied}
                    onClick={() => onSelectTable(t.id, t.capacity)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
