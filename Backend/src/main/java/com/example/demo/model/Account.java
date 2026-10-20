package com.example.demo.model;



import java.util.Objects;

import com.example.demo.enums.AccountRole;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="accounts",
	uniqueConstraints= @UniqueConstraint (name="uk_email",columnNames = "email")
)
public class Account {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long accountId;

	@NotBlank(message="Name shouldn't be empty")
	@Size(min=2,max=50,message="Name length should be atleast 2 and atmost 50")
	@Column(name="name",nullable=false)
	private String name;
	
	@NotBlank(message="Email shouldn't be empty")
	@Email
	@Column(name="email",nullable=false)
	private String email;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(
	    regexp = "^[6-9]\\d{9}$",
	    message = "Invalid phone number"
	)
	@Column(nullable=false,unique=true)
	private String phoneNumber;
	
	@NotBlank(message="Password shouldn't be empty")
	@Column(nullable=false)
	private String passwordHash;
	
	@NotNull
	@Enumerated(EnumType.STRING)
	@Column(nullable=false)
	private AccountRole accountRole;
	
	
	public Account(String name, String email, String phoneNumber, String passwordHash, AccountRole accountRole) {
		super();
		this.name = Objects.requireNonNull(name, "Name is required");
        this.email = Objects.requireNonNull(email, "Email is required").toLowerCase();
        this.phoneNumber = Objects.requireNonNull(phoneNumber, "Phone number is required");
        this.passwordHash = Objects.requireNonNull(passwordHash, "Password hash is required");
        this.accountRole = Objects.requireNonNull(accountRole, "Account role is required");
	}
	
	protected Account() {
		super();
	}

	public String getName() {
		return name;
	}
	public String getEmail() {
		return email;
	}
	public String getPhoneNumber() {
		return phoneNumber;
	}
	public String getPassword() {
		return passwordHash;
	}
	public AccountRole getAccountRole() {
		return accountRole;
	}
	

}
