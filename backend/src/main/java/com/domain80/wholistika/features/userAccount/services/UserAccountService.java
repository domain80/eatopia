package com.domain80.wholistika.features.userAccount.services;

import com.domain80.wholistika.features.userAccount.dto.ProfileSetupDto;
import com.domain80.wholistika.features.userAccount.dto.RegistrationDto;
import com.domain80.wholistika.features.userAccount.models.UserAccount;
import com.domain80.wholistika.features.userAccount.models.UserRole;
import com.domain80.wholistika.features.userAccount.repo.UserAccountRepository;
import com.domain80.wholistika.utils.CustomException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserAccountService implements UserDetailsService {

    private final UserAccountRepository userAccountRepository;
    private final PasswordEncoder passwordEncoder;

    public UserAccountService(UserAccountRepository userAccountRepository, PasswordEncoder passwordEncoder) {
        UserAccount sampleUser = UserAccount.builder()
                .firstName("John")
                .lastName("Doe")
                .email("i@m.me")
                .phoneNumber("+1234567890")
                .password(passwordEncoder.encode("password"))
                .role(UserRole.USER)
                .isNewUser(false)
                .title("Mr.")
                .jobTitle("Software Engineer")
                .interests("Coding, AI, Open Source")
                .about("Passionate developer with a love for problem-solving.")
                .imageData("base64EncodedImageString")
                .build();

        userAccountRepository.save(sampleUser);

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

    public UserAccount setupProfile(ProfileSetupDto dto) {
        // Fetch user account by email
        UserAccount userAccount = userAccountRepository.findByEmail(dto.getUserAccountId())
                .orElseThrow(() -> CustomException.builder()
                        .message("No such user found")
                        .status(HttpStatus.BAD_REQUEST)
                        .build());

        // Update basic profile details
        userAccount.setTitle(dto.getTitle());
        userAccount.setJobTitle(dto.getJobTitle());
        userAccount.setInterests(dto.getInterests());
        userAccount.setAbout(dto.getAbout());
        userAccount.setImageData(dto.getImageData());

        // Update medical conditions
        if (dto.getMedicalInfo() != null) {
            dto.getMedicalInfo().forEach(condition -> condition.setUserAccount(userAccount));
            userAccount.setMedicalConditions(dto.getMedicalInfo());
        }

        // Update work experiences
        if (dto.getWorkExperiences() != null) {
            dto.getWorkExperiences().forEach(experience -> experience.setUserAccount(userAccount));
            userAccount.setWorkExperiences(dto.getWorkExperiences());
        }

        userAccount.setIsNewUser(false);

        // Save and return updated user
        return userAccountRepository.save(userAccount);
    }

    public UserAccount findUserAccountByEmail(String email) {
        Optional<UserAccount>  _userAccount =  userAccountRepository.findByEmail(email);
        if (_userAccount.isEmpty()) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return _userAccount.get();
    }


    public Page<UserAccount> searchUsers(String query, String role, LocalDate createdAfter, LocalDate createdBefore,
                                         int page, int size, String sortBy, String direction) {
        Sort sort = direction.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);

        return userAccountRepository.searchByFilters(
                query != null ? query.toLowerCase() : null,
                role != null ? role.toUpperCase() : null,
                createdAfter,
                createdBefore,
                pageable
        );
    }

}
