package com.example.demo.model;



import org.springframework.format.annotation.NumberFormat;

import com.example.demo.enums.AccountRole;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

@Entity
@Table(name="accounts")
public class Account {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long accountId;

	@NotEmpty 
	private String name;
	@Email
	private String email;
	private String phoneNumber;
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
