package com.example.demo.model;

import com.example.demo.enums.RestaurantType;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long restaurantId;
    private String restaurantName;
    private String restaurantLocation;
    private String imageUrl;
    @Enumerated(EnumType.STRING)
    private RestaurantType type;
    private double rating;
    private int ratingCount;
    private boolean isOpen;
    
    @ManyToOne
    @JoinColumn(name="owner_id",nullable=false)
    private Account account;
	public Restaurant(String restaurantName, String restaurantLocation, String imageUrl,
			RestaurantType type) {
		super();
		
		this.restaurantName = restaurantName;
		this.restaurantLocation = restaurantLocation;
		this.imageUrl = imageUrl;
		this.type = type;
		this.rating = 0;
		this.ratingCount=0;
	}
	
	public Restaurant() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getRestaurantId() {
		return restaurantId;
	}
	public String getRestaurantName() {
		return restaurantName;
	}
	public String getRestaurantLocation() {
		return restaurantLocation;
	}
	public String getImageUrl() {
		return imageUrl;
	}
	public RestaurantType getType() {
		return type;
	}
	public double getRating() {
		return rating;
	}
	public void closeRestaurant() {
		this.isOpen=false;
	}
	public void openRestaurant() {
		this.isOpen=true;
	}
	public void recalculateRating(double rating) {
		this.rating=((this.rating*this.ratingCount)+rating)/(this.ratingCount+1);
		this.ratingCount++;
	}
	
    
    

    

    
    
}