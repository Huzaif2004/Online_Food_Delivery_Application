package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.MenuItem;

public interface MenuRepo extends JpaRepository<MenuItem,Long>{

    @Query("SELECT m FROM MenuItem m WHERE m.hotel.id = ?1")
    List<MenuItem> findByHotelId(Long id);
     
    @Query("SELECT m FROM MenuItem m JOIN FETCH m.hotel WHERE m.name LIKE %:searchTerm%")
    List<MenuItem> findByMenuName(@Param("searchTerm") String searchTerm);


    @Query("SELECT m from MenuItem m where LOWER(m.type)=LOWER(?1)")
    List<MenuItem>getMenusByType(@Param("type") String type);
   
    List<MenuItem>findByType(String type,Sort sort);

    Optional<MenuItem>findByName(String name);

    @Query("SELECT m from MenuItem m where m.hotel.id=?1 and m.type=?2")
    List<MenuItem>getMenuItem(Long id,@Param("type") String type);

    
}
