package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Reservation;

import java.util.Optional;


public interface ReservationService {

	boolean isTableOccupied(String tableId, String date, String time);

	Optional<Reservation> tryCreate(String tableId, String date, String startTime, int partySize);
}
