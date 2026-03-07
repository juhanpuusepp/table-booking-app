package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Table;
import com.juhanpuusepp.bookingapp.domain.Zone;
import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.TableDto;
import com.juhanpuusepp.bookingapp.dto.TimetableResponse;
import com.juhanpuusepp.bookingapp.dto.ZoneDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FloorPlanServiceImpl implements FloorPlanService {

	private final RestaurantLayoutService layoutService;
	private final ReservationService reservationService;

	public FloorPlanServiceImpl(RestaurantLayoutService layoutService, ReservationService reservationService) {
		this.layoutService = layoutService;
		this.reservationService = reservationService;
	}

	@Override
	public FloorPlanResponse getFloorPlan(String date, String time, String zoneId, Integer partySize) {
		List<Table> tables = layoutService.getTables();
		List<Zone> zones = layoutService.getZones();
		List<TableDto> dtos = tables.stream()
				.map(t -> new TableDto(
						t.id(),
						t.capacity(),
						t.zoneId(),
						t.x(),
						t.y(),
						t.width(),
						t.height(),
						t.attributes(),
						reservationService.isTableOccupied(t.id(), date, time),
						false
				))
				.collect(Collectors.toList());
		List<ZoneDto> zoneDtos = zones.stream()
				.map(z -> new ZoneDto(z.id(), z.name()))
				.collect(Collectors.toList());
		return new FloorPlanResponse(dtos, zoneDtos);
	}

	@Override
	public TimetableResponse getTimetable(String date, String zoneId, Integer partySize) {
		return new TimetableResponse(List.of());
	}
}
