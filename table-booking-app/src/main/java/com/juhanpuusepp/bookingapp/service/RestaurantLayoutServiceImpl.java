package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Table;
import com.juhanpuusepp.bookingapp.domain.Zone;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * fixed layout matching the frontend svg
 */
@Service
public class RestaurantLayoutServiceImpl implements RestaurantLayoutService {

	@Override
	public List<Table> getTables() {
		return List.of(
				new Table("T1", 2, "main", 45, 150, 40, 40, Set.of()),
				new Table("T2", 2, "private", 400, 42, 40, 40, Set.of()),
				new Table("T3", 4, "terrace", 45, 255, 40, 40, Set.of()),
				new Table("T4", 6, "terrace", 220, 255, 60, 40, Set.of()),
				new Table("T5", 6, "terrace", 330, 255, 60, 40, Set.of()),
				new Table("T7", 8, "main", 235, 150, 80, 40, Set.of()),
				new Table("T8", 4, "main", 235, 50, 40, 40, Set.of())
		);
	}

	@Override
	public List<Zone> getZones() {
		return List.of(
				new Zone("main", "Indoors"),
				new Zone("private", "Private room"),
				new Zone("terrace", "Terrace"),
				new Zone("kitchen", "Kitchen")
		);
	}
}
