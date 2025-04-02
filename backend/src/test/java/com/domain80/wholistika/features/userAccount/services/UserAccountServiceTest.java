package com.domain80.wholistika.features.userAccount.services;

import com.domain80.wholistika.features.userAccount.dto.ProfileSetupDto;
import com.domain80.wholistika.features.userAccount.models.MedicalCondition;
import com.domain80.wholistika.features.userAccount.models.UserAccount;
import com.domain80.wholistika.features.userAccount.models.UserRole;
import com.domain80.wholistika.features.userAccount.models.WorkExperience;
import com.domain80.wholistika.features.userAccount.repo.UserAccountRepository;
import com.domain80.wholistika.utils.CustomException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserAccountServiceTest {

    @Mock
    private UserAccountRepository userAccountRepository;

    @InjectMocks
    private UserAccountService userAccountService;

    private UserAccount testUser;

    @BeforeEach
    void setUp() {
        testUser = UserAccount.builder()
                .email("test@example.com")
                .firstName("John")
                .lastName("Doe")
                .phoneNumber("1234567890")
                .role(UserRole.PROFESSIONAL)
                .isNewUser(true)
                .title("Mr.")
                .jobTitle("Software Engineer")
                .interests("Tech, Coding")
                .about("Passionate developer.")
                .imageData("profileImageData")
                .medicalConditions(List.of())
                .workExperiences(List.of())
                .build();
    }

    @Test
    void setupProfile_ShouldUpdateProfile_WhenUserExists() {
        // Arrange
        ProfileSetupDto dto = new ProfileSetupDto();
        dto.setUserAccountId("test@example.com");
        dto.setTitle("Dr.");
        dto.setJobTitle("Senior Engineer");
        dto.setInterests("AI, Machine Learning");
        dto.setAbout("Expert in AI.");
        dto.setImageData("newProfileImageData");

        when(userAccountRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userAccountRepository.save(any(UserAccount.class))).thenReturn(testUser);

        // Act
        UserAccount result = userAccountService.setupProfile(dto);

        // Assert
        assertNotNull(result);
        assertEquals("Dr.", result.getTitle());
        assertEquals("Senior Engineer", result.getJobTitle());
        assertEquals("AI, Machine Learning", result.getInterests());
        assertEquals("Expert in AI.", result.getAbout());
        assertEquals("newProfileImageData", result.getImageData());
        verify(userAccountRepository).save(testUser);
    }

    @Test
    void setupProfile_ShouldThrowException_WhenUserNotFound() {
        // Arrange
        ProfileSetupDto dto = new ProfileSetupDto();
        dto.setUserAccountId("nonexistent@example.com");

        when(userAccountRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        CustomException exception = assertThrows(CustomException.class, () -> userAccountService.setupProfile(dto));

        assertEquals("No such user found", exception.getMessage());
        assertEquals(HttpStatus.BAD_REQUEST, exception.getStatus());
        verify(userAccountRepository, never()).save(any(UserAccount.class));
    }

    @Test
    void setupProfile_ShouldUpdateMedicalConditions_WhenProvided() {
        // Arrange
        ProfileSetupDto dto = new ProfileSetupDto();
        dto.setUserAccountId("test@example.com");

        MedicalCondition condition = new MedicalCondition();
        condition.setName("Hypertension");
        condition.setSummary("High blood pressure condition.");

        dto.setMedicalInfo(List.of(condition));

        when(userAccountRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userAccountRepository.save(any(UserAccount.class))).thenReturn(testUser);

        // Act
        UserAccount result = userAccountService.setupProfile(dto);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getMedicalConditions().size());
        assertEquals("Hypertension", result.getMedicalConditions().get(0).getName());
        assertEquals("High blood pressure condition.", result.getMedicalConditions().get(0).getSummary());
        verify(userAccountRepository).save(testUser);
    }

    @Test
    void setupProfile_ShouldUpdateWorkExperiences_WhenProvided() {
        // Arrange
        ProfileSetupDto dto = new ProfileSetupDto();
        dto.setUserAccountId("test@example.com");

        WorkExperience experience = new WorkExperience();
        experience.setCompanyName("TechCorp");
        experience.setJobTitle("Lead Developer");

        dto.setWorkExperiences(List.of(experience));

        when(userAccountRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userAccountRepository.save(any(UserAccount.class))).thenReturn(testUser);

        // Act
        UserAccount result = userAccountService.setupProfile(dto);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.getWorkExperiences().size());
        assertEquals("TechCorp", result.getWorkExperiences().get(0).getCompanyName());
        assertEquals("Lead Developer", result.getWorkExperiences().get(0).getJobTitle());
        verify(userAccountRepository).save(testUser);
    }
}
