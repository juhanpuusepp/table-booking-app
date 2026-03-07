package com.juhanpuusepp.bookingapp.dto;

/**
 * request body for POST /api/reservations
 */
public record CreateReservationRequest(
		String tableId,
		String date,
		String startTime,
		int partySize
) {
}
