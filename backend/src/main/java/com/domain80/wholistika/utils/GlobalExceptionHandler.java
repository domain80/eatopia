package com.blogabit.auth.utils;

import com.blogabit.auth.dto.CustomErrorResponse;
import com.blogabit.auth.dto.CustomException;
import com.blogabit.auth.dto.CustomResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalErrorHandler {


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e, WebRequest request) {
        CustomErrorResponse errorDetails = new CustomErrorResponse(e, request);
        CustomResponse<?> response = new CustomResponse<>(HttpStatus.BAD_REQUEST, errorDetails);

        return new ResponseEntity<>( response, HttpStatus.BAD_REQUEST );
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e) {
        CustomErrorResponse errorDetails = new CustomErrorResponse(e);
        CustomResponse<?> response = new CustomResponse<>(HttpStatus.BAD_REQUEST, e.getMessage(), errorDetails);
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
