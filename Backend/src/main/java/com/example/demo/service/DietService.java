package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.DietPlan;
import com.example.demo.repository.DietRepo;

@Service
public class DietService {
    @Autowired
    private DietRepo dietRepo;

    public List<DietPlan> getAllDietPlans() {
        return dietRepo.findAll();
    }

    public DietPlan getDietPlanById(Long id) {
        return dietRepo.findById(id).orElse(null);
    }

    public DietPlan saveDietPlan(DietPlan dietPlan) {
        return dietRepo.save(dietPlan);
    }

    public void deleteDietPlan(Long id) {
        dietRepo.deleteById(id);
    }
    
}
