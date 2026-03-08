package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.RecommendationsResponse;
import com.juhanpuusepp.bookingapp.dto.SearchFilters;
import com.juhanpuusepp.bookingapp.dto.TableDto;
import com.juhanpuusepp.bookingapp.dto.ZoneDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * algorithm for finding recommended tables
 */
@Service
public class RecommendationServiceImpl implements RecommendationService {

	private final FloorPlanService floorPlanService;

	public RecommendationServiceImpl(FloorPlanService floorPlanService) {
		this.floorPlanService = floorPlanService;
	}

	@Override
	public RecommendationsResponse getRecommendations(SearchFilters filters) {
		FloorPlanResponse plan = floorPlanService.getFloorPlan(
				filters.date(),
				filters.time(),
				null,
				null
		);
		int partySize = filters.partySize();
		String zoneId = filters.zoneId() != null ? filters.zoneId() : "";

		List<TableDto> tablesWithRecommended = plan.tables().stream()
				.map(t -> {
					boolean recommended = isRecommended(t, partySize, zoneId);
					return new TableDto(
							t.id(),
							t.capacity(),
							t.zoneId(),
							t.x(),
							t.y(),
							t.width(),
							t.height(),
							t.attributes(),
							t.occupied(),
							recommended
					);
				})
				.collect(Collectors.toList());

		String firstRecommendedId = tablesWithRecommended.stream()
				.filter(TableDto::recommended)
				.map(TableDto::id)
				.findFirst()
				.orElse(null);

		return new RecommendationsResponse(
				new FloorPlanResponse(tablesWithRecommended, plan.zones()),
				firstRecommendedId
		);
	}

	private static boolean isRecommended(TableDto t, int partySize, String zoneId) {
		if (t.occupied()) return false;
		if (zoneId != null && !zoneId.isEmpty() && !zoneId.equals(t.zoneId())) return false;
		if (partySize > t.capacity()) return false;
		if (partySize < t.capacity() - 2) return false;
		return true;
	}
}
