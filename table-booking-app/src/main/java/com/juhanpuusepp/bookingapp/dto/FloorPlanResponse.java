package com.juhanpuusepp.bookingapp.dto;

import java.util.List;

/**
 * response for GET floor-plan
 */
public record FloorPlanResponse(List<TableDto> tables, List<ZoneDto> zones) {
}
