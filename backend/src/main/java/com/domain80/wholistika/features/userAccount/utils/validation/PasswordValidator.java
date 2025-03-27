package com.domain80.wholistika.features.userAccount.utils.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";

    private static final Pattern pattern = Pattern.compile(PASSWORD_PATTERN);


    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        return password != null && pattern.matcher(password).matches();
    }
}
