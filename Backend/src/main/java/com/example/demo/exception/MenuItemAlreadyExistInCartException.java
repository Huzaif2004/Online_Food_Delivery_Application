package com.example.demo.exception;

public class MenuItemAlreadyExistInCartException extends RuntimeException{

	public MenuItemAlreadyExistInCartException(String message) {
		super(message);
	}

}
