package com.example.demo.service;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.model.MenuItem;
import com.example.demo.model.User;
import com.example.demo.repository.MenuRepo;
import com.example.demo.repository.UserRepo;

import jakarta.transaction.Transactional;



@Service
public class UserService {
    @Autowired
    UserRepo userRepo;

    @Autowired
    MenuRepo menuItemRepository;

   
    public List<User> getUsers()
    {
        return userRepo.findAll();
    }
    public Optional<User> getUserById(long id)
    {
        return userRepo.findById(id);
    }
    public User postUsers(User user)
    {   
        Optional<User> us=userRepo.findByEmail(user.getEmail());
        if(us.isPresent()){
        throw new IllegalArgumentException("Email is already in use");}
        return userRepo.save(user);
    }
     @Transactional
    public User updateUsername(long id, String newUserName) {
        User u = userRepo.findById(id).orElse(null);
        if (u != null) {
            u.setUserName(newUserName);
            userRepo.saveAndFlush(u);
        }
        return u;
    }
    @Transactional
    public User updatePhoneNumber(long id, String newPhoneNumber) {
        User u = userRepo.findById(id).orElse(null);
        if (u != null) {
            u.setNumber(newPhoneNumber);  // Assuming your `User` class has a `number` field
            userRepo.saveAndFlush(u);
        }
        return u;
    }
    @Transactional
    public User updateEmail(long id, String newEmail) {

        User u = userRepo.findById(id).orElse(null);
        Optional<User> us=userRepo.findByEmail(newEmail);
        if(us.isPresent()){
        throw new IllegalArgumentException("Email is already in use");}
        if (u != null) {
            u.setEmail(newEmail);
            userRepo.saveAndFlush(u);
        }
        return u;
    }
    
    
    
    
    @Transactional
    public void addToCart(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart == null) {
            cart = new HashMap<>();
        }
        cart.put(menuItemId, cart.getOrDefault(menuItemId, 0L) + 1);
        user.setCart(cart);
        userRepo.save(user);
    }

    @Transactional
    public void incrementCartItem(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart != null && cart.containsKey(menuItemId)) {
            cart.put(menuItemId, cart.get(menuItemId) + 1);
            user.setCart(cart);
            userRepo.save(user);
        } else {
            throw new RuntimeException("Menu item not found in cart");
        }
    }

    @Transactional
    public void decrementCartItem(Long userId, Long menuItemId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        if (cart != null && cart.containsKey(menuItemId)) {
            long currentCount = cart.get(menuItemId);
            if (currentCount > 1) {
                cart.put(menuItemId, currentCount - 1);
            } else {
                cart.remove(menuItemId);
            }
            user.setCart(cart);
            userRepo.save(user);
        } else {
            throw new RuntimeException("Menu item not found in cart");
        }
    }

    public List<Map<String, Object>> getCartItems(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Map<Long, Long> cart = user.getCart();
        List<Map<String, Object>> cartItems = new ArrayList<>();
        for (Map.Entry<Long, Long> entry : cart.entrySet()) {
            MenuItem menuItem = menuItemRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("Menu item not found"));
            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("id", menuItem.getId());
            itemDetails.put("name", menuItem.getName());
            itemDetails.put("description", menuItem.getDescription());
            itemDetails.put("imageUrl", menuItem.getImageUrl());
            itemDetails.put("price", menuItem.getPrice());
            itemDetails.put("rating", menuItem.getRating());
            itemDetails.put("type", menuItem.getType()); // Added type attribute
            itemDetails.put("count", entry.getValue());
            cartItems.add(itemDetails);
        }
        return cartItems;
    }
    

    public Map<Long, Long> getCartCount(Long userId) {
        User user = userRepo.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return user.getCart();
    }
    public boolean deleteCart(Long userId)
    {
        User user=userRepo.findById(userId).orElseThrow(()->new RuntimeException("User not found"));
        user.setCart(new HashMap<>());
        userRepo.save(user);
        return true;
    }
     
    
}