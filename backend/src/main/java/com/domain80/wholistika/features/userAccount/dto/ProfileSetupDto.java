package com.domain80.wholistika.features.userAccount.dto;

import com.domain80.wholistika.features.userAccount.models.MedicalCondition;
import com.domain80.wholistika.features.userAccount.models.WorkExperience;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class ProfileSetupDto {
    @NotNull
    private String userAccountId;

    @NotBlank
    private String title;

    @NotBlank
    private String jobTitle;

    private String interests;

    @NotBlank
    private String about;

    private String imageData;

    private List<MedicalCondition> medicalInfo;

    private List<WorkExperience> workExperiences;
}
