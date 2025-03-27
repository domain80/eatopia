package com.domain80.wholistika.features.userAccount.utils.validation;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.ArrayList;
import java.util.List;


public class EnumValidator implements ConstraintValidator<ValidEnum, String> {

    List<String> valueList = null;

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
//        return valueList.contains(value.toUpperCase());

        boolean isValid = valueList.stream()
                .anyMatch(validRole -> validRole.equalsIgnoreCase(value));

        if (!isValid) {
            String allowedRoles = String.join(", ", valueList);

            String formatedMessage = String.format("Allowed values: %s", allowedRoles);

            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate(formatedMessage)
                    .addConstraintViolation();
        }

        return isValid;

    }

    @Override
    public void initialize(ValidEnum constraintAnnotation) {
        valueList = new ArrayList<String>();
        Class<? extends Enum<?>> enumClass = constraintAnnotation.enumClass();

        @SuppressWarnings("rawtypes")
        Enum[] enumValArr = enumClass.getEnumConstants();

        for (@SuppressWarnings("rawtypes") Enum enumVal : enumValArr) {
            valueList.add(enumVal.toString().toUpperCase());
        }
    }
}