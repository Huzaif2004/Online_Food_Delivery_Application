package com.example.demo.model;

import java.util.Map;

public class OrderDTO {
    Long userId;
    Long hotelId;
    Map<Long,Integer>items;
    double totalPrice;
    public Long getUserId() {
        return userId;
    }
    public void setUserId(Long userId) {
        this.userId = userId;
    }
    public Long getHotelId() {
        return hotelId;
    }
    public void setHotelId(Long hotelId) {
        this.hotelId = hotelId;
    }
    public Map<Long, Integer> getItems() {
        return items;
    }
    public void setItems(Map<Long, Integer> items) {
        this.items = items;
    }
    public double getTotalPrice() {
        return totalPrice;
    }
    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }
      
    
    
}
