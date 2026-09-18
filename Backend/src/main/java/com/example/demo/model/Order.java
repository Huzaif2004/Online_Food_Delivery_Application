package com.example.demo.model;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import com.example.demo.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="orders_table")
public class Order{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    @ManyToOne
    @JoinColumn(name="account_id")
    private Account account;

    @ManyToOne
    @JoinColumn(name="restaurant_id")
    private Restaurant restaurant;

    @OneToMany(mappedBy="order",cascade=CascadeType.ALL)
    private List<OrderItem> orderItems;

    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    private LocalDateTime orderDate;
    private double totalPrice;
    
	public Order(Account account, Restaurant restaurant,
			double totalPrice) {
		super();
		this.account = account;
		this.restaurant = restaurant;
		this.orderDate = LocalDateTime.now();
		this.orderStatus=OrderStatus.CREATED;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getOrderId() {
		return orderId;
	}

	public Account getAccount() {
		return account;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public List<OrderItem> getOrderItems() {
		return Collections.unmodifiableList(orderItems);
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public LocalDateTime getOrderDate() {
		return orderDate;
	}

	public double getTotalPrice() {
		return totalPrice;
	}
	public void addItems(OrderItem item) {
		if(this.orderStatus!=OrderStatus.CREATED) {
			throw new IllegalStateException("Cannot modify items after order is confirmed");
		}
		this.orderItems.add(item);
	}
	public void setTotalAmount(double amount) {
		if(amount<0) {
			throw new InvalidTotalAmountException("Total Amount must be greater than 0");
		}
		this.totalPrice=amount;
	}
    
    
    
    
   


    
    
}