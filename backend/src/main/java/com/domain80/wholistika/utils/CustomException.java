package com.domain80.wholistika.utils;

import lombok.*;
import org.springframework.http.HttpStatus;

@Data
@EqualsAndHashCode(callSuper = true)
@Builder
public class CustomException extends RuntimeException {
    private String message;
    private String details;
    private Integer code;
    private HttpStatus status;
}
