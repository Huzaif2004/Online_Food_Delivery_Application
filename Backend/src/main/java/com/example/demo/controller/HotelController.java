package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Restaurant;
import com.example.demo.model.MenuItem;
import com.example.demo.service.HotelService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class HotelController {
    @Autowired
    HotelService ser;

    @CrossOrigin
    @GetMapping("/hotels")
    public List<Restaurant> getMethodName() {
        return ser.getHotels();
    }

    @CrossOrigin
    @PostMapping("/post")
    public Restaurant postMethodName(@RequestBody Restaurant entity) {
        //TODO: process POST request
        
        return ser.postHotel(entity);
    }

    @DeleteMapping("/delete/{id}")
public String deleteHotel(@PathVariable("id") Long id) {
    return ser.delHotel(id);
    
}  
   
    @CrossOrigin
    @GetMapping("/api/gethotels/offers")
    public List<Restaurant>findByOffers()
    {
      return ser.findByOffers();
    }
    @CrossOrigin
    @GetMapping("/api/gethotels/{city}")
    public List<Restaurant>findByCity(@PathVariable String city)
    {
        return ser.findByCity(city);
    }
    
    @CrossOrigin
    @GetMapping("/api/menuItems/{id}")
    public List<MenuItem>findByHotelId(@PathVariable Long id)
    {
        return ser.findByHotelId(id);
    }
    @GetMapping("/api/gethotels")
    public List<Restaurant>findByMenuItemName(@RequestParam(name="searchTerm") String searchTerm)
    {
        return ser.findByMenuItemName(searchTerm);
    }
    
    
}