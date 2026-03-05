package com.juhanpuusepp.bookingapp.dto;

import java.util.Set;

/**
 * Table as returned by API: geometry, capacity, zone, occupied, recommended.
 */
public record TableDto(
		String id,
		int capacity,
		String zoneId,
		double x,
		double y,
		Set<String> attributes,
		boolean occupied,
		boolean recommended
) {
}
