import type { TimetableResponse } from '../../api/types'
import './Timetable.css'

interface TimetableProps {
  data: TimetableResponse | null
}

export default function Timetable({ data }: TimetableProps) {
  return (
    <div className="timetable">
      <p>Timetable – {data ? `${data.slots.length} slot(s)` : 'no data'}.</p>
    </div>
  )
}

