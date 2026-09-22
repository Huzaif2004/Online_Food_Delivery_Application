package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="cart_items")
public class CartItem {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long cartitemId;
	
	@ManyToOne
	@JoinColumn(name="cart_id")
	private Cart cart;
	
	@ManyToOne
	@JoinColumn(name="menu_item_id")
	private MenuItem menuItem;
	
	private int quantity;

	public CartItem(Cart cart, MenuItem menuItem, int quantity) {
		super();
		this.cart = cart;
		this.menuItem = menuItem;
		this.quantity = quantity;
	}

	public CartItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getCartItemtId() {
		return cartitemId;
	}

	public Cart getCart() {
		return cart;
	}

	public MenuItem getMenuItem() {
		return menuItem;
	}

	public int getQuantity() {
		return quantity;
	}
	void increaseQuantity() {
		this.quantity++;
	}
	boolean decreaseQuantity() {
		if(this.quantity==0) {
			throw new IllegalStateException("Cannot decrement below zero");
		}
		this.quantity--;
		return this.quantity==0;
	}
	
}
