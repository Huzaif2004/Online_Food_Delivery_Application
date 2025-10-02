package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.User;

public interface UserRepo extends JpaRepository<User,Long>
{
    Optional<User> findByUserName(String userName); 
    Optional<User> findByEmail(String email);
}