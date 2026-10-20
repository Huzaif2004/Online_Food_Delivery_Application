package com.example.demo.model;

import java.math.BigDecimal;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_items")
public class OrderItem {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long orderItemId;

	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "order_id", nullable = false, updatable = false)
	private Order order;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "menu_item_id")
	private MenuItem menuItem;

	@Column(name = "item_name", nullable = false, updatable = false)
	private String itemName;

	@Column(name = "item_price", nullable = false, precision = 10, scale = 2, updatable = false)
	private BigDecimal itemPrice;

	@Column(nullable = false, updatable = false)
	private int quantity;

	public OrderItem(Order order, CartItem item) {
		super();
		this.order = Objects.requireNonNull(order, "Order is required");
		;
		this.menuItem = Objects.requireNonNull(item.getMenuItem(), "Menu Item is required");
		;
		this.itemName = requireText(item.getMenuItem().getMenuName(), "Menu name");
		this.itemPrice = requirePositive(item.getMenuItem().getPrice(), "Price");
		this.quantity = requirePositive(item.getQuantity(), "Quantity");
	}

	protected OrderItem() {
		super();
		// TODO Auto-generated constructor stub
	}

	public BigDecimal getLineTotal() {
		return itemPrice.multiply(BigDecimal.valueOf(quantity));
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

	public BigDecimal getItemPrice() {
		return itemPrice;
	}

	public int getQuantity() {
		return quantity;
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

	private static int requirePositive(int value, String field) {
		if (value <= 0) {
			throw new IllegalArgumentException(field + " must be positive");
		}
		return value;
	}
}
