package com.juhanpuusepp.bookingapp.config;

import com.juhanpuusepp.bookingapp.service.ReservationService;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

/**
 * Seeds random reservations for the next 7 days (today + 6) so the floor plan gets randomly occupied tables
 */
@Component
public class SeedDataRunner implements ApplicationRunner {

	private static final List<String> TABLE_IDS = List.of("T1", "T2", "T3", "T4", "T5", "T7", "T8");
	private static final List<String> START_TIMES = List.of(
			"10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"
	);
	private static final int RESERVATIONS_PER_DAY = 4;
	private static final int MAX_ATTEMPTS_PER_DAY = 25;
	private static final Random RANDOM = new Random(42);

	private final ReservationService reservationService;

	public SeedDataRunner(ReservationService reservationService) {
		this.reservationService = reservationService;
	}

	@Override
	public void run(ApplicationArguments args) {
		for (int dayOffset = 0; dayOffset < 7; dayOffset++) {
			String date = LocalDate.now().plusDays(dayOffset).toString();
			int created = 0;
			int attempts = 0;
			while (created < RESERVATIONS_PER_DAY && attempts < MAX_ATTEMPTS_PER_DAY) {
				String tableId = TABLE_IDS.get(RANDOM.nextInt(TABLE_IDS.size()));
				String startTime = START_TIMES.get(RANDOM.nextInt(START_TIMES.size()));
				int partySize = 2 + RANDOM.nextInt(5);
				if (reservationService.tryCreate(tableId, date, startTime, partySize).isPresent()) {
					created++;
				}
				attempts++;
			}
		}
	}
}
