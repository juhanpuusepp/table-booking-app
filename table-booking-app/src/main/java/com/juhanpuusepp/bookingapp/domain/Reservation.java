package com.juhanpuusepp.bookingapp.domain;

/**
 * A reservation for a table
 */
public record Reservation(
		String id,
		String tableId,
		String date,
		String startTime,
		int partySize
) {
}
