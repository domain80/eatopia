package com.domain80.wholistika.features.userAccount.controllers;

import com.domain80.wholistika.features.userAccount.dto.RegistrationDto;
import com.domain80.wholistika.features.userAccount.dto.UserAccountDto;
import com.domain80.wholistika.features.userAccount.models.UserAccount;
import com.domain80.wholistika.features.userAccount.services.UserAccountService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserAccountController {

    private final ModelMapper modelMapper;
    private UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService, ModelMapper modelMapper) {
        this.userAccountService = userAccountService;
        this.modelMapper = modelMapper;
    }

    @GetMapping("/hi")
    public String hi() {
        return  ("hi");
    }

    @PostMapping("/register")
    public UserAccountDto register(@Valid @RequestBody RegistrationDto dto) {
        UserAccount newUserAccount = userAccountService.register(dto);
        UserAccountDto newAccountDto = modelMapper.map(newUserAccount, UserAccountDto.class);
        return newAccountDto;
    }
}
