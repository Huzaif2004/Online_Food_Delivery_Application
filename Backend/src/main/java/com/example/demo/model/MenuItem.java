package com.example.demo.model;

import com.example.demo.enums.MenuType;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu_items")
public class MenuItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long menuItemId;

    private String menuName;
    private String description;
    private String imageUrl;
    private double price;
    private MenuType type;
    private double rating;
    private int ratingCount;
    private boolean isAvailable;
    
    @ManyToOne
    @JoinColumn(name="restaurant_id")
    private Restaurant restaurant;

	public MenuItem(String menuName, String description, String imageUrl, double price, MenuType type,
			Restaurant restaurant) {
		super();
		this.menuName = menuName;
		this.description = description;
		this.imageUrl = imageUrl;
		this.price = price;
		this.type = type;
		this.restaurant = restaurant;
		this.rating=0;
		this.ratingCount=0;
		this.isAvailable=true;
	}

	public MenuItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getMenuItemId() {
		return menuItemId;
	}

	public String getMenuName() {
		return menuName;
	}

	public String getDescription() {
		return description;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public double getPrice() {
		return price;
	}

	public MenuType getType() {
		return type;
	}

	public double getRating() {
		return rating;
	}

	public int getRatingCount() {
		return ratingCount;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}
	public void recalculateRating(double rating) {
		this.rating=((this.rating*this.ratingCount)+rating)/(this.ratingCount+1);
		this.ratingCount++;
	}
    public void makeMenuAvailable() {
    	this.isAvailable=true;
    }
    public void makeMenuUnavailable() {
    	this.isAvailable=false;
    }
    
     
   


    

    

    
    
}