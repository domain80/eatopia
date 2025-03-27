package com.domain80.wholistika.features.auth.dto;

import lombok.Data;

@Data
public class RegistrationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String password;
    private String confirmPassword ;
    private String role;
}
