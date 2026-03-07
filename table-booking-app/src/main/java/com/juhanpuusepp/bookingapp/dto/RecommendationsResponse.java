package com.juhanpuusepp.bookingapp.dto;

/**
 * response for POST recommendations
 */
public record RecommendationsResponse(FloorPlanResponse floorPlan, String bestTableId) {
}
