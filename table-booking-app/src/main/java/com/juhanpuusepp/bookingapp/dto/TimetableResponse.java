package com.juhanpuusepp.bookingapp.dto;

import java.util.List;

/**
 * Response for GET timetable
 */
public record TimetableResponse(List<TimeSlotAvailability> slots) {

	public record TimeSlotAvailability(String time, int freeTables, boolean hasAvailability) {
	}
}
