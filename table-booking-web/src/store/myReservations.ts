const STORAGE_KEY = 'myReservations'

export interface StoredReservation {
  id: string
  tableId: string
  date: string
  startTime: string
  partySize: number
  createdAt: number
}

export function getMyReservations(): StoredReservation[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const list = JSON.parse(raw) as StoredReservation[]
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export function addMyReservation(reservation: Omit<StoredReservation, 'createdAt'>): void {
  const list = getMyReservations()
  list.push({ ...reservation, createdAt: Date.now() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}
