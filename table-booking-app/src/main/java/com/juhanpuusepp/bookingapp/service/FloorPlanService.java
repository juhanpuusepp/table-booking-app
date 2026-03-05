package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.TimetableResponse;

public interface FloorPlanService {

	FloorPlanResponse getFloorPlan(String date, String time, String zoneId, Integer partySize);

	TimetableResponse getTimetable(String date, String zoneId, Integer partySize);
}
