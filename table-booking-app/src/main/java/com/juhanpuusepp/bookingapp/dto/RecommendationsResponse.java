package com.juhanpuusepp.bookingapp.dto;

/**
 * Response for POST recommendations
 */
public record RecommendationsResponse(FloorPlanResponse floorPlan, String bestTableId) {
}
