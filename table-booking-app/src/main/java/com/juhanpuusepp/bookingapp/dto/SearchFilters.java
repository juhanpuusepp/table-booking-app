package com.juhanpuusepp.bookingapp.dto;

import java.util.List;

/**
 * Request body for recommendation search
 */
public record SearchFilters(
		String date,
		String time,
		int partySize,
		String zoneId,
		List<String> preferences
) {
}
