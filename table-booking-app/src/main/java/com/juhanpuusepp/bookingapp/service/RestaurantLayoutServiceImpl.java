package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Table;
import com.juhanpuusepp.bookingapp.domain.Zone;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 * mutable layout that starts from default, can be updated via updateTablePosition
 * single in-memory layout shared for all dates and times, reverts on JVM restart
 */
@Service
public class RestaurantLayoutServiceImpl implements RestaurantLayoutService {

	private static List<Table> defaultTables() {
		return List.of(
				new Table("T1", 2, "main", 45, 150, 40, 40, Set.of()),
				new Table("T2", 8, "main", 235, 150, 80, 40, Set.of()),
				new Table("T3", 4, "main", 235, 50, 40, 40, Set.of()),
				new Table("T4", 2, "private", 400, 42, 40, 40, Set.of()),
				new Table("T5", 4, "terrace", 45, 255, 40, 40, Set.of()),
				new Table("T6", 6, "terrace", 220, 255, 60, 40, Set.of()),
				new Table("T7", 6, "terrace", 330, 255, 60, 40, Set.of())
		);
	}

	private final List<Table> tables = new CopyOnWriteArrayList<>(defaultTables());

	@Override
	public List<Table> getTables() {
		return List.copyOf(tables);
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

	@Override
	public void updateTablePosition(String tableId, double x, double y, String zoneId) {
		for (int i = 0; i < tables.size(); i++) {
			if (tables.get(i).id().equals(tableId)) {
				Table t = tables.get(i);
				String newZoneId = zoneId != null && !zoneId.isBlank() ? zoneId : t.zoneId();
				tables.set(i, new Table(t.id(), t.capacity(), newZoneId, x, y, t.width(), t.height(), t.attributes()));
				return;
			}
		}
	}
}
