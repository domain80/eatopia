package com.domain80.wholistika.features.userAccount.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.envers.Audited;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Data
@Builder
@Audited
@AllArgsConstructor
public class UserAccount implements UserDetails {

    public UserAccount() { }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(role);
    }

    @Override
    public String getUsername() {
        return email;
    }


    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Column()
    private String firstName;
    @Column()
    private String lastName;

    @Column(unique = true)
    private String email;

    @Column()
    private String password;

    @Column()
    private String phoneNumber;

    @Column()
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @Column()
    private Boolean isNewUser;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // basic profile
    @Column()
    private String title;

    @Column()
    private String jobTitle;

    @Column()
    private String interests;

    @Column()
    private String about;

    @Column()
    private String imageData;


    @OneToMany(mappedBy = "userAccount", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<MedicalCondition> medicalConditions;

    @OneToMany(mappedBy = "userAccount", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private List<WorkExperience> workExperiences;

}
