package com.juhanpuusepp.bookingapp.dto;

import java.util.Set;

public record TableDto(
		String id,
		int capacity,
		String zoneId,
		double x,
		double y,
		double width,
		double height,
		Set<String> attributes,
		boolean occupied,
		boolean recommended
) {
}
