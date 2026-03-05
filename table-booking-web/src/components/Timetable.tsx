import type { TimetableResponse } from '../api/types'

interface TimetableProps {
  data: TimetableResponse | null
}

export default function Timetable({ data }: TimetableProps) {
  return (
    <div>
      <p>Timetable – {data ? `${data.slots.length} slot(s)` : 'no data'}.</p>
    </div>
  )
}
