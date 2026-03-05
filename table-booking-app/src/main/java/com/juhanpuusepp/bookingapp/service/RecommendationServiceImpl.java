package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.RecommendationsResponse;
import com.juhanpuusepp.bookingapp.dto.SearchFilters;
import org.springframework.stereotype.Service;

@Service
public class RecommendationServiceImpl implements RecommendationService {

	@Override
	public RecommendationsResponse getRecommendations(SearchFilters filters) {
		return new RecommendationsResponse(
				new FloorPlanResponse(java.util.List.of(), java.util.List.of()),
				null
		);
	}
}
