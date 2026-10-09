package com.example.demo.model;

import java.util.Objects;

import com.example.demo.enums.AccountRole;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="delivery_agents")
public class DeliveryAgent {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long deliveryAgentId;
	
	private String vehicleNumber;
	
	private boolean isAvailable;
	
	//Reference to Account details of Delivery Agent where it contains their PhoneNumber, Name and Email.
	@OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="agent_account_id",nullable=false,unique=true)
    private Account account;

	public DeliveryAgent(String vehicleNumber, boolean isAvailable, Account account) {
		super();
		Objects.requireNonNull(account, "Account is required");
        if (account.getAccountRole() != AccountRole.DELIVERY_AGENT) {
            throw new IllegalArgumentException("Account is not a delivery agent account");
        }
		if (vehicleNumber == null || vehicleNumber.isBlank()) {
            throw new IllegalArgumentException("Vehicle number is required");
        }
		this.vehicleNumber = vehicleNumber.trim().toUpperCase();
		this.isAvailable = false;
		this.account = account;
	}

	public Long getDeliveryAgentId() {
		return deliveryAgentId;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public Account getAccount() {
		return account;
	}

    
	
	
	
	
	
	

}
