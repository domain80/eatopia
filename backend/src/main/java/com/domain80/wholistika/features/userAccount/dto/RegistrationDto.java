package com.domain80.wholistika.features.userAccount.dto;

import com.domain80.wholistika.features.userAccount.models.UserRole;
import com.domain80.wholistika.features.userAccount.utils.validation.PasswordMatch;
import com.domain80.wholistika.features.userAccount.utils.validation.ValidEnum;
import com.domain80.wholistika.features.userAccount.utils.validation.ValidPassword;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@PasswordMatch
public class RegistrationDto {

    @NotBlank(message = "First name is required")
    private String firstName;

    @NotBlank(message = "Last name is required")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Password is required")
    @ValidPassword
    private String password;

    @NotBlank(message = "Confirm password is required")
    private String confirmPassword;

    @ValidEnum(enumClass = UserRole.class)
    private String role;
}
