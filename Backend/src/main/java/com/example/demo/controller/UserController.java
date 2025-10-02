package com.example.demo.controller;





import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@CrossOrigin
@RestController
public class UserController {
     @Autowired
    UserService userService;
   @GetMapping("/api/getusers")
   public List<User> getAllUsers()
   {
        return userService.getUsers();
   }
   @GetMapping("/api/getusers/{id}")
   public Optional<User> getUserById(@PathVariable long id)
   {
        return userService.getUserById(id);
   }
   @PostMapping("/api/postusers")
   public User postUser(@RequestBody User user)
   {
     return userService.postUsers(user);
   }
   
     @PostMapping("/{userId}/cart")
    public void addToCart(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.addToCart(userId, menuItemId);
    }

    @PutMapping("/{userId}/cart/increment")
    public void incrementCartItem(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.incrementCartItem(userId, menuItemId);
    }

    @PutMapping("/{userId}/cart/decrement")
    public void decrementCartItem(@PathVariable Long userId, @RequestParam Long menuItemId) {
        userService.decrementCartItem(userId, menuItemId);
    }

    @GetMapping("/{userId}/cart/items")
    public List<Map<String, Object>> getCartItems(@PathVariable Long userId) {
        return userService.getCartItems(userId);
    }
    @GetMapping("/{userId}/cart/count")
    public Map<Long, Long> getCartCount(@PathVariable Long userId) {
        return userService.getCartCount(userId);
    }
    @DeleteMapping("{userId}/cart/delete")
    public boolean deleteCart(@PathVariable Long userId)
    {
        return userService.deleteCart(userId);
    }   
    @PutMapping("/editusers/{id}/username")
    public User updateUserName(@PathVariable long id, @RequestParam String userName) {
        return userService.updateUsername(id, userName);
    }
    @PutMapping("/editusers/{id}/email")
    public User updateUserEmail(@PathVariable long id, @RequestParam String email) {
        return userService.updateEmail(id, email);
    }
    @PutMapping("/editusers/{id}/phonenumber")
    public User updateUserPhoneNumber(@PathVariable long id, @RequestParam String phoneNumber) {
        return userService.updatePhoneNumber(id, phoneNumber);
    }
}