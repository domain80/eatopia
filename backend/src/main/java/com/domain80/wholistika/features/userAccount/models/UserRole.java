package com.domain80.wholistika.features.userAccount.models;

import lombok.AllArgsConstructor;
import org.springframework.security.core.GrantedAuthority;


public enum UserRole implements GrantedAuthority {
    PATIENT("patient"), ADMIN("admin"), PROFESSIONAL("professional");


    UserRole(String name) { }

    @Override
    public String getAuthority() {
        return this.name();
    }
}