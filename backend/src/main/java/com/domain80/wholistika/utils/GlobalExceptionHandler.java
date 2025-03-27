package com.domain80.wholistika.utils;

import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.View;

import java.util.Arrays;
import java.util.List;

@Slf4j
@RestControllerAdvice
public class GlobalExceptionHandler {
    private final View error;

    public GlobalExceptionHandler(View error) {
        this.error = error;
    }


    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Object handleException(Exception e, WebRequest request) {
        CustomErrorResponse errorDetails = new CustomErrorResponse(e, request);
        CustomResponse response = new CustomResponse(HttpStatus.BAD_REQUEST, errorDetails);

        return (response);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Object handleUsernameNotFoundException(Exception e, WebRequest request) {
        CustomErrorResponse errorDetails = new CustomErrorResponse(e, request);
        CustomResponse response = new CustomResponse(HttpStatus.BAD_REQUEST, errorDetails);

        return (response);
    }


    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> handleCustomException(CustomException e) {
        CustomErrorResponse errorDetails = new CustomErrorResponse(e);
        CustomResponse response = new CustomResponse(e.getStatus(), e.getMessage(), errorDetails);
        return new ResponseEntity<>(response, e.getStatus());
    }


    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomResponse handleValidationException(MethodArgumentNotValidException e) {
        List<CustomErrorResponse> errors = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new CustomErrorResponse(
                        String.format("Field '%s' has invalid value '%s'", error.getField(), error.getRejectedValue()),
                        error.getDefaultMessage()
                ))
                .toList();

        return new CustomResponse(HttpStatus.BAD_REQUEST, errors.getFirst());
    }


    @ExceptionHandler(HttpMessageNotReadableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public CustomResponse handleValidationException(HttpMessageNotReadableException exception) {
        String errorDetails = "";

        if (exception.getCause() instanceof InvalidFormatException) {
            InvalidFormatException ifx = (InvalidFormatException) exception.getCause();
            if (ifx.getTargetType() != null && ifx.getTargetType().isEnum()) {
                errorDetails = String.format("Invalid value: '%s' for the field: '%s'. The value must be one of: %s.",
                        ifx.getValue(), ifx.getPath().get(ifx.getPath().size() - 1).getFieldName(), Arrays.toString(ifx.getTargetType().getEnumConstants()));
            }
        }

        CustomErrorResponse errorResponse = new CustomErrorResponse(exception);
        CustomResponse response = new CustomResponse(HttpStatus.BAD_REQUEST, errorDetails, errorResponse);

        return response;
    }
}
