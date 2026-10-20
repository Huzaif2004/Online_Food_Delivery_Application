package com.example.demo.model;

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
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name="addresses")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

	@NotNull 
	@Column(name="address_line",nullable=false)
    private String addressLine;

	@NotNull
	@Column (name="city",nullable = false)
    private String city;

	@NotNull
	@Column(name="state",nullable = false)
    private String state;

    @NotNull
	@Column (name="postal_code",nullable = false)
    private String postalCode;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="account_id",nullable=false)
    private Account account;

	public Address(String addressLine, String city, String state, String postalCode, Account account) {
		super();

		this.addressLine = Objects.requireNonNull(addressLine, "Address line is required");
		this.city = Objects.requireNonNull(city, "City is required");
		this.state = Objects.requireNonNull(state, "State is required");
		this.postalCode = Objects.requireNonNull(postalCode, "postalCode is required");
		this.account = Objects.requireNonNull(account,"Account should be linked with address");
	}

	public Address() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getAddressId() {
		return addressId;
	}

	public String getAddressLine() {
		return addressLine;
	}

	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public Account getAccount() {
		return account;
	}

    

    

    
}
