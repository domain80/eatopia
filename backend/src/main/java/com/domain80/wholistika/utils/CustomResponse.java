package com.blogabit.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import java.io.Serializable;

@AllArgsConstructor
@Data
public class CustomResponse<T extends Serializable> implements Serializable {

    private int statusCode;

    private String message;

    @Nullable
    private final T body;

    private CustomErrorResponse error;

    public CustomResponse(HttpStatus status, CustomErrorResponse error) {
        this(status.value(), status.name(), null, error);
    }

    public CustomResponse(HttpStatus status, String message, CustomErrorResponse error) {
        this(status.value(), message, null, error);
    }
}
