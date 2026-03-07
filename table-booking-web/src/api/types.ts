/**
 *  mirroring backend DTOs for table booking API
 */

export interface Zone {
  id: string
  name: string
}

export interface TableDto {
  id: string
  capacity: number
  zoneId: string
  x: number
  y: number
  width: number
  height: number
  attributes?: Set<string> | string[]
  occupied: boolean
  recommended: boolean
}

export interface CreateReservationRequest {
  tableId: string
  date: string
  startTime: string
  partySize: number
}

export interface FloorPlanResponse {
  tables: TableDto[]
  zones: Zone[]
}

export interface TimeSlotAvailability {
  time: string
  freeTables: number
  hasAvailability: boolean
}

export interface TimetableResponse {
  slots: TimeSlotAvailability[]
}

export interface SearchFilters {
  date: string
  time: string
  partySize: number
  zoneId?: string
  preferences?: string[]
}

export interface RecommendationsResponse {
  floorPlan: FloorPlanResponse
  bestTableId: string | null
}
