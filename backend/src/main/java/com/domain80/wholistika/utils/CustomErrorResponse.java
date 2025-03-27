package com.blogabit.auth.dto;

import lombok.Data;
import org.springframework.web.context.request.WebRequest;

import java.io.Serializable;

@Data
public class CustomErrorResponse implements Serializable {
    private int errorCode;
    private String message;
    private String details;

    public CustomErrorResponse(Exception e, WebRequest webRequest) {
        this.errorCode = -1;
        this.message = e.getMessage();
        this.details = webRequest.getDescription(false);
    }


    public CustomErrorResponse(CustomException e) {
        this.message = e.getMessage();
        this.details = e.getDetails();
    }
}
