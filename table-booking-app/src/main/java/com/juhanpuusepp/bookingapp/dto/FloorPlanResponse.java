package com.juhanpuusepp.bookingapp.dto;

import java.util.List;

/**
 * Response for GET floor-plan
 */
public record FloorPlanResponse(List<TableDto> tables, List<ZoneDto> zones) {
}
