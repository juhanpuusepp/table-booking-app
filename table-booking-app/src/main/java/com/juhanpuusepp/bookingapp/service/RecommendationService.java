package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.dto.FloorPlanResponse;
import com.juhanpuusepp.bookingapp.dto.RecommendationsResponse;
import com.juhanpuusepp.bookingapp.dto.SearchFilters;

public interface RecommendationService {

	RecommendationsResponse getRecommendations(SearchFilters filters);
}
