package com.domain80.wholistika.features.userAccount.dto;

import com.domain80.wholistika.features.userAccount.models.MedicalCondition;
import com.domain80.wholistika.features.userAccount.models.WorkExperience;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserAccountDto {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String role;
    private Boolean isNewUser;

    private String title;
    private String jobTitle;
    private String interests;
    private String about;
    private String imageData;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private List<MedicalCondition> medicalConditions;
    private List<WorkExperience> workExperiences;
}
