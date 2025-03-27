package com.domain80.wholistika.features.userAccount.utils.validation;


import com.domain80.wholistika.features.userAccount.dto.RegistrationDto;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchValidator implements ConstraintValidator<PasswordMatch, RegistrationDto> {

    @Override
    public boolean isValid(RegistrationDto registrationDto, ConstraintValidatorContext context) {
        if (registrationDto.getPassword() == null || registrationDto.getConfirmPassword() == null) {
            return false;
        }
        return registrationDto.getPassword().equals(registrationDto.getConfirmPassword());
    }
}
