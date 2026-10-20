package com.example.demo.model;

import java.util.Objects;

import com.example.demo.enums.AccountRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

@Entity
@Table(name="delivery_agents",
	uniqueConstraints = {
	 @UniqueConstraint (name="uk_account",columnNames = "agent_account_id"),
	 @UniqueConstraint (name="uk_vehicle_number",columnNames = "vehicle_number")
	}
		
)
public class DeliveryAgent {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long deliveryAgentId;
	
	@NotNull 
	@Pattern(
		regexp ="^(?:[A-Z]{2}\\d{2}[A-HJ-NP-Z]{1,2}\\d{4}|\\d{2}BH\\d{4}[A-HJ-NP-Z]{1,2})$",	
		message="Invalid Vehicle Number"
	)
	@Column(name="vehicle_number",nullable=false)
	private String vehicleNumber;
	
	@Column(name="is_available",nullable = false)
	private boolean available;
	
	/*Reference to Account details of Delivery 
	Agent where it contains their PhoneNumber, Name and Email.*/
	@OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="agent_account_id",nullable=false)
    private Account account;

	public DeliveryAgent(String vehicleNumber, Account account) {
		super();
		Objects.requireNonNull(account, "Account is required");
        if (account.getAccountRole() != AccountRole.DELIVERY_AGENT) {
            throw new IllegalArgumentException("Account is not a delivery agent account");
        }
		if (vehicleNumber == null || vehicleNumber.isBlank()) {
            throw new IllegalArgumentException("Vehicle number is required");
        }
		this.vehicleNumber = vehicleNumber.trim().toUpperCase();
		this.available = false;
		this.account = account;
	}
	

	protected DeliveryAgent() {
	}


	public Long getDeliveryAgentId() {
		return deliveryAgentId;
	}

	public String getVehicleNumber() {
		return vehicleNumber;
	}

	public boolean isAvailable() {
		return available;
	}

	public Account getAccount() {
		return account;
	}

    
	
	
	
	
	
	

}
