package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Address;
import com.example.demo.service.AddressService;

@RestController
@CrossOrigin
public class AddressController {
    @Autowired
    AddressService addressService;
    
    @GetMapping("/api/users/address/{id}")
    public List<Address>getAddressById(@PathVariable Long id)
    {
        return addressService.findAddressByUserId(id);
    }
    @PostMapping("/api/address/post/{id}")
    public Address addAddress(@RequestBody Address address,@PathVariable Long id)
    {
        return addressService.addAddress(address,id);
    }
    
}
