package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="order_items")
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long orderItemId;
	
	@ManyToOne
	@JoinColumn(name="order_id",nullable=false)
	private Order order;
	
	@ManyToOne
	@JoinColumn(name="menu_id",nullable=false)
	private MenuItem menuItem;
	
	private String itemName;
	private double itemPrice;
	private int quantity;
	public OrderItem(Order order, MenuItem menuItem, String itemName, double itemPrice, int quantity) {
		super();
		this.order = order;
		this.menuItem = menuItem;
		this.itemName = itemName;
		this.itemPrice = itemPrice;
		this.quantity = quantity;
	}
	public OrderItem() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Long getOrderItemId() {
		return orderItemId;
	}
	public Order getOrder() {
		return order;
	}
	public MenuItem getMenuItem() {
		return menuItem;
	}
	public String getItemName() {
		return itemName;
	}
	public double getItemPrice() {
		return itemPrice;
	}
	public int getQuantity() {
		return quantity;
	}
	
	
	

}
