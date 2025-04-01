package com.domain80.wholistika.features.userAccount.models;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class Experience {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    public String id;

    @Column(  nullable = false)
    private String title;

    @Column(  nullable = false)
    private LocalDateTime startDate;

    @Column(  nullable = true)
    private LocalDateTime endDate;

    @Column(  nullable = false)
    private Boolean currentJob;

    @Column(  nullable = false)
    private String jobDescription;
}
