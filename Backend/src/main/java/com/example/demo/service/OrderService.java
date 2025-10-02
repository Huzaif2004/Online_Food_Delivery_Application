package com.example.demo.service;


import java.util.stream.Collectors;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.HotelModel;
import com.example.demo.model.Order;
import com.example.demo.model.User;
import com.example.demo.repository.HotelRepository;
import com.example.demo.repository.MenuRepo;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.UserRepo;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private MenuRepo menuItemRepository;

    public Order placeOrder(Long userId, Long hotelId, Map<Long, Integer> items, double totalPrice) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        HotelModel hotel = hotelRepository.findById(hotelId)
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        Order order = new Order();
        order.setUser(user);
        order.setHotelModel(hotel);
        order.setOrderDate(new Date());
        order.setTotalPrice(totalPrice);

        order.setItems(items);  // Set the Map<Long, Integer> directly

        return orderRepository.save(order);
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public List<Order> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }
}