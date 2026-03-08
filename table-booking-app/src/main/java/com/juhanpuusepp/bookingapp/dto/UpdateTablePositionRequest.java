package com.juhanpuusepp.bookingapp.dto;

/**
 * request body for PATCH admin layout: update a tables position and  zone
 */
public record UpdateTablePositionRequest(double x, double y, String zoneId) {
}
