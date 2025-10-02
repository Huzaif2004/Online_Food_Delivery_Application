package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Admin;
import com.example.demo.repository.AdminRepo;

@Service
public class AdminService {
    @Autowired
    AdminRepo adminRepo;

     public Admin createAdmin(Admin admin) {
        // Consider encrypting the password before saving
        return adminRepo.save(admin);
    }
    public List<Admin> getAllAdmins() {
        return adminRepo.findAll();
    }
}
