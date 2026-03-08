import type {
  CreateReservationRequest,
  FloorPlanResponse,
  RecommendationsResponse,
  SearchFilters,
  TimetableResponse,
} from './types'

const API_BASE = '/api'

export async function getFloorPlan(params: {
  date: string
  time: string
  zoneId?: string
  partySize?: number
}): Promise<FloorPlanResponse> {
  const search = new URLSearchParams({
    date: params.date,
    time: params.time,
  })
  if (params.zoneId != null) search.set('zoneId', params.zoneId)
  if (params.partySize != null) search.set('partySize', String(params.partySize))
  const res = await fetch(`${API_BASE}/floor-plan?${search}`, { cache: 'no-store' })
  if (!res.ok) throw new Error(`floor-plan: ${res.status}`)
  return res.json()
}

export async function getTimetable(params: {
  date: string
  zoneId?: string
  partySize?: number
}): Promise<TimetableResponse> {
  const search = new URLSearchParams({ date: params.date })
  if (params.zoneId != null) search.set('zoneId', params.zoneId)
  if (params.partySize != null) search.set('partySize', String(params.partySize))
  const res = await fetch(`${API_BASE}/timetable?${search}`)
  if (!res.ok) throw new Error(`timetable: ${res.status}`)
  return res.json()
}

export async function getRecommendations(filters: SearchFilters): Promise<RecommendationsResponse> {
  const res = await fetch(`${API_BASE}/recommendations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(filters),
  })
  if (!res.ok) throw new Error(`recommendations: ${res.status}`)
  return res.json()
}

export async function createReservation(
  request: CreateReservationRequest
): Promise<{ id: string; tableId: string }> {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
  const data = await res.json()
  if (!res.ok) {
    const err = new Error((data as { message?: string }).message ?? `reservations: ${res.status}`) as Error & {
      status: number
    }
    ;(err as Error & { status: number }).status = res.status
    throw err
  }
  return data as { id: string; tableId: string }
}

export async function updateTablePosition(
  tableId: string,
  x: number,
  y: number,
  zoneId: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/admin/layout/tables/${encodeURIComponent(tableId)}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ x, y, zoneId }),
  })
  if (!res.ok) throw new Error(`update table position: ${res.status}`)
}
