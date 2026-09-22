package com.example.demo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.example.demo.api.APIResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(InvalidTotalAmountException.class)
	public ResponseEntity<APIResponse<Void>>handleInvalidAmountException(InvalidTotalAmountException ex){
		return ResponseEntity.
				status(HttpStatus.BAD_REQUEST).
				body(APIResponse.error(ex.getMessage()));
	}

}
