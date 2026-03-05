package com.juhanpuusepp.bookingapp.domain;

import java.util.Set;

/**
 * Record used because immutable.
 */
public record Table(
		String id,
		int capacity,
		String zoneId,
		double x,
		double y,
		Set<String> attributes
) {
}
