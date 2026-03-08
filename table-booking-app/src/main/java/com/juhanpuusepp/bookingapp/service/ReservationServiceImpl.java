package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Reservation;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * in-memory reservations. Each reservation lasts 2 hours. A table is also
 * unavailable for 1 hour before a reservation (buffer) so the previous guest
 * can have a full 2h slot.
 */
@Service
public class ReservationServiceImpl implements ReservationService {

	private static final int RESERVATION_DURATION_HOURS = 2;
	private static final int BUFFER_HOURS_BEFORE = 1;
	private static final int MIN_START_HOUR = 10;
	private static final int MAX_START_HOUR = 21;

	private final List<Reservation> store = new CopyOnWriteArrayList<>();

	@Override
	public boolean isTableOccupied(String tableId, String date, String time) {
		int slotHour = parseHour(time);
		for (Reservation r : store) {
			if (!r.tableId().equals(tableId) || !r.date().equals(date)) continue;
			int startHour = parseHour(r.startTime());
			// reservation occupies startHour and startHour+1 (2h) plus 1h buffer before
			int bufferStart = startHour - BUFFER_HOURS_BEFORE;
			if (slotHour >= bufferStart && slotHour < startHour + RESERVATION_DURATION_HOURS) {
				return true;
			}
		}
		return false;
	}

	@Override
	public Optional<Reservation> tryCreate(String tableId, String date, String startTime, int partySize) {
		int startHour = parseHour(startTime);
		if (startHour < MIN_START_HOUR || startHour > MAX_START_HOUR) {
			return Optional.empty();
		}
		for (int h = startHour; h < startHour + RESERVATION_DURATION_HOURS; h++) {
			String slotTime = formatHour(h);
			if (isTableOccupied(tableId, date, slotTime)) {
				return Optional.empty();
			}
		}
		Reservation r = new Reservation(
				UUID.randomUUID().toString(),
				tableId,
				date,
				startTime,
				partySize
		);
		store.add(r);
		return Optional.of(r);
	}

	private static int parseHour(String time) {
		if (time == null || !time.matches("\\d{1,2}:00")) {
			throw new IllegalArgumentException("Invalid time: " + time);
		}
		int hour = Integer.parseInt(time.replace(":00", ""));
		if (hour < 0 || hour > 23) throw new IllegalArgumentException("Invalid hour: " + time);
		return hour;
	}

	private static String formatHour(int hour) {
		return String.format("%d:00", hour);
	}
}
