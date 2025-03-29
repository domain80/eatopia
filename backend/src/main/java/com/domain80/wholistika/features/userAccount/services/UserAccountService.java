package com.domain80.wholistika.features.userAccount.services;

import com.domain80.wholistika.features.userAccount.dto.RegistrationDto;
import com.domain80.wholistika.features.userAccount.models.UserAccount;
import com.domain80.wholistika.features.userAccount.models.UserRole;
import com.domain80.wholistika.features.userAccount.repo.UserAccountRepository;
import com.domain80.wholistika.utils.CustomException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserAccountService implements UserDetailsService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository userAccountRepository, PasswordEncoder passwordEncoder) {
        this.userAccountRepository = userAccountRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userAccountRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    public UserAccount register(RegistrationDto registrationDto) {
        boolean exists = userAccountRepository.existsByEmail(registrationDto.getEmail());
        if (exists) {
            throw (
                    CustomException.builder()
                            .message("Email already in use")
                            .status(HttpStatus.CONFLICT)
                            .build()
            );
        }

        UserAccount userAccount = UserAccount.builder()
                .firstName(registrationDto.getFirstName())
                .lastName(registrationDto.getLastName())
                .email(registrationDto.getEmail())
                .phoneNumber(registrationDto.getPhoneNumber())
                .password(passwordEncoder.encode(registrationDto.getPassword()))
                .isNewUser(true)
                .role(UserRole.valueOf(registrationDto.getRole().toUpperCase()))
                .build();

        return userAccountRepository.save(userAccount);
    }
}
