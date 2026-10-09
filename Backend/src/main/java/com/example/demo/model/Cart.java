package com.example.demo.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.example.demo.exception.CartRestaurantConflictException;
import com.example.demo.exception.MenuItemAlreadyExistInCartException;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
@Entity
@Table(name="cart")
public class Cart {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long cartId;
	
	@NotNull
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="account_id")
	private Account account;

	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="restaurant_id")
	private Restaurant restaurant;
	
	
	@OneToMany(mappedBy="cart",cascade=CascadeType.ALL,orphanRemoval = true)
	private List<CartItem> cartItems;

	public Cart(Account account) {
		super();
		this.account = account;
		
		this.cartItems=new ArrayList<>();
	}

	public Cart() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getCartId() {
		return cartId;
	}

	public Account getAccount() {
		return account;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public List<CartItem> getCartItems() {
		return Collections.unmodifiableList(cartItems);
	}
	
	public void addItemToCart(MenuItem menuItem,int quantity) {
		if(menuItem==null||quantity<=0) {
			throw new IllegalArgumentException("MenuItem shouldn't be null / Quantity must be greater than 0");
		}
		if(restaurant!=null && !(menuItem.getRestaurant().getRestaurantId().equals(restaurant.getRestaurantId()))){
			throw new CartRestaurantConflictException(
	                "Cart already contains items from a different restaurant");
		}
		if(cartItems.stream().anyMatch(c->c.getMenuItem().getMenuItemId().equals(menuItem.getMenuItemId()))) {
			throw new MenuItemAlreadyExistInCartException("MenuItem: "+menuItem.getMenuName()+" is already present in the cart");
		}
		this.cartItems.add(new CartItem(this,menuItem,quantity));
		if(restaurant==null) {
			this.restaurant=menuItem.getRestaurant();
		}
		
	}
	
	public void removeItemFromCart(Long cartItemId) {
		CartItem item=cartItems.stream().filter(ct->ct.getCartItemtId().equals(cartItemId))
				.findFirst().orElseThrow();
		this.cartItems.remove(item);
		if(cartItems.size()==0) {
			this.clear();
		}
		
	}
	public void increaseItem(Long cartItemId) {
		CartItem item=cartItems.stream().filter(ct->ct.getCartItemtId().equals(cartItemId))
				.findFirst().orElseThrow();
		item.increaseQuantity();
	}
	public void decreaseItem(Long cartItemId) {
		CartItem item=cartItems.stream().filter(ct->ct.getCartItemtId().equals(cartItemId))
				.findFirst().orElseThrow();
		if(item.decreaseQuantity()) {
			removeItemFromCart(item.getCartItemtId());
		}
		
	}
	public void clear() {
        this.cartItems.clear();
        this.restaurant = null;
    }
	
	
	
	
	
	
}
