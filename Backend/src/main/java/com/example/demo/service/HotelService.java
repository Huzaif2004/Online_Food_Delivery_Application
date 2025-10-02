package com.example.demo.service;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.HotelModel;
import com.example.demo.model.MenuItem;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.MenuRepo;
@Service
public class HotelService {
     @Autowired
     HotelRepository repo;
     @Autowired
     MenuRepo menrepo;
    public HotelModel postHotel(HotelModel hotel)
    {
       return repo.save(hotel);
    }

    public List<HotelModel> getHotels()
    {
       
        return repo.findAll();
    }
    public String delHotel(Long id)
    {
        repo.deleteById(id);
        return "deleted";
    }
    public HotelModel editUser(HotelModel hotel,Long id)
    {
        HotelModel u=repo.findById(id).orElse(null);
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
    public List<HotelModel>findByOffers()
    {
        return repo.findByOffers();
    }
    public List<HotelModel>findByCity(String city)
    {
        return repo.findByCity(city);
    }
    public List<HotelModel>findByMenuItemName(String searchTerm)
    {
        return repo.findByMenuItemName(searchTerm);
    }
   
    
}