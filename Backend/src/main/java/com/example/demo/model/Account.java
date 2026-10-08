package com.example.demo.model;



import com.example.demo.enums.AccountRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
@Table(name="accounts")
public class Account {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long accountId;

	@NotBlank(message="Name shouldn't be empty")
	@Size(min=2,max=50,message="Name length should be atleast 2 and atmost 50")
	private String name;
	
	@NotBlank(message="Email shouldn't be empty")
	@Email
	private String email;
	
	@NotBlank(message = "Phone number is required")
	@Pattern(
	    regexp = "^[6-9]\\d{9}$",
	    message = "Invalid phone number"
	)
	private String phoneNumber;
	
	@NotBlank(message="Password shouldn't be empty")
	@Size(min = 8, max = 20, message = "Password must be between 8 and 20 characters")
	private String password;
	
	@Enumerated(EnumType.STRING)
	private AccountRole accountRole;
	public Account(String name, String email, String phoneNumber, String password, AccountRole accountRole) {
		super();
		this.name = name;
		this.email = email;
		this.phoneNumber = phoneNumber;
		this.password = password;
		this.accountRole = accountRole;
	}
	
	public Account() {
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
		return password;
	}
	public AccountRole getAccountRole() {
		return accountRole;
	}
	

}
