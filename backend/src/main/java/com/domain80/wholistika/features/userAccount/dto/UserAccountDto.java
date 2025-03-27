package com.domain80.wholistika.features.userAccount.dto;

import lombok.Data;

@Data
public class UserAccountDto {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String role;

}
