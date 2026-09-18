package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.model.Restaurant;

public interface HotelRepository extends JpaRepository<Restaurant,Long>{
  
    @Query("SELECT p from HotelModel p where p.offers='Yes'")
    List<Restaurant>findByOffers();
   
    @Query("SELECT p from HotelModel p where p.city=?1")
    List<Restaurant>findByCity(String city);

    @Query("SELECT h from HotelModel h join h.menuItems m  where LOWER(m.name) LIKE LOWER(CONCAT('%',:searchItem,'%'))")
    List<Restaurant>findByMenuItemName(@Param("searchItem") String searchItem);
    
}
