package com.domain80.wholistika.utils;

import lombok.Data;
import org.springframework.web.context.request.WebRequest;

import java.io.Serializable;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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

    public CustomErrorResponse(String errors) {
        this.errorCode = -1;
        this.message = String.join("\n", errors);
    }
    public CustomErrorResponse(String errors, String details) {
        this.errorCode = -1;
        this.message = String.join("\n", errors);
        this.details = details == null ? "" : details;
    }

    public CustomErrorResponse(CustomException e) {
        this.errorCode = e.getCode() != null ? e.getCode() : -1;
        this.message = e.getLocalizedMessage();
        this.details = e.getDetails();
    }
    public CustomErrorResponse(Exception e) {
        this.message = e.getLocalizedMessage();
        this.details = e.getClass().getSimpleName();
    }
}
