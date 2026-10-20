package com.example.demo.model;

import java.math.BigDecimal;
import java.util.Objects;

import com.example.demo.enums.MenuType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "menu_items", indexes = @Index(name = "idx_restaurant_id", columnList = "restaurant_id"))
public class MenuItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long menuItemId;

	@Column(name = "menu_name", nullable = false, length = 100)
	private String menuName;

	@Column(name = "description", length = 1000)
	private String description;

	@Column(name = "image_url", nullable = false)
	private String imageUrl;

	@Column(name = "price", nullable = false, precision = 10, scale = 2)
	private BigDecimal price;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false, length = 20)
	private MenuType type;

	@Column(nullable = false)
	private double rating;

	@Column(nullable = false)
	private int ratingCount;
	@Column(name = "is_available", nullable = false)
	private boolean available;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "restaurant_id", nullable = false)
	private Restaurant restaurant;

	public MenuItem(String menuName, String description, String imageUrl,
                    BigDecimal price, MenuType type, Restaurant restaurant) {
        this.menuName = requireText(menuName, "Menu name");
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = requirePositive(price, "Price");
        this.type = Objects.requireNonNull(type, "Menu type is required");
        this.restaurant = Objects.requireNonNull(restaurant, "Restaurant is required");
        this.rating = 0;
        this.ratingCount = 0;
        this.available = true;
    }

	protected MenuItem() {
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

	public BigDecimal getPrice() {
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
		return available;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void recalculateRating(double newRating) {
		if (newRating < 1 || newRating > 5) {
            throw new IllegalArgumentException("Rating must be between 1 and 5");
        }
		this.rating = ((this.rating * this.ratingCount) + newRating) / (this.ratingCount + 1);
		this.ratingCount++;
	}

	public void makeMenuAvailable() {
		this.available = true;
	}

	public void makeMenuUnavailable() {
		this.available = false;
	}
     
	private static String requireText(String value, String field) {
        Objects.requireNonNull(value, field + " is required");
        if (value.isBlank()) {
            throw new IllegalArgumentException(field + " must not be blank");
        }
        return value.trim();
    }

    private static BigDecimal requirePositive(BigDecimal value, String field) {
        Objects.requireNonNull(value, field + " is required");
        if (value.signum() <= 0) {
            throw new IllegalArgumentException(field + " must be positive");
        }
        return value;
    }

	public void changePrice(BigDecimal newPrice) {
        this.price = requirePositive(newPrice, "Price");
    }
}