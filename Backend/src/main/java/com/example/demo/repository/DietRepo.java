package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.DietPlan;

public interface DietRepo extends JpaRepository<DietPlan,Long>{
    
}
