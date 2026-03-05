package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.TimetableResponse;
import org.springframework.stereotype.Service;

@Service
public class FloorPlanServiceImpl implements FloorPlanService {

	@Override
	public FloorPlanResponse getFloorPlan(String date, String time, String zoneId, Integer partySize) {
		return new FloorPlanResponse(java.util.List.of(), java.util.List.of());
	}

	@Override
	public TimetableResponse getTimetable(String date, String zoneId, Integer partySize) {
		return new TimetableResponse(java.util.List.of());
	}
}
