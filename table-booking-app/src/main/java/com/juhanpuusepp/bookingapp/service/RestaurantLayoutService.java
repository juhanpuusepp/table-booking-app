package com.juhanpuusepp.bookingapp.service;

import com.juhanpuusepp.bookingapp.domain.Table;
import com.juhanpuusepp.bookingapp.domain.Zone;

import java.util.List;

public interface RestaurantLayoutService {

	List<Table> getTables();

	List<Zone> getZones();
}
