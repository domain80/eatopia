package com.domain80.wholistika.features.userAccount.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.envers.Audited;
import org.springframework.security.authorization.method.AuthorizeReturnObject;

import java.time.LocalDateTime;

@Entity
@Audited
@Data
@AllArgsConstructor
@NoArgsConstructor
public class WorkExperience {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(  nullable = false)
    private String jobTitle;

    @Column(nullable = false)
    private String companyName;

    @Column(  nullable = false)
    private LocalDateTime startDate;

    @Column(  nullable = true)
    private LocalDateTime endDate;

    @Column(  nullable = false)
    private Boolean currentJob;

    @Column(  nullable = false)
    private String jobDescription;

    @ManyToOne
    @JoinColumn( nullable=false)
    private UserAccount userAccount;

}
