package com.juhanpuusepp.bookingapp.controller;

import com.juhanpuusepp.bookingapp.domain.Reservation;
import com.juhanpuusepp.bookingapp.dto.CreateReservationRequest;
import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.RecommendationsResponse;
import com.juhanpuusepp.bookingapp.dto.SearchFilters;
import com.juhanpuusepp.bookingapp.dto.TimetableResponse;
import com.juhanpuusepp.bookingapp.service.FloorPlanService;
import com.juhanpuusepp.bookingapp.service.RecommendationService;
import com.juhanpuusepp.bookingapp.service.ReservationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class BookingController {

	private final FloorPlanService floorPlanService;
	private final RecommendationService recommendationService;
	private final ReservationService reservationService;

	public BookingController(FloorPlanService floorPlanService, RecommendationService recommendationService,
			ReservationService reservationService) {
		this.floorPlanService = floorPlanService;
		this.recommendationService = recommendationService;
		this.reservationService = reservationService;
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

	@PostMapping("/reservations")
	public ResponseEntity<?> createReservation(@RequestBody CreateReservationRequest request) {
		Optional<Reservation> created = reservationService.tryCreate(
				request.tableId(),
				request.date(),
				request.startTime(),
				request.partySize()
		);
		if (created.isPresent()) {
			return ResponseEntity.status(201).body(Map.of("id", created.get().id(), "tableId", created.get().tableId()));
		}
		return ResponseEntity.status(409).body(Map.of("error", "CONFLICT", "message", "Table not available for this time"));
	}
}
