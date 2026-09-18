package com.example.demo.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Restaurant;
import com.example.demo.model.MenuItem;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.MenuRepo;
@Service
public class HotelService {
     @Autowired
     HotelRepository repo;
     @Autowired
     MenuRepo menrepo;
    public Restaurant postHotel(Restaurant hotel)
    {
       return repo.save(hotel);
    }

    public List<Restaurant> getHotels()
    {
       
        return repo.findAll();
    }
    public String delHotel(Long id)
    {
        repo.deleteById(id);
        return "deleted";
    }
    public Restaurant editUser(Restaurant hotel,Long id)
    {
        Restaurant u=repo.findById(id).orElse(null);
        if(u!=null)
        {
            u.setHotelName(hotel.getHotelName());
            u.setHotelLocation(hotel.getHotelLocation());
            u.setHotelUrl(hotel.getHotelUrl());
            repo.saveAndFlush(u);
        }
        return hotel;

    }
    public List<MenuItem>findByHotelId(Long id)
    {
        return menrepo.findByHotelId(id);
    }
    public List<Restaurant>findByOffers()
    {
        return repo.findByOffers();
    }
    public List<Restaurant>findByCity(String city)
    {
        return repo.findByCity(city);
    }
    public List<Restaurant>findByMenuItemName(String searchTerm)
    {
        return repo.findByMenuItemName(searchTerm);
    }
   
    
}