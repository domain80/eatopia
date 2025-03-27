package com.blogabit.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.Getter;

@Data
@Getter
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CustomException extends RuntimeException{
    private String details;


    public CustomException(String message,  String details) {
        super(message);
        this.details  = details;
    }
}
