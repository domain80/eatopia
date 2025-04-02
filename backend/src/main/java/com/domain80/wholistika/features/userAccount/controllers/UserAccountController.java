package com.domain80.wholistika.features.userAccount.controllers;

import com.domain80.wholistika.features.userAccount.dto.ProfileSetupDto;
import com.domain80.wholistika.features.userAccount.dto.RegistrationDto;
import com.domain80.wholistika.features.userAccount.dto.UserAccountDto;
import com.domain80.wholistika.features.userAccount.models.UserAccount;
import com.domain80.wholistika.features.userAccount.repo.UserAccountRepository;
import com.domain80.wholistika.features.userAccount.services.UserAccountService;
import jakarta.validation.Valid;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
public class UserAccountController {

    private final ModelMapper modelMapper;
    private final UserAccountRepository userAccountRepository;
    private final UserAccountService userAccountService;

    public UserAccountController(UserAccountService userAccountService, ModelMapper modelMapper, UserAccountRepository userAccountRepository) {
        this.userAccountService = userAccountService;
        this.modelMapper = modelMapper;
        this.userAccountRepository = userAccountRepository;
    }

    @GetMapping("/hi")
    public String hi() {
        return  ("hi");
    }

    @PostMapping("/register")
    public UserAccountDto register(@Valid @RequestBody RegistrationDto dto) {
        UserAccount newUserAccount = userAccountService.register(dto);
        return modelMapper.map(newUserAccount, UserAccountDto.class);
    }

    @PutMapping("/setup-profile")
    public UserAccountDto setupUserProfile(@RequestBody ProfileSetupDto dto) {
        UserAccount updatedUser = userAccountService.setupProfile(dto);
        return modelMapper.map(updatedUser, UserAccountDto.class);
    }

    @GetMapping("/whoami")
    public  UserAccount  whoAmI(Principal principal) {
        UserAccount user = userAccountService.findUserAccountByEmail(principal.getName());
        return (user);
    }

    @GetMapping("/search")
    public  Page<UserAccount>  searchUsers(
            @RequestParam(required = false) String query,
            @RequestParam(required = false) String role,
            @RequestParam(required = false) LocalDateTime createdAfter,
            @RequestParam(required = false) LocalDateTime createdBefore,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "firstName") String sortBy,
            @RequestParam(defaultValue = "asc") String direction) {

        Page<UserAccount> users = userAccountService.searchUsers(query, role, createdAfter, createdBefore, page, size, sortBy, direction);
        return (users);
    }

}
