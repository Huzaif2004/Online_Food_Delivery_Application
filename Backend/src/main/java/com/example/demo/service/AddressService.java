package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Address;
import com.example.demo.model.User;
import com.example.demo.repository.AddressRepo;
import com.example.demo.repository.UserRepo;

@Service
public class AddressService {
    @Autowired
    AddressRepo addressRepo;
    @Autowired
    UserRepo userRepo;
    public List<Address>findAddressByUserId(Long id)
    {
        return addressRepo.findByUserId(id);
    }
    public Address addAddress(Address address,Long id)
    {
        User user = userRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));

        // Set the user to the address
        address.setUser(user);

        // Save the address
        return addressRepo.save(address);
    }
}
