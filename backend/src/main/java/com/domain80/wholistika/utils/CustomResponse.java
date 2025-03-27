package com.domain80.wholistika.utils;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;
import org.springframework.http.HttpStatus;
import org.springframework.lang.Nullable;

import java.io.Serializable;

@AllArgsConstructor
@Data
@ToString
@EqualsAndHashCode
@JsonSerialize
public class CustomResponse implements Serializable {

    private int statusCode;

    private String message;

    private final Object body;

    private CustomErrorResponse error;

    public CustomResponse(HttpStatus statusCode,  Object body) {
        this.statusCode = statusCode.value();
        this.body = body;
    }

    public CustomResponse(HttpStatus status, CustomErrorResponse error) {
        this(status.value(), status.name(), null, error);
    }

    public CustomResponse(HttpStatus status, String message, CustomErrorResponse error) {
        this(status.value(), message, null, error);
    }

}
