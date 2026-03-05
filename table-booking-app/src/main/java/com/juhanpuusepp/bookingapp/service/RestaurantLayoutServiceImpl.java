package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Table;
import com.juhanpuusepp.bookingapp.domain.Zone;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantLayoutServiceImpl implements RestaurantLayoutService {

	@Override
	public List<Table> getTables() {
		return List.of();
	}

	@Override
	public List<Zone> getZones() {
		return List.of();
	}
}
