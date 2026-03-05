package com.juhanpuusepp.bookingapp.controller;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.RecommendationsResponse;
import com.juhanpuusepp.bookingapp.dto.SearchFilters;
import com.juhanpuusepp.bookingapp.dto.TimetableResponse;
import com.juhanpuusepp.bookingapp.service.FloorPlanService;
import com.juhanpuusepp.bookingapp.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api")
public class BookingController {

	private final FloorPlanService floorPlanService;
	private final RecommendationService recommendationService;

	public BookingController(FloorPlanService floorPlanService, RecommendationService recommendationService) {
		this.floorPlanService = floorPlanService;
		this.recommendationService = recommendationService;
	}

	@GetMapping("/floor-plan")
	public ResponseEntity<FloorPlanResponse> getFloorPlan(
			@RequestParam String date,
			@RequestParam String time,
			@RequestParam(required = false) String zoneId,
			@RequestParam(required = false) Integer partySize) {
		FloorPlanResponse response = floorPlanService.getFloorPlan(date, time, zoneId, partySize);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/timetable")
	public ResponseEntity<TimetableResponse> getTimetable(
			@RequestParam String date,
			@RequestParam(required = false) String zoneId,
			@RequestParam(required = false) Integer partySize) {
		TimetableResponse response = floorPlanService.getTimetable(date, zoneId, partySize);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/recommendations")
	public ResponseEntity<RecommendationsResponse> getRecommendations(@RequestBody SearchFilters filters) {
		RecommendationsResponse response = recommendationService.getRecommendations(filters);
		return ResponseEntity.ok(response);
	}
}
